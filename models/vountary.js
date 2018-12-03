import Http from '../utils/http'

export default class apiVountary extends Http {
    constructor() {
        super()
    }

    /**
     * 获取所属志愿队
     * @param {*} data 
     * @param {*} callback 
     */
    getDefaultvolunteerList(data, callback) {
        let baseparams = {
            inner_membergid: data.userId,
            inner_membername: data.nickName,
            token: data.token
        }
        let that = this
        let params = {
            url: 'szsetting/SZData/getselectVolunteername?' + this.toQueryString(baseparams),
            method: 'POST',
            success: function (res) {
                console.log(res)
                callback && callback(res)
            }
        }
        this.request(params)
    }

    /**
     * 获取枚举分类 key-value 
     * @param {*} data 
     * @param {*} key 
     * @param {*} callback 
     */
    getValues(data, key, callback) {
        let baseparams = {
            inner_membergid: data.userId,
            inner_membername: data.nickName,
            token: data.token
        }
        let that = this
        let params = {
            url: 'ctypb/test/getdict?' + this.toQueryString(baseparams) + '&dictionarykey=' + key,
            method: 'POST',
            success: function (res) {
                console.log(res)
                callback && callback(res)
            }
        }
        this.request(params)
    }

    /**
     * 获取验证码
     * @param {*} data 
     * @param {*} mobile 
     * @param {*} callback 
     */
    getsendcode(data, mobile, callback) {
        let baseparams = {
            inner_membergid: data.userId,
            inner_membername: data.nickName,
            token: data.token
        }
        let that = this
        let params = {
            url: 'szsetting/SZData/sendcode?' + this.toQueryString(baseparams) + '&mobile=' + mobile,
            method: 'POST',
            success: function (res) {
                console.log(res)
                callback && callback(res)
            }
        }
        this.request(params)
    }

    /**
     * 用户注册（成为志愿者）
     * @param {*} data 
     * @param {*} reginfo 
     * @param {*} callback 
     */
    registered(data, reginfo, callback) {
        let baseparams = {
            inner_membergid: data.userId,
            inner_membername: data.nickName,
            token: data.token
        }
        let that = this
        let option = {
            url: '/szsetting/SZData/regaccountsubmit?' +
                this.toQueryString(baseparams) + '&' +
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