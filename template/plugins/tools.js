export default {
  doLogin (successCallback) {
    uni.login({
      provider: 'weixin',
      success(res) {
        successCallback(res)
      }
    })
  },
  doPay (form, successCallback, errorCallback) {
    uni.requestPayment({
      provider: 'wxpay',
      timeStamp: form.timeStamp,
      nonceStr: form.nonceStr,
      package: form.package,
      signType: form.signType,
      paySign: form.paySign,
      success: function (res) {
        successCallback(res)
      },
      fail: function (err) {
        errorCallback(err)
      }
    })
  },

  getDateString(num) {
    var date = new Date(num * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return Y + M + D;
  },
  getTimeString(num) {
    var time = new Date(num * 1000);
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var date = time.getDate();
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    return year + '-'+ add0(month) + '-' + add0(date) + ' ' + add0(hours) + ':' + add0(minutes) + ':' + add0(seconds);
  }
}
function add0(m) {
  return m < 10 ? '0' + m : m
}
