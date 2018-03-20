// pages/data/money.js
Page({
  data:{
    result:{},
    campus:"",
    build:"",
    center:"",
    room:"",
    loading:false,
    fail: false,
    campusname: "暂无数据",
    buildname: "暂无数据",
    centername: "暂无数据",
    roomname: "暂无数据",
    time:"暂无数据",
    tip:""
  },
  onLoad:function(options){
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
        if (res.data.copycode == "true"){
          wx.setClipboardData({
            data: res.data.code,
          })
        }
      }
    })
    var that=this
    wx.request({
      url: 'https://www.aikatsucn.cn/money',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: {
     campus:wx.getStorageSync('campus'),
     build:wx.getStorageSync('build'),
     center:wx.getStorageSync('center'),
     room:wx.getStorageSync('room')
    },
    method: 'POST',
    success: function(res){
      if (res.statusCode==200){
        if(res.data.success!=true){
          that.setData({
            tip: "请重新查询/选择房间，如未能解决问题，联系开发者并提供您的截图",
            result: "查询失败",
            campusname: wx.getStorageSync('campusname'),
            buildname: wx.getStorageSync('buildname'),
            centername: wx.getStorageSync('centername'),
            roomname: wx.getStorageSync('roomname'),
            time: res.data.time,
            loading: true,
            fail: true
          })
        }
        else if (wx.getStorageSync('campus') == '2' || wx.getStorageSync('campus') == '4') {
          var money = parseFloat(res.data.money) / 1.6207
          that.setData({
            result: res.data.money + "度" + "(约" + money.toFixed(2) + "元)",
            campusname: wx.getStorageSync('campusname'),
            buildname: wx.getStorageSync('buildname'),
            centername: wx.getStorageSync('centername'),
            roomname: wx.getStorageSync('roomname'),
            time: res.data.time,
            loading: true
          })
        }
        else {
          that.setData({
            result: res.data.money + "元",
            campusname: wx.getStorageSync('campusname'),
            buildname: wx.getStorageSync('buildname'),
            centername: wx.getStorageSync('centername'),
            roomname: wx.getStorageSync('roomname'),
            time: res.data.time,
            loading: true
          })
        }
      }
      else if(res.statusCode=500){
        that.setData({
          tip: "请重新查询/选择房间，如未能解决问题，联系开发者并提供您的截图",
          result: "查询失败",
          campusname: wx.getStorageSync('campusname'),
          buildname: wx.getStorageSync('buildname'),
          centername: wx.getStorageSync('centername'),
          roomname: wx.getStorageSync('roomname'),
          time: res.data.time,
          loading: true,
          fail: true
        })
      }
      wx.setStorageSync("information", that.data.roomname)
    }
  })

  },
  clk:function(){
    wx.navigateTo({url:'../data/search'})
  },
  record: function () {
    wx.navigateTo({ url: '../data/record' })
  },
  auto:function(){
     wx.navigateTo({ url: '../index/auto' })
  },
  phone: function () {
    wx.showModal({
      title: '即将拨号给同济电控负责人:时工',
      content: '您确定要联系他吗?',
      success: function (res) {
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: '18916406026',
          })
        } 
      }
    })
  },
  clear: function () {
    wx.setStorageSync("campus", "")
    wx.setStorageSync("build", "")
    wx.setStorageSync("center", "")
    wx.setStorageSync("room", "")
    wx.setStorageSync("information", "")
    wx.setStorageSync("auto",false) 
    wx.navigateTo({ url: '../index/index' })
  }
})