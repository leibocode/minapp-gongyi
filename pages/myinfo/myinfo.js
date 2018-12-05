import ApiVountary from '../../models/vountary'
import ApiUser from '../../models/user'
const apiVountary = new ApiVountary()
const apiuser = new ApiUser()

Page({
    data: {
        defaultvolunteerList: [],
        dependencyList: [],
        dwellingplaceList: [],
        loading: false,
        //registeredinfo 注册参数
        reginfo: {
            //微信名
            membername: '',
            //身份证号码
            identitycard: '',
            //手机号码
            mobile: '',
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
    onLoad: function () {
        this.loadData()
    },
    // ** bind data begin **
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
    membernameChange: function (e) {
        let reginfo = this.data.reginfo
        reginfo.membername = e.detail.value
        this.setData({
            reginfo: reginfo
        })
    },
    nameChange: function (e) {
        let reginfo = this.data.reginfo
        reginfo.name = e.detail.value
        this.setData({
            reginfo: reginfo
        })
    },
    mobileChange: function (e) {
        let reginfo = this.data.reginfo
        reginfo.mobile = e.detail.value
        this.setData({
            reginfo: reginfo
        })
    },
    sendcodeChange: function (e) {
        let reginfo = this.data.reginfo
        reginfo.sendcode = e.detail.value
        this.setData({
            reginfo: reginfo
        })
    },
    identitycardChange: function (e) {
        let reginfo = this.data.reginfo
        reginfo.identitycard = e.detail.value
        this.setData({
            reginfo: reginfo
        })
    },
    dencyaddressChange: function (e) {
        let reginfo = this.data.reginfo
        reginfo.dencyaddress = e.detail.value
        this.setData({
            reginfo: reginfo
        })
    },
    placeaddressChange: function (e) {
        let reginfo = this.data.reginfo
        reginfo.placeaddress = e.detail.value
        this.setData({
            reginfo: reginfo
        })
    },
    // ** bind data ending **

    subform: function () {
        //console.log('SubForm')
        this.setData({
            loading: true
        })
        let user = wx.getStorageSync('user')
        let token = wx.getStorageSync('token')
        user.token = token
        let that = this
        let reginfo = this.data.reginfo
        reginfo.membername = user.nickName
        reginfo.defaultvolunteer = this.data.defaultvolunteerList[reginfo.defaultvolunteer].gid
        reginfo.dependency = this.data.dependencyList[reginfo.dependency].sCode
        reginfo.dwellingplace = this.data.dwellingplaceList[reginfo.dwellingplace].sCode
        apiVountary.updateregaccountsubmit(user, reginfo, (data) => {
            if (data.result) {
                that.setData({
                    loading: false
                })
                wx.showToast({
                    title: '保存成功',
                    icon: 'succes',
                    duration: 1000,
                    mask: true
                })
            }
        })
    },
    loadData: function () {
        let user = wx.getStorageSync('user')
        user.token = wx.getStorageSync('token')
        let that = this
        apiVountary.getValues(user, 'voregion', (data) => {
            //console.log(data);
            that.setData({
                dependencyList: data
            })
        })
        apiVountary.getValues(user, 'working_location', (data) => {
            //console.log(data);
            that.setData({
                dwellingplaceList: data
            })
        })
        apiVountary.getDefaultvolunteerList(user, (data) => {
            //console.log(data);
            that.setData({
                defaultvolunteerList: data
            })
        })
        apiuser.getUserInfo(user, (data) => {
            let dependency = 0
            let dwellingplace = 0
            let defaultvolunteer = 0
            this.data.dependencyList.forEach((item, index) => {
                if (item.sCode == data.dependency) {
                    dependency = index
                }
            })
            this.data.dwellingplaceList.forEach((item, index) => {
                if (item.sCode == data.dependency) {
                    dwellingplace = index
                }
            })
            this.data.defaultvolunteerList.forEach((item, index) => {
                if (item.gid == data.dependency) {
                    defaultvolunteer = index
                }
            })
            that.setData({
                reginfo: {
                    //微信名
                    membername: data.membername,
                    //身份证号码
                    identitycard: data.identitycard,
                    //手机号码
                    mobile: data.mobile,
                    //所属地区
                    dependency: dependency,
                    //所属地区详细地址
                    dencyaddress: data.dencyaddress,
                    //居住地区
                    dwellingplace: dwellingplace,
                    //居住地区详细地址
                    placeaddress: data.placeaddress,
                    //所属志愿队
                    defaultvolunteer: defaultvolunteer,
                    //真实姓名
                    name: data.name
                }
            })
        })
    }
})