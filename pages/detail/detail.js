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
            wjoin: false
        }
    },
    onLoad: function (options) {
        const id = options.id
        this._loadData(id)
    },
    //加载数据
    _loadData: function (id) {
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

        model.getUserjoin(user, (data) => {
            data.forEach(item => {
                item.hddate = tools.dateformat(new Date(item.hddate), 'yyyy-MM-dd hh:mm')
            })
            that.setData({
                userList: data
            })
        })


        // model.getDetailsState(user, (data) => {

        // })


        // model.getActvitiyButtonState(user,(data)=>{
        //    let join = detailState.isstate === '1' ? true : false
        //    this.setData({
        //        jsonin:join
        //    })
        // })
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
    onActJoinTap: function () {
        let that = this
        wx.showModal({
            title: '提示',
            content: '您确定参与本次活动吗？',
            success: function (res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                    //请求接口
                    let user = wx.getStorageSync('user')
                    let token = wx.getStorageSync('token')
                    user.token = token
                    user.gid = that.data.id
                    model.joinAct(user, (data) => {
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
    preview () {
        let imgs = []
        imgs.push(this.data.activity.images)
        wx.previewImage({
            urls: imgs
        })
    },
    onShare: function () {
        return {
            title: '城志协',
            path: 'pages/detail/detail?id=' + this.data.gid
        }
    },
    oncancelAct: function () {
        let that = this
        wx.showModal({
            title: '提示',
            content: '您确定退出本次活动吗？',
            success: function (res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                    //请求接口
                    let user = wx.getStorageSync('user')
                    let token = wx.getStorageSync('token')
                    user.token = token
                    user.gid = id
                    model.cancelAct(user, (data) => {
                        if (data.result) {
                            this.showToast({
                                title: '取消成功',
                                duration: 1000
                            })
                        }else{
                            this.showToast({
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
    onDz: function () {
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
                    duration: 2000
                })
                that.setData({
                    dz: true
                })
            }
        })
    },
    onShareAppMessage: function (res) {
        let gid = this.data.gid
        return {
            title: '城志协',
            path: 'pages/detail/detail?id=' + gid,
            success: function (res) {
                wx.showToast({
                    title: '分享成功',
                    duration: 2000
                })
            }
        }
    }
})