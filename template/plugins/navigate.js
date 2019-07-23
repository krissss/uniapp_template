import { formatUrl as normalFormatUrl } from './utils'
import constant from './constant'

function formatUrl (url, options = {}) {
  return normalFormatUrl('/pages/' + url, options)
}

function isUrlInTabBar (url) {
  const switchTabUrl = constant.APP.TAB_BAR_ROUTE
  if (url.indexOf('?') !== -1) {
    url = url.split('?')[0]
  }
  return switchTabUrl.includes(url)
}

export default {
  push (url, options = {}) {
    url = formatUrl(url, options)
    if (isUrlInTabBar(url)) {
      uni.switchTab({
        url: url
      })
    } else {
      uni.navigateTo({
        url: url
      })
    }
  },
  replace (url, options = {}) {
    uni.redirectTo({
      url: url = formatUrl(url, options)
    })
  },
  back (delta = 1) {
    uni.navigateBack({
      delta: delta
    })
  },
  goHome() {
    this.push('home/index')
  },
  setTitle (title) {
    uni.setNavigationBarTitle({
      title: title
    })
  },
  getCurrentPath() {
    const pages = getCurrentPages()
    const currentPage = pages[pages.length-1]
    let url, options
    // #ifdef H5
    url = currentPage.$route.fullPath
    options = {}
    // #endif
    // #ifdef MP-WEIXIN
    url = '/' + currentPage.route
    options = currentPage.options
    // #endif
    return normalFormatUrl(url, options)
  }
}
