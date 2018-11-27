import { config } from '../../config.js'
Page({
    data:{

    },
    onShow:function(){

    },
    bindGetUserInfo:function(){
        let that = this
        wx.login({
            success:function(res){
                let code =res.code
                wx.getUserInfo({
                    success:function(data){
                        console.log(data)
                        let iv = data.iv
                        let encryptedData =data.encryptedData
                        let userInfo ={
                            iv:iv,
                            encryptedData:encryptedData, 
                            userInfo:data.userInfo,
                            code:code
                        }
                        that.getUserId(userInfo)
                    }
                })
            }
        })
    },
    getUserId:function(userInfo){
        const token =  wx.getStorageSync('token')
        let that = this
        wx.request({
            method:"post",
            url:`${config.url}token/member/xcxlogin?code=${userInfo.code}&province=${userInfo.userInfo.province}&city=${userInfo.userInfo.city}
            &area=${userInfo.userInfo.area}&membername=${userInfo.userInfo.nickName}&headimgurl=${userInfo.userInfo.avatarUrl}&token=${token}`,
            success:function(res){
                console.log(res)
                if(res.data.Data.result){
                    let user = {
                        userId:res.data.Data.msg,
                        nickName:userInfo.userInfo.nickName,
                        headimgurl:userInfo.userInfo.avatarUrl
                    }
                    wx.setStorageSync('user',user)

                    wx.navigateBack({})
                    console.log('跳转结束')
                }else {
                    console.logo('500错误码')
                }
            }
        })
    }
})