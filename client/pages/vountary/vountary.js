Page({
    data: {
        test: 'hello word',
        zyd_index: 0,
        zyd_array: [
            '请选择所属志愿队',
            '理工志愿队',
            '上海志愿队',
            '码农志愿队'
        ],
        ssd_index: 0,
        ssd_array: [
            '请选择所属地',
            '长沙',
            '上海',
            '湖北'
        ],
        szd_index: 0,
        szd_array: [
            '请选择所住地',
            '秦皇岛',
            '北戴河'
        ],
        getcodetext: '获取',
        loading: false,
        disabled: false
    },
    bindzydPickerChange: function (e) {
        this.setData({
            zyd_index: e.detail.value
        })
    },
    bindssdPickerChange: function (e) {
        this.setData({
            ssd_index: e.detail.value
        })
    },
    bindszdPickerChange: function (e) {
        this.setData({
            szd_index: e.detail.value
        })
    },
    getcode: function (e) {
        console.log('GetCode')
        let s = 10;
        this.setData({
            disabled: true
        })
        let inte = setInterval(() => {
            s--;
            if (s === 0) {
                this.setData({
                    getcodetext: '获取',
                    disabled: false
                })
                try {
                    window.clearInterval(inte);
                    return;
                } catch (error) {
                    return;
                }
            } else if (s > 0) {
                this.setData({
                    disabled: true,
                    getcodetext: s + 's'
                });
            }
        }, 1000)
    },
    subform: function (e) {
        console.log('SubForm')
        this.setData({
            loading: true
        });
    }
})