import constant from './constant'

export default {
  get(key, defaultValue = null) {
    const value = uni.getStorageSync(key)
    if (value === null) {
      return defaultValue
    }
    return value
  },
  set(key, value) {
    uni.setStorageSync(key, value)
  },

  getUserInfo() {
    return this.get(constant.STORAGE_KEY.USER_INFO)
  },
  setUserInfo(data) {
    this.set(constant.STORAGE_KEY.USER_INFO, data)
    this.set(constant.STORAGE_KEY.ACCESS_TOKEN, data.token)
  },
  getAccessToken() {
    return this.get(constant.STORAGE_KEY.ACCESS_TOKEN)
  },
}
