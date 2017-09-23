// record.js
Page({
  data: {
    startdate: "2017-01-01",
    enddate: "2017-12-01",
    result:[]
  },

  onLoad: function (options) {
  
  },
  bindStartDateChange: function (e) {
    this.setData({
      startdate: e.detail.value
    })
  },
  bindEndDateChange: function (e) {
    this.setData({
      enddate: e.detail.value
    })
  },
  clk: function () {
    var that = this
    var start = this.data.startdate
    var end = this.data.enddate
    this.setData({
      loading:false
    })
    wx.request({
      url: 'https://www.tjservice.cn/record',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        campus: wx.getStorageSync('campus'),
        build: wx.getStorageSync('build'),
        center: wx.getStorageSync('center'),
        room: wx.getStorageSync('room'),
        txtstart: start,
        txtend: end,
        btnser:'查询'
      },
      method: 'POST',
      success: function (res) {
        that.setData({
          result: res.data,
          loading:true
        })
      }
    })
  },
  onReady: function () {
  
  },

  onShow: function () {
  
  },

  onHide: function () {
  
  },

  onUnload: function () {
  
  },

  onPullDownRefresh: function () {
  
  },

  onReachBottom: function () {
  
  },

  onShareAppMessage: function () {
  
  }
})