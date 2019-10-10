// pages/wait/wait.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    /*
    检测用户是否已经授权并且已经选择身份
    如果已经授权跳转index页面
     */

    wx.getSetting({
      success(res) {
        let userInfo = res.authSetting["scope.userInfo"]
        if (userInfo) {
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
                    url: 'https://suggestion.ujnxgzx.com/wxlogin/index/login',
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
                      let status_code = res.data.data.status;
                      // 未选择身份返回授权页面
                      if (!status_code) {
                        wx.navigateTo({
                          url: '/pages/auth/auth',
                        })
                      }

                      // 全局session,保存storage中
                      let session = res.data.data.session3rd;
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
          wx.redirectTo({
            url: '/pages/index/index',
          })
        } else {
          wx.redirectTo({
            url: '/pages/auth/auth',
          })
        }
      },
      fail() {
        wx.redirectTo({
          url: '/pages/auth/auth',
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})