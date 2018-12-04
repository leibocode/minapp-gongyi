import activityModel from '../../models/my-activity.js'
import {
    config
} from '../../config.js'
import Tools from '../../utils/tools'
const model = new activityModel()
const tools = new Tools()
Page({
    data: {
        tabs: ['排序', '类型', '区域'],
        currentTabsIndex: -1,
        activitiesArr: [],
        loading: false,
        apis: [],
        page: 1,
        size: 10,
        commodity_attr_boxs: [{
            text: '时间',
            status: true,
            orderby: 'builddate'
        }, {
            text: '类型',
            status: false,
            orderby: 'kind'
        }, {
            text: '区域',
            status: false,
            orderby: 'region'
        }],
        cateList: [{
            text: '全部',
            status: true,
            categoryCode: null
        }, {
            text: '我报名的活动',
            status: false,
            categoryCode: '1'
        }, {
            text: '我管理的活动',
            status: false,
            categoryCode: '2'
        }],
        orderModel: false,
        regionModel: false,
        cateModel: false,
        categoryModel: false,
        showModalStatus: false,
        allLoad: true
    },
    onLoad: function () {
        this._loadData()
    },
    _loadData: function () {
        let user = wx.getStorageSync('user')
        user.token = wx.getStorageSync('token')
        user.size = this.data.size
        user.page = this.data.page
        model.getMyActivities(user, (data) => {
            if (data.length > 0) {
                data.forEach((item) => {
                    item.starttime = tools.dateformat(new Date(item.starttime), 'yyyy-MM-dd hh:mm')
                    item.endtime = tools.dateformat(new Date(item.endtime), 'yyyy-MM-dd hh:mm')
                    item.images = `${config.imageUrl}=${item.img_fileid}`
                })
                this.setData({
                    activitiesArr: data
                })
            } else {
                this.setData({
                    activitiesArr: [],
                    allLoad: false
                })
            }
        })

        let region = wx.getStorageSync('region')
        this.setData({
            regions: region,
            loading: true
        })
    },
    onTabsItemTap (event) {
        this.setData({
            orderModel: false,
            categoryModel: false,
            regionModel: false,
            cateModel: false
        })
        const index = model.getDataSet(event, 'index')
        switch (index) {
            case 0:
                this.setData({
                    currentTabsIndex: index,
                    orderModel: true,
                    showModalStatus: true
                })
                break;
            case 1:
                this.setData({
                    currentTabsIndex: index,
                    categoryModel: true,
                    showModalStatus: true
                })
                break;
            case 2:
                this.setData({
                    currentTabsIndex: index,
                    regionModel: true,
                    showModalStatus: true
                })
                break;
        }
        this.showModalStatus = true
    },
    hideModal: function () {
        this.setData({
            showModalStatus: false,
            orderModel: false,
            cateModel: false,
            regionModel: false,
            categoryModel: false
        })
    },
    toggleState: function (event) {
        console.log('切换状态')
        let code = model.getDataSet(event, 'code')
        console.log(code)
        let index = model.getDataSet(event, 'toggle')
        let scode = model.getDataSet(event, 'scode')
        console.log(scode)
        switch (code) {
            case '0':
                const orderList = this.data.commodity_attr_boxs
                orderList.forEach((item) => {
                    item.status = false
                })
                orderList[index].status = true
                const orderbyProperty = this.data.commodity_attr_boxs[index].orderby
                console.log(orderbyProperty)
                this.setData({
                    size: 10,
                    page: 1,
                    orderbyProperty: orderbyProperty,
                    commodity_attr_boxs: orderList
                })
                break;
            case '1':
                console.log('1')
                const cateList = this.data.cateList
                cateList.forEach((item) => {
                    item.status = false
                })
                cateList[index].status = true
                const categoryCode = this.data.cateList[index].categoryCode
                console.log(orderbyProperty)
                this.setData({
                    size: 10,
                    page: 1,
                    categoryCode: categoryCode,
                    cateList: cateList
                })
                break;
            case '2':
                console.log('2')
                let regionList = wx.getStorageSync('region')
                regionList[0].status = false
                regionList[index].status = true
                console.log(cateList)
                if (scode === '1000') {
                    this.setData({
                        regionCode: null,
                        regions: regionList,
                    })
                } else {
                    this.setData({
                        regionCode: scode,
                        regions: regionList
                    })
                }
                break;

        }
        this._loadWhereLoad()
    },
    _loadWhereLoad: function () {
        let user = wx.getStorageSync('user')
        let token = wx.getStorageSync('token')
        user.token = token
        user.size = this.data.size
        user.page = this.data.page
        user.categoryCode = this.data.categoryCode
        user.regionCode = this.data.regionCode
        user.orderbyProperty = this.data.orderbyProperty
        model.getMyActivities(user, (data) => {
            if (data.length > 0) {
                data.forEach((item) => {
                    item.starttime = tools.dateformat(new Date(item.starttime), 'yyyy-MM-dd hh:mm')
                    item.endtime = tools.dateformat(new Date(item.endtime), 'yyyy-MM-dd hh:mm')
                    item.images = `${config.imageUrl}=${item.img_fileid}`
                })
                this.setData({
                    activitiesArr: data,
                    size: 10,
                    page: 1,
                    allLoad: true
                })
            } else {
                this.setData({
                    allLoad: false,
                    activitiesArr: [],
                    size: 10,
                    page: 1,
                })
            }
        })
    },
    onPullDownRefresh: function () {

    },
    onShareAppMessage: function () {
        return {
            title: '城志协',
            path: 'pages/home/home'
        }
    }
})