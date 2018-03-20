Page({
  data: {
    motto: '统一验证登录',
    account: '',
    password: '',
    Bankpwd:'',
    loading:false,
    result: {},
  },
  NameInput: function (e) {
    this.setData({
      account: e.detail.value
    })
  },
  PasswordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  BankpwdInput: function (e) {
    this.setData({
      Bankpwd: e.detail.value
    })
  },
  onLoad: function () {
    this.setData({
      account: wx.getStorageSync('account'),
      password: wx.getStorageSync('password'),
      Bankpwd: wx.getStorageSync('Bankpwd'),
      loading:true,
    })
    var auto = wx.getStorageSync('autologin')
    if(auto=='true'){
      this.Login()
    }
  },
  Login: function () {
    var that = this
    wx.request({
      url: 'https://www.aikatsucn.cn/WalletLogin',
      data: {
        account: this.data.account,
        password: this.data.password,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        that.setData({
          result: res.data,
          loading: false,
        })
        if (res.data.success==true){
          if(wx.getStorageSync("autologin")=='true'){
            wx.setStorageSync('autologin', 'false')
            wx.navigateTo({
              url: '../wallet/campus'
            })
          }
          wx.showModal({
            title: '成功!',
            content: '保存您的账号并选择房间信息？',
            success:function(res){
              if(res.confirm){
                try {
                  wx.setStorageSync('account', that.data.account)
                  wx.setStorageSync('password', that.data.password)
                  wx.setStorageSync('Bankpwd', that.data.Bankpwd)
                }
                catch (e) {
                }
                wx.navigateTo({
                  url: '../wallet/campus'
                })
              }
            }
          })
        }
        else{
          wx.showModal({
            title: '登录失败!',
            content: res.data.msg,
            showCancel:false
          })
        }
      },
      fail: function (res) {
        console.log(res.data);
      }
    })
  },
  Logout: function () {
    wx.removeStorageSync('account')
    wx.removeStorageSync('password')
    wx.removeStorageSync('Bankpwd')
    this.setData({
      account: "",
      password: ""
    })
    wx.showModal({
      title: '注销成功!',
      content: '账号信息已清除',
      showCancel:false
    })
  },
})  