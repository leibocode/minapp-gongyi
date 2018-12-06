import Http from '../utils/http'

export default class ApiScores extends Http {

    /**
     * 获取我的积分
     * @param {*} data 
     * @param {*} callback 
     */
    myintegral(data, callback) {
        let baseparams = {
            inner_membergid: data.userId,
            inner_membername: data.nickName,
            token: data.token
        }
        let that = this
        let option = {
            url: 'szsetting/SZData/myintegral?' + this.toQueryString(baseparams),
            method: 'POST',
            success: function (res) {
                console.log(res)
                callback && callback(res)
            }
        }
        this.request(option)
    }

    /**
     * 获取我的积分列表
     * @param {*} data 
     * @param {*} callback 
     */
    thesubsidiary(data, callback) {
        let baseparams = {
            inner_membergid: data.userId,
            inner_membername: data.nickName,
            token: data.token
        }
        let that = this
        let option = {
            url: 'szsetting/SZData/thesubsidiary?' + this.toQueryString(baseparams),
            method: 'POST',
            success: function (res) {
                console.log(res)
                callback && callback(res)
            }
        }
        this.request(option)
    }

}