import organiModel from '../../models/organi.js'
const model = new organiModel()
import {
    config
} from '../../config.js'
Page({
    data: {
        tabs: ['排序', '方式', '类型', '区域'],
        currentTabsIndex: -1,
        organisArr: [],
        loading: false,
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
            sCode: null
        }, {
            text: '我报名的组织',
            status: false,
            sCode: '1'
        }, {
            text: '我管理的组织',
            status: false,
            sCode: '2'
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
        model.getMyOrganis(user, (data) => {
            if (data.length > 0) {

                let region = wx.getStorageSync('region')
                let category = wx.getStorageSync('category')
                let organisList = this.filterData(data)
                this.setData({
                    organisArr: organisList,
                    loading: true,
                    regions: region,
                    cate: category
                })
            } else {
                this.setData({
                    allLoad: false
                })
            }

        })


        let region = wx.getStorageSync('region')
        let category = wx.getStorageSync('category')
        this.setData({
            regions: region,
            cate: category,
            loading: true
        })
    },
    onActivityItemTap(event){
        let id = model.getDataSet(event, 'id')
        console.log(id);
        wx.navigateTo({
          url: '../organi_details/organi_details?gid=' + id,
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
                    cateModel: true,
                    showModalStatus: true
                })
                break;
            case 3:
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
    filterData: function (list) {
        let region = wx.getStorageSync('region')
        let category = wx.getStorageSync('category')
        let newList = []
        console.log(list.length)
        list.forEach((item) => {
            item.images = `${config.imageUrl}=${item.headimg_fileid}`
            region.forEach((regItem) => {
                if (item.region === regItem.sCode) {
                    item.regionText = regItem.Names
                }
            })
            category.forEach((element) => {
                if (item.kind === element.sCode) {
                    item.kindText = element.Names
                }
            })
            newList.push(item)
        })
        return newList
    },
    toggleState: function (event) {
        let code = model.getDataSet(event, 'code')
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
                const cbkind = this.data.cateList[index].sCode
                console.log(orderbyProperty)
                this.setData({
                    size: 10,
                    page: 1,
                    cbkind: cbkind,
                    cateList: cateList
                })
                break;
            case '2':
                const category = wx.getStorageSync('category')
                category.forEach(element => {
                    element.status = false
                })
                category[index].status = true
                if (scode === '1000') {
                    this.setData({
                        categoryCode: null,
                        cate: cateList
                    })
                } else {
                    this.setData({
                        categoryCode: scode,
                        cate: category
                    })
                }
                break;
            case '3':
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
        user.categoryCode = this.data.categoryCode
        user.regionCode = this.data.regionCode
        user.cbkind = this.data.cbkind
        user.orderbyProperty = this.data.orderbyProperty
        model.getMyOrganis(user, (data) => {
            if (data.length > 0) {
                let organisList = this.filterData(data)
                this.setData({
                    organisArr: organisList,
                    size: 10,
                    page: 1,
                    allLoad: true
                })
            } else {
                this.setData({
                    allLoad: false,
                    organisArr: [],
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