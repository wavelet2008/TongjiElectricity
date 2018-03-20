// pages/data/campus.js
Page({
  data:{
    title:"校区选择",
    result:[],
    name:'',
    paytypecode:"",
  },
  onLoad:function(options){
    var that=this
    wx.request({
      url: 'https://www.aikatsucn.cn/Campus',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: {
     account:wx.getStorageSync('account')
    },
    method: 'POST',
    success: function(res){
      that.setData({
        result:res.data.data,
        paytypecode: res.data.data[0].value,
        name: res.data.data[0].name
      })
    }
  })
  },
  clk:function(){
    var build = this.data.build
    var name=this.data.name
    var that=this
    wx.showModal({
      content: '所选校区：' + this.data.name,
      showCancel: true,
      success: function (res) {
        if (res.confirm) {
          wx.setStorageSync("paytypecode", that.data.paytypecode)
          wx.reLaunch({ url: '../wallet/xiaoqu' })
        } 
      }
    })
  }
  ,
  refresh: function () {
    var that = this
    wx.request({
      url: 'https://www.aikatsucn.cn/Campus',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        account: wx.getStorageSync('account')
      },
      method: 'POST',
      success: function (res) {
        that.setData({
          result: res.data,
          paytypecode: res.data[0].value,
          name: res.data[0].name
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
      paytypecode: this.data.result[e.detail.value[1]].value,
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