import ApiVolunteertime from '../../models/volunteertime'
import Tools from '../../utils/tools'
import HomeModel from '../../models/home.js'
import ApiScores from '../../models/scores'
const apiVolunteertime = new ApiVolunteertime()
const tools = new Tools()
const homeModel = new HomeModel()
Page({
    data: {
        thours: 0,
        tlist: [{
            "gid": "e5cb8c25-6218-4020-bd11-c9ab12fa62d3",
            "memberid": "c7384b3f-39f8-48a7-b65f-a92d327adc9c", //会员id
            "membername": "wangsheng", //会员名称
            "activityid": "4a8387bd-2e3e-d243-8681-58be61a19c96", //活动id
            "activityname": '示例', //活动标题
            "duration": 10, //志愿时长
            "isSign": "Y", //是否签到 枚举：YorN（Y:是,N:否）
            "builder": "c8000007-0000-0000-0000-000000000000",
            "builddate": "2018-11-21", //创建日期
            "buildername": "wangzitian", //创建人
            "laster": "c8000007-0000-0000-0000-000000000000",
            "lastdate": "2018-11-21T14:43:48.51",
            "lastername": "wangzitian",
            "signdate": null,
            "signgps": null,
            "signdistance": null,
            "signkind": null
        }]
    },
    onLoad: function () {
        let user = wx.getStorageSync('user')
        let token = wx.getStorageSync('token')
        user.token = token
        let that = this
        apiVolunteertime.getdetailshours(user, (data) => {
            console.log(data)
            if (data.length != 0) {
                let hours = 0
                co
                data.forEach(item => {
                    hours += item.duration
                    item.builddate = tools.dateformat(new Date(item.builddate), 'yyyy-MM-dd')
                });
                that.setData({
                    tlist: data,
                    thours: hours
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