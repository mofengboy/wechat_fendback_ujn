// pages/reply_received/reply_received.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{
      reply:"za"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    wx.getStorage({
      key: 'session',
      success: res => {
        console.log(this.data)
        wx.request({
          url: 'https://suggestion.ujnxgzx.com/user/index/getSingleSuggestion',
          method: 'GET',
          header: {
            "session": res.data
          },
          data: {
            id: options.id,
          },
          success: res => {
            console.log(res);
            let info = res.data.data;
            if(!info.reply_status){
              info.reply = "暂无回复！"
            }
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

  }
})