import Http from '../utils/http'

export default class myActivity extends Http {
    constructor() {
        super();
    }
    /**
     * 获取所有的组织
     * @param {} data 
     * @param {*} callback 
     */
    getOrganis(data, callback) {
        console.log(data)
        const url = `weixin/data/selectszorganization?inner_membergid=${data.userId}&inner_membername=
        ${this._encodeParams(data.nickName)}&token=${data.token}&pagesize=${data.size}&curpage=${data.page}`
        let orderBy = data.orderbyProperty ? `&orderBy=${data.orderbyProperty}` : '&orderBy='
        let cbkind = data.categoryCode ? `&cbkind=${data.categoryCode}` : '&cbkind='
        let cbregion = data.regionCode ? `&cbregion=${data.regionCode}` : '&cbregion='

        let newUrl = url + orderBy + cbkind + cbregion

        // if(data.orderBy){
        //     url += 
        // }else {
        //     url += '&orderBy='
        // }
        // if(data.cbkind){
        //     url +=
        // }else {
        //     url += '&cbkind='
        // }
        // if()
        let that = this
        let params = {
            url: newUrl,
            method: 'POST',
            success: function (res) {
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
    getValues(data, key, callback) {
        let that = this

        let params = {
            url: `ctypb/test/getdict?inner_membergid=${data.userId}&inner_membername=
            ${this._encodeParams(data.nickName)}&token=${data.token}&dictionarykey=${key}`,
            method: 'POST',
            success: function (res) {
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
    getMyOrganis(data, callback) {
        console.log(data)
        const url = `weixin/data/selectszorganization?inner_membergid=${data.userId}&inner_membername=
        ${this._encodeParams(data.nickName)}&token=${data.token}&pagesize=${data.size}&curpage=${data.page}`
        let orderBy = data.orderbyProperty ? `&orderBy=${data.orderbyProperty}` : '&orderBy='
        //方式
        let cbkind = data.cbkind ? `&cbkind=${data.cbkind}` : '&cbkind='
        let cbregion = data.regionCode ? `&cbregion=${data.regionCode}` : '&cbregion='
        //类型
        let cbtype =  data.categoryCode ? `&cbkind=${data.categoryCode}` : '&cbkind='
        let newUrl = url + orderBy + cbkind + cbregion
        let params = {
            url: newUrl,
            method: 'POST',
            success: function (res) {
                console.log(res)
                callback && callback(res)
            }
        }
        this.request(params)
    }

    /**
     * 加入组织
     * @param {} data 
     * @param {*} callback 
     */
    joinInOrgani(data, callback) {
        console.log()
        let param = {
            url: `weixin/data/inszorganizationrelation?inner_membergid=${data.user.userId}&inner_membername=
            ${this._encodeParams(data.user.nickName)}&token=${data.token}&organizationid=${data.gid}&organizationname=${data.name}`,
            method: 'POST',
            success: function (res) {
                console.log(res)
                callback && callback(res)
            }
        }

        this.request(param)
    }
}