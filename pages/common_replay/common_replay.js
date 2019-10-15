// pages/common_replay/common_replay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    info:''
  },

  question: function () {
    let _this = this;
    wx.getStorage({
      key: 'session',
      success: function (res) {
        wx.request({
          url: 'https://suggestion.ujnxgzx.com/index/index/getSinglePublic',
          method: "GET",
          header: {
            'session': res.data
          },
          data:{
            id:_this.data.id
          },
          success(res) {
            let info = res.data.data;
            console.log(info);
            _this.setData({
              info: info
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
    this.setData({
      id:options.id
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
    this.question();
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