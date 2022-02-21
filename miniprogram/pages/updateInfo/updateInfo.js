
// pages/updateInfo/updateInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userInfo: {},
      phone: '',
  },

  saveChange() {
      wx.setStorageSync('userInfo', this.data.userInfo);
      wx.setStorageSync('phone', this.data.phone);
      wx.showToast({
        title: '修改成功',
      })
      wx.switchTab({
        url: '../person/person',
      })
  },

  updateAddress() {
      wx.navigateTo({
        url: '../address/address',
      })
  },

  updatePhone(e) {
      wx.cloud.callFunction({
          name: 'getUserPhone',
          data: {
              cloudID: e.detail.cloudID,
          },
          success: (res) => {
              this.setData({
                  phone: res.result.list[0].data.phoneNumber,
              })
          }
      })
  },

  updateNickName(e) {
     let userInfo = this.data.userInfo;
     userInfo.nickName = e.detail.value;
     this.setData({
         userInfo,
     })
  },

  updateAvatar() {
      let userInfo = this.data.userInfo;
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          wx.showLoading({
            title: '加载中',
          })
          const random = Math.floor(Math.random() * 1000);
          wx.cloud.uploadFile({
              cloudPath: `avatar/${this.data.userInfo.nickName}-${random}.png`,
              filePath: res.tempFilePaths[0],
              success: (res) => {
                  let fileID = res.fileID;
                  userInfo.avatarUrl = fileID;
                  this.setData({
                      userInfo,
                  })
                  wx.hideLoading()
              }
          })
        }
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      const userInfo = wx.getStorageSync('userInfo');
      const phone = wx.getStorageSync('phone');
      this.setData({
          userInfo,
          phone,
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
