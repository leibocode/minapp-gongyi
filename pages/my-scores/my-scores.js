import User from '../../models/user'
import ApiScores from '../../models/scores'
import HomeModel from '../../models/home.js'
const userapi = new User()
const apiScores = new ApiScores()
const homeModel = new HomeModel()
Page({
    data: {
        myscore: 0,
        myscoreList: [{
            title: '示例',
            builddate: '2018-12-12',
            integral: '+6'
        }]
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
            if (data.length != 0) {
                that.setData({
                    myscoreList: data
                })
            }
        })
        
        homeModel.getCopyrightInfo(user, (data) => {
          this.setData({
            brief: data.Brief
          })
        })
    }
})