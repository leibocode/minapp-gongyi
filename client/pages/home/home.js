import HomeModel from '../../models/home.js'

const model = new HomeModel()
Page({
    data: {
        bannerArr: [{
            img: '../../images/h-banner.jpg'
        }, {
            img: '../../images/h-banner.jpg'
        }],
        menus: [{
            icon_url: '../../images/h-icon1.png',
            name: '成为志愿者',
            class: '',
            url: '../vountary/vountary'
        }, {
            icon_url: '../../images/h-icon2.png',
            name: '我的活动',
            url: '../my-activity/my-activity'
        }, {
            icon_url: '../../images/h-icon3.png',
            name: '志愿时长',
            url: '../volunteertime/volunteertime'
        }, {
            icon_url: '../../images/h-icon4.png',
            name: '我的积分',
            url: '../my-scores/my-scores'
        }, {
            icon_url: '../../images/h-icon5.png',
            name: '帮助中心',
            url: '../query/query'
        }],
        loading: true,
        activitiesArr: [{
            src: '../../images/activity-details-pic.jpg',
            imgs: ['../../images/photo-pic.jpg', '../../images/photo-pic.jpg', '../../images/photo-pic.jpg']
        }]
    },
    onLoad: function () {
    //     wx.login({
    //         success:function(res){
    //             let code =res.code
    //             wx.getUserInfo({
    //                 success:function(data){
    //                     console.log(data)
    //                     let iv = data.iv
    //                     let encryptedData =data.encryptedData
    //                     let userInfo ={
    //                         iv:iv,
    //                         encryptedData:encryptedData, 
    //                         userInfo:data.userInfo
    //                     }
    //                     //https://izcwxs.ctysoft.com/token/apptoken/GetToken
    //                     //https://izcwxs.ctysoft.com/token/member/xcxlogin
    //                     console.log(userInfo)
    //                     wx.request({
    //                         url:'https://izcwxs.ctysoft.com/token/member/xcxlogin', 
    //                         method:'post',
    //                         data:{
    //                             Code:code,
    //                             Province:data.userInfo.province,
    //                             City:data.userInfo.city,
    //                             Membername:data.userInfo.nickName,
    //                             headimgurl:data.userInfo.avatarUrl
    //                         },
    //                         success:function(result){
    //                             console.log(result)
    //                         }
    //                     })
    //                 }
    //             })
    //     }
    //  })
    },
    _loadData: function () {

    },
    onPullDownRefresh: function () {

    },
    onActivityItemTap() {
        wx.navigateTo({
            url: '../detail/detail'
        })
    },
    onShareAppMessage: function () {
        return {
            title: '城志协',
            path: 'pages/home/home'
        }
    },
    bindGetUserInfo:function(){
        wx.login({
            success:function(res){
                let code =res.code
                console.log(code)
                wx.getUserInfo({
                    success:function(data){
                        console.log(data)
                        let iv = data.iv
                        let encryptedData =data.encryptedData
                        let userInfo ={
                            iv:iv,
                            encryptedData:encryptedData, 
                            userInfo:data.userInfo
                        }
                        // wx.request({
                        //     //TkXhvyCZeOb0osc4CTYSOFT2014TzvOvU4cfQCTYSOFT2014sxVoTUoM154PZEtUm7oTQnTA6cSLUx5VN2cnIhwGrmBlD/sde4y0kNQCnrVeNTlnMK00/5Ya0CvPCTYSOFT20147RvHCTYSOFT20140e9Sar3oNWTSFsrYLenu1Fb/O1WVH42HsUDnbZH9IlX7McTVPMVA5dxZfTkdztiD584r8KzDGjASsQdezpFexkAue/Be8JW7ilgT4upOI8uBwGrRobRr76CTYSOFT2014o3J9KZz/9ED5qyEPCMFaQcA5d374sJ0FrLMIEOplxCTYSOFT2014hAeRTLQCTYSOFT2015CTYSOFT2015
                        //     url:'https://izcwxs.ctysoft.com/token/member/xcxlogin', 
                        //     method:'post',
                        //     headers:{
                        //         token:'TkXhvyCZeOb0osc4CTYSOFT2014TzvOvU4cfQCTYSOFT2014sxVoTUoM154PZEtUm7oTQnTA6cSLUx5VN2cnIhwGrmBlD/sde4y0kNQCnrVeNTlnMK00/5Ya0CvPCTYSOFT20147RvHCTYSOFT20140e9Sar3oNWTSFsrYLenu1Fb/O1WVH42HsUDnbZH9IlX7McTVPMVA5dxZfTkdztiD584r8KzDGjASsQdezpFexkAue/Be8JW7ilgT4upOI8uBwGrRobRr76CTYSOFT2014o3J9KZz/9ED5qyEPCMFaQcA5d374sJ0FrLMIEOplxCTYSOFT2014hAeRTLQCTYSOFT2015CTYSOFT2015'
                        //     },
                        //     data:{
                        //         Code:code,
                        //         Province:data.userInfo.province,
                        //         City:data.userInfo.city,
                        //         Membername:data.userInfo.nickName,
                        //         headimgurl:data.userInfo.avatarUrl
                        //     },
                        //     success:function(result){
                        //         console.log(result)
                        //     }
                        // })
                    }
                })
            }
        })
    }
})