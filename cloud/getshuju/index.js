// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:'test2-4g5yt2xp06308d62'
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  return cloud.database().collection("users").get();
}