import Http from '../utils/http'

export default class apiVountary extends Http {
    constructor() {
        super()
    }

    registered(data, reginfo, callback) {
        let baseparams = {
            inner_membergid: data.userId,
            inner_membername: data.nickName,
            token: data.token
        }
        let that = this
        let option = {
            url: '/szsetting/SZData/regaccountsubmit?' +
                this.toQueryString(baseparams) +
                this.toQueryString(reginfo),
            method: 'POST',
            success: function (res) {
                console.log(res)
                callback && callback(res)
            }
        }
        this.request(option)
    }
}