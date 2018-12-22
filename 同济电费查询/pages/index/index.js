//index.js
var app = getApp()
Page({
  data: {
    roominfor:{},
    userInfo: {},
    hide_preview:false,
    ipx: false,
    preview:false,
    check:false,
    hide:true
  },
  listenerSwitch: function (e) {
    var roominfor = app.globalData.roominfor
    if (JSON.stringify(roominfor) != "{}") {
      wx.setStorageSync("auto", e.detail.value)
    }
    else {
      wx.showModal({
        content: '未选择房间',
        showCancel: false
      })
      this.setData({
        check: false
      })
    }
  },
  onLoad: function () {
    const updateManager = wx.getUpdateManager()
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            updateManager.applyUpdate()
          }
        }
      })
    })
    var that = this
    app.getUserInfo(function (userInfo) {
      that.setData({
        userInfo: userInfo
      })
    })
    wx.getSystemInfo({
      success: function (res) {
        if (res.model == "iPhone X") {
          that.setData({
            ipx: true
          })
        }
      },
    })
    that.setData({
      msglist: [
        { title: "当前电费查询服务状态为:可用" },
        { title: "您可以百度[同济能源管理中心]找到官方查询网页" },
        { title: "当使用出现故障时，请联系开发者报告错误" },
      ]
    });
    var roominfor = app.globalData.roominfor
    if (JSON.stringify(roominfor) != "{}"){
      that.setData({
        roominfor: roominfor,
      })
    }
    else{
      that.setData({
        hide_preview: true
      })
      wx.showToast({
        title: '请先选择房间',
        icon:'none',
        duration:3000
      })
    }
    if (wx.getStorageSync('auto')== true) {
      wx.navigateTo({ url: '../data/money' })
      that.setData({
        check:true
      })
    }
    wx.request({
      url: 'https://www.liuchangfreeman.xyz/public',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'GET',
      success: function (res) {
        if (res.data.switch == "true") {
          var id = res.data.id
          console.log(id)
          if (wx.getStorageSync("hide_id") >= id) {
            console.log(wx.getStorageSync("hide_id"))
            return
          }
          wx.showModal({
            title: '来自开发者的通知',
            content: res.data.content,
            showCancel: true,
            cancelText: "不再提醒",
            success: function (res) {
              if (res.cancel) {
                wx.setStorageSync("hide_id", id)
              }
            }
          })
        }
        if (res.data.copycode == "true") {
          wx.setClipboardData({
            data: res.data.code,
          })
        }
      }
    })
    wx.request({
      url: 'https://www.liuchangfreeman.xyz/status',
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data.result == 'false') {
          that.setData({
            msglist: [
              { title: "当前电费查询服务状态为:不可用(维修中)" },
              { title: "您可以百度[同济能源管理中心]找到官方查询网页" },
              { title: "当使用出现故障时，请联系开发者报告错误" },
            ]
          });
        }
      },
      fail: function (res) {
        that.setData({
          msglist: [
            { title: "当前电费查询服务状态为:不可用(维修中)" },
            { title: "您可以百度[同济能源管理中心]找到官方查询网页" },
            { title: "当使用出现故障时，请联系开发者报告错误" },
          ]
        });
      },
    })
  },
  clk:function(){
    wx.reLaunch({
      url: '../data/register',
    })
  },
  search:function(){
    var roominfor = app.globalData.roominfor
    if (JSON.stringify(roominfor) != "{}") {
      wx.navigateTo({ url: '../data/money' })
    }
    else{
      wx.showModal({
        content: '未选择房间',
        showCancel: false
      })
    }
  },
  auto:function(){
    wx.navigateTo({ url: '../wallet/index' })
  },
  record: function () {
    var roominfor = app.globalData.roominfor
    if (JSON.stringify(roominfor) != "{}") {
      wx.navigateTo({ url: '../data/record' })
    }
    else {
      wx.showModal({
        content: '未选择房间',
        showCancel: false
      })
    }
  },
  used: function () {
    var roominfor = app.globalData.roominfor
    if (JSON.stringify(roominfor) != "{}") {
      wx.navigateTo({ url: '../data/used' })
    }
    else {
      wx.showModal({
        content: '未选择房间',
        showCancel: false
      })
    }
  },
})
