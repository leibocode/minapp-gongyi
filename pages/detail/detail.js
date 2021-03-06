import Model from '../../models/actvity.js'
import OrganiModel from '../../models/organi.js'
import {
  config
} from '../../config.js'
import Tools from '../../utils/tools'
const model = new Model()
const tools = new Tools()
const organiModel = new OrganiModel()

Page({
  data: {
    activity: {
      img: '../../images/activity-details-pic.jpg',
      activity: null,
      loading: false,
      gid: 0,
      dz: false,
      userList: [],
      jsonin: false,
      wjoin: false,
      inputBoxShow: false,
      isScroll: true,
      isShow:false
    }
  },
  onLoad: function(options) {
    const id = options.id
    this.setData({
      gid: id
    })
  },
  onShow: function() {
    let id = this.data.gid
    this._loadData(id)
  },
  onHide:function(){
    this.setData({
      loading:false
    })
  },
  //加载数据
  _loadData: function(id) {
    let that = this
    let user = wx.getStorageSync('user')
    let token = wx.getStorageSync('token')
    user.token = token
    user.gid = id
    model.getDzStatus(user, (data) => {
      let dz = data.msg === '1' ? true : false
      that.setData({
        dz: dz
      })
    })

    model.getActvitiyDateil(user, (data) => {

      console.log(data.flowstate)
      if (data.flowstate) {

      }
    })
    model.getActvitiyDateil(user, (data) => {
      console.log(data)
      model.getActvitiyButtonState(user, (detailState) => {
        let join = detailState.isstate === '1' ? true : false
        if (data.flowstate === '1') { //未开始
          if (join) {
            that.setData({
              jsonin: false,
              wjoin: true
            })
          } else {
            that.setData({
              jsonin: true,
              wjoin: false
            })
          }
          model.getUserjoin(user, (userList) => {
            userList.forEach(item => {
              item.hddate = tools.dateformat(new Date(item.hddate), 'yyyy-MM-dd hh:mm')
            })
            that.setData({
              userList: userList
            })
          })
        } else if (data.flowstate === '2') {
          model.getUserjoin(user, (userList) => {
            userList.forEach(item => {
              item.hddate = tools.dateformat(new Date(item.hddate), 'yyyy-MM-dd hh:mm')
            })
            that.setData({
              userList: userList
            })
          })
        } else if (data.flowstate === '3') {
          model.getComments(user, (comments) => {
            comments.forEach(item => {
              item.commenttime = tools.dateformat(new Date(item.commenttime), 'yyyy-MM-dd hh:mm')
            })
            that.setData({
              comments: comments
            })
          })
        }
      })
    })
    model.getActvitiyDateil(user, (data) => {
      let region = wx.getStorageSync('region')
      let categoty = wx.getStorageSync('category')
      console.log(categoty)

      data.images = `${config.imageUrl}=${data.img_fileid}`

      region.forEach((item) => {
        if (data.region === item.sCode) {
          data.regionText = item.Names
        }
      })

      categoty.forEach((element) => {
        if (data.kind === element.sCode) {
          data.kindText = element.Names
        }
      })

      model.getActvitiyButtonState(user, (detailState) => {
        let join = detailState.isstate === '1' ? true : false
        console.log(data.flowstate)
        if (data.flowstate === '1') { //未开始
          if (join) { //报名成功
            that.setData({
              jsonin: false,
              wjoin: true
            })
          } else {
            that.setData({
              jsonin: true,
              wjoin: false
            })
          }
        } else if (data.flowstate === '2') {
          this.setData({
            jsonin: !join
          })
        }


      })


      wx.setNavigationBarTitle({
        title: data.title
      })
      that.setData({
        loading: true,
        activity: data,
        gid: id
      })

    })

    //
  },
  onCreateComment: function(event) {
    if (this.data.commtext.length>0){
      let that = this
      let user = wx.getStorageSync('user')
      let token = wx.getStorageSync('token')
      user.token = token
      user.gid = this.data.gid
      user.title = this.data.activity.title
      user.content = this.data.commtext
      model.createComment(user, (data) => {
        console.log()
        if (data.result) {
          wx.showToast({
            title: '评论成功'
          })
          this.setData({
            inputBoxShow: false,
            isShow:false
          });
          this.onShow()
        } else {
          wx.showToast({
            title: '评论失败',
            icon: 'none',
            duration: 1000
          })
          this.setData({
            inputBoxShow: false,
            isShow: false
          });
          this.onShow()
        }
      })
    }else {
      wx.showToast({
        title: '评论字数不够',
        icon: 'none',
        duration: 1000
      })
    }
   
  },
  showInputBox: function() {
    this.setData({
      isShow:true
    })
  },
  oncommentInput: function(event) {
    this.setData({
      commtext: event.detail.value
    })
  },
  invisible: function() {
    this.setData({
      inputBoxShow: false
    });
    this.setData({
      isScroll: true
    });
  },
  closeCommentBox:function(){
    this.setData({
      isShow:false
    })
  },
  onActJoinTap: function() {
    let that = this
    console.log(that)
    wx.showModal({
      title: '提示',
      content: '您确定参与本次活动吗？',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          //请求接口
          let user = wx.getStorageSync('user')
          let token = wx.getStorageSync('token')
          user.token = token
          user.gid = that.data.gid
          model.joinAct(user, (data) => {
            console.log('报名')
            console.log(data)
            if (data.result) {

              let params = model.toQueryString({
                name: that.data.activity.title,
                address: that.data.activity.straddress,
                contact: that.data.activity.contact,
                phone: that.data.activity.telephone,
              })
              wx.navigateTo({
                url: '../regsuccess/regsuccess?' + params,
              })
            } else {
              wx.showToast({
                title: '报名失败',
                icon: 'none',
                duration: 1000
              })
            }
          })
          // 报名成功
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //预览图片
  preview() {
    let imgs = []
    imgs.push(this.data.activity.images)
    wx.previewImage({
      urls: imgs
    })
  },
  onShare: function() {
    return {
      title: '城志协',
      path: 'pages/detail/detail?id=' + this.data.gid
    }
  },
  oncancelAct: function() {
    let that = this
    wx.showModal({
      title: '提示',
      content: '您确定退出本次活动吗？',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          //请求接口
          let user = wx.getStorageSync('user')
          let token = wx.getStorageSync('token')
          user.token = token
          user.gid = that.data.gid
          model.cancelAct(user, (data) => {
            if (data.result) {
              wx.showToast({
                title: '取消成功',
                duration: 1000
              })
              that.onShow();
            } else {
              wx.showToast({
                title: '操作失败',
                icon: 'none',
                duration: 1000
              })
            }
          })
          // 报名成功
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  onDz: function() {
    let that = this
    let user = wx.getStorageSync('user')
    let token = wx.getStorageSync('token')
    user.token = token
    user.gid = this.data.gid
    user.title = this.data.title
    model.createDzStatus(user, data => {
      if (data.result) {
        wx.showToast({
          title: '点赞成功',
          duration: 1000
        })
        that.setData({
          dz: true
        })
      }
    })
  },
  onShareAppMessage: function(res) {
    let gid = this.data.gid
    return {
      title: '城志协',
      path: 'pages/detail/detail?id=' + gid,
      success: function(res) {
        wx.showToast({
          title: '分享成功',
          duration: 1000
        })
      }
    }
  }
})