// pages/personal/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 2,
    content: ''
  },
  /**
   * 自定义函数
   * 
   */
  onChange: function (e) {
    let jumpUrl = "/pages/index/index";
    switch (e.detail) {
      case 0: jumpUrl = "/pages/index/index";
        break;
      case 1: jumpUrl = "/pages/common/common";
        break;
      case 2: if (this.data.is_teacher == true) {
        jumpUrl = "/pages/personal/personal";
      } else
        jumpUrl = "/pages/personal_stu/personal";
        break;
    }
    wx.reLaunch({
      url: jumpUrl,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getUserInfo({
      success(res) {
        that.setData({
          userInfo: res.userInfo,
          nickName: res.userInfo.nickName
        })
      }
    })
    wx.getStorage({
      key: 'session',
      success: res => {
        wx.request({
          url: 'https://suggestion.ujnxgzx.com/index/index/getUserMoreInfo',
          method: 'GET',
          header: {
            "session": res.data
          },
          success: res => {
            console.log(res);
            this.setData({
              real_Name: res.data.data.name
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

  },
  
})
