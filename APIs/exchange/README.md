# Exchange - W3OS APIs

## Overview

- Market and NFT functions here.

## Functions

### NFT

- W3OS NFT base on Anchor, **Mint** logical is this when you write the anchor to the chain, the hash of anchor will be used to create the NFT by target resouce.

- Resource of iNFT is a single file, the definition is in the raw of Anchor. The start position [0,0] of image is left-top.

    ```Javascript
        //iNFT resource format
        {
            name:"iNFT_Resource",
            raw:{
                img:"BASE64_IMAGE_STRING",      //Raw data of image without prefix
                format:"png",                   //image format
                cell:[40,40],                   //cell size
                grid:[20,10],                   //lines and rows
                series:[
                    {
                        name:"NAME_OF_SERIES",
                        desc:"DESCRIPTION_OF_SERIES"
                    }
                ],
            },
            protocol:{
                type:"data",
                fmt:"json",
                tpl:"nft",
            },
            pre:0
        }
    ```

    ```Javascript
        //iNFT template
        {
            type:"2D",
            size:[
                "OUTPUT_SIZE_X",
                "OUTPUT_SIZE_Y"
            ],
            puzzle:[        //pieces of iNFT. Will render by the array order, 0 is the background
                    {
                        value:[      //where to get the number of hash
                            "START",        //start position of hash string
                            "STEP",         //how many string to get from
                            "DIVIDE" ,      //how to divide, result%n, the value of "n"
                            "OFFSET",       //Random number offset to avoid same result
                            ],
                        img:[       //the position of image start, get by order, related ti "hash"
                            "LINE",         //line number of iNFT resource
                            "ROW",          //row number of iNFT resource
                            "LINE_EXT",     //default is 0,optional, line extend 
                            "ROW_EXT"       //default is 0,optional, row extend 
                            ],    //LINE_EXT and ROW_EXT is optional
                        position:[  //Position of this piece
                            "POSITION_X",   // The X position of this piece on iNFT
                            "POSITION_Y"    // The Y position of this piece on iNFT
                            ],
                        center:[    //this is optional, default is center of cell
                            "X",            //center X position        
                            "Y"             //center Y position     
                        ],
                        rotation:[  //this is optional 
                            "IMAGE_ROTATION",
                            "ROTATION_POSITION_X",
                            "ROTATION_POSITION_Y",
                        ],      
                        scale:1,                        //this is optional        
                        fill:1,                         //this is optional, wether fill the empty background     
                        color:[     //this is optional
                            "START",        //start position of hash string 
                            "STEP",         //default is 6,optional
                            "DIVIDE",       //optional, reduce the color amount. 
                            ["RED_OFFSET","GREEN_OFFSET","BLUE_OFFSET"]     //optional, adjust the color
                        ],
                        rarity:[            //How the part categoried to series. Parts can be multi used.
                            ["INDEX","INDEX", ... ],    //index parts, such as [0,2,3]
                            ["INDEX","INDEX", ... ],
                            ["INDEX","INDEX", ... ],
                        ]
                    },
                    ...         //iNFT is combined by pieces
                ]
            version:"VERSTION",     //iNFT template
            auth:["AUTH_NAME"]      //auth name list
        }
    ```


- One single png file is used as resource to mint the NFT, the format of NFT will be write to as **raw** on Anchor data.

    ```Javascript
        //instance of an iNFT
        {
            name:"iNFT_Name",
            raw:{
                source:"Alink_Of_Image",            //for example, "anchor://flamingo/23412"
                template:"Alink_Of_Template",       //for example, "anchor://colorful/23445"
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