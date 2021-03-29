//index.js
const db = wx.cloud.database().collection("list")
let name=""
let age=""
let id=""
Page({
  //获取用户输入的name
  addName(event){
    console.log(event.detail.value)
    name=event.detail.value
  },
  //获取用户输入的age
  addAge(event){
    console.log(event.detail.value)
    age=event.detail.value
  },
  //要删除的id
  delDataInput(event){
    console.log("要删除的id",event.detail.value)
    id=event.detail.value
  },
    //要更新的id
    updDataInput(event){
      id=event.detail.value
    },
    //要更新的年龄
    updAge(event){
      age=event.detail.value
    },
  addLog(event){
    const add=event.currentTarget.dataset.add
    console.log("add",add)
    //获取缓存中的openid
    const ui = wx.getStorageSync("userinfo")
    //不存在跳转到登录页面
    if(!ui.openid){
      wx.switchTab({
        url: '/pages/me/me',
      })
    }else{
      wx.cloud.callFunction({
        name: "createlog",
        data: {
          add: add,
          date: Date.now(),
          openid: ui.openid
        }
      })
    } 
  },
  //添加数据
  addData(){
      db.add({
        data:{
          name:name,
          age:age,
        },
        success(res){
            console.log("添加成功",res)
        },
        fail(res){
          console.log("添加失败",res)
        }
      })
  },
  //删除数据
  delData(){
    db.doc(id).remove({
      success(res){
        console.log("删除成功",res)
    },
    fail(res){
      console.log("删除失败",res)
    }
    })
  },
  //修改数据
  updData(){
    db.doc(id).update({
      data: {
        // 表示将 done 字段置为 true
        age: age
      },
      success(res){
        console.log("更新成功",res)
    },
    fail(res){
      console.log("更新失败",res)
    }
    })
  },
//查询数据
  getData(){
    db.get({
      success(res){
        console.log("查询数据成功",res)
    },
    fail(res){
      console.log("查询数据失败",res)
    }
    })
  },

  
})
