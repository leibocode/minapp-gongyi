import Http from '../utils/http'

export default class HomeModel extends Http{
    constructor(){
        super();
    }
    getBannerData(callback){
        let that = this
        let params ={
            url:'/api/v1/banner',
            success:function(data){
                callback && callback(data)
            }
        }
        this.request(params)
    }
}