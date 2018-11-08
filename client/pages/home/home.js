import HomeModel from '../../models/home'

const model = new HomeModel() 
Page({
    data:{
        bannerArr:[{
            img:'../../images/h-banner.jpg'
        },{
            img:'../../images/h-banner.jpg'
        }],
        menus:[{
            icon_url:'../../images/h-icon1.png',
            name:'成为志愿者'
        },{
            icon_url:'../../images/h-icon2.png',
            name:'成为志愿者'
        },{
            icon_url:'../../images/h-icon3.png',
            name:'成为志愿者'
        },{
            icon_url:'../../images/h-icon4.png',
            name:'成为志愿者'
        },{
            icon_url:'../../images/h-icon5.png',
            name:'成为志愿者'
        }],
        loading:true,
        activitiesArr:[{
            src:'../../images/activity-details-pic.jpg',
            imgs:['../../images/photo-pic.jpg','../../images/photo-pic.jpg','../../images/photo-pic.jpg']
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