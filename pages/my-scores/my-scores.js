import User from '../../models/user'
import ApiScores from '../../models/scores'
const userapi = new User()
const apiScores = new ApiScores()
Page({
    data: {
        myscore: 0,
        myscoreList: []
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
        apiScores.myintegral(user, (data) => {
            that.setData({
                myscore: data.totalscore
            })
        })
        apiScores.thesubsidiary(user, (data) => {
            that.setData({
                myscoreList: data
            })
        })
    }
})