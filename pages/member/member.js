import ApiOrgniDel from '../../models/organi_delails'
const apiOrgniDel = new ApiOrgniDel()

Page({
    data: {
        gid: '',
        kid: '',
        status: 0,
        isadmin: 0,
        info: {}
    },
    onLoad(options) {
        console.log(options)
        this.setData({
            gid: options.gid,
            kid: options.kid
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
                //isadmin: data.msg
                isadmin: 1
            })
        })
        apiOrgniDel.getauditstatus(user, gid, (data) => {
            this.setData({
                status: data.status
            })
        })
    },
    isnot: function () {
        let user = wx.getStorageSync('user')
        let token = wx.getStorageSync('token')
        user.token = token
        apiOrgniDel.handelszorganizationrelation(user, this.data.gid, this.data.kid, '5', (data) => {
            if (data.result) {
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
        apiOrgniDel.handelszorganizationrelation(user, this.data.gid, this.data.kid, '5', (data) => {
            if (data.result) {
                wx.showModal({
                    title: '提示',
                    content: '此成员审核为：通过'
                })
            }
        })
    }
})