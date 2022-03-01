// pages/person/person.js
const db = wx.cloud.database();
// TODO
/**
 * 1. 在个人中心中添加审核接单申请的功能, 有通过和不通过两个选项
 * 2. 原则上每个用户只能申请一次接单员，前提是审核通过了，如果审核不通过，可以继续申请
 * 3. 在点击申请接单的函数中添加新的逻辑，分别判断当前用户是否申请过，如果申请过，通过结果来给定以不同的modal提示
 * 4. 如果没有提交过申请，在点击申请接单的时候无任何提示。
 *    提交过，且成功，提示您已是接单员。留在个人中心页面
 *    提交过，且失败，提示您之前提交的内容审核未通过，可以继续申请，然后跳转到申请的页面。
 *    提交过，还在审核中，提示您提交的内容还在申请，留在个人中心页面
 * 5. 新增存储管理员数据的数据库表，只有管理员进入个人中心才能看到审核接单申请那一项
 * 6. 订单页，在点击接单的时候增加判断逻辑，只有已经是接单员的用户才能接单
 * 7. 订单页, 我帮助的tab下, 增加筛选条件，应该订单状态是已完成才算我帮助的, 已帮助的不算, 分页那里的查询也需要增加这个筛选条件
 * 8. 订单页, 我帮助的tab下, 顶部增加当前用户已完成的订单数量总额和已完成的订单收益总和，用到了两个新的云数据库API
 */
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUseGetUserProfile: false,
        // success代表已经是接单员了, 
        // fail代表曾经申请过但是没通过
        // loading代表目前有正在审核中的
        // null代表从未申请过
        personReceiveState: '',
        admin: false,
    },

    orderReceiver() {
        wx.navigateTo({
            url: '../orderReceiver/orderReceiver',
        })
    },

    applyOrder() {
        const {
            personReceiveState
        } = this.data;
        if (personReceiveState === 'success') {
            wx.showModal({
                title: '提示',
                content: '您已经是接单员了, 请勿重复申请!',
                showCancel: false
            })
        } else if (personReceiveState === 'fail') {
            wx.showModal({
                title: '提示',
                content: '您之前提交的申请未通过审核, 您可以继续申请, 如有疑问请联系管理员: 18331092918',
                success: (res) => {
                    const {
                        confirm
                    } = res;
                    if (confirm) {
                        wx.navigateTo({
                            url: '../applyOrder/applyOrder',
                        })
                    }
                }
            })
        } else if (personReceiveState === 'loading') {
            wx.showModal({
                title: '提示',
                content: '您之前申请的内容正在审核中, 请耐心等待! 如加急审核请添加管理员微信: 18331092918',
                showCancel: false,
            })
        } else if (personReceiveState === 'null') {
            wx.navigateTo({
              url: '../applyOrder/applyOrder',
            })
        }
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

    // 判断当前用户是否是管理员
    getAdminPower() {
        db.collection('admin').where({
            adminID: wx.getStorageSync('openid')
        }).get({
            success: (res) => {
                this.setData({
                    admin: !!res.data.length
                })
            }
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
        let personReceiveState = '';
        this.getAdminPower();
        db.collection('orderReceive').where({
            _openid: wx.getStorageSync('openid')
        }).get({
            success: (res) => {
                const {
                    data
                } = res;
                if (data.length) {
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].state === '通过') {
                            personReceiveState = 'success';
                            break;
                        } else if (data[i].state === '不通过') {
                            personReceiveState = 'fail';
                        } else {
                            personReceiveState = 'loading';
                            break;
                        }
                    }
                } else {
                    personReceiveState = 'null';
                }
                this.setData({
                    personReceiveState,
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