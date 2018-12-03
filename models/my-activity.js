import Http from '../utils/http'

export default class myActivity extends Http {
    constructor(){
        super();
    }

    getMyActivities(data,callback){
        const url = `szsetting/szweixin/getmyactivities?inner_membername=${this._encodeParams(data.nickName)}&token=${data.token}&inner_membergid=${data.userId}&pagesize=${data.size}&curpage=${data.page}`
        let orderBy = data.orderbyProperty?`&orderBy=${data.orderbyProperty}`:`&orderBy='builddate'`
        let cbkind = data.categoryCode ? `&cbkind=${data.categoryCode}` : '&cbkind='
        let cbregion = data.regionCode ? `&cbregion=${data.regionCode}` : '&cbregion='
        
        let newUrl = url +orderBy +cbkind +cbregion
        console.log(newUrl) 
        let params ={
            url:newUrl,
            method:'POST',
            success:function(res){
                console.log(res)
                callback && callback(res)
            }
        }
        this.request(params)
    }
}