//logs.js
const util = require('../../utils/util.js')
let totalNum=-1
Page({
  data:{
    datalist:[],
    list:[],
    imgUrl:""
  },
  //第一个云函数
  qiuhe(){
    wx.cloud.callFunction({
      name:"add",
      data:{
        a: 14,
        b: 9
      },
      success(res){
        console.log("请求成功",res)
      },
      fail(res){
        console.log("请求失败",res)
      }
    })
  },
  //第二个云函数getoid
  getopenid(){
    wx.cloud.callFunction({
      name:"getopenid",
      success(res){
        console.log("请求成功",res.result.openid)
      },
      fail(res){
        console.log("请求失败",res)
      }
    })
  },
  //加载数据
  getDataList(){
    let len = this.data.list.length
    if(totalNum==len){
      wx.showToast({
        title: '数据已加载完',
      })
      return
    }
    wx.showLoading({
      title: '加载中',
    })
    
    console.log("list的长度",len)
    wx.cloud.database().collection("users")
    .skip(len)
    .limit(5)
    .get()
    .then(res =>{
      console.log("请求数据库成功",res)
      this.setData({
      list:this.data.list.concat(res.data)
      })
      wx.hideLoading()
    })
    .catch(res=>{
      console.log("获取失败",res)
      wx.hideLoading()
      wx.showToast({
        title: '加载失败',
      })
    })
  },
  //生命周期函数，监听页面加载
  onLoad:function(options){
    wx.cloud.database().collection("users").count()
    .then(res=>{
      console.log("数据总条数",res)
      totalNum=res.total
    })
    this.getDataList()
  },
  //页面上拉触底事件的处理函数
  onReachBottom:function(){
    console.log("加载更多。。。")
    this.getDataList()
  },
  //数据库api获取数据
  shujuku(){
    let that=this
    wx.cloud.database().collection("users")
    .skip(1)
    .limit(5)
    .get({
      success(res){
        console.log("请求数据库成功",res)
        that.setData({
          datalist:res.data
        })
      },
      fail(res){
        console.log("请求数据库失败",res)
      }
    })
  },
  //云函数获取数据
  yunhanshu(){
    let that=this
    wx.cloud.callFunction({
      name:"getList",
      success(res){
        console.log("云函数请求数据成功",res)
        that.setData({
          datalist:res.result.data
        })
      },
      fail(res){
        console.log("云函数请求数据失败",res)
      }
    })
  },
  //上传图片
  upload(){
    let that=this;
    console.log("点击了上传")
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        console.log("选择成功",res)
        that.uploadImag(res.tempFilePaths[0]);
      }
    })
  },
  uploadImag(fileUrl){
    wx.cloud.uploadFile({
      cloudPath: new Date().getTime()+'.png', // 上传至云端的路径
      filePath: fileUrl, // 小程序临时文件路径
      success: res => {
        // 返回文件 ID
        console.log("上传成功",res)
        this.setData({
          imgUrl:res.fileID
        })
      },
      fail: console.error
    })
  },
  //跳转到详情页
  goDetail(event){
    console.log("点击获取的数据",event.currentTarget.dataset.item)
    wx.navigateTo({
      url:'/pages/detail/detail?id='+event.currentTarget.dataset.item,
    })
  }

})
