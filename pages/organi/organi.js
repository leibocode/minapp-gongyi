import Model from '../../models/organi.js'
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
        user.token = token
        user.size = this.data.size
        user.page = this.data.page
        let that = this
        model.getOrganis(user, (data) => {
            if (data.length > 0) {
                let region = wx.getStorageSync('region')
                let category = wx.getStorageSync('category')

                data.forEach((item) => {
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

                })


                that.setData({
                    organisArr: data,
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
                organisArr[index].handelstatus = '1'
                this.setData({
                    organisArr: organisArr
                })
                //改变状态
                wx.showToast({
                    title: '加入成功',
                    icon: 'none',
                    duration: 2000
                })
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
        let id = event.target.dataset.id;
        console.log(id);
        wx.navigateTo({
            url: '../organi_details/organi_details',
            data: {
                id: id
            }
        })
    }
})