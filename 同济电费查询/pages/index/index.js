//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '当前版本为初期版本,如果在查询的过程中存在空白异常,请点击刷新按钮',
    userInfo: {},
    campus:"",
    build:"",
    center:"",
    room:"",
    check:false,
    hide:true
  },
  listenerSwitch: function (e) {
    var c0 = wx.getStorageSync('campus')
    var b1 = wx.getStorageSync('build')
    var c2 = wx.getStorageSync('center')
    var r4 = wx.getStorageSync('room')
    if (c0 != "" && b1 != "" && c2 != "" && r4 != "") {
      wx.setStorageSync("auto", e.detail.value)
    }
    else {
      wx.showModal({
        content: '未保存完整房间信息',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
          }
        }
      })
      this.setData({
        check: false
      })
    }
  },
    getPhoneNumber: function(e) { 
        console.log(e.detail.errMsg) 
        console.log(e.detail.iv) 
        console.log   (e.detail.encryptedData) 
    } 
    ,
  onLoad: function () {
    var that = this
    app.getUserInfo(
      function (userInfo) {
      that.setData({
        userInfo: userInfo
      })
      if (userInfo.nickName == "畅") {
        that.setData({
          hide: false
        })
      }
    })
    wx.request({
      url: 'https://www.tjservice.cn/notice',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
      },
      method: 'GET',
      success: function (res) {
        that.setData({
          motto: res.data.content,
        })
        var temp = wx.getStorageSync('information')
        var temp2 = wx.getStorageSync('auto')
        if (temp != "") {
          that.setData({
            room: "房间号:" + temp,
            check: temp2,
          })
        }
        else {
          that.setData({
            check: temp2,
          })
        }
        if (temp2 == true) {
          wx.navigateTo({ url: '../data/money' })
        }
      }
    })
  },
  clk:function(){
    wx.navigateTo({url:'../data/search'})
  },
  search:function(){
    var c0 = wx.getStorageSync('campus')
    var b1 = wx.getStorageSync('build')
    var c2 = wx.getStorageSync('center')
    var r4 = wx.getStorageSync('room')
    if (c0 != "" && b1 != "" && c2 != "" && r4 != "") {
      wx.navigateTo({ url: '../data/money' })
    }
    else{
      wx.showModal({
        content: '未保存完整房间信息',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
          }
        }
      })
    }
  },
  auto:function(){
        var c0 = wx.getStorageSync('campus')
    var b1 = wx.getStorageSync('build')
    var c2 = wx.getStorageSync('center')
    var r4 = wx.getStorageSync('room')
    if (c0 != "" && b1 != "" && c2 != "" && r4 != "") {
  wx.navigateTo({url:'../index/auto'})
    }
        else{
      wx.showModal({
        content: '未保存完整房间信息',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
          }
        }
      })
    }
  },
  test:function(){
    wx.navigateTo({url:'../index/vote'})
  }
})
