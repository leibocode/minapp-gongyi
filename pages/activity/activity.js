import Model from '../../models/actvity.js'

const model = new Model()

Page({
    data:{
        tabs:['全部','类型','区域'],
        currentTabsIndex:0,
        activitiesArr:[],
        loading:false
    },
    onLoad:function(){
        this._loadData()
    },
    _loadData:function(){
        let user = wx.getStorageSync('user')
        let token =wx.getStorageSync('token')
        user.token =token
        let that = this
        model.getActvities(user,(data)=>{
            console.log(data)
        })
    }, 
    onPullDownRefresh:function(){

    },
    onDz:function(){
        
    },


    onShareAppMessage:function(){
        return {
            title:'城志协',
            path:'pages/activity/activity'
        }
    }
})