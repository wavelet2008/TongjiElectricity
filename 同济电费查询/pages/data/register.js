// pages/data/campus.js
var app = getApp()
Page({
  data: {
    title: "校区",
    result: [],
    room: {},
    value:[0,0,0],
    id: "",
    name: "",
    loading: false,
    level: 0,
    viewstate_campus: "",
    viewstate_build: "",
    viewstate_center: "",
    viewstate_room: "",
  },
  onLoad: function(options) {
    this.load()
  },
  load: function() {
    var that = this
    that.setData({
      loading: true,
    })
    var path = ""
    var data = {}
    switch (that.data.level) {
      case 0:
        {
          path = "campus_v2"
        };
        break;
      case 1:
        {
          path = "build_v2"
          data.campus = app.globalData.tempinfor.campus
          data.viewstate = that.data.viewstate_campus
        };
        break;
      case 2:
        {
          path = "center_v2"
          data.campus = app.globalData.tempinfor.campus
          data.build = app.globalData.tempinfor.build
          data.viewstate = that.data.viewstate_build
        };
        break;
      case 3:
        {
          path = "room_v2"
          data.campus = app.globalData.tempinfor.campus
          data.build = app.globalData.tempinfor.build
          data.center = app.globalData.tempinfor.center
          data.viewstate = that.data.viewstate_center
        };
        break;
      default:
        ;
        break;
    }
    wx.request({
      url: 'https://www.liuchangfreeman.xyz/' + path,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: data,
      method: 'POST',
      success: function(res) {
        that.setData({
          loading: false,
          result: res.data.data,
          id: res.data.data[0].id,
          name: res.data.data[0].name,
          value: [0, 0, 0]
        })
        if (that.data.level == 0) {
          that.setData({
            viewstate_campus: res.data.viewstate
          })
        } else if (that.data.level == 1) {
          that.setData({
            viewstate_build: res.data.viewstate
          })
        } else if (that.data.level == 2) {
          that.setData({
            viewstate_center: res.data.viewstate
          })
        } else if (that.data.level == 3) {
          that.setData({
            viewstate_room: res.data.viewstate
          })
        }
      }
    })
  },
  clk: function() {
    var id = this.data.id
    var name = this.data.name
    var that = this
    wx.showModal({
      content: '所选' + that.data.title + '：' + this.data.name,
      showCancel: true,
      success: function(res) {
        if (res.confirm) {
          if (that.data.level == 0) {
            app.globalData.tempinfor.campus = id
            app.globalData.tempinfor.campusname = name
            that.setData({
              level: 1,
              title: "楼栋"
            })
          } else if (that.data.level == 1) {
            app.globalData.tempinfor.build = id
            app.globalData.tempinfor.buildname = name
            that.setData({
              level: 2,
              title: "楼层"
            })
          } else if (that.data.level == 2) {
            app.globalData.tempinfor.center = id
            app.globalData.tempinfor.centername = name
            that.setData({
              level: 3,
              title: "房间"
            })
          } else if (that.data.level == 3) {
            app.globalData.tempinfor.room = id
            app.globalData.tempinfor.roomname = name
            app.globalData.tempinfor.viewstate = that.data.viewstate_room
            wx.setStorageSync("roominfor", app.globalData.tempinfor)
            app.globalData.roominfor = app.globalData.tempinfor
            wx.reLaunch({
              url: '../index/index',
            })
          }
          that.load()
        }
      }
    })
  },
  refresh: function() {
    this.load()
  },
  cancel: function() {
    wx.showModal({
      title: '您确定要离开?',
      content: '所做的选择将不会保存',
      success: function(res) {
        if (res.confirm) {
          wx.reLaunch({
            url: '../index/index',
          })
        }
      }
    })

  },
  back: function() {
    var that = this
    if (that.data.level == 1) {
      that.setData({
        level: 0,
        title: "校区"
      })
    } else if (that.data.level == 2) {
      that.setData({
        level: 1,
        title: "楼栋"
      })
    } else if (that.data.level == 3) {
      that.setData({
        level: 2,
        title: "楼层"
      })
    }
    that.load()
  },
  bindChange: function(e) {
    this.setData({
      id: this.data.result[e.detail.value[1]].id,
      name: this.data.result[e.detail.value[1]].name
    })
  }
})