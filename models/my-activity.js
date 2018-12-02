import Http from '../utils/http'

export default class myActivity extends Http {
    constructor(){
        super();
    }

    getMyActivities(data,callback){
        let that = this
        let params ={
            url:`szsetting/szweixin/getmyactivities?&inner_membername=
            ${this._encodeParams(data.nickName)}&token=${data.token}&orderbyid=''&cbkind=''&cbtype=' '&cbregion=' '&inner_membergid=${data.userId}`,
            method:'POST',
            success:function(res){
                console.log(res)
                callback && callback(res)
            }
        }
        this.request(params)
    }
}