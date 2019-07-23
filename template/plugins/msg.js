import App from "../App";
import constant from './constant'

export default {
  toast (msg) {
    uni.showToast({
      title: msg,
      mask: false,
      icon: 'none',
      duration: 2000
    })
  },
  error (msg) {
    uni.showToast({
      title: msg,
      mask: false,
      icon: 'none',
      duration: 2000
    })
  },
  success (msg) {
    uni.showToast({
      title: msg,
      mask: false,
      icon: 'success',
      duration: 2000
    })
  },
  loading (isShow) {
    if (isShow) {
      uni.showLoading({
        title: '加载中'
      });
    } else {
      uni.hideLoading();
    }
  },
  confirm (msg, successCallback) {
    uni.showModal({
      title: constant.APP.NAME,
      content: msg,
      success: function (res) {
        if (res.confirm) {
          successCallback()
        }
      }
    })
  }
}
