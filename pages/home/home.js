import HomeModel from '../../models/home.js'
import OrganiModel from '../../models/organi.js'
import { config } from '../../config.js'
import Tools from '../../utils/tools'
const organiModel = new OrganiModel()
const model = new HomeModel()
const tools = new Tools()
Page({
    data: {
        bannerArr: [],
        hot: [],
        review: [],
        noticeList: [],
        luvu: [],
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
        loading: false
    },
    onLoad: function () {
        let user = wx.getStorageSync('user')
        if (!user) {
            wx.navigateTo({
                url: '../authorize/authorize'
            })
        }
    },
    onShow: function () {
        let user = wx.getStorageSync('user')
        if (user) {
            this._loadData()
            console.log('加载数据')
        }
    },
    OnMoreActtivitiesTap: function () {
        console.log('wx')
        wx.navigateTo({
            url: '../activity/activity'
        })
    },
    _loadData: function () {
        let user = wx.getStorageSync('user')
        console.log(user)
        let token = wx.getStorageSync('token')
        console.log(token)
        user.token = token
        let that = this
        model.getBannerData(user, (data) => {
            let imgs = []
            data.forEach((item)=>{
                user.img_key =item.img_fileid
                item.images = `${config.imageUrl}=${item.img_fileid}`
            })
            that.setData({
                bannerArr: data
            })
        })
2
        model.getHotActivities(user, (data) => {
            data.forEach(item => {
                item.starttime = tools.dateformat(new Date(item.starttime), 'yyyy-MM-dd hh:mm')
                item.endtime = tools.dateformat(new Date(item.endtime), 'yyyy-MM-dd hh:mm')
                item.images = `${config.imageUrl}=${item.img_fileid}`
            })
            that.setData({
                hot: data
            })
        })

        model.getHotActivitiesByReview(user, (data) => {
            data.forEach(item => {
                item.starttime = tools.dateformat(new Date(item.starttime), 'yyyy-MM-dd hh:mm')
                item.endtime = tools.dateformat(new Date(item.endtime), 'yyyy-MM-dd hh:mm')
                item.images = `${config.imageUrl}=${item.img_fileid}`
            })
            that.setData({
                review: data
            })
        })

        model.getNoticeList(user, (data) => {
            that.setData({
                noticeList: data,
                loading: true
            })
        })

        this._loadValues(user)

        // model.getLuvuList(user,(data)=>{
        //     that.setData({
        //         luvu:data,
        //         loading:true
        //     })
        // })
    },
    onPullDownRefresh: function () {

    },
    _loadValues(user) {
        let regionKey = 'voregion'
        let cate = 'volunteertype'
        let that = this
        let region = wx.getStorageSync('region')
        let category = wx.getStorageSync('category')
        if (!region) {
            organiModel.getValues(user, regionKey, (data) => {
                data.forEach(element => {
                    element.status = false
                });
                data.unshift({
                    Names: '全部',
                    status: true
                })
                wx.setStorageSync('region', data)
            })
        }

        if (!category) {
            organiModel.getValues(user, cate, (data) => {
                data.forEach(element => {
                    element.status = false
                });
                data.unshift({
                    Names: '全部',
                    status: true
                })
                wx.setStorageSync('category', data)
            })
        }
    },
    onActivityItemTap(event) {
        let id = model.getDataSet(event, 'id')
        console.log(id)
        wx.navigateTo({
            url: '../detail/detail?id=' + id
        })
    },
    onShareAppMessage: function () {
        return {
            title: '城志协',
            path: 'pages/home/home'
        }
    }
})