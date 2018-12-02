Page({
    data: {
        name: '',
        address: '',
        contact: '',
        phone: ''
    },
    onLoad: function (options) {
        console.log(options)
        this.setData({
            name: options.name,
            address: options.address,
            contact: options.contact,
            phone: options.phone
        })
    },
    ckbtn: function () {
        // 滚回上一页 😡
        wx.navigateBack()
    }
})