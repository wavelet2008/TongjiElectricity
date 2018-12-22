//app.js
App({
  onLaunch: function () {
    var that = this
    var infor = wx.getStorageSync("roominfor")
    if (infor) {
      this.globalData.roominfor = infor
    }
    wx.login({
      success: function (res) {
        var code = res.code; 
        wx.request({
          url: 'https://www.liuchangfreeman.xyz/TjserviceLogin',
          data: {
            code: code,
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: 'POST',
          success: function (res) {
            var openid = res.data.openid 
            wx.setStorageSync('openid', openid)
            var iv = '';
            var encryptedData = '';
            wx.getUserInfo({
              success: function (res) {
                encryptedData = res.encryptedData
                iv = res.iv
                wx.request({
                  url: 'https://www.liuchangfreeman.xyz/TjserviceRegister',
                  data: {
                    openid: openid,
                    iv: iv,
                    encryptedData: encryptedData
                  },
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  method: 'POST',
                  success: function (res) {
                    wx.setStorageSync('registered', true)
                  }
                })            
              }
            })
          }
        })
      }
    })
  },
  getUserInfo: function (cb) {//参数为cb,类型为函数
    var that = this
    if (this.globalData.userInfo) {//用户信息不为空
      typeof cb == "function" && cb(this.globalData.userInfo)//如果参数cb的类型为函数，那么执行cb,获取用户信息；
    } else {//如果用户信息为空，也就是说第一次调用getUserInfo，会调用用户登录接口。
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              console.log(res)
              that.globalData.userInfo = res.userInfo//把用户信息赋给globalData，如果再次调用getUserInfo函数的时候，不需要调用登录接口
              typeof cb == "function" && cb(that.globalData.userInfo)//如果参数cb类型为函数，执行cb,获取用户信息
            }
          })
        }
      })
    }
  },
  globalData:{
    roominfor:{},
    tempinfor:{},
    userInfo:null
  }
})