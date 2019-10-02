// pages/identity/identity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    identity:1
  },

  /**
   * 
   * 自定义函数
   * 
   */
  identity_change:function(event){
    this.setData({
      identity:event.detail.value
    })
  },

  wx_auth:function(){
    let _this = this;
    wx.getStorage({
      key: 'session',
      success: function(res) {
        wx.request({
          url: 'https://suggestion.ujnxgzx.com/index/index/chooseType',
          method: "POST",
          header: {
            "session": res.data
          },
          data:{
            'type': _this.data.identity
          },
          success(res){
            console.log(res)
            wx.navigateTo({
              url: '/pages/submitInfo/submitInfo',
            })
          }
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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