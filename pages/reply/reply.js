// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: ''
  },
  /**
   * 自定义函数
   * 
   */
  confirm: function (e) {
    let _this = this;
    wx.getStorage({
      key: 'session',
      success: res => {
        console.log(this.data)
        wx.request({
          url: 'https://suggestion.ujnxgzx.com/user/teacher/replaySuggestion',
          method: 'POST',
          header: {
            "session": res.data
          },
          data: {
            id: options.id,
            reply: e.detail.value.content
          },
          success: res => {
            if (res == 0) {
              wx.showToast({
                title: '提交成功',
                icon: 'success',
                duration: 1500
              })
              setTimeout(function () {
                wx.navigateBack({})
              }, 1500)
            }
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var reply_id = options.id;
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