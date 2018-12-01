import Model from '../../models/organi.js'
const model =new Model()
Page({
    data: {
        tabs: ['排序', '类型', '区域'],
        currentTabsIndex:-1,
        organisArr:[],
        loading:true,
        commodity_attr_boxs:[{
            text:'时间',
            status:true,
            orderby:'all'
        },{
            text:'类型',
            status:false,
            orderby:'asc'
        },{
            text:'区域',
            status:false,
            orderby:'desc'
        }],
        orderModel:false,
        regionModel:false,
        cateModel:false,
        showModalStatus:false
    },
    onLoad: function () {
        
        this._loadData()
    },
    _loadData: function () {
        let user = wx.getStorageSync('user')
        let token =wx.getStorageSync('token')
        user.token =token
        let that = this
        model.getOrganis(user,(data)=>{
            that.setData({
                organisArr:data
            })
        })
        let region = wx.getStorageSync('region')
        let category = wx.getStorageSync('category')
        this.setData({
            regions:region,
            cate:category
        })
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
    onTabsItemTap:function(event){
      this.setData({
        orderModel:false,
        cateModel:false,
        regionModel:false
      })
      const index = model.getDataSet(event,'index')
      switch(index){
          case 0:
            this.setData({
                currentTabsIndex:index,
                orderModel:true,
                showModalStatus:true
            })
          break;
          case 1:
            this.setData({
                currentTabsIndex:index,
                cateModel:true,
                showModalStatus:true
            })
          break;
          case 2:
            this.setData({
                currentTabsIndex:index,
                regionModel:true,
                showModalStatus:true
            })
          break;
      }
      this.showModalStatus =true 
    },
    onPullDownRefresh: function () {

    },
    hideModal:function(){
        let currentTabsIndex = this.data.currentTabsIndex

        this.setData({
            showModalStatus:false,
            orderModel:false,
            cateModel:false,
            regionModel:false
        })
    },
    toggleState:function(event){
        
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