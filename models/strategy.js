﻿/**
 * A model for our account
 */
'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const paginate = require('mongoose-paginate');

var strategyModel = function () {
    const StrategySchema = mongoose.Schema({
        userName: { type: String, required: true }, 
        isTest: { type: Boolean },
        openType: { type: String, default: "private" },
        price: { type: String, default: "private" },//价格
        isValid: { type: Boolean, default: true },

        account: { 
            totalPosition: Number, //整体仓位，如5，表示占比5%
            coins: [{
                coin: String, 
                position: Number, //所占仓位

                priority: { type: String, default: "none" }, //sell,buy,none,custom
                priorityPosition: Number
            }]
        },

        addtional: [{
            strategyType: { type: String },
            refId: { type: Schema.ObjectId }
        }],

        created: { type : Date, "default": Date.now() },
        modified: { type : Date, "default": Date.now() }

    });

     /**
     * Methods
     */
    StrategySchema.methods = {
        //  /**
        //  * 添加方法
        //  * @param userName 用户名
        //  */
        // getAddStrategy : function(userName,callback){
        //     this.userName=userName.userName;
            
        //     return this.save(callback);
        // },
        
    }
    
    /**
     * Statics
     */
    StrategySchema.statics = {

        /**
        * Find article by id
        *
        * @param {ObjectId} id
        * @api private
        */
        load: function (_id) {
            return this.findOne({ _id })
                .exec();
        },
        getUserStrategy: function(userName){
            return this.findOne({ userName: userName,isValid: true }).exec();
        }
       
        // /**
        //  * 更新
        //  */
        // getUpdateStrategy : function(userName){
        //     return this.update(this.userName,userName)
        // }
    };

    StrategySchema.plugin(paginate);
    return mongoose.model('Strategy', StrategySchema);
};


module.exports = new strategyModel();

