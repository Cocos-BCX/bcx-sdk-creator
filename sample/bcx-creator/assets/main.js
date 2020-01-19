// import './bcx/A-bcx-polyfill-for-cocos'
// console.log(window.crypto);
// import './bcx/bcx.min.js'
// import {
//   NonceTxMiddleware, SignedTxMiddleware, Client,
//   Contract, Address, LocalAddress, CryptoUtils
// } from './loom.umd'


// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        logs: {
            default: null,
            type: cc.Label
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        const self = this;
        const bcx = new BCX({
            ws_node_list:[
                {url:"ws://test.cocosbcx.net",name:"Cocos - China - Beijing"}
            ],
            networks:[{
                core_asset:"COCOS",
                chain_id:"c1ac4bb7bd7d94874a1cb98b39a8a582421d03d022dfa4be8c70567076e03ad0" 
            }],
            faucet_url:"http://test-faucet.cocosbcx.net",
            auto_reconnect:true,
            real_sub:true,
            check_cached_nodes_data:false
        });
        bcx.init({
            real_sub:true,
            subscribeToRpcConnectionStatusCallback:res=>{
                console.info("subscribeToRpcConnectionStatusCallback res:");
                console.info(JSON.stringify(res));
            }
        }).then(res=>{
            if (1 != res.code) {
                self.log("ERR, BCX connect failed:" + res.code);
            } else {
                self.log("SUC, BCX connected");
            }
        });
        this.bcx = bcx;
    },

    onButtonLogin() {
        const self = this;
        const bcx = this.bcx;

        bcx.passwordLogin({
            account:"hugo1111",
            password:"111111"
        }).then(res=>{
            if (1 != res.code) {
                self.log("ERR, passwordLogin:" + res.code);
            } else {
                const data = res.data;
                self.log("SUC, passwordLogin");
                self.log(data.account_id + " " + data.account_name);
                // self.log(data.locked);
                // self.log(data.mode);
            }
        });
    },

    onButtonQueryAccountInfo() {
        const self = this;
        const bcx = this.bcx;

        bcx.queryAccountInfo({
            account: "test1",
            callback:function(res) {
                if (1 != res.code) {
                    self.log("ERR, queryAccountInfo:" + res.code);
                } else {
                    const data = res.data;
                    self.log("SUC, queryAccountInfo");
                    cc.log(JSON.stringify(data));
                }
            }
        });
    },

    onButtonTransfer() {
        const bcx = this.bcx;
        const self = this;

        bcx.transferAsset({
            fromAccount: "hugo1111",
            toAccount: "huang",
            amount: 1,
            assetId: "COCOS",
            memo: "creator test",
            isPropose: false
        }).then(res=>{
            if (1 != res.code) {
                self.log("ERR, transferAsset:" + res.code);
            } else {
                const data = res.data;
                self.log("SUC, transferAsset");
            }
        });
    },

    onButtonFakeTest() {
        const bcx = this.bcx;
        const self = this;

        cc.log("faketest")
    },

    log: function(s) {
        cc.log(s);
        let lines = this.logs.string.split('\n');
        // cc.log(lines);
        while (lines.length > 5) {
            lines.shift();
        }
        lines.push(s);
        this.logs.string = lines.join('\n');
    },

    // update (dt) {},
});
