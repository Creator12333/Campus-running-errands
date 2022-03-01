// pages/otherHelp/otherHelp.js
import {
  getTimeNow
} from '../../utils/index';
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: '',
    userInfo: {},
    helpContent: '',
    addMoney: null,
  },

  submit() {
    const { helpContent, address, addMoney, userInfo } = this.data;
    if (!helpContent || !address) {
      wx.showToast({
        icon: 'none',
        title: '您填写的信息不全',
      })
      return;
    }
    db.collection('order').add({
      data: {
        // 模块的名字
        name: '其它帮助',
        // 当前时间
        time: getTimeNow(),
        // 订单金额
        money: 10 + addMoney,
        // 订单状态
        state: '待帮助',
        // 收获地点
        address,
        // 订单信息
        info: {
          // 帮助内容
          helpContent,
        },
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

  selectAddress() {
    wx.redirectTo({
      url: '../address/address?url=otherHelp',
    })
  },
  
  getAddMoney(e) {
    this.setData({
      addMoney: Number(e.detail.value)
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