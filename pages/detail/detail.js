
import Model from '../../models/actvity.js'
import OrganiModel from '../../models/organi.js'
const model = new Model()
const organiModel =new OrganiModel()

Page({
    data:{
        activity:{
            img:'../../images/activity-details-pic.jpg',
            activity:null,
            loading:false, 
            gid:0,
            dz:false,
            userList:[]
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
       
        
        model.getActvitiyButtonState(user,(data)=>{

        })

        
        model.getDzStatus(user,(data)=>{
            let dz = data.msg==='1'?true:false
            that.setData({
                dz:dz
            })
        })

        model.getUserjoin(user,(data)=>{
            that.setData({
                userList:data
            })
        })
        model.getActvitiyDateil(user,(data)=>{
            that._loadValues(user)
            let param =user
           
            that.setData({
                loading:true,
                activity:data,
                id:id
            })
            wx.setNavigationBarTitle({
                title:data.title
            }) 
        })

        //
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
    _loadValues(user){
        let region = 'voregion'
        let cate ='volunteertype'
        let that = this
        let region = wx.getStorageSync('region')
        let category = wx.getStorageSync('category')
        if(region){
            that.setData({
                region:region
            })
        }else {
            organiModel.getValues(user,region,(data)=>{
                that.setData({
                    region:data
                })
            })
        }

        if(cate){
            that.setData({
                category:cate
            })
        }else {
            organiModel.getValues(user,region,(data)=>{
                that.setData({
                    category:data
                })
            }) 
        }
       
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
            path:'pages/detail/detail?id='+ this.data.gid
        }
    },
    onDz:function(){
        let that = this
        let user = wx.getStorageSync('user')
        let token =wx.getStorageSync('token')
        user.token =token
        user.gid = id
        param.title =this.data.title
        model.getDz(param,data=>{
            if(data.result){
                that.setData({
                    dz:data.result
                })
            }
        })
    },
    onShareAppMessage:function(){
      
        return {
            title:'城志协',
            path:'pages/home/home'
        }
    }
})