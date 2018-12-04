import Model from '../../models/actvity.js'
import Tools from '../../utils/tools'
import {
    config
} from '../../config.js'
const model = new Model()
const tools = new Tools()

Page({
    data: {
        tabs: ['排序', '类型', '区域'],
        currentTabsIndex: -1,
        activitiesArr: [],
        loading: false,
        page: 1,
        size: 10,
        commodity_attr_boxs: [{
            text: '创建时间',
            status: true,
            orderby: 'builddate'
        }, {
            text: '开始时间',
            status: false,
            orderby: 'starttime'
        }, {
            text: '报名人数',
            status: false,
            orderby: 'enrollnum'
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
        let token = wx.getStorageSync('token')
        user.size = this.data.size
        user.page = this.data.page
        user.token = token
        model.getActvities(user, (data) => {
            if (data.length > 0) {
                data.forEach(item => {
                    item.starttime = tools.dateformat(new Date(item.starttime), 'yyyy-MM-dd hh:mm')
                    item.endtime = tools.dateformat(new Date(item.endtime), 'yyyy-MM-dd hh:mm')
                    item.images = `${config.imageUrl}=${item.img_fileid}`
                })
                this.setData({
                    activitiesArr: data,
                    loading: true
                })
            } else {
                this.setData({
                    activitiesArr: [],
                    allLoad: false
                })
            }

        })
        let region = wx.getStorageSync('region')
        let category = wx.getStorageSync('category')
        this.setData({
            regions: region,
            cate: category
        })
    },
    onTabsItemTap: function (event) {
        this.setData({
            orderModel: false,
            categoryModel: false,
            regionModel: false
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
    onPullDownRefresh: function () {

    },
    hideModal: function () {
        let currentTabsIndex = this.data.currentTabsIndex

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
                console.log('0')
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
                let cateList = wx.getStorageSync('category')
                cateList.forEach(element => {
                    element.status = false
                })
                cateList[index].status = true
                if (scode === '1000') {
                    this.setData({
                        categoryCode: null,
                        cate: cateList
                    })
                } else {
                    console.log('1')


                    console.log(cateList)
                    this.setData({
                        categoryCode: scode,
                        cate: cateList
                    })
                }

                break;
            case '2':
                let regionList = wx.getStorageSync('region')
                regionList.forEach((element) => {
                    element.status = false
                })
                regionList[index].status = true
                if (scode === '1000') {
                    this.setData({
                        regionCode: null,
                        regions: regionList
                    })
                } else {
                    console.log('2')

                    console.log(cateList)
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
        let that = this
        user.orderbyProperty = this.data.orderbyProperty
        user.categoryCode = this.data.categoryCode
        user.regionCode = this.data.regionCode

        model.getActvities(user, (data) => {
            if (data.length > 0) {
                data.forEach(item => {
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
                console.log('没有数据')
                this.setData({
                    activitiesArr: [],
                    allLoad: false
                })
            }

        })
    },
    onShareAppMessage: function () {
        return {
            title: '城志协',
            path: 'pages/activity/activity'
        }
    },
    onActivityItemTap: function (event) {
        let id = model.getDataSet(event, 'id')
        console.log(id)
        wx.navigateTo({
            url: '../detail/detail?id=' + id
        })
    }
})