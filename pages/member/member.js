import ApiOrgniDel from '../../models/organi_delails'
const apiOrgniDel = new ApiOrgniDel()

Page({
    data: {
        gid: '',
        gxid: '',
        kid: '',
        status: 0,
        isadmin: 0,
        qcount: 0,
        hdcount: 0,
        info: {}
    },
    onLoad(options) {
        console.log(options)
        this.setData({
            gid: options.gid,
            kid: options.kid,
            gxid: options.gxid
        })
        this._onload(this.data.gid)
    },
    _onload(gid) {
        let user = wx.getStorageSync('user')
        let token = wx.getStorageSync('token')
        user.token = token
        apiOrgniDel.getmemberenquiries(user, gid, (data) => {
            this.setData({
                info: data
            })
        })
        // apiOrgniDel.getissignin(user, gid, (data) => {
        //     this.setData({
        //         isstate: data.isstate
        //     })
        // })
        apiOrgniDel.getisbutton(user, user.userId, (data) => {
            this.setData({
                isadmin: data.msg
                //isadmin: 1
            })
        })
        apiOrgniDel.getauditstatus(user, this.data.gxid, (data) => {
            this.setData({
                status: data.status
            })
        })
        apiOrgniDel.getQCount(user, gid, (data) => {
            this.setData({
                qcount: data.QCount
            })
        })
        apiOrgniDel.getHDCount(user, gid, (data) => {
            this.setData({
                hdcount: data.HDCount
            })
        })
    },
    isnot: function () {
        let user = wx.getStorageSync('user')
        let token = wx.getStorageSync('token')
        user.token = token
        apiOrgniDel.handelszorganizationrelation(user, this.data.gid, this.data.kid, '5', (data) => {
            if (data.result) {
                this.setData({
                    status: 5
                })
                wx.showModal({
                    title: '提示',
                    content: '此成员审核为：不通过'
                })
            }
        })
    },
    isyse: function () {
        let user = wx.getStorageSync('user')
        let token = wx.getStorageSync('token')
        user.token = token
        apiOrgniDel.handelszorganizationrelation(user, this.data.gid, this.data.kid, '4', (data) => {
            if (data.result) {
                this.setData({
                    status: 4
                })
                wx.showModal({
                    title: '提示',
                    content: '此成员审核为：通过'
                })
            }
        })
    }
})