# Exchange - W3OS APIs

## Overview

- Market and NFT functions here.

## Functions

### NFT

- W3OS NFT base on Anchor, **Mint** logical is this when you write the anchor to the chain, the hash of anchor will be used to create the NFT by target resouce.

- Resource of iNFT is a single file, the definition is in the raw of Anchor. The start position [0,0] of image is left-top.

    ```Javascript
        {
            name:"iNFT_Resource",
            raw:{
                img:"BASE64_IMAGE_STRING",
                format:"png",
                grid:[40,40],       //cell size
                size:[20,10],       //lines and rows
            },
            protocol:{
                type:"data",
                fmt:"json",
                tpl:"nft",
            },
            pre:0
        }
    ```

- One single png file is used as resource to mint the NFT, the format of NFT will be write to as **raw** on Anchor data.

    ```Javascript
        {
            name:"iNFT_Name",
            raw:{
                source:"Alink_Of_Image",
                type:"2D",
                size:["SIZE_X","SIZE_Y"],
                puzzle:[        //pieces of iNFT
                    {
                        hash:["START","END","DIVIDE"],
                        img:["LINE","ROW","LINE_EXT","ROW_EXT"],    //LINE_EXT and ROW_EXT is optional
                        position:["POSITION_X","POSITION_Y"]        //Position of this piece         
                        color:["START","END","DIVIDE"],             //this is optional
                        center:["X","Y"],                           //this is optional, default is center of cell
                        rotation:"IMAGE_ROTATION",                  //this is optional
                        scale:1,                                    //this is optional
                    },
                    ...         //iNFT is combined by pieces
                ]
                stamp:[         //This is used to confirm the timestamp of iNFT
                    {
                        network:"btc",
                        block:66123456,
                        hash:0x9999944555667,
                        stamp:2898989343,
                    },
                    {
                        network:"eth",
                        block:66123456,
                        hash:0x7788944555667,
                        stamp:2898989343,
                    },
                    {
                        network:"doge",
                        block:166123456,
                        hash:0x99999334555667,
                        stamp:2898989343,
                    },
                    {
                        network:"solana",
                        block:366123456,
                        hash:0x99999334555667,
                        stamp:2898989343,
                    }
                ]
            },
            protocol:{
                type:"nft",
                fmt:"json"
            },
            pre:0
        }
    ```



- Identifiable NFT which in short iNFT will be part of W3OS, the iNFT recognizability feature  means that anybody even who just know about NFT can distinguish between high and low prices. The scarcity is determined by random numbers.