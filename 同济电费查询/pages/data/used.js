// record.js
var app = getApp()
Page({
  data: {
    roominfor: {},
    startdate: "2017-09-01",
    enddate: "2018-09-01",
    result: [],
    loading: true,
    cookie: "",
    current: 1,
    maxpage: 1
  },

  onLoad: function (options) {
    var now = this.getNowFormatDate(0)
    var last = this.getNowFormatDate(1)
    this.setData({
      enddate: now,
      startdate: last,
      roominfor: app.globalData.roominfor
    })
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
  getNowFormatDate: function (offset) {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear() - offset;
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
  },
  clk: function () {
    var that = this
    var start = this.data.startdate
    var end = this.data.enddate
    this.setData({
      loading: false
    })
    wx.request({
      url: 'https://www.liuchangfreeman.xyz/used',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        campus: that.data.roominfor.campus,
        build: that.data.roominfor.build,
        center: that.data.roominfor.center,
        room: that.data.roominfor.room,
        start: start,
        end: end,
        viewstate: that.data.roominfor.viewstate
      },
      method: 'POST',
      success: function (res) {
        that.setData({
          result: res.data.data,
          cookie: res.data.cookie,
          maxpage: res.data.pages,
          loading: true
        })
      }
    })
  },
  onReachBottom: function () {
    var that = this
    var start = this.data.startdate
    var end = this.data.enddate
    var result = this.data.result
    if (this.data.current < this.data.maxpage) {
      this.setData({
        loading: false
      })
      wx.request({
        url: 'https://www.liuchangfreeman.xyz/used',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          cookie: that.data.cookie,
          page: that.data.current + 1
        },
        method: 'POST',
        success: function (res) {
          for (var i = 0; i < res.data.data.length; i++) {
            result.push(res.data.data[i])
          }
          that.setData({
            result: result,
            cookie: res.data.cookie,
            current: that.data.current + 1,
            loading: true
          })
        }
      })
    }
  }
})