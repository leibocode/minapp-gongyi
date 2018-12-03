import Http from '../utils/http'

export default class ApiOrgniDel extends Http {

    /**
     * 热门志愿队详情
     * @param {*} data 
     * @param {*} callback 
     */
    getorganizationdetails(data, gid, callback) {
        let baseparams = {
            inner_membergid: data.userId,
            inner_membername: data.nickName,
            token: data.token,
            keyid: gid
        }
        let that = this
        let params = {
            url: 'api/querydata/getorganizationdetails?' + this.toQueryString(baseparams),
            method: 'POST',
            success: function (res) {
                console.log(res)
                callback && callback(res)
            }
        }
        this.request(params)
    }
}