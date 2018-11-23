import Http from '../utils/http.js'

export default class HomeModel extends Http{
    constructor(){
        super();
    }
    getBannerData(callback){
        let that = this
        let params ={
            url:'/weixin/data/selecttiaomu',
            method:'POST',
            success:function(data){
                callback && callback(data)
            }
        }
        this.request(params)
    }
    getActivities(){
        let that = this
        let params ={
            url:'/weixin/data/selectremenhuodong',
            method:'POST',
            success:function(data){
                callback && callback(data)
            }
        }
        this.request(params)
    }
}