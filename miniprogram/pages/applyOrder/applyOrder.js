// pages/applyOrder/applyOrder.js
import { getTimeNow } from '../../utils/index';
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userInfo: {},
      userIDImg: '',
      showTips: false,
      modalContent: '1. 证件号指学生证上面的号码, 2. 相关证件正面指的是学生证正面, 3. 需要加急请点击微信客服添加好友加急申请!',
      name: '',
      userID: '',
  },

  submit() {
    // 保存this指向，方便复用
    const that = this.data;
    // 提交信息
    db.collection('orderReceive').add({
        data: {
            name: that.name,
            userID: that.userID,
            userIDImg: that.userIDImg,
            userInfo: that.userInfo,
            state: '待审核',
            time: getTimeNow(),
        },
        success: (res) => {
            // 清空输入内容
            this.setData({
                name: '',
                userID: '',
                userIDImg: '',
            })
            wx.showToast({
              title: '提交成功',
            })
            wx.navigateTo({
              url: '../receiveLoading/receiveLoading',
            })
        },
        fail: (res) => {
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
        }
    })
},

  getName(e) {
      this.setData({
          name: e.detail.value
      })
  },
  getUserID(e) {
      this.setData({
          userID: e.detail.value
      })
  },

  toAgreement() {
      wx.navigateTo({
          url: '../agreement/agreement',
      })
  },

  getAdminWX() {
      wx.setClipboardData({
          data: '18331092918',
          success: (res) => {
              wx.showToast({
                  title: '复制微信成功',
              })
          }
      })
  },


  showTips() {
      this.setData({
          showTips: !this.data.showTips
      })
  },

  uploadImg() {
      wx.chooseImage({
          count: 1,
          sizeType: ['compressed', 'original'],
          sourceType: ['album', 'camera'],
          success: (res) => {
              wx.showLoading({
                  title: '加载中',
              })
              const random = Math.floor(Math.random() * 1000);
              wx.cloud.uploadFile({
                  cloudPath: `userIDImg/${this.data.userInfo.nickName}-${random}.png`,
                  filePath: res.tempFilePaths[0],
                  success: (res) => {
                      let fileID = res.fileID;
                      this.setData({
                          userIDImg: fileID,
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
      this.setData({
          userInfo,
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