import Http from '../utils/http'

export default class ApiVolunteertime extends Http {
    constructor() {
        super()
    }

    /**
     * 志愿时长详情
     * @param {*} data 
     * @param {*} callback 
     */
    getdetailshours(data, callback) {
        let baseparams = {
            inner_membergid: data.userId,
            inner_membername: data.nickName,
            token: data.token
        }
        let that = this
        let params = {
            url: 'api/querydata/getdetailshours?' + this.toQueryString(baseparams),
            method: 'POST',
            success: function (res) {
                console.log(res)
                callback && callback(res)
            }
        }
        this.request(params)
    }
}