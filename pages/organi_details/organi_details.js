import ApiOrgniDel from '../../models/organi_delails'
import ApiOrgni from '../../models/organi'
const apiOrgniDel = new ApiOrgniDel()
const apiOrgni = new ApiOrgni()
import {
    config
} from '../../config.js'

Page({
    data: {
        gid: '',
        isstate: 0,
        curradmin: 0,
        delinfo: {
            photo: '',
            organisStatus: 0,
            type: '',
            city: '',
            content: '',
            organizaadminbid: ''
        },
        dz_list: [],
        p_list: []
    },
    onLoad: function (options) {
        console.log(options)
        //console.log(this.data.delinfo);
        this.setData({
            gid: options.gid
        })
    },
    onShow: function () {
        this._loadData(this.data.gid)
    },
    tomember: function (event) {
        if (this.data.curradmin == 0) {
            wx.showModal({
                title: '提示',
                content: '只有管理员才可查看'
            })
            return;
        }
        let gid = apiOrgni.getDataSet(event, 'gid')
        let gxid = apiOrgni.getDataSet(event, 'gxid')
        //let gxid = event.target.dataset.gxid
        console.log(gid)
        var qsdata = {
            gid: gid,
            kid: this.data.gid,
            gxid: gxid
        }
        console.log('tomember')
        console.log(qsdata)
        wx.navigateTo({
            url: '../member/member?' + apiOrgni.toQueryString(qsdata),
        })
    },
    _loadData(gid) {
        let user = wx.getStorageSync('user')
        let token = wx.getStorageSync('token')
        let region = wx.getStorageSync('region')
        let types = wx.getStorageSync('category')
        user.token = token
        apiOrgniDel.getorganizationdetails(user, gid, (data) => {
            let typename = ''
            let regionname = ''
            region.forEach((item) => {
                if (item.sCode == data.region)
                    regionname = item.Names
            })
            types.forEach((item) => {
                if (item.sCode == data.kind)
                    typename = item.Names
            })
            console.log(typename + ',' + regionname)
            this.setData({
                delinfo: {
                    photo: data.headimg_fileid == '' ? null : `${config.imageUrl}=${data.headimg_fileid}`,
                    organisStatus: data.status,
                    type: typename,
                    city: regionname,
                    content: data.remark,
                    organizaadminbid: data.organizaadminbid
                }
            })
            wx.setNavigationBarTitle({
                title: data.name
            })
        })
        apiOrgniDel.getissignin(user, gid, (data) => {
            this.setData({
                isstate: data.isstate
            })
        })

        apiOrgniDel.getissignin(user, gid, (data) => {
            let ids = this.data.delinfo.organizaadminbid.split(",")
            let dzlist = []
            let isstate = 0
            data.forEach((item) => {
                ids.forEach((id) => {
                    if (item.gid == id) {
                        dzlist.push(item)
                    }
                    if (user.userId == id) {
                        this.setData({
                            curradmin: 1
                        })
                    }
                })
                if (item.gid == user.userId) {
                    isstate = 1
                }
            })
            this.setData({
                p_list: data,
                dz_list: dzlist,
                isstate: isstate
            })
        })
    },
    ckbommbtn: function () {
        let user = wx.getStorageSync('user')
        let token = wx.getStorageSync('token')
        user.token = token
        if (this.data.isstate == 0) {
            apiOrgniDel.joinInOrgani(user, this.data.gid, "", (data) => {
                if (data.result) {
                    this.setData({
                        isstate: 1
                    })
                    wx.showModal({
                        title: '提示',
                        content: '加入成功'
                    })
                    this._loadData(this.data.gid)
                }
            })
        } else {
            apiOrgniDel.joinInOrgani(user, this.data.gid, "", (data) => {
                if (data.result) {
                    this.setData({
                        isstate: 0
                    })
                    wx.showModal({
                        title: '提示',
                        content: '退出成功'
                    })
                    this._loadData(this.data.gid)
                }
            })
        }
    }
})