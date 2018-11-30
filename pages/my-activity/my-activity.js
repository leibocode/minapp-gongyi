import activityModel from '../../models/my-activity'
const model =new activityModel()

Page({
    data:{
        tabs:['我报名的活动','我创建的活动','我管理的活动'],
        currentTabsIndex:0,
        activitiesArr:[{
            src:'../../images/activity-details-pic.jpg',
            imgs:['../../images/photo-pic.jpg','../../images/photo-pic.jpg','../../images/photo-pic.jpg']
        }],
        apis:[]
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