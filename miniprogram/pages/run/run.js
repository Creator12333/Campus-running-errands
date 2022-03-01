// pages/run/run.js
import {
  getTimeNow
} from '../../utils/index';
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    helpContent: '',
    pickUpAddress: '',
    address: '',
    userInfo: {},
    addMoney: null,
  },

  submit() {
    const {
      helpContent,
      pickUpAddress,
      address,
      addMoney,
      userInfo
    } = this.data;
    if (!helpContent || !pickUpAddress || !address) {
      wx.showToast({
        icon: 'none',
        title: '您填写的信息不全',
      })
      return;
    }
    db.collection('order').add({
      data: {
        // 模块的名字
        name: '校园跑腿',
        // 当前时间
        time: getTimeNow(),
        // 订单金额
        money: 10 + addMoney,
        // 订单状态
        state: '待帮助',
        // 收件地址
        address,
        // 订单信息
        info: {
          // 帮助内容
          helpContent,
          // 取货地点
          pickUpAddress,
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
      addMoney: Number(e.detail.value)
    })
  },

  getPickUpAddress(e) {
    this.setData({
      pickUpAddress: e.detail.value
    })
  },

  selectAddress() {
    wx.redirectTo({
      url: '../address/address?url=run',
    })
  },

  getHelpContent(e) {
    this.setData({
      helpContent: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const address = wx.getStorageSync('addressNow');
    const userInfo = wx.getStorageSync('userInfo');

    if (address) {
      const {
        build,
        houseNumber
      } = address;
      this.setData({
        address: `${build}-${houseNumber}`,
      })
    }
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