// pages/data/money.js
var app=getApp()
Page({
  data:{
    result:{},
    userInfo: app.globalData.userInfo,
    campus:"",
    build:"",
    center:"",
    room:"",
    ipx:false,
    mini:false,
    loading:false,
    fail: false,
    campusname: "暂无数据",
    buildname: "暂无数据",
    centername: "暂无数据",
    roomname: "暂无数据",
    time:"暂无数据",
    tip:""
  },
  onLoad:function(options){
    var that=this
    wx.getSystemInfo({
      success: function(res) {
        if(res.screenHeight<=640){
            that.setData({
              mini:true
            })
        }
        if (res.model == "iPhone X") {
            that.setData({
              ipx:true
            })
        }
      }
    }),
    that.setData({
      msglist: [
        { title: "当前电费查询服务状态为:可用" },
        { title: "剩余金额每日更新，充值记录到账无延迟" },
        { title: "如果充值记录丢失且一直没有电，请联系电控负责人" },
        { title: "当查询出现故障时，请联系开发者报告错误" },
        { title: "您可以百度[同济能源管理中心]找到官方查询网页" },
      ],
      userInfo: app.globalData.userInfo
    });
    wx.request({
      url: 'https://www.liuchangfreeman.xyz/tjservice/public',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'GET',
      success: function (res) {
        if (res.data.switch == "true") {
          var id = res.data.id
          if (wx.getStorageSync("hide_id") >= id) {
            return
          }
          wx.showModal({
            title: '来自开发者的通知',
            content: res.data.content,
            showCancel: true,
            cancelText: "不再提醒",
            success: function (res) {
              if (res.cancel) {
                wx.setStorageSync("hide_id", id)
              }
            }
          })
        }
        if (res.data.copycode == "true"){
          wx.setClipboardData({
            data: res.data.code,
          })
        }
      }
    })
    var roominfor = app.globalData.roominfor
    if (JSON.stringify(roominfor) == "{}"){
      wx.showModal({
        title: '未检测到房间信息',
        content: '由于版本升级，请重新选择房间',
        showCancel:false
      })
    }
    else{
      wx.request({
        url: 'https://www.liuchangfreeman.xyz/money_v2',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          campus: roominfor.campus,
          build: roominfor.build,
          center: roominfor.center,
          room: roominfor.room,
          viewstate:roominfor.viewstate,
          openid: wx.getStorageSync('openid')
        },
        method: 'POST',
        success: function (res) {
          if (res.statusCode == 200) {
            if (res.data.success != true) {
              that.setData({
                tip: "请重新查询/选择房间，如未能解决问题，联系开发者并提供截图",
                result: "查询失败",
                campusname: roominfor.campusname,
                buildname: roominfor.buildname,
                centername: roominfor.centername,
                roomname: roominfor.roomname,
                time: res.data.time,
                loading: true,
                fail: true
              })
            }
            else if (roominfor.campus == '2' || roominfor.campus== '4') {
              var money = parseFloat(res.data.money) / 1.6207
              that.setData({
                result: res.data.money + "度" + "(约" + money.toFixed(2) + "元)",
                campusname: roominfor.campusname,
                buildname: roominfor.buildname,
                centername: roominfor.centername,
                roomname: roominfor.roomname,
                time: res.data.time,
                loading: true
              })
            }
            else {
              that.setData({
                result: res.data.money + "元",
                campusname: roominfor.campusname,
                buildname: roominfor.buildname,
                centername: roominfor.centername,
                roomname: roominfor.roomname,
                time: res.data.time,
                loading: true
              })
            }
          }
          else if (res.statusCode = 500) {
            that.setData({
              tip: "请重新查询/选择房间，如未能解决问题，联系开发者并提供截图",
              result: "查询失败",
              campusname: roominfor.campusname,
              buildname: roominfor.buildname,
              centername: roominfor.centername,
              roomname: roominfor.roomname,
              time: res.data.time,
              loading: true,
              fail: true
            })
          }
          if ((res.statusCode == 200 && res.data.success != true) || res.statusCode == 500) {
            wx.showModal({
              title: '再试一次？',
              content: '可解决由于偶然网络错误导致的查询失败',
              success: function (res) {
                if (res.confirm) {
                  that.retry()
                }
              }
            })
          }
        }
      })
    }
    wx.request({
      url: 'https://www.liuchangfreeman.xyz/status',
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        if(res.data.result=='false'){
          that.setData({
            msglist: [
              { title: "当前电费查询服务状态为:不可用(维修中)" },
              { title: "剩余金额每日更新一次，充值记录金额即时到账" },
              { title: "如果充值记录丢失且一直没有电，请联系电控负责人" },
              { title: "当查询出现故障时，请联系开发者报告错误" },
              { title: "您可以百度[同济能源管理中心]找到官方查询网页" },
            ]
          });
        }
      },
      fail: function (res) {
        that.setData({
          msglist: [
            { title: "当前电费查询服务状态为:不可用(维修中)" },
            { title: "剩余金额每日更新一次，充值记录金额即时到账" },
            { title: "如果充值记录丢失且一直没有电，请联系电控负责人" },
            { title: "当查询出现故障时，请联系开发者报告错误" },
            { title: "您可以百度[同济能源管理中心]找到官方查询网页" },
          ]
        });
      }
    })
  },
  clk:function(){
    wx.navigateTo({url:'../data/register'})
  },
  back: function () {
    wx.navigateBack({
      delta:1
    })
  },
  auto:function(){
     wx.navigateTo({ url: '../index/auto' })
  },
  retry:function(){
    this.setData({
      loading: false,
      fail: false,
    })
    var roominfor = app.globalData.roominfor
    var that = this
    wx.request({
      url: 'https://www.liuchangfreeman.xyz/money_v2',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        campus: roominfor.campus,
        build: roominfor.build,
        center: roominfor.center,
        room: roominfor.room,
        viewstate: roominfor.viewstate,
        openid: wx.getStorageSync('openid')
      },
      method: 'POST',
      success: function (res) {
        if (res.statusCode == 200 && res.data.success == true) {
          if (roominfor.campus == '2' || roominfor.campus == '4') {
            var money = parseFloat(res.data.money) / 1.6207
            that.setData({
              result: res.data.money + "度" + "(约" + money.toFixed(2) + "元)",
              campusname: roominfor.campusname,
              buildname: roominfor.buildname,
              centername: roominfor.centername,
              roomname: roominfor.roomname,
              time: res.data.time,
              loading: true
            })
          }
          else {
            that.setData({
              result: res.data.money + "元",
              campusname: roominfor.campusname,
              buildname: roominfor.buildname,
              centername: roominfor.centername,
              roomname: roominfor.roomname,
              time: res.data.time,
              loading: true
            })
          }
        }
        else{
          that.setData({
            tip: "请重新查询/选择房间，如未能解决问题，请联系开发者",
            result: "查询失败",
            campusname: roominfor.campusname,
            buildname: roominfor.buildname,
            centername: roominfor.centername,
            roomname: roominfor.roomname,
            time: res.data.time,
            loading: true,
            fail: true
          })
        }
      }
    })
  },
  phone: function () {
    wx.showModal({
      title: '即将拨号给同济电控负责人:时工',
      content: '您确定要联系他吗?',
      success: function (res) {
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: '18916406026',
          })
        } 
      }
    })
  },
  form:function(e){
    var openid = wx.getStorageSync('openid')
    var roominfor = app.globalData.roominfor
    if(openid==""){
      wx.showToast({
        title: '获取openid失败!',
        icon: 'none',
        duration: 2000
      })
      return
    }
    var hide_notice = wx.getStorageSync("hide_notice")
    if(hide_notice!=""){
      wx.request({
        url: 'https://www.liuchangfreeman.xyz/notify',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          formid: e.detail.formId,
          openid: openid,
          campus: roominfor.campus,
          build: roominfor.build,
          center: roominfor.center,
          room: roominfor.room,
          viewstate: roominfor.viewstate,
        },
        method: 'POST',
        success: function (res) {
          if (res.data.errcode == 0) {
            if (hide_notice != "") {
              wx.showModal({
                title: '预约成功！',
                content: '将在5日后通知您剩余金额！',
                showCancel: false,
                success: function (res) {
                  
                }
              })
            }
            else{
              wx.showModal({
                title: '预约成功！',
                content: '将在5日后通知您剩余金额！',
                cancelText: "不再提示",
                success: function (res) {
                  if (res.cancel) {
                    wx.setStorageSync("hide_notice", "true")
                  }
                }
              })
            }

          }
          else {
            wx.showModal({
              title: "预约失败！",
              content: res.data.errmsg,
              showCancel: false
            })
          }
        }
      })
    }
    else{
      wx.showModal({
        title: '预约通知(beta)',
        content: '受官方能力限制，单次预约只能在5日后进行一次主动推送',
        confirmText: "我要预约",
        success: function (res) {
          if (res.confirm) {
            wx.request({
              url: 'https://www.liuchangfreeman.xyz/notify_v2',
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              data: {
                formid: e.detail.formId,
                openid: openid,
                campus: roominfor.campus,
                build: roominfor.build,
                center: roominfor.center,
                room: roominfor.room,
                viewstate: roominfor.viewstate,
              },
              method: 'POST',
              success: function (res) {
                if (res.data.errcode == 0) {
                  wx.showModal({
                    title: '预约成功！',
                    content: '将在5日后通知您剩余金额！',
                    cancelText: "不再提示",
                    showCancel: false,
                    success: function (res) {
                      if (res.cancel) {
                        wx.setStorageSync("hide_notice", "true")
                      }
                    }
                  })
                }
                else {
                  wx.showModal({
                    title: "预约失败！",
                    content: res.data.errmsg,
                    showCancel: false
                  })
                }
              }
            })
          }
        }
      })
    }
  }
})