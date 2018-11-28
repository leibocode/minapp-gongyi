Page({
    data: {
        id: 1,
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
    onload: function () {

        console.log(this.data.delinfo);
    }
})