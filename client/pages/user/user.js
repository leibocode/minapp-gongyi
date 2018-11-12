import HomeModel from '../../models/home'

const model = new HomeModel() 
Page({
    data:{
        userInfo:{
            nickname:'icode',
            avatarUrl:''
        },
        bannerArr:[{
            img:'../../images/h-banner.jpg'
        }],
        menus:[{
            icon_url:'../../images/h-icon1.png',
            title:'个人信息'
        },{
            icon_url:'../../images/h-icon1.png',
            name:'我的组织'
        },{
            icon_url:'../../images/h-icon1.png',
            name:'我的活动'
        },{
            icon_url:'../../images/h-icon1.png',
            name:'队长授权'
        },{
            icon_url:'../../images/h-icon1.png',
            name:'成员待审核'
        }]
    },
    onLoad:function(){

    },
    _loadData:function(){

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