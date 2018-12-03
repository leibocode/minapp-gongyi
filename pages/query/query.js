import ApiQuery from '../../models/query'
const apiQuery = new ApiQuery()

Page({
    data: {
        querylist: []
    },
    onLoad: function () {
        let user = wx.getStorageSync('user')
        let token = wx.getStorageSync('token')
        user.token = token
        let that = this
        apiQuery.gethelpcenter(user, (data) => {
            that.setData({
                querylist: data
            })
        })
    }
})