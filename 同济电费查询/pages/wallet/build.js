Page({
  data: {
    title: "二级校区选择",
    result: [],
    build: '',
    buildname: '',
  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://www.aikatsucn.cn/Build',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        account: wx.getStorageSync('account'),
        xiaoqu: wx.getStorageSync('xiaoqu'),
        xiaoquName: wx.getStorageSync('xiaoquname')
      },
      method: 'POST',
      success: function (res) {
        that.setData({
          result: res.data.data,
          build: res.data.data[0].value,
          buildname: res.data.data[0].name
        })
      }
    })
  },
  clk: function () {
    var that = this
    wx.showModal({
      content: '所选楼栋：' + that.data.buildname,
      showCancel: true,
      success: function (res) {
        if (res.confirm) {
          wx.setStorageSync("Buildname", that.data.buildname)
          wx.setStorageSync("Build", that.data.build)
          wx.reLaunch({ url: '../wallet/room' })
        }
      }
    })
  }
  ,
  refresh: function () {
    var that = this
    wx.request({
      url: 'https://www.aikatsucn.cn/Build',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        account: wx.getStorageSync('account'),
        xiaoqu: wx.getStorageSync('xiaoqu'),
        xiaoquName: wx.getStorageSync('xiaoquname')
      },
      method: 'POST',
      success: function (res) {
        that.setData({
          result: res.data.data,
          build: res.data.data[0].value,
          buildname: res.data.data[0].name
        })
      }
    })
  }
  ,
  cancel: function () {
    wx.reLaunch({ url: '../index/index' })
  }
  ,
  bindChange: function (e) {
    this.setData({
      build: this.data.result[e.detail.value[1]].value,
      buildname: this.data.result[e.detail.value[1]].name
    })
  },
  onReady: function () {
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})