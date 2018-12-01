import Http from '../utils/http'

export default class myActivity extends Http {
    constructor() {
        super()
    }

    registered(data, reginfo, callback) {
        data.nickName = this.encodeParams(data.nickName)
        let that = this
        let params = {
            url: `/szsetting/SZData/regaccountsubmit?
            inner_membergid=${data.userId}
            &inner_membername=${data.nickName}
            &token=${data.token}`,
            method: 'POST',
            success: function (res) {
                console.log(res)
                callback && callback(res)
            }
        }
        this.request(params)
    }
}