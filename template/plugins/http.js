import constant from './constant'
import msg from './msg'
import navigate from './navigate'
import storage from './storage'
import {formatUrl} from './utils'

const loginUrl = 'login/index'

const common = {
  _baseUrl: '',
  _solveHttpResponse(responseData, config) {
    return responseData
  },
  _prepareParams(params, config) {
    return params
  },
  _prepareHeader(header, config) {
    return header
  },
  get(url, params = {}, success, error, config) {
    if (config.showLoading) {
      msg.loading(true)
    }
    const _this = this
    uni.request({
      url: _this._baseUrl + url,
      data: _this._prepareParams(params, config),
      method: 'GET',
      header: _this._prepareHeader({}, config),
      success(res) {
        if (success) {
          const result = _this._solveHttpResponse(res.data, config)
          if (result !== false) {
            success(result)
          }
        }
      },
      fail(res) {
        error && error(res)
      },
      complete() {
        msg.loading(false)
      }
    })
  },
  post(url, params = {}, success, error, config) {
    if (config.showLoading) {
      msg.loading(true)
    }
    const _this = this
    uni.request({
      url: _this._baseUrl + url,
      data: _this._prepareParams(params, config),
      method: 'POST',
      header: _this._prepareHeader({
        'content-type': 'application/x-www-form-urlencoded',
      }),
      success(res) {
        if (success) {
          const result = _this._solveHttpResponse(res.data, config)
          if (result !== false) {
            success(result)
          }
        }
      },
      fail(res) {
        error && error(res)
      },
      complete() {
        msg.loading(false)
      }
    })
  },
  getUrl(url, params = {}) {
    return formatUrl(this._baseUrl + url, params)
  },
  uploadFiles(url, files, params, success, error, config) {
    const _this = this
    for (const file of files) {
      uni.uploadFile({
        url: _this._baseUrl + url,
        filePath: file.uri,
        name: file.name,
        //fileType: '', // 文件类型，image/video/audio 仅支付宝小程序，且必填。
        formData: params,
        success(res) {
          if (success) {
            const result = _this._solveHttpResponse(JSON.parse(res.data), config)
            if (result !== false) {
              success(result)
            }
          }
        },
        fail(res) {
          error && error(res)
        }
      })
    }
  }
}

const base = Object.assign(Object.assign({}, common), {
  _baseUrl: constant.HTTP.BASE_URL,
  _solveHttpResponse(responseData, config) {
    if (responseData.status == 200) {
      return responseData.data
    } else if (responseData.status == 422) {
      setTimeout(() => {
        msg.error(responseData.errors[0].message)
      }, 1)
      return false
    } else if (responseData.status == 401) {
      if (config.redirectToLoginIfNoAuth) {
        msg.toast('登录失效，请重新登录')
        navigate.replace(loginUrl)
      }
      return false
    } else {
      msg.error(responseData.message)
      return false
    }
  },
  _prepareHeader(header, config) {
    const token = storage.getAccessToken()
    if (token) {
      header['access-token'] = token
    }
    return header
  }
})

const http = {
  base,
}

export default {
  _defaultConfig: {
    redirectToLoginIfNoAuth: true,
    remote: 'base',
    showLoading: true,
  },
  _config: {},
  _getConfig() {
    const config = Object.assign(Object.assign({}, this._defaultConfig), this._config)
    this._config = {}
    return config
  },
  config(params) {
    this._config = Object.assign(this._config, params)
    return this
  },
  get(url, params = {}, success, error) {
    const config = this._getConfig()
    http[config.remote].get(url, params, success, error, config)
  },
  post(url, params = {}, success, error) {
    const config = this._getConfig()
    http[config.remote].post(url, params, success, error, config)
  },
  getUrl(url, params = {}) {
    const config = this._getConfig()
    return http[config.remote].getUrl(url, params, config)
  },
  uploadFiles(url, files = [], params = {}, success, error) {
    const config = this._getConfig()
    http[config.remote].uploadFiles(url, files, params, success, error, config)
  }
}
