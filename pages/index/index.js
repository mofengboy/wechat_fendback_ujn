// pages/identity/identity.js
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    is_teacher:false,
    info:'',
    title:'',
    content:''
  },

  /**
   * 
   * 自定义函数
   * 
   */
  // event.detail 的值为当前选中项的索引
  onChange(event) {
    console.log(event.detail);
  },

  // 实时改变输入到data的数据
  titleChange: function (event) {
    this.setData({
      title: event.detail
    })
  },
  contentChange: function (event) {
    this.setData({
      content: event.detail
    })
  },
  /*
   * 检测用户是否选择身份
   */
  judgeIfSelect:function(){
    wx.getStorage({
      key: 'session',
      success: function (res) {
        wx.request({
          url: 'https://suggestion.ujnxgzx.com/index/index/judgeIfSelect',
          method: "GET",
          header: {
            'session': res.data
          },
          success(res) {
            // 未选择身份返回授权页面
            if (res.data.statusCode != 200) {
              wx.navigateTo({
                url: '/pages/auth/auth',
              })
            }
          }
        })
      },
    })
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
              _this.getSuggestionsNoReply();
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

    /*
    * 老师获取未回复建议
    */
  getSuggestionsNoReply:function(){
    let _this = this;
    wx.getStorage({
      key: 'session',
      success: function (res) {
        wx.request({
          url: 'https://suggestion.ujnxgzx.com/user/teacher/getSuggestionsNoReply',
          method: 'GET',
          header: {
            'session': res.data
          },
          success: function (res) {
            let info = res.data.data;
            _this.setData({
              info: info
            });
          }
        })
      },
    })
  },

  /*
  *
  */

  subSuggestion:function(){
    let _this = this;
    wx.getStorage({
      key: 'session',
      success: function(res) {
        wx.request({
          url: 'https://suggestion.ujnxgzx.com/user/index/subSuggestion',
          method:"POST",
          header:{
            "session":res.data
          },
          data:{
            title:_this.data.title,
            suggestion:_this.data.content
          },
          success:function(res){
            Dialog.alert({
              title: '提交成功',
              message: '已经提交成功,相关老师会仔细查看你的意见或建议！'
            }).then(() => {
              // on close
              wx.redirectTo({
                url: '/pages/index/index',
              })
            });
          }
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    /*
     * 检测用户是否选择身份
     */
    this.judgeIfSelect();

    /*
    * 处理用户身份
    */
    this.checkUserType();
    
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
    let jumpUrl = "/pages/index/index";
    switch (e.detail) {
      case 0: jumpUrl = "/pages/index/index";
        break;
      case 1: if(this.data.is_teacher == true){
        jumpUrl = "/pages/personal/personal";
        }else
        jumpUrl = "/pages/details/details";
        break;
    }
    wx.reLaunch({
      url: jumpUrl,
    })
  }
})