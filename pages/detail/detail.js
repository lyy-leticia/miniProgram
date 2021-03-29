// pages/detail/detail.js
Page({
  onLaunch: function () {
    //云开发环境初始化
    wx.cloud.init({
      env:'test2-4g5yt2xp06308d62',
      traceUser:true,
    })
  },
  data:{
    detail:""
  },
  onLoad(options) {
    console.log("详情接收的id",options.id)
    wx.cloud.database().collection("users")
    .doc(options.id)
    .get()
    .then(res=>{
      console.log("详情页成功",res)
      this.setData({
        detail:res.data
      })
    })
    .catch(res=>{
      console.log("详情页失败",res)
    })
  }
})