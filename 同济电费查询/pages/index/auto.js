Page({
  data: {
    information:"接收警报的邮箱地址",
    statustext:"开",
    array: ['10.0', '20.0', '50.0', '100.0', '200.0'],
    campus: "",
    build:"",
    center:"",
    room:"",
    email:"",
    status:"on",
    level:"10.0",
    sth:true,
    warn:false,
    loading:true
  },

  namechange: function (e) {
    if (e.detail) {
      if (e.detail.value.length > 0) {
        this.setData({
          email: e.detail.value
        })
      }
    } else {
      this.setData({
        email: ""
      })
    }
  },

  sthchange: function (e) {
      if (e.detail.value==false) {
        this.setData({
          status: "off",
          sth: e.detail.value,
          statustext:"关"
        })
      }
      else{
        this.setData({
          status: "on",
          sth: e.detail.value,
          statustext:"开"
        })
      }
    }
  ,
  pickerchange: function (e) {
      var array=this.data.array
      this.setData({
        level: array[e.detail.value]
      })
   }
  ,
  onLoad: function () {
       var  campus=wx.getStorageSync('campus')
    var  build=wx.getStorageSync('build')
    var  center=wx.getStorageSync('center')
    var  room=wx.getStorageSync('room')   
    var that=this
wx.request({
        url: 'https://www.tjservice.cn/status',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          campus: campus,
          build:build,
          center:center,
          room:room,
        },
        method: 'POST',
        success: function (res) {
         that.setData({
            information:res.data.email
          })
          if(res.data.status=="on"){
          wx.showModal({
            content: "预警服务已开启,金额阈值为:￥"+res.data.level,
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
              }
            }
          });
        }
        else if(res.data.status=="off"){
            wx.showModal({
            content: "预警服务已关闭,金额阈值为:￥"+res.data.level,
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
              }
            }
          });
        }
        }
        })
  },
  clk:function(){
    var  campus=wx.getStorageSync('campus')
    var  build=wx.getStorageSync('build')
    var  center=wx.getStorageSync('center')
    var  room=wx.getStorageSync('room')
     var  campusname=wx.getStorageSync('campusname')
    var  buildname=wx.getStorageSync('buildname')
    var  centername=wx.getStorageSync('centername')
    var  roomname=wx.getStorageSync('roomname')
    var email = this.data.email
    var status = this.data.status
    var level = this.data.level
    var that=this
    if (email == '' || status== '' ){
      this.setData({
        warn:true
      })
      setTimeout(function () {
        that.setData({
          warn: false
        })
      }, 3000)
    }
    else{
      this.setData({
        loading: false
      })
      wx.request({
        url: 'https://www.tjservice.cn/register',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          campus: campus,
          build:build,
          center:center,
          room:room,
          campusname: campusname,
          buildname:buildname,
          centername:centername,
          roomname:roomname,
          email: email,
          status: status,
          level: level
        },
        method: 'POST',
        success: function (res) {
         that.setData({
            loading: true
          })
          wx.showModal({
            content: res.data,
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
              }
            }
          });
        }
      })
    }
  },
    dele:function(){
    var  campus=wx.getStorageSync('campus')
    var  build=wx.getStorageSync('build')
    var  center=wx.getStorageSync('center')
    var  room=wx.getStorageSync('room')
     var  campusname=wx.getStorageSync('campusname')
    var  buildname=wx.getStorageSync('buildname')
    var  centername=wx.getStorageSync('centername')
    var  roomname=wx.getStorageSync('roomname')
    var that =this
      this.setData({
        loading: false
      })
      wx.request({
        url: 'https://www.tjservice.cn/delete',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          campus: campus,
          build:build,
          center:center,
          room:room,
          campusname: campusname,
          buildname:buildname,
          centername:centername,
          roomname:roomname,
        },
        method: 'POST',
        success: function (res) {
         that.setData({
            loading: true
          })
          wx.showModal({
            content: res.data,
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
              }
            }
          });
        }
      })
    }
})