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
    }
})