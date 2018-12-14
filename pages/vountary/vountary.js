import ApiVountary from '../../models/vountary'
const apiVountary = new ApiVountary()
var interval = null //倒计时函数

Page({
  data: {
    defaultvolunteerList: [],
    dependencyList: [],
    dwellingplaceList: [],
    getcodetext: '获取验证码',
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
  getcode: function () {
    let mobile = this.data.reginfo.mobile
    if (mobile.length > 0 && mobile.length == 13) {
      this.setData({
        disabled: true
      })
      let user = wx.getStorageSync('user')
      let token = wx.getStorageSync('token')
      user.token = token
      let that = this
      apiVountary.getsendcode(user, mobile, (data) => {
        //console.log(data);
        if (data.result) {
          wx.showToast({
            title: '验证码已发送',
            icon: 'succes',
            duration: 1000,
          })
        } else {

        }
      })
    }else {
      wx.showToast({
        title:'手机号为空或者输入不对',
        icon: 'none',
        duration: 1000,
      })
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
  djsCode: function () {
    var that = this;
    var currentTime = that.data.currentTime
    interval = setInterval(function () {
      currentTime--;
      that.setData({
        getcodetext: currentTime + '秒'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          getcodetext: '重新发送',
          currentTime: 30,
          disabled: false
        })
      }
    }, 100)
  },
subform: function () {
  if (this.data.reginfo.membername == "") {
    wx.showToast({
      title: "请填写姓名",
      icon: 'none',
      duration: 1000
    })
    return
  }
  if (this.data.reginfo.identitycard == "") {
    wx.showToast({
      title: "请填写身份证号码",
      icon: 'none',
      duration: 1000
    })
    return
  } else if (this.data.reginfo.identitycard.length === 18) {
    wx.showToast({
      title: "身份证长度不对",
      icon: 'none',
      duration: 1000
    })
    return
  }

  if (this.data.reginfo.mobile) {
    wx.showToast({
      title: "请填写手机号",
      icon: 'none',
      duration: 1000
    })
    return
  }

  if (this.data.reginfo.sendcode) {
    wx.showToast({
      title: "请填写验证码",
      icon: 'none',
      duration: 1000
    })
    return
  }

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
  apiVountary.registered(user, reginfo, (data) => {
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
}
})