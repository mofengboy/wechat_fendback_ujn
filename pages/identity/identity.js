// pages/identity/identity.js
import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';
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
            // 身份是学生
            if (_this.data.identity==1){
              if (res.statusCode == 200) {
                wx.navigateTo({
                  url: '/pages/submitInfo/submitInfo',
                })
              }
            }else{
              // 老师身份审核
              Toast('你选择的身份是老师，已经提交审核请等待！');
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
                // 全局session,保存storage中
                let session = res.data.data.session3rd;
                wx.setStorage({
                  key: 'session',
                  data: session,
                })

 /*
   * 检测是否已经选择身份
   */
                wx.request({
                  url: 'https://suggestion.ujnxgzx.com/index/index/judgeIfSelect',
                  method: "GET",
                  header: {
                    'session': session
                  },
                  success(res) {
                    console.log(res)
                    // 已经选择身份跳转首页
                    if (res.data.statusCode == 200) {
                      Toast('你已经进行身份认证，正在跳转首页');
                      wx.navigateTo({
                        url: '/pages/index/index',
                      })
                    }
                  }
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