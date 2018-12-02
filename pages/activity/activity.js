import Model from '../../models/actvity.js'

const model = new Model()

Page({
    data: {
        tabs: ['排序', '类型', '区域'],
        currentTabsIndex: -1,
        activitiesArr: [],
        loading: false,
        page: 1,
        size: 10,
        commodity_attr_boxs: [{
            text: '时间',
            status: true,
            orderby: 'all'
        }, {
            text: '类型',
            status: false,
            orderby: 'asc'
        }, {
            text: '区域',
            status: false,
            orderby: 'desc'
        }],
        orderModel: false,
        regionModel: false,
        cateModel: false,
        categoryModel: false,
        showModalStatus: false
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
            console.log(data)
            this.setData({
                activitiesArr: data,
                loading: true
            })
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
        let sCode = model.getDataSet(event, 'sCode')
        console.log(sCode)
        switch (code) {
            case '0':
                console.log('0')

                break;
            case '1':
                console.log('1')
                let cateList = wx.getStorageSync('category')
                cateList[0].status = false
                cateList[index].status = true
                console.log(cateList)
                this.setData({
                    categoryCode: sCode,
                    cate: cateList,
                    size: 10,
                    page: 1
                })
                break;
            case '2':
                console.log('2')
                let regionList = wx.getStorageSync('region')
                regionList[0].status = false
                regionList[index].status = true
                console.log(cateList)
                this.setData({
                    regionCode: sCode,
                    regions: regionList,
                    size: 10,
                    page: 1
                })
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

        model.getOrganis(user, (data) => {

        })
    },
    onShareAppMessage: function () {
        return {
            title: '城志协',
            path: 'pages/activity/activity'
        }
    },
    onActivityItemTap: function () {
        let id = event.target.dataset.id
        wx.navigateTo({
            url: '../organi_details/organi_details',
            data: {
                id: id
            }
        })
    }
})