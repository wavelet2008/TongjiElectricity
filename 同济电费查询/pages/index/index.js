//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '在使用过程中遇到任何问题都可以通过下方按钮联系开发人员',
    userInfo: {},
    campus:"",
    build:"",
    center:"",
    room:"",
    preview:false,
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
    wx.request({
      url: 'https://www.aikatsucn.cn/notice',
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
        wx.request({
          url: 'https://www.aikatsucn.cn/public',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
          },
          method: 'GET',
          success: function (res) {
            if (res.data.switch == "true") {
              wx.showModal({
                title: '重要通知！',
                content: res.data.content,
                showCancel: false
              })
              wx.setClipboardData({
                data: 'http://www.aikatsucn.cn/download',
                success: function (res) {
                }
              })
            }
          }
        })
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
    wx.navigateTo({ url: '../wallet/index' })
    /*var c0 = wx.getStorageSync('campus')
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
    }*/
  },
  test:function(){
    wx.navigateTo({url:'../index/vote'})
  }
})
