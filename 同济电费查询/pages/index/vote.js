// pages/index/vote.js
Page({
data:{
    content:'',
    dis:true,
    cnt:0,
    tip:''
  },
 charChange: function (e) {
   if (e.detail && e.detail.value.length > 0) {
     if (e.detail.value.length < 1 || e.detail.value.length > 50) {
       this.setData({
         cnt: e.detail.value.length,
       })
     } else {
       this.setData({
         cnt: e.detail.value.length,
         content: e.detail.value,
         dis:false
       })
     }
   } else {
     this.setData({
       content: '',
       cnt:0,
     })
   }
},
  submit:function(){
    var that=this
    var tip = this.data.tip
    wx.request({
      url: 'https://www.aikatsucn.cn/notice',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: {
     content:this.data.content
    },
    method: 'POST',
    success: function(res){
      that.setData({
      tip:res.data
    })
    wx.showModal({
      title: '操作完成',
      content: tip,
      confirmText: "确定",
      success: function (res) {
      }
    });
    }
  })
  }
})