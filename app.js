//app.js
App({
  onLaunch: function () {
    //云开发环境初始化
    wx.cloud.init({
      env:'test2-4g5yt2xp06308d62',
      traceUser:true,
    })
  }
})