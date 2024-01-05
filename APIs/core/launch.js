/* 
*  W3OS launch default SDK
*  @auth [ Fuu ]
*  @creator Fuu
*  @date 2024-01-05
*  @functions
*  1. load default SDKs from Anchor Network, such as @polkadot/api, anchorjs, easy
*/

import {ApiPromise,WsProvider} from "@polkadot/api";

//TODO, important improvement
//TODO, decode the anchor data from substrate node directly, can help to reduce the APIs size.

let wsAPI=null;
const limits={
    key:40,					//Max length of anchor name ( ASCII character )
    protocol:256,			//Max length of protocol	
    raw:4*1024*1024,		//Max length of raw data
	address:48,				//SS58 address length
};
const self={
    decode:(alink,ck)=>{
        //console.log(alink);
        const prefix="anchor://";
        if(alink.length<=prefix.length) return ck && ck(false);
        const str=alink.toLocaleLowerCase();
        const head=str.substring(0,prefix.length);

        if(head!==prefix)  return ck && ck(false);
        const body=str.substring(prefix.length,str.length);
        const arr=body.split("/");

        if(arr.length===1) return ck && ck(arr[0],0);
        if(arr.length===2) return ck && ck(arr[0],parseInt(arr[1]));
        return ck && ck(false);
    },
    owner:(anchor,ck)=>{
		let unsub = null;
		wsAPI.query.anchor.anchorOwner(anchor, (res) => {
			unsub();
			if(res.isEmpty) return ck && ck(false);
			const owner=res.value[0].toHuman();
			const block = res.value[1].words[0];
			return ck && ck(owner,block);
		}).then((fun)=>{
			unsub = fun;
		});
	},
    target:(anchor,block,ck)=>{
		if (wsAPI===null) return ck && ck({error:"No websocke link."});
		anchor = anchor.toLocaleLowerCase();
		if (anchor.substr(0, 2) === '0x') anchor = self.decodeUTF8(anchor);

		if(self.limited(anchor)) return ck && ck(false);
		self.owner(anchor,(owner)=>{
			const details={block:block};
			if(owner===false) return ck && ck(self.format(anchor,details));
			wsAPI.rpc.chain.getBlockHash(block, (res) => {
				const hash = res.toHex();
				if (!hash) return ck && ck(self.format(anchor,details));

				self.specific(hash,(dt)=>{
					if(dt===false) return ck && ck(self.format(anchor,details));
					
					details.empty = false;
					for(let k in dt) details[k]=dt[k];
					details.owner=owner;
					return ck && ck(self.format(anchor,details));
				},{anchor:anchor});		//add the owner details here.
			});
		});
	},
    format:(anchor,obj)=>{
		return {
			"name":!anchor?"":anchor,
			"protocol":(obj && obj.protocol)?obj.protocol:null,
			"raw":(obj && obj.raw)?obj.raw:null,
			"block":(obj && obj.block)?obj.block:0,
			"stamp":(obj && obj.stamp)?obj.stamp:0,
			"pre":(obj && obj.pre)?obj.pre:0,
			"signer":(obj && obj.signer)?obj.signer:"",
			"empty":(obj && obj.empty===false)?obj.empty:true,
			"owner":(obj && obj.owner)?obj.owner:"",
			"sell":(obj && obj.sell)?obj.sell:false,
			"cost":(obj && obj.cost)?obj.cost:0,
			"target":(obj && obj.target)?obj.target:"",
		};
	},
    status:(list)=>{
		const evs=list.toHuman();
		const map={};
		for(let i=0;i<evs.length;i++){
			const ev=evs[i],index=ev.phase.ApplyExtrinsic;
			if(ev.event.section!=="system") continue;
			map[index]=ev.event.method;
		}
		return map;
	},
    specific:(hash,ck,cfg)=>{
		if(cfg!==undefined && cfg.anchor!==undefined && self.limited(cfg.anchor)) return ck && ck(false);
		wsAPI.rpc.chain.getBlock(hash).then((dt) => {
			if (dt.block.extrinsics.length === 1) return ck && ck(false);

			wsAPI.query.system.events.at(hash,(evs)=>{
				const exs = self.filter(dt, 'setAnchor',self.status(evs));
				if(exs.length===0) return ck && ck(false);
				if(cfg===undefined || cfg.anchor===undefined) return ck && ck(exs);

				let data=null;
				for(let i=0;i<exs.length;i++){
					let ex=exs[i],row=ex.args;
					if(row.key.substr(0, 2).toLowerCase() === '0x') row.key=self.decodeUTF8(row.key);
					if(row.key.toLowerCase()===cfg.anchor.toLowerCase()){
						data=row;
						data.signer=ex.owner;
						data.stamp=parseInt(ex.stamp);
					}
				}
				if(data===null) return ck && ck(false);
				return ck && ck(self.decor(data));
			});
		});
	},
    limited:(key,raw,protocol,address)=>{
        if(key!==undefined) return key.length>limits.key?true:false;
        if(protocol!==undefined) return protocol.length>limits.protocol?true:false;
        if(raw!==undefined) return raw.length>limits.raw?true:false;
		if(address!==undefined) return address.length!==limits.address?true:false;
        return false;
    },
    filter: (exs, method,status) => {
		let arr = [];
		//console.log(exs[0].toHuman());
		let stamp=0;
		exs.block.extrinsics.forEach((ex, index) => {
			if(index===0){
				stamp=ex.toHuman().method.args.now.replace(/,/gi, '');
			}
			if(index===0 || status[index]!=="ExtrinsicSuccess") return false;
			const dt = ex.toHuman();
			if (dt.method.method === method) {
				const res = dt.method;
				res.owner = dt.signer.Id;
				res.stamp = stamp;
				arr.push(res);
			}
		});
		return arr;
	},
    decor:(data)=>{
		if(data.key.substr(0, 2).toLowerCase() === '0x') data.key=self.decodeUTF8(data.key);
		if(data.raw.substr(0, 2).toLowerCase() === '0x') data.raw = self.decodeUTF8(data.raw);
		if(data.protocol){
			try {
				let proto=JSON.parse(data.protocol);
				data.protocol=proto;
				if (proto.type === "data" && proto.format === "JSON") data.raw = JSON.parse(data.raw);
			} catch (error) {
				console.log(`Failed to parse JSON.`);
			}
		}
		data.pre=parseInt(data.pre.replace(/,/gi, ''));
		
		//remove the thound seperetor
		if(data.block && typeof(data.block)==='string') data.block=parseInt(data.block.replace(/,/gi, ''));
		return data;
	},
    decodeUTF8:(str) => {
		const arr=str.slice(2).replace(/\s+/g, '').split("");
		let final='';
		for(let i=0;i<arr.length;i+=2){
			final+="%"+arr[i]+arr[i+1];
		}
		return decodeURIComponent(final);
    },
};

const Launch=(url,libs,ck,map)=>{
    if(!map) map=[];
    if(libs.length===0) return ck && ck(map);
    if(wsAPI===null){
        return ApiPromise.create({ provider: new WsProvider(url) }).then((api) => {
            wsAPI=api;
            return Launch(url,libs,ck,map);
        });
    }

    const row=libs.pop();
    self.decode(row,(anchor,block)=>{
        if(!anchor){
            map.push({alink:row,empty:true});
            return Launch(url,libs,ck,map);
        }
        self.target(anchor,block,(res)=>{
            map.push({alink:row,empty:false,data:res});
            return Launch(url,libs,ck,map);
        });
    });
}
export default Launch;