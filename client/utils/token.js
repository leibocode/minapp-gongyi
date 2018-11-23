import { config } from '../config.js'
import Http from './http.js'

/**
 * token 获取 
 */
 export class Token extends Http {
    constructor(){
        super();
        this.tokenUrl ='token/apptoken/GetToken',
        this.userUrl = 'token/member/xcxlogin'
    }
    verify(){
        let token = wx.getStorageSync('token')
        let user = wx.getStorageSync('user')
        if(!token){
            this.getTokenFromServer()
        }

        if(!user){
            this.getUserFromServer()
        }
    }

    getUserFromServer(){
        let that = this
        wx.login({
            success:function(res){
                let code = res.code
                console.log(code)
                wx.getUserInfo({
                    success:function(data){
                        console.log(data)
                    }
                })
            }
        })
    }

    getTokenFromServer(){
        console.log(this.tokenUrl)
        let params = {
            url:this.tokenUrl,
            method:'POST',
            data:{
                Appid:config.appId,
                key:config.key
            },
            success:(data)=>{
                console.log(data)
            }
        }
        this.request(params)
    }

}
