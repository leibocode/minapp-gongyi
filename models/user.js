import Http from '../utils/http'

export default class myActivity extends Http {
    constructor() {
        super();
    }

    getUserInfo(data, callback) {
        let baseparams = {
            inner_membergid: data.userId,
            inner_membername: data.nickName,
            token: data.token
        }
        let that = this
        let option = {
            url: 'api/querydata/getmydataaccess?' + this.toQueryString(baseparams),
            method: 'POST',
            success: function (res) {
                console.log(res)
                callback && callback(res)
            }
        }
        this.request(option)
    }
}