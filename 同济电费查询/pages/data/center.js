// pages/data/center.js
Page({
  data:{
    title:"楼层选择",
    result:[],
    campus:"",
    build:"",
    center:"",
    loading: false,
    name:""
  },
  onLoad:function(options){
    var that=this
    that.setData({
      loading: true,
    })
    wx.request({
      url: 'https://www.aikatsucn.cn/center',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: {
     campus:wx.getStorageSync('campus'),
     build:wx.getStorageSync('build')
    },
    method: 'POST',
    success: function(res){
    that.setData({
      loading: false,
      result:res.data,
      center: res.data[0].id,
      name: res.data[0].name
    })
    }
  })
  },
  clk:function(){
    var center = this.data.center
    var name=this.data.name
    wx.showModal({
      content: '所选楼层：' + this.data.name,
      showCancel: true,
      success: function (res) {
        if (res.confirm) {
          wx.setStorageSync("center", center)
          wx.setStorageSync("centername", name)
          wx.reLaunch({ url: '../data/build' })
        } else if (res.cancel) {
        }
      }
    })
  }
  ,
  refresh: function () {
    var that = this
    that.setData({
      loading: true,
    })
    wx.request({
      url: 'https://www.aikatsucn.cn/center',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        campus: wx.getStorageSync('campus'),
        build: wx.getStorageSync('build')
      },
      method: 'POST',
      success: function (res) {
        that.setData({
          loading: false,
          result: res.data 
        })
      }
    })
  }
  ,
  cancel:function(){
  wx.reLaunch({url:'../index/index'})
  }
  ,
  bindChange: function(e) {
    this.setData({
    center:this.data.result[e.detail.value[1]].id,
    name: this.data.result[e.detail.value[1]].name
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})