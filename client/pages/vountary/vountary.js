Page({
    data: {
        test: 'hello word',
        array: [
            '请选择所属志愿队',
            '理工志愿队',
            '上海志愿队',
            '码农志愿队'
        ],
        index: 0,
        getcodetext: '获取',
        loading: false,
        disabled: false
    },
    bindPickerChange: function (e) {
        this.setData({
            index: e.detail.value
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