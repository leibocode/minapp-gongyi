Page({
    data:{
        tabs:['我报名的组织','我创建的组织','我管理的组织'],
        currentTabsIndex:0,
        organisArr:[{
            src:'../../images/organi-pic1.jpg',
            imgs:['../../images/photo-pic.jpg','../../images/photo-pic.jpg','../../images/photo-pic.jpg'],
            organisStatus:1
        }]
    },
    onLoad:function(){

    },
    _loadData:function(){

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