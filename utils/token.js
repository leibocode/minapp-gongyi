import { config } from '../config.js'
import Http from './http.js'

/**
 * token 获取 
 */
 export class Token extends Http {
    constructor(){
        super();
        this.tokenUrl = config.url+ 'token/apptoken/GetToken',
        this.userUrl = 'token/member/xcxlogin'
    }
    verify(){
        let token = wx.getStorageSync('token')
        let user = wx.getStorageSync('user')
        if(!token){
            this.getTokenFromServer()
        }
    }

    getUserFromServer(){
        wx.navigateTo({
            url: '../pages/authorize/authorize'
        })
    }

    getTokenFromServer(){
        let params = {
            token:`${this.tokenUrl}?appid=${config.appId}&key=${config.key}`,
            method:'post',
            data:{
                appid:config.appId,
                key:config.key
            },
            success:(data)=>{
                console
                wx.setStorageSync('token',data.msg)
            }
        }
        this.request(params)
    }

}
