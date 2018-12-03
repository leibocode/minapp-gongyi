import Model from '../../models/actvity.js'
import OrganiModel from '../../models/organi.js'
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
            userList: []
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


        model.getActvitiyButtonState(user, (data) => {

        })


        model.getDzStatus(user, (data) => {
            let dz = data.msg === '1' ? true : false
            that.setData({
                dz: dz
            })
        })

        model.getActvitiyButtonState(user, (data) => {

        })

        model.getUserjoin(user, (data) => {
            data.forEach(item => {
                item.hddate = tools.dateformat(new Date(item.hddate), 'yyyy-MM-dd hh:mm')
            })
            that.setData({
                userList: data
            })
        })
        model.getActvitiyDateil(user, (data) => {
            let region = wx.getStorageSync('region')
            let categoty = wx.getStorageSync('category')
            console.log(categoty)
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
    onrganizeTap: function () {
        wx.showModal({
            title: '提示',
            content: '您确定参与本次活动吗？',
            success: function (res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                    //请求接口

                    // 报名成功
                    let params = model.toQueryString({
                        name: '测试',
                        address: '万年三林',
                        contact: 'feng',
                        phone: '18221769290'
                    })
                    wx.navigateTo({
                        url: '../regsuccess/regsuccess?' + params,
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    preview() {
        let imgs = []
        imgs.push(this.data.activity.img)
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
    onShareAppMessage: function () {

        return {
            title: '城志协',
            path: 'pages/home/home'
        }
    }
})