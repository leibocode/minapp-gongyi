import Http from '../utils/http.js'

export default class HomeModel extends Http{
    constructor(){
        super();
    }
    getBannerData(data,callback){
        let that = this
        let params ={
            url:`/weixin/data/selecttiaomu?inner_membergid=${data.userId}&inner_membername=${data.nickName}&token=${token}`,
            method:'POST',
            success:function(data){
                console.log(data)
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