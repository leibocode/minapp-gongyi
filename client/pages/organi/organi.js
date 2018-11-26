Page({
    data: {
        tabs: ['全部', '类型', '区域'],
        currentTabsIndex: 0,
        organisArr: [{
            id: 1001,
            src: '../../images/organi-pic2.jpg',
            imgs: ['../../images/photo-pic.jpg', '../../images/photo-pic.jpg', '../../images/photo-pic.jpg'],
            organisStatus: 1
        }]
    },
    onLoad: function () {

    },
    _loadData: function () {

    },
    onPullDownRefresh: function () {

    },
    onShareAppMessage: function () {
        return {
            title: '城志协',
            path: 'pages/home/home'
        }
    },
    onActivityItemTap: function (event) {
        let id = event.target.dataset.id;
        console.log(id);
        wx.navigateTo({
            url: '../organi_details/organi_details',
            data: {
                id: id
            }
        })
    }
})