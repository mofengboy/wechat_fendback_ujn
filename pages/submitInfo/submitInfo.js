// pages/submitInfo/submitInfo.js
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sno:'',
    name:''
  },

  /**
   * 
   * 自定义函数
   * 
   */
  // 实时改变输入到data的数据
  sno_change:function(event){
    this.setData({
      sno: event.detail
    })
  },
  name_change: function (event) {
    this.setData({
      name: event.detail
    })
  },

  //
  sunmiit_info:function(){
    let _this = this;
    wx.getStorage({
      key: 'session',
      success: function(res) {
        let session  = res.data;
        wx.request({
          url: 'https://suggestion.ujnxgzx.com/index/index/testing',
          method:"GET",
          header:{
            'session':session
          },
          data:{
            sno: _this.data.sno,
            name: _this.data.name
          },
          success(res){
            if(res.data.statusCode==200){
              wx.navigateTo({
                url: '/pages/index/index',
              })
            }else{
              Dialog.alert({
                title: '验证错误',
                message: '请核对你的姓名与学号！'
              })
            }
          }
        })
      },
    })
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