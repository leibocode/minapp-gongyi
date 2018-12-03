import Http from '../utils/http'

export default class ApiQuery extends Http {
    constructor() {
        super()
    }

    /**
     * 获取帮助中心
     * @param {*} data 
     * @param {*} callback 
     */
    gethelpcenter(data, callback) {
        let baseparams = {
            inner_membergid: data.userId,
            inner_membername: data.nickName,
            token: data.token
        }
        let that = this
        let params = {
            url: 'api/querydata/gethelpcenter?' + this.toQueryString(baseparams),
            method: 'POST',
            success: function (res) {
                console.log(res)
                callback && callback(res)
            }
        }
        this.request(params)
    }

}