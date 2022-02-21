// pages/person/person.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userInfo: {},
      hasUserInfo: false,
      canIUseGetUserProfile: false,
  },

  applyOrder() {
      wx.navigateTo({
        url: '../applyOrder/applyOrder',
      })
  },

  toAbout() {
      wx.navigateTo({
        url: '../aboutAs/aboutAs',
      })
  },

  getWXCustomer() {
      wx.setClipboardData({
        data: '18331092918',
        success: () => {
            wx.showToast({
              title: '复制微信成功',
            })
        }
      })
  },

  updateInfo() {
      if (this.data.hasUserInfo) {
          wx.navigateTo({
            url: '../updateInfo/updateInfo',
          })
      }
  },

  getPhoneNumber(e) {
      wx.cloud.callFunction({
          name: 'getUserPhone',
          data: {
              cloudID: e.detail.cloudID,
          },
          success: (res) => {
              wx.setStorageSync('phone', res.result.list[0].data.phoneNumber);
          },
      })
  },

  getUserProfile() {
      wx.getUserProfile({
        desc: '获取用户信息',
        success: (res) => {
            this.setData({
                userInfo: res.userInfo,
                hasUserInfo: true
            })
            wx.setStorageSync('userInfo', res.userInfo);
        }
      })
  },

  // 老接口
  getUserInfo(e) {
      this.setData({
          userInfo: e.detail.userInfo,
          hasUserInfo: true
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      if (wx.getUserProfile) {
          this.setData({
              canIUseGetUserProfile: true
          })
      }
      const userInfo = wx.getStorageSync('userInfo');
      this.setData({
          hasUserInfo: !!userInfo,
          userInfo: userInfo,
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
      this.onLoad();
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