import Http from '../utils/http'

export default class myActivity extends Http {
    constructor() {
        super();
    }

    getActvities (data, callback) {

        const url = `weixin/data/selecthuodong?inner_membergid=${data.userId}&inner_membername=
        ${this._encodeParams(data.nickName)}&token=${data.token}&pagesize=${data.size}&curpage=${data.page}`
        console.log(data)
        let orderBy = data.orderbyProperty ? `&orderBy=${data.orderbyProperty}` : `&orderBy='builddate'`
        let cbkind = data.categoryCode ? `&cbkind=${data.categoryCode}` : '&cbkind='
        let cbregion = data.regionCode ? `&cbregion=${data.regionCode}` : '&cbregion='
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
     * 获取活动详情
     * @param {*} data
     * @param {*} callback
     */
    getActvitiyDateil (data, callback) {
        let that = this
        let params = {
            url: `/api/querydata/getactivitydetail?inner_membergid=${data.userId}&inner_membername=
            ${this._encodeParams(data.nickName)}&token=${data.token}&keyid=${data.gid}`,
            method: 'POST',
            success: function (res) {
                console.log(res)
                callback && callback(res)
            }
        }
        //
        this.request(params)
    }

    /**
     * 获取列表信息
     * @param {} data
     * @param {*} callback
     */
    getUserjoin (data, callback) {
        let that = this
        let params = {
            url: `api/querydata/getorganizers?inner_membergid=${data.userId}&inner_membername=
            ${this._encodeParams(data.nickName)}&token=${data.token}&keyid=${data.gid}`,
            method: 'POST',
            success: function (res) {
                console.log(res)
                callback && callback(res)
            }
        }

        this.request(params)
    }

    /**
     *
     * @param {} data
     * @param {*} callback
     */
    getActvitiyButtonState (data, callback) {
        let that = this
        let params = {
            url: `api/querydata/getissignin?inner_membergid=${data.userId}&inner_membername=
            ${this._encodeParams(data.nickName)}&token=${data.token}&keyid=${data.gid}`,
            method: 'POST',
            success: function (res) {
                console.log(res)
                callback && callback(res)
            }
        }
        this.request(params)
    }

    /**
     * 获取活动状态
     * @param {} data
     * @param {*} callback
     */
    getDzStatus (data, callback) {
        let that = this
        let params = {
            url: `szsetting/szweixin/getdeterminewhether?inner_membergid=${data.userId}&inner_membername=
            ${this._encodeParams(data.nickName)}&token=${data.token}&activityid=${data.gid}`,
            method: 'POST',
            success: function (res) {
                console.log(res)
                callback && callback(res)
            }
        }
        this.request(params)
    }

    /**
     *  点赞
     * @param {}} data
     * @param {*} callback
     */
    createDzStatus (data, callback) {
        let that = this
        let params = {
            url: `szsetting/szweixin/getgivealike?inner_membergid=${data.userId}&inner_membername=
            ${this._encodeParams(data.nickName)}&token=${data.token}&activityid=${data.gid}&activityname=${data.title}`,
            method: 'POST',
            success: function (res) {
                console.log(res)
                callback && callback(res)
            }
        }
        this.request(params)
    }

    getDetailsState (data, callback) {
        let that = this
        let params = {
            url: `szsetting/SZData/thesubsidiary?inner_membergid=${data.userId}&inner_membername=
            ${this._encodeParams(data.nickName)}&token=${data.token}&keyid=${data.gid}`,
            method: 'POST',
            success: function (res) {
                callback && callback(res)
            }
        }
        this.request(params)
    }

    /**
     * 加入活动
     * @param {} data
     * @param {*} callback
     */
    joinAct(data, callback) { ///weixin/data/inszactivitystaff
        let params = {
            url: `weixin/data/inszactivitystaff?inner_membergid=${data.userId}&inner_membername=
            ${this._encodeParams(data.nickName)}&token=${data.token}&activityid=${data.gid}`,
            method: 'POST',
            success: function (res) {
                callback && callback(res)
            }
        }
        this.request(params)
    }

    /**
     * 取消活动
     * @param {*} data
     * @param {*} callback
     */
    cancelAct(data,callback){
         let params = {
             url: `weixin/data/qxinszactivitystaff?inner_membergid=${data.userId}&inner_membername=
            ${this._encodeParams(data.nickName)}&token=${data.token}&activityid=${data.gid}`,
             method: 'POST',
             success: function (res) {
                 callback && callback(res)
             }
         }
         this.request(params)
    }

    getComments(data,callback){
        let params = {
             url: `weixin/data/selectszacomment?inner_membergid=${data.userId}&inner_membername=
            ${this._encodeParams(data.nickName)}&token=${data.token}&kindid=${data.gid}`,
             method: 'POST',
             success: function (res) {
                 callback && callback(res)
             }
        }
        this.request(params)
    }

    createComment(data,callback){
        let params = {
            url: `weixin/data/qxinszactivitystaff?inner_membergid=${data.userId}&inner_membername=
        ${this._encodeParams(data.nickName)}&token=${data.token}&activityid=${data.gid}`,
            method: 'POST',
            success: function (res) {
                callback && callback(res)
            }
        }
        this.request(params)
    }
}