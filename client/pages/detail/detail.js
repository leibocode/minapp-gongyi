

Page({
    data:{
        activity:{
            img:'../../images/activity-details-pic.jpg',
            start_time:'2018-09-30 09:31',
            end_time:'2018-09-30 09:31',
            list:[{
                url:'../../images/photo-pic.jpg',
                name:'张晓',
                add_date:'2018-09-30 09:31'
            },
            {
                url:'../../images/photo-pic.jpg',
                name:'张晓',
                add_date:'2018-09-30 09:31'
            },
            {
                url:'../../images/photo-pic.jpg',
                name:'张晓',
                add_date:'2018-09-30 09:31'
            },
            {
                url:'../../images/photo-pic.jpg',
                name:'张晓',
                add_date:'2018-09-30 09:31'
            }],
            desc:'2017年冬天，连续的寒潮袭击我国大部分地区，在河南登封市唐庄镇第七小学希望工程图书室里，总能看到学生杨子慧的身影，寒冷和下雪限制了大家的户外活动，但读书成了杨子慧和小伙伴们更好的选择。虽然几个月才能与爸爸妈妈团聚一次，有书和同学的陪伴，身为留守儿童的杨子慧并不觉得孤单。除了图书室，第七小学还获得了由希望工程“温暖冬天”项目资助的体育教室、希望厨房、希望电脑室、热水器、空调等物资捐赠，孩子们得到了过冬衣服、保温杯、棉被等过冬衣物，同时提供的还有可以为老师和同学们提供热乎饭菜的厨房设备，这个冬天，孩子读书不再寒冷'
        }
    },
    onLoad:function(options){
        const id = options.id
        
    },
    //加载数据
    _loadData:function(id){

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
    onShareAppMessage:function(){
        return {
            title:'城志协',
            path:'pages/home/home'
        }
    }
})