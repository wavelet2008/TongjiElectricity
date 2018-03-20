// pages/data/search.js
Page({
   data:{
   title:"校区选择",
   result:[],
   campus:"",
   index:0,
   name:"",
   loading: false,
   temp:{}
  },
  onLoad:function(options){
    var that=this
    that.setData({
      loading: true,
    })
    wx.request({
      url:'https://www.aikatsucn.cn/campus',
      method: 'GET',
      success: function(res){
        that.setData({
          loading: false,
          result:res.data,
          campus: res.data[0].id,
          name: res.data[0].name
        })
      }
    })
  },
  clk:function(){
    var campus = this.data.campus
    var name=this.data.name
      wx.showModal({
        content: '所选校区：'+this.data.name,
        showCancel:true,
        success: function (res) {
          if (res.confirm) {
            wx.setStorageSync("campus", campus)
            wx.setStorageSync("campusname", name)
            wx.reLaunch({ url: '../data/campus' })
          } 
        }
      })
  }
  ,
  cancel:function(){
    wx.reLaunch({url:'../index/index'})
  }
  ,
  onReady:function(){
  }
 ,
  refresh: function (e) {
    var that = this
    that.setData({
      loading: true,
    })
    wx.request({
      url: 'https://www.aikatsucn.cn/campus',
      method: 'GET',
      success: function (res) { 
        that.setData({ 
          loading: false,
          result: res.data 
        }) 
      }
    })
   },
  bindChange: function(e) {
    this.setData({
    campus:this.data.result[e.detail.value[1]].id,
    name: this.data.result[e.detail.value[1]].name
    })
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
   // wx.navigateTo({url:'../index/index'})
  },
  onUnload:function(){
  //  wx.navigateTo({url:'../index/index'})
  },
})