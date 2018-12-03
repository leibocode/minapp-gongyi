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
        // model.getDetailsState(user,(detailState)=>{
        //         if(detailState){

        //         }
        // })




        model.getDzStatus(user, (data) => {
            let dz = data.msg === '1' ? true : false
            that.setData({
                dz: dz
            })
        })

        model.getActvitiyDateil(user, (data) => {
            if (data.flowstate) {

            }
        })

        //
        model.getUserjoin(user, (data) => {
            that.setData({
                userList: data
            })
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
                }


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
                        name: '',
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
    onjoinAct: function () {

    },
    oncancelAct: function () {

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