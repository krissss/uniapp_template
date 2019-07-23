import constant from './constant'
import navigate from './navigate'
import http from './http'
import storage from './storage'
import msg from './msg'
import enums from './enums'
import file from './file'
import tools from './tools'

const systemInfo = {
  getContentHeight () {
    const info = uni.getSystemInfoSync()
    return info.windowHeight
  }
}

export default {
  constant,
  navigate,
  http,
  storage,
  msg,
  systemInfo,
  enums,
  file,
  tools
}
