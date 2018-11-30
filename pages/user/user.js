import Model from '../../models/user.js'
const model =new Model()
Page({
    data:{
        userInfo:{},
        bannerArr:[{
            img:'../../images/h-banner.jpg'
        }],
        menus:[{
            icon_url:'../../images/h-icon1.png',
            title:'个人信息',
            path:''
        },{
            icon_url:'../../images/h-icon1.png',
            title:'我的组织',
            path:'../my-organi/my-organi'
        },{
            icon_url:'../../images/h-icon1.png',
            title:'我的活动',
            path:'../my-activity/my-activity'
        },{
            icon_url:'../../images/h-icon1.png',
            title:'队长授权',
            path:'../captain-auth/captain-auth'
        },{
            icon_url:'../../images/h-icon1.png',
            title:'成员待审核',
            class:'no-border'
        }],
        loading:false
    },
    onLoad:function(){
        this._loadData()
    },
    _loadData:function(){
        let user = wx.getStorageSync('user')
        let token =wx.getStorageSync('token')
        user.token =token
        let that = this
        model.getUserInfo(user,(data)=>{
            that.setData({
                loading:true,
                userInfo:data
            })
        })
    }, 
    onPullDownRefresh:function(){

    },
    onShareAppMessage:function(){
        return {
            title:'城志协',
            path:'pages/home/home'
        }
    }
})