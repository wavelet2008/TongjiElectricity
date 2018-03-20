//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    result:{},
    account:"",
    campusname:"",
    buildname:"",
    room:"",
    amount:'1',
    array: ['1','5','10','15', '20','25','30','35','40','45', '50'],
    loading:true,
    hide: true
  },
  pickerchange: function (e) {
    var array = this.data.array
    this.setData({
      amount: array[e.detail.value]
    })
  },
  onLoad: function () {
    var that = this
    var temp = wx.getStorageSync('account')
    if (temp != "") {
      that.setData({
        account: "已添加一卡通账号:" + temp,
        hide:false,
        room:wx.getStorageSync("Room"),
        campusname: wx.getStorageSync("xiaoquname"),
        buildname: wx.getStorageSync("Buildname"),
      })
    }
  },
  clk: function () {
    wx.navigateTo({ url: 'login' })
  },
  dopay: function () {
    var that=this
    wx.showModal({
      title: '您确定要充值吗?',
      content: '校区:'+that.data.buildname+'\r\n'+
      '房间:' + that.data.room + '\r\n'+
      '金额:' + that.data.amount + '元\r\n',
      success:function(res){
        if(res.confirm){
          that.setData({
            loading: false,
          })
          /*var account = wx.getStorageSync("account")
          var password = wx.getStorageSync("password")
          var build = wx.getStorageSync("Build")
          var buildName = wx.getStorageSync("BuildName")
          var xiaoqu = wx.getStorageSync("xiaoqu")
          var xiaoquName = wx.getStorageSync("xiaoquname")
          var room = wx.getStorageSync("Room")
          var amount = that.data.amount
          var bankpwd = wx.getStorageSync("Bankpwd")
          var paytypeCode = wx.getStorageSync("paytypecode")*/
          wx.request({
            url: 'https://www.aikatsucn.cn/DoPay',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
              account: wx.getStorageSync("account"),
              password : wx.getStorageSync("password"),
              build : wx.getStorageSync("Build"),
              buildName : wx.getStorageSync("Buildname"),
              xiaoqu : wx.getStorageSync("xiaoqu"),
              xiaoquName : wx.getStorageSync("xiaoquname"),
              room : wx.getStorageSync("Room"),
              amount : that.data.amount,
              bankpwd : wx.getStorageSync("Bankpwd"),
              paytypeCode : wx.getStorageSync("paytypecode")
            },
            method: 'POST',
            success: function (res) {
              that.setData({
                result: res.data,
                loading:true
              })
              var title=""
              if (res.data.success){
                  title="充值成功!"
              }
              else{
                title="充值失败!"
              }
              wx.showModal({
                title: title,
                content: res.data.msg,
                showCancel:false
              })
            }
          })
        }
      }
    })
  },
  rechoose:function () {
    wx.setStorageSync('autologin','true')
    wx.navigateTo({ url: 'login' })
  },
  search: function () {
    var c0 = wx.getStorageSync('campus')
    var b1 = wx.getStorageSync('build')
    var c2 = wx.getStorageSync('center')
    var r4 = wx.getStorageSync('room')
    if (c0 != "" && b1 != "" && c2 != "" && r4 != "") {
      wx.navigateTo({ url: '../data/money' })
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
    }
  },
})