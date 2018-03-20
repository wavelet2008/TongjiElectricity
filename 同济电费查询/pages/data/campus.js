// pages/data/campus.js
Page({
  data:{
    title:"楼栋选择",
    result:[],
    campus:"",
    build:"",
    loading: false,
    name:""
  },
  onLoad:function(options){
    var that=this
    that.setData({
      loading: true,
    })
    wx.request({
    url: 'https://www.aikatsucn.cn/build',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: {
     campus:wx.getStorageSync('campus')
    },
    method: 'POST',
    success: function(res){
    that.setData({
      loading: false,
      result:res.data,
      build: res.data[0].id,
      name: res.data[0].name
    })
    }
  })
  },
  clk:function(){
    var build = this.data.build
        var name=this.data.name
    wx.showModal({
      content: '所选楼栋：' + this.data.name,
      showCancel: true,
      success: function (res) {
        if (res.confirm) {
          wx.setStorageSync("build", build)
          wx.setStorageSync("buildname", name)
          wx.reLaunch({ url: '../data/center' })
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
      url: 'https://www.aikatsucn.cn/build',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        campus: wx.getStorageSync('campus')
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
    build:this.data.result[e.detail.value[1]].id,
    name: this.data.result[e.detail.value[1]].name
    })
  },
   onReady:function(){
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