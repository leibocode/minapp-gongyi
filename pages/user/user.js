import Model from '../../models/user.js'
const model = new Model()
Page({
    data: {
        userInfo: {},
        bannerArr: [{
            img: '../../images/h-banner.jpg'
        }],
        menus: [{
            icon_url: '../../images/h-icon1.png',
            title: '个人信息',
            icon: '../../images/my-cont-icon1.png',
            path: '../myinfo/myinfo'
        }, {
            icon_url: '../../images/h-icon1.png',
            title: '我的组织',
            path: '../my-organi/my-organi',
            icon: '../../images/my-cont-icon2.png'
        }, {
            icon_url: '../../images/h-icon1.png',
            title: '我的活动',
            path: '../my-activity/my-activity',
            icon: '../../images/my-cont-icon3.png'
        },{
            icon_url: '../../images/my-cont-icon4.png',
            title: '队长授权',
            path: '../captain-auth/captain-auth'
        },{
            icon_url: '../../images/my-cont-icon5.png',
            title:'成员待审核',
            class:'no-border'
        }],
        loading: false
    },
    onLoad: function () {
        // let user = wx.getStorageSync('user')
        // this.setData({
        //     userInfo:user,
        //     loading:true
        // })
        //this._loadData();
    },
    onShow:function(){
        this._loadData();
    },
    _loadData: function () {
        let user = wx.getStorageSync('user')
        let token = wx.getStorageSync('token')
        user.token = token
        let that = this
        model.getUserInfo(user, (data) => {
            that.setData({
                loading: true,
                userInfo: data
            })
        })

    },
    onPullDownRefresh: function () {

    },
    onMenuTap: function (event) {
        const index = model.getDataSet(event, 'index')
        console.log(index)
        const path = this.data.menus[index].path
        console.log(path)
        wx.navigateTo({
            url: path
        })
    },
    onScoresTap:function(){
      wx.navigateTo({
        url: '../my-scores/my-scores',
      })
    },
    onZyTap:function(){
      wx.navigateTo({
        url: '../volunteertime/volunteertime',
      })
    },
    onShareAppMessage: function (res) {
        return {
            title: '城志协',
            path: 'pages/home/home'
        }
    }
})