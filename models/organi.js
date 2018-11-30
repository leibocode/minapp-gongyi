import Http from '../utils/http'

export default class myActivity extends Http {
    constructor(){
        super();
    }

    getOrganis(data,callback){
        let that = this
        let params ={
            url:`weixin/data/selectszorganization?inner_membergid=${data.userId}&inner_membername=
            ${data.nickName}&token=${data.token}`,
            method:'POST',
            success:function(res){
                console.log(res)
                callback && callback(res)
            }
        }
        this.request(params)
    }

    getValues(data,key,callback){
        let that = this
        
        let params ={
            url:`ctypb/test/getdict?inner_membergid=${data.userId}&inner_membername=
            ${data.nickName}&token=${data.token}&dictionarykey=${key}`,
            method:'POST',
            success:function(res){
                console.log(res)
                callback && callback(res)
            }
        }
        this.request(params)
    }
}