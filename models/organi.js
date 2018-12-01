import Http from '../utils/http'

export default class myActivity extends Http {
    constructor(){
        super();
    }
    /**
     * 获取所有的组织
     * @param {} data 
     * @param {*} callback 
     */
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
    /**
     * 获取 key-value 
     * @param {} data 
     * @param {*} key 
     * @param {*} callback 
     */
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

    /**
     * 获取我的组织
     * @param {} data 
     * @param {*} callback 
     */
    getMyOrganis(data,callback){
        let params ={
            url:`weixin/data/selectszorganization?inner_membergid=${data.userId}&inner_membername=
            ${data.nickName}&token=${data.token}&orderbyid=''&cbkind=''&cbtype=' '&cbregion=' '`,
            method:'POST',
            success:function(res){
                console.log(res)
                callback && callback(res)
            }
        }
        this.request(params)
    }
}