// pages/personal/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 1,
    content: ''
  },
  /**
   * 自定义函数
   * 
   */


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getUserInfo({
      success(res) {
        console.log(res);
        that.setData({
          userInfo: res.userInfo,
          nickName: res.userInfo.nickName
        })
      }
    })
    let _this = this;
    wx.getStorage({
      key: 'session',
      success: res => {
        console.log(this.data)
        wx.request({
          url: 'https://suggestion.ujnxgzx.com/user/index/getAllSuggestion',
          method: 'GET',
          header: {
            "session": res.data
          },
          success: res => {
            console.log(res);
            let info = res.data.data;
            _this.setData({
              info: info
            });
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

  },

  onChange: function (e) {
    let jumpUrl = "/pages/personal/personal";
    switch (e.detail) {
      case 0: jumpUrl = "/pages/index/index";
        break;
      case 1: jumpUrl = "/pages/personal/personal";
        break;
    }
    wx.reLaunch({
      url: jumpUrl,
    })
  }
  
})
