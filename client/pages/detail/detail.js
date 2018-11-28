
import Model from '../../models/actvity.js'
const model = new Model()

Page({
    data:{
        activity:{
            img:'../../images/activity-details-pic.jpg',
            activity:null,
            loading:false
        }
    },
    onLoad:function(options){
        const id = options.id
        this._loadData(id)
    },
    //加载数据
    _loadData:function(id){
        let that = this
        let user = wx.getStorageSync('user')
        let token =wx.getStorageSync('token')
        user.token =token
        user.gid = id
        model.getActvitiyDateil(user,(data)=>{
            that.setData({
              loading:true,
              activity:data  
            })
        })
    },
    onrganizeTap:function(){
        wx.showModal({
            title:'提示',
            content:'您确定参与本次活动吗？',
            success:function(res){
                if (res.confirm) {
                    console.log('用户点击确定')
                    //请求接口
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    preview(){
        let imgs =[]
        imgs.push(this.data.activity.img)
        wx.previewImage({
            urls:imgs
        })
    },
    onShare:function(){
        return {
            title:'城志协',
            path:'pages/home/home'
        }
    },
    onShareAppMessage:function(){
      
        return {
            title:'城志协',
            path:'pages/home/home'
        }
    }
})