// pages/identity/identity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 
   * 自定义函数
   * 
   */
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'session',
      success: function(res) {
        wx.request({
          url: 'https://suggestion.ujnxgzx.com/index/index/judgeIfSelect',
          method:"GET",
          header:{
            'session':res.data
          },
          success(res){
            // 未选择身份返回授权页面
            if (res.data.statusCode!=200){
              console.log(22);
              wx.navigateTo({
                url: '/pages/auth/auth',
              })
            }
          }
        })
      },
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