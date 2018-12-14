import Http from '../utils/http.js'

export default class HomeModel extends Http{
    constructor(){
        super();
    }
    //获取banner轮播图
    getBannerData(data,callback){
        let that = this
        let params ={
            url:`/weixin/data/selecttiaomu?inner_membergid=${data.userId}&inner_membername=
            ${this._encodeParams(data.nickName)}&token=${data.token}`,
            method:'POST',
            success:function(res){

                callback && callback(res)
            }
        }
        this.request(params)
    }
    //获取首页热门活动
    getHotActivities(data,callback){
        let that = this
        let params ={
            url:`/weixin/data/selectremenhuodong?inner_membergid=${data.userId}&inner_membername=
            ${this._encodeParams(data.nickName)}&token=${data.token}`,
            method:'POST',
            success:function(res){
                console.log(res)
                callback && callback(res)
            }
        }
        this.request(params)
    }

    //获取活动回顾
    getHotActivitiesByReview(data,callback){
        let that =this
        let params ={
            url:`/weixin/data/selecthuiguhuodong?inner_membergid=${data.userId}&inner_membername=
            ${this._encodeParams(data.nickName)}&token=${data.token}`,
            method:'POST',
            success:function(res){
                console.log(res)
                callback && callback(res)
            }
        }

        this.request(params)
    }

    //获取活动预告
    getNoticeList(data,callback){
        let that = this
        let params ={
            url:`/weixin/data/selectyugaohuodong?inner_membergid=${data.userId}&inner_membername=
            ${this._encodeParams(data.nickName)}&token=${data.token}`,
            method:'POST',
            success:function(res){
                console.log(res)
                callback && callback(res)
            }
        }
        this.request(params)
    }

    //获取热门志愿队
    getLuvuList(data,callback){
        let that = this
        let params ={
            url:`/szsetting/szweixin/indexsszorganization?inner_membergid=${data.userId}&inner_membername=
            ${this._encodeParams(data.nickName)}&token=${data.token}`,
            method:'POST',
            success:function(res){
                console.log(res)
                callback && callback(res)
            }
        }
        this.request(params)
    }
    /**
     * 请求图片文件
     * @param {} data
     * @param {*} callback
     */
    getFileByKey(data,callback){
        console.log(data)
        let params = {
            url: `file/Filedata/ReadLocalFile?filekey=${data.img_key}`,
            method: 'GET',
            success: function (res) {
                console.log(res)
                callback && callback(res)
            }
        }
        this.request(params)
    }
   getCopyrightInfo(data,callback){
     let that = this
     let params = {
       url: `api/querydata/getcmscontentbar?inner_membergid=${data.userId}&inner_membername=
            ${this._encodeParams(data.nickName)}&token=${data.token}`,
       method: 'POST',
       success: function (res) {
         console.log(res)
         callback && callback(res)
       }
     }
     this.request(params)
   } 
}