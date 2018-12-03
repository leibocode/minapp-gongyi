import ApiOrgniDel from '../../models/organi_delails'
const apiOrgniDel = new ApiOrgniDel()

Page({
    data: {
        gid: '',
        delinfo: {
            photo: '../../images/organi-pic2.jpg',
            organisStatus: 1,
            type: '其他',
            city: '广东广州市越秀区',
            content: "测试描述测试，描述测试描述测试描述测试，描述测试描述"
        },
        dzinfo: {
            id: 1,
            photo: '../../images/photo-pic.jpg',
            name: 'Meizi',
            iphonexs: '182****9290',
            organisStatus: 1
        },
        p_list: [{
            id: 1,
            photo: '../../images/photo-pic.jpg',
            name: 'Leibo',
            iphonexs: '182****9290',
            organisStatus: 1
        }, {
            id: 2,
            photo: '../../images/photo-pic.jpg',
            name: 'Leibo V666',
            iphonexs: '182****9290',
            organisStatus: 1
        }]
    },
    onLoad: function (options) {
        console.log(options)
        //console.log(this.data.delinfo);
        this.setData({
            gid: options.gid
        })
        this._loadData(this.data.gid)
    },
    tomember: function (event) {
        let id = event.target.dataset.id;
        console.log(id);
        wx.navigateTo({
            url: '../member/member',
        })
    },
    _loadData(gid) {
        let user = wx.getStorageSync('user')
        let token = wx.getStorageSync('token')
        user.token = token
        apiOrgniDel.getorganizationdetails(user, gid, (data) => {
            //
        })
    }
})