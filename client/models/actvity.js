import Http from '../utils/http'

export default class myActivity extends Http {
    constructor(){
        super();
    }
    
    getActvities(data,callback){
        let that = this
        let params ={
            url:`/weixin/data/selecthuodong?inner_membergid=${data.userId}&inner_membername=
            ${data.nickName}&token=${data.token}`,
            method:'POST',
            success:function(res){
                console.log(res)
                callback && callback(res)
            }
        }
        this.request(params)
    }

    getActvitiyDateil(data,callback){
        let that = this
        let params ={
            url:`/api/querydata/getactivitydetail?inner_membergid=${data.userId}&inner_membername=
            ${data.nickName}&token=${data.token}&keyid=${data.gid}`,
            method:'POST',
            success:function(res){
                console.log(res)
                callback && callback(res)
            }
        }
        //
        this.request(params)
    }
}