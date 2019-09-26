//app.js
App({
  onLaunch: function () {
    /*
    检测用户是否已经授权并且已经选择身份
    如果已经授权跳转index页面
     */
    wx.getSetting({
      success(res) {
        let userInfo = res.authSetting["scope.userInfo"]
        if(userInfo){
          wx.navigateTo({
            url: '/pages/index/index',
          })
        }else{
          wx.navigateTo({
            url: '/pages/auth/auth',
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})