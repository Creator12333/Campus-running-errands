// pages/playGame/playGame.js
import {
  getTimeNow
} from '../../utils/index';
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gameName: '',
    gameTime: '',
    remark: '',
    gameID: '',
    money: null,
    userInfo: {},
  },

  submit() {
    const { gameName, gameTime, remark, gameID, money, userInfo } = this.data;
    if (!gameName || !gameTime || !remark || !gameID || !money) {
      wx.showToast({
        icon: 'none',
        title: '您填写的信息不全',
      })
      return;
    }
    db.collection('order').add({
      data: {
        // 模块的名字
        name: '游戏陪玩',
        // 当前时间
        time: getTimeNow(),
        // 订单金额,
        money,
        // 订单状态
        state: '待帮助',
        // 订单信息
        info: {
          // 游戏名称
          gameName,
          // 游戏时间or盘数
          gameTime,
          // 备注
          remark,
          // 游戏ID
          gameID,
        },
        // 用户信息
        userInfo,
      },
      success: (res) => {
        wx.switchTab({
          url: '../index/index',
        })
        wx.showToast({
          title: '发布成功',
        })
      }
    })
  },

  getMoney(e) {
    this.setData({
      money: Number(e.detail.value)
    })
  },

  getGameID(e) {
    this.setData({
      gameID: e.detail.value
    })
  },

  getRemark(e) {
    this.setData({
      remark: e.detail.value
    })
  },

  getGameTime(e) {
    this.setData({
      gameTime: e.detail.value
    })
  },

  getGameName(e) {
    this.setData({
      gameName: e.detail.value
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