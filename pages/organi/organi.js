import Model from '../../models/organi.js'
import {
    config
} from '../../config.js'
const model = new Model()
Page({
    data: {
        tabs: ['排序', '类型', '区域'],
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
        orderModel: false,
        regionModel: false,
        cateModel: false,
        categoryModel: false,
        showModalStatus: false,
        allLoad: true,
        loadMore:false
    },
    onLoad: function () {

      //this._loadData()
    },
    onShow:function(){
      this._loadData()
    },
    _loadData: function () {
        let user = wx.getStorageSync('user')
        let token = wx.getStorageSync('token')
        user.token = token
        user.size = this.data.size
        user.page = this.data.page
        let that = this
        model.getOrganis(user, (data) => {
            if (data.length > 0) {
                let region = wx.getStorageSync('region')
                let category = wx.getStorageSync('category')
                let organisList = this.filterData(data)
                that.setData({
                    organisArr: organisList,
                    loading: true,
                    regions: region,
                    cate: category
                })
            } else {

            }

        })

        // this.setData({
        //     regions: region,
        //     cate: category
        // })
        // let region = 'voregion'
        // let cate ='volunteertype'
        // model.getValues(user,region,(data)=>{
        //     this.setData({
        //         regions:data
        //     })
        // })

        // model.getValues(user,cate,(data)=>{
        //     that.setData({
        //         cate:data,
        //         loading:true,
        //     })
        // })
    },
    filterData: function (list) {
        let region = wx.getStorageSync('region')
        let category = wx.getStorageSync('category')
        let newList = []
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
    onReachBottom: function () {
        console.log('下拉')
        let page = this.data.page + 1
        wx.showLoading({
            title: '正在加载...'
        })
        setTimeout(() => {
            wx.hideLoading()
            this._loadMoreData(page)
        }, 100)
    },
    _loadMoreData: function (page) {
        let user = wx.getStorageSync('user')
        let token = wx.getStorageSync('token')
        let region = wx.getStorageSync('region')
        let category = wx.getStorageSync('category')
        user.token = token
        user.size = this.data.size
        user.page = page
        let that = this
        user.orderbyProperty = this.data.orderbyProperty
        user.categoryCode = this.data.categoryCode
        user.regionCode = this.data.regionCode

        model.getOrganis(user, (data) => {
            if (data.length > 0) {
                let organisArr = that.data.organisArr
                data.forEach(item => {
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
                    organisArr.push(item)
                })
                this.setData({
                    organisArr: organisArr,
                    page: page,
                    allLoad: true
                })
            } else {
                console.log('没有数据')
                this.setData({
                    activitiesArr: [],
                    allLoad: false,
                    loadMore: false
                })
            }

        })
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

        switch (code) {
            case '0':
                console.log('0')
                const orderList = this.data.commodity_attr_boxs
                orderList.forEach((item) => {
                    item.status = false
                })
                orderList[index].status = true
                const orderbyProperty = this.data.commodity_attr_boxs[index].orderby
                this.setData({
                    size: 10,
                    page: 1,
                    orderbyProperty: orderbyProperty,
                    commodity_attr_boxs: orderList
                })
                break;
            case '1':
                console.log('1')
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
                console.log('2')
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
        user.categoryCode = this.data.categoryCode
        user.regionCode = this.data.regionCode
        user.orderbyProperty = this.data.orderbyProperty
        model.getOrganis(user, (data) => {
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
    onAddOrganiTap: function (event) {
        let gid = model.getDataSet(event, 'id')
        let name = model.getDataSet(event, 'name')
        let index = model.getDataSet(event, 'index')
        let user = wx.getStorageSync('user')
        let token = wx.getStorageSync('token')
        user.token = token
        user.gid = gid
        user.name = name
        console.log(gid)
        console.log(name)
        model.joinInOrgani({
            gid,
            name,
            token,
            user
        }, (data) => {
            console.log(data)
            if (data.result) {
                let organisArr = this.data.organisArr
                // organisArr[index].handelstatus = '1'
                this.setData({
                    organisArr: organisArr
                })
                //改变状态
                wx.showToast({
                    title: '加入成功',
                    icon: 'none',
                    duration: 2000
                })
                this.onShow();
            }
        })
    },
    onShareAppMessage: function () {
        return {
            title: '城志协',
            path: 'pages/home/home'
        }
    },
    onActivityItemTap: function (event) {
        let id = model.getDataSet(event, 'id')
        console.log(id);
        wx.navigateTo({
            url: '../organi_details/organi_details?gid=' + id,
        })
    }
})