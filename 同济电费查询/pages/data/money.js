// pages/data/money.js
Page({
  data:{
    result:{},
    campus:"",
    build:"",
    center:"",
    room:"",
    loading:false,
    campusname: "暂无数据",
    buildname: "暂无数据",
    centername: "暂无数据",
    roomname: "暂无数据",
    time:"暂无数据"
  },
    onLoad:function(options){
    var that=this
    wx.request({
      url: 'https://www.tjservice.cn/money',
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
    that.setData({
      result:res.data.money,
      campusname: wx.getStorageSync('campusname'),
      buildname: wx.getStorageSync('buildname'),
      centername: wx.getStorageSync('centername'),
      roomname: wx.getStorageSync('roomname'),
      time: res.data.time,
      loading:true
    })
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
  }
  ,
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