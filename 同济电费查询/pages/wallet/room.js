Page({
  data: {
    motto: '请您填写房间号',
    room: '',
    result: {},
  },
  RoomInput: function (e) {
    this.setData({
      room: e.detail.value
    })
  },
  onLoad: function () {
  },
  Login: function () {
    var that = this
    wx.request({
      url: 'https://www.aikatsucn.cn/Room',
      data: {
        account:wx.getStorageSync('account'),
        build: wx.getStorageSync('Build'),
        buildName: wx.getStorageSync('Buildname'),
        room:that.data.room
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        that.setData({
          result: res.data,
        })
        if (res.data.success == true) {
          wx.showModal({
            title: '成功!',
            content: '保存您的房间信息？',
            success: function (res) {
              if (res.confirm) {
                try {
                  wx.setStorageSync('Room', that.data.room)
                }
                catch (e) {
                }
                wx.navigateTo({
                  url: '../wallet/index'
                })
              }
            }
          })
        }
        else {
          wx.showModal({
            title: '验证失败!',
            content: res.data.msg,
            showCancel: false
          })
        }
      },
      fail: function (res) {
        console.log(res.data);
      }
    })
  }
})  