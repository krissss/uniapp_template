// const DEBUG = false
const DEBUG = process.env.NODE_ENV === 'development'

export default {
  APP: {
    DEBUG: false,
    NAME: 'APP',
    TAB_BAR_ROUTE: [
      '/pages/home/index',
      '/pages/mine/index'
    ],
  },
  HTTP: {
    BASE_URL: DEBUG ? 'http://dev.test.com/api/' : 'http://xxx.xx.com/api/',
  },
  STORAGE_KEY: {
    USER_INFO: 'USERINFO',
    ACCESS_TOKEN: 'ACCESS_TOKEN',
  }
}
