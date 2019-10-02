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
          /*
          *此时发送登陆请求
          */
          wx.login({
            success(res) {
              let code = res.code;
              wx.getUserInfo({
                success: function (res) {
                  let rawData = res.rawData;
                  let signature = res.signature;
                  let encryptedData = res.encryptedData;
                  let iv = res.iv;
                  wx.request({
                    url: 'http://suggestion.ujnxgzx.com/wxlogin/index/login',
                    method: "POST",
                    header: {
                      'content-type': 'application/json'
                    },
                    data: {
                      code: code,
                      rawData: rawData,
                      signature: signature,
                      encryptedData: encryptedData,
                      iv: iv
                    },
                    success(res) {
                      // 是否完成身份认证
                      let status = res.data.data.status;

                      // 全局session,保存storage中
                      let session = res.data.data.sessionKey;
                      wx.setStorage({
                        key: 'session',
                        data: session,
                      })
                    }
                  })
                }
              })
            }
          })
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