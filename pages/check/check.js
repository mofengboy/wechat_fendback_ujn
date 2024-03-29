// pages/check/check.js
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    suggestion:'',
    reply_id:'',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let _this = this;
      wx.getStorage({
        key: 'session',
        success: res => {
          wx.request({
            url: 'https://suggestion.ujnxgzx.com/user/teacher/getSingleNoReply',
            method: 'GET',
            header: {
              "session": res.data
            },
            data: {
              id: options.id,
            },
            success: res => {
              this.reply_id = options.id;
              let info = res.data.data;
              _this.setData({
                info: info
              });
            }
          })
        }
      })
  },
  reply: function () {
    wx.navigateTo({
      url: '/pages/reply/reply?id=' + this.reply_id,
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