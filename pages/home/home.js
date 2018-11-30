import HomeModel from '../../models/home.js'

const model = new HomeModel()
Page({
    data: {
        bannerArr: [],
        hot:[],
        review:[],
        noticeList:[],
        luvu:[],
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
        loading:false
    },
    onLoad:function () {
        let user = wx.getStorageSync('user')
        if(!user){
            wx.navigateTo({
                url: '../authorize/authorize'
            })
        }
    },
    onShow:function(){
        let user = wx.getStorageSync('user')
        if(user){
            this._loadData()
            console.log('加载数据')
        }
    },
    _loadData: function () {
        let user = wx.getStorageSync('user')
        console.log(user)
        let token =wx.getStorageSync('token')
        console.log(token)
        user.token =token
        let that = this
        model.getBannerData(user,(data)=>{
            that.setData({
                bannerArr:data
            })
        }) 

        model.getHotActivities(user,(data)=>{
            that.setData({
                hot:data
            })
        })

        model.getHotActivitiesByReview(user,(data)=>{
           that.setData({
                review:data
           })
        })

        model.getNoticeList(user,(data)=>{
            that.setData({
                noticeList:data
            })
        })
        
        model.getLuvuList(user,(data)=>{
            that.setData({
                luvu:data, 
                loading:true
            })
        })
    },
    onPullDownRefresh: function () {

    },
    onActivityItemTap(event) {
        let id = model.getDataSet(event,'id')
        console.log(id)
        wx.navigateTo({
            url: '../detail/detail?id='+id
        })
    },
    onShareAppMessage: function () {
        return {
            title: '城志协',
            path: 'pages/home/home'
        }
    }
})