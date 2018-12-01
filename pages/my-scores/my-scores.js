import User from '../../models/user'
const userapi = new User()
Page({
    data: {
        myscore: 0
    },

    onLoad: function () {
        this._loadData()
    },
    _loadData: function () {
        let user = wx.getStorageSync('user')
        console.log(user)
        let token = wx.getStorageSync('token')
        console.log(token)
        user.token = token
        let that = this
        userapi.getUserInfo(user, (data) => {
            if (data.result) {
                that.setData({
                    myscore: data.score
                })
            } else {

            }
        })
    }
})