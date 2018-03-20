Page({
  data: {
    title: "二级校区选择",
    result: [],
    name: '',
    xiaoqu:'',
    xiaoquname:'',
  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://www.aikatsucn.cn/XiaoQu',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        account: wx.getStorageSync('account'),
        paytypecode: wx.getStorageSync('paytypecode')
      },
      method: 'POST',
      success: function (res) {
        that.setData({
          result: res.data.data,
          xiaoqu: res.data.data[0].value,
          xiaoquname: res.data.data[0].name
        })
      }
    })
  },
  clk: function () {
    var that = this
    wx.showModal({
      content: '所选二级校区：' + that.data.xiaoquname,
      showCancel: true,
      success: function (res) {
        if (res.confirm) {
          wx.setStorageSync("xiaoquname", that.data.xiaoquname)
          wx.setStorageSync("xiaoqu", that.data.xiaoqu)
          wx.reLaunch({ url: '../wallet/build' })
        }
      }
    })
  }
  ,
  refresh: function () {
    var that = this
    wx.request({
      url: 'https://www.aikatsucn.cn/XiaoQu',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        account: wx.getStorageSync('account'),
        paytypecode: wx.getStorageSync('paytypecode')
      },
      method: 'POST',
      success: function (res) {
        that.setData({
          result: res.data.data,
          xiaoqu: res.data.data[0].value,
          xiaoquname: res.data.data[0].name
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
      xiaoqu: this.data.result[e.detail.value[1]].value,
      xiaoquname: this.data.result[e.detail.value[1]].name
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