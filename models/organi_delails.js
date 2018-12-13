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

    /**
     * 是否加入活动
     * @param {*} data 
     * @param {*} callback 
     */
    getissignin(data, gid, callback) {
        let baseparams = {
            inner_membergid: data.userId,
            inner_membername: data.nickName,
            token: data.token,
            keyid: gid
        }
        let that = this
        let params = {
            url: 'api/querydata/getissignin?' + this.toQueryString(baseparams),
            method: 'POST',
            success: function (res) {
                console.log(res)
                callback && callback(res)
            }
        }
        this.request(params)
    }


    /**
     * 组织详情页-组织成员
     * @param {*} data 
     * @param {*} callback 
     */
    getissignin(data, gid, callback) {
        let baseparams = {
            inner_membergid: data.userId,
            inner_membername: data.nickName,
            token: data.token,
            keyid: gid
        }
        let that = this
        let params = {
            url: 'api/querydata/getconstructor?' + this.toQueryString(baseparams),
            method: 'POST',
            success: function (res) {
                console.log(res)
                callback && callback(res)
            }
        }
        this.request(params)
    }

    /**
     * 组织详情页-组织成员详情
     * @param {*} data 
     * @param {*} callback 
     */
    getmemberenquiries(data, membergid, callback) {
        let baseparams = {
            inner_membergid: data.userId,
            inner_membername: data.nickName,
            token: data.token,
            membergid: membergid
        }
        let that = this
        let params = {
            url: 'api/querydata/getmemberenquiries?' + this.toQueryString(baseparams),
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
    joinInOrgani(data, gid, name, callback) {
        console.log(data)
        let baseparams = {
            inner_membergid: data.userId,
            inner_membername: data.nickName,
            token: data.token,
            organizationid: gid,
            organizationname: name
        }
        let param = {
            url: `weixin/data/inszorganizationrelation?` + this.toQueryString(baseparams),
            method: 'POST',
            success: function (res) {
                console.log(res)
                callback && callback(res)
            }
        }

        this.request(param)
    }

    /**
     * 退出组织
     * @param {} data 
     * @param {*} callback 
     */
    exitthegroup(data, callback) {
        console.log(data)
        let baseparams = {
            inner_membergid: data.userId,
            inner_membername: data.nickName,
            token: data.token,
            organizationid: gid,
            organizationname: name
        }
        let param = {
            url: `api/querydata/getexitthegroup?` + this.toQueryString(baseparams),
            method: 'POST',
            success: function (res) {
                console.log(res)
                callback && callback(res)
            }
        }

        this.request(param)
    }

    /**
     * 志愿队会员列表身份判断
     * @param {*} data 
     * @param {*} callback 
     */
    getisbutton(data, key, callback) {
        let baseparams = {
            inner_membergid: data.userId,
            inner_membername: data.nickName,
            token: data.token,
            key: key
        }
        let that = this
        let params = {
            url: 'api/querydata/getisbutton?' + this.toQueryString(baseparams),
            method: 'POST',
            success: function (res) {
                console.log(res)
                callback && callback(res)
            }
        }
        this.request(params)
    }

    /**
     * 志愿者组织关系表状态
     * @param {*} data 
     * @param {*} callback 
     */
    getauditstatus(data, key, callback) {
        let baseparams = {
            inner_membergid: data.userId,
            inner_membername: data.nickName,
            token: data.token,
            keyid: key
        }
        console.log(baseparams)
        let that = this
        let params = {
            url: 'api/querydata/getauditstatus?' + this.toQueryString(baseparams),
            method: 'POST',
            success: function (res) {
                console.log(res)
                callback && callback(res)
            }
        }
        this.request(params)
    }

    /**
     * 审核加入组织
     * @param {*} data 
     * @param {*} callback 
     */
    handelszorganizationrelation(data, membergid, kid, mark, callback) {
        let baseparams = {
            inner_membergid: data.userId,
            inner_membername: data.nickName,
            token: data.token,
            membergid: membergid,
            kid: kid,
            mark: mark
        }
        console.log(baseparams)
        let that = this
        let params = {
            url: 'api/querydata/handelszorganizationrelation?' + this.toQueryString(baseparams),
            method: 'POST',
            success: function (res) {
                console.log(res)
                callback && callback(res)
            }
        }
        this.request(params)
    }

    /**
     * 组织成员详情-加入的群组数
     * @param {*} data 
     * @param {*} callback 
     */
    getQCount(data, memberid, callback) {
        let baseparams = {
            inner_membergid: data.userId,
            inner_membername: data.nickName,
            token: data.token,
            memberid: memberid
        }
        console.log(baseparams)
        let that = this
        let params = {
            url: 'api/querydata/getQCount?' + this.toQueryString(baseparams),
            method: 'POST',
            success: function (res) {
                console.log(res)
                callback && callback(res)
            }
        }
        this.request(params)
    }

    /**
     * 组织成员详情-参加过的活动数
     * @param {*} data 
     * @param {*} callback 
     */
    getHDCount(data, memberid, callback) {
        let baseparams = {
            inner_membergid: data.userId,
            inner_membername: data.nickName,
            token: data.token,
            memberid: memberid
        }
        console.log(baseparams)
        let that = this
        let params = {
            url: 'api/querydata/getHDCount?' + this.toQueryString(baseparams),
            method: 'POST',
            success: function (res) {
                console.log(res)
                callback && callback(res)
            }
        }
        this.request(params)
    }
}