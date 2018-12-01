import User from '../../models/user'
const userapi = new User()

Page({
    data: {
        defaultvolunteerList: [
            '理工志愿队',
            '上海志愿队',
            '码农志愿队'
        ],
        dependencyList: [
            '长沙',
            '上海',
            '湖北'
        ],
        dwellingplaceList: [
            '秦皇岛',
            '北戴河'
        ],
        getcodetext: '获取',
        loading: false,
        disabled: false,
        //registeredinfo 注册参数
        reginfo: {
            //微信名
            membername: '',
            //身份证号码
            identitycard: '',
            //手机号码
            mobile: '',
            //手机验证码
            sendcode: '',
            //所属地区
            dependency: '0',
            //所属地区详细地址
            dencyaddress: '',
            //居住地区
            dwellingplace: '0',
            //居住地区详细地址
            placeaddress: '',
            //所属志愿队
            defaultvolunteer: '0',
            //真实姓名
            name: ''
        }
    },
    defaultvolunteerChange: function (e) {
        let reginfo = this.data.reginfo
        reginfo.defaultvolunteer = e.detail.value
        this.setData({
            reginfo: reginfo
        })
    },
    dependencyChange: function (e) {
        let reginfo = this.data.reginfo
        reginfo.dependency = e.detail.value
        this.setData({
            reginfo: reginfo
        })
    },
    dwellingplaceChange: function (e) {
        let reginfo = this.data.reginfo
        reginfo.dwellingplace = e.detail.value
        this.setData({
            reginfo: reginfo
        })
    },
    getcode: function (e) {
        console.log('GetCode')
        let s = 30;
        let inte = setInterval(() => {
            if (s > 0) {
                this.setData({
                    disabled: true,
                    getcodetext: s + 's'
                })
                s--
            }
        }, 1000)
        setTimeout(() => {
            window.clearInterval(inte);
            this.setData({
                getcodetext: '获取',
                disabled: false
            })
        }, 30)
    },
    subform: function (e) {
        console.log('SubForm')
        this.setData({
            loading: true
        })
        let user = wx.getStorageSync('user')
        console.log(user)
        let token = wx.getStorageSync('token')
        console.log(token)
        user.token = token
        let that = this
        // userapi.regaccountsubmit(user, (data) => {
        //     console.log(data);
        // })


    }
})