'use strict';

const WebSocket = require('ws');
const sitesMap = new Map(); //key: site, value: [{ symbol: "btc#usd",bids:[],asks:[],timestamp: 23432432 }]
const ChannelName = "market";

let market = new class {

    pushData(res){
        if(!res || !res.data){
            return;
        }

        let depths = res.data,
            newDepths = [];
        for(let depth of depths){
            let site = depth.site;
            depth.timestamp = depth.timestamp ? +depth.timestamp : + new Date();

            let mapItem = sitesMap.get(site);
            if(!mapItem){
                sitesMap.set(site,[depth]);
            } else {
                let index = mapItem.findIndex(p => p.symbol == depth.symbol);
                if(index == -1){
                    mapItem.push(depth);
                    newDepths.push(depth);
                } else {
                    if(mapItem[index].timestamp < depth.timestamp){
                        mapItem.splice(index,1,depth);
                        newDepths.push(depth);
                    } 
                }
            }
        }
    }

    getSymbolDepth(site,symbol){
        let mapItem = sitesMap.get(site);
        if(!mapItem){
            return { isSuccess: false, code: "", message: ""};
        }

        let depth = mapItem.find(p => p.symbol == symbol);
        if(!depth){
            return { isSuccess: false, code: "", message: ""};
        }

        return { isSuccess: true, depth: depth };
    }

}();

module.exports = market;