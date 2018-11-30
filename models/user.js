import Http from '../utils/http'

export default class myActivity extends Http {
    constructor(){
        super();
    }

    getUserInfo(data,callback){
        let that = this
        let params ={
            url:`api/querydata/getmydataaccess?inner_membergid=${data.userId}&inner_membername=
            ${data.nickName}&token=${data.token}`,
            method:'POST',
            success:function(res){
                console.log(res)
                callback && callback(res)
            }
        }
        this.request(params)
    }
}