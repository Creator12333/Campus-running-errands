// pages/lease/lease.js
import { getTimeNow } from '../../utils/index';
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leaseItem: '',
    address: '',
    leaseTime: '',
    deliveryTime: '',
    money: null,
    userInfo: {},
  },

  submit() {
    const { leaseItem, address, leaseTime, deliveryTime, money, userInfo } = this.data;

    if (!leaseItem || !address || !leaseTime || !deliveryTime || !money) {
      wx.showToast({
        icon: 'none',
        title: '您填写的信息不全',
      })
      return;
    }
    db.collection('order').add({
      data: {
        // 模块的名字
        name: '租借服务',
        // 当前时间
        time: getTimeNow(),
        // 订单金额
        money,
        // 订单状态
        state: '待帮助',
        // 收件地址
        address,
        // 订单信息
        info: {
          // 租借物品
          leaseItem,
          // 租借时长
          leaseTime,
          // 预计交货时间
          deliveryTime,
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

  getDeliveryTime(e) {
    this.setData({
      deliveryTime: e.detail.value
    })
  },

  getLeaseTime(e) {
    this.setData({
      leaseTime: e.detail.value
    })
  },

  selectAddress() {
    wx.redirectTo({
      url: '../address/address?url=lease',
    })
  },

  getLeaseItem(e) {
    this.setData({
      leaseItem: e.detail.value
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
        address: `${build}-${houseNumber}`
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