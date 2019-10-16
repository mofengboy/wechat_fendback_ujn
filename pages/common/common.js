// pages/common/common.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 1,
    info:'',
    is_teacher:false
  },
    /*
   * 判断用户类型并选择返回类型
   */
  checkUserType:function(){
    let _this = this;
    wx.getStorage({
      key: 'session',
      success: function (res) {
        wx.request({
          url: 'https://suggestion.ujnxgzx.com/index/index/getUserMoreInfo',
          method: "GET",
          header: {
            'session': res.data
          },
          success: function (res) {
            let user_type = res.data.data.user_type;
            // 获取老师未回复建议
            if (user_type == 2) {
              _this.setData({
                is_teacher:true
              });
            }
            // 学生提交建议
            if(user_type==1){
              _this.setData({
                is_teacher: false
              });
            }
          }
        })
      },
    })
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
  
  /*
   * 判断用户类型并选择返回类型
   */
  checkUserType: function () {
    let _this = this;
    wx.getStorage({
      key: 'session',
      success: function (res) {
        wx.request({
          url: 'https://suggestion.ujnxgzx.com/index/index/getUserMoreInfo',
          method: "GET",
          header: {
            'session': res.data
          },
          success: function (res) {
            let user_type = res.data.data.user_type;
            // 获取老师未回复建议
            if (user_type == 2) {
              _this.setData({
                is_teacher: true
              });
            }
            // 学生提交建议
            if (user_type == 1) {
              _this.setData({
                is_teacher: false
              });

            }
          }
        })
      },
    })
  },
/**
 * 常见问题
 */
question:function(){
  let _this = this;
  wx.getStorage({
    key: 'session',
    success: function (res) {
      wx.request({
        url: 'https://suggestion.ujnxgzx.com/index/index/getPublicList',
        method: "GET",
        header: {
          'session': res.data
        },
        success(res) {
          let info = res.data.data;
          _this.setData({
            info:info
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
    this.checkUserType()
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