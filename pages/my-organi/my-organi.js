import organiModel from '../../models/organi.js'
const model =new organiModel()
Page({
    data:{
        tabs:['排序','方式','类型','区域'],
        currentTabsIndex:0,
        organisArr:[{
            
        }]
    },
    onLoad:function(){
        this._loadData()
    },
    _loadData:function(){
        let user = wx.getStorageSync('user')
        let token =wx.getStorageSync('token')
        user.token =token
        let that = this
        model.getMyOrganis(user,(data)=>{
            this.setData({
                organisArr:data
            })
        })
    }, 
    onTabsItemTap(event){
        let index =model.getDataSet(event,'index')
        this.setData({
            currentTabsIndex:index
        })
        //
    },
    onPullDownRefresh:function(){

    },
    onShareAppMessage:function(){
        return {
            title:'城志协',
            path:'pages/home/home'
        }
    }
})