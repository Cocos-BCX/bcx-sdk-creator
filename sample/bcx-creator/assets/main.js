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
            default_ws_node:"ws://47.93.62.96:8020",
            ws_node_list:[
                {url:"ws://47.93.62.96:8020",name:"cocos新链"}
            ],
            networks:[{
                core_asset:"COCOS",
                chain_id:"9fc429a48b47447afa5e6618fde46d1a5f7b2266f00ce60866f9fdd92236e137" 
            }], 
            faucet_url:"http://47.93.62.96:3000",
            auto_reconnect:true                     
        });
        bcx.init().then(res=>{
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
            account:"test1",  //query.loginUserName,
            password:"12345678"
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

    onButtonTransferFee() {
        const bcx = this.bcx;
        const self = this;

        bcx.transferAsset({
            proposeAccount: "",
            toAccount: "test2",
            amount: 1,
            assetId: "COCOS",
            memo: "creator test",
            feeAssetId: "COCOS",
            isPropose: false,
            onlyGetFee: true
        }).then(res=>{
            if (1 != res.code) {
                self.log("ERR, transferAssetFee:" + res.code);
            } else {
                const data = res.data;
                self.log("SUC, transferAssetFee");
                self.log(data.fee_amount + " " + data.fee_symbol);
            }
        });
    },

    onButtonTransfer() {
        const bcx = this.bcx;
        const self = this;

        bcx.transferAsset({
            proposeAccount: "",
            toAccount: "test2",
            amount: 1,
            assetId: "COCOS",
            memo: "creator test",
            feeAssetId: "COCOS",
            isPropose: false,
            onlyGetFee: false
        }).then(res=>{
            if (1 != res.code) {
                self.log("ERR, transferAsset:" + res.code);
            } else {
                const data = res.data;
                self.log("SUC, transferAsset");
            }
        });
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
