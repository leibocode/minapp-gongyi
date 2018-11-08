import HomeModel from '../../models/home'

const model = new HomeModel() 
Page({
    data:{
        bannerArr:[{
            img:'../../images/h-banner.jpg'
        }],
        menus:[{
            icon_url:'../../images/h-icon1.png',
            name:'成为志愿者'
        },{
            icon_url:'../../images/h-icon1.png',
            name:'成为志愿者'
        },{
            icon_url:'../../images/h-icon1.png',
            name:'成为志愿者'
        },{
            icon_url:'../../images/h-icon1.png',
            name:'成为志愿者'
        },{
            icon_url:'../../images/h-icon1.png',
            name:'成为志愿者'
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