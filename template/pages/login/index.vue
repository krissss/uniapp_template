<template>
  <view class="login">
    <view class="logo flex-center">
      <image class="logo-img" src="/static/images/logo.png"></image>
    </view>
    <view v-if="isNeedLogin" class="update-info">
      <button open-type="getUserInfo" @getuserinfo="getUserInfo">微信登录</button>
    </view>
    <view v-if="isNeedBindCellphone" class="update-info">
      <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">绑定手机号</button>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
        isNeedLogin: true,
        isNeedBindCellphone: false,
        userInfo: {},
        code: ''
      }
    },
    methods: {
      getUserInfo(e) {
        const userInfo = e.detail.userInfo
        this.userInfo = userInfo
        const _this = this
        _this.$tools.doLogin(res => {
          if (res.errMsg != 'login:ok') {
            _this.$msg.error(res.errMsg)
            return
          }
          _this.code = res.code
        })
        console.log(userInfo)
        if (userInfo.nickName) {
          _this.isNeedLogin = false
          _this.isNeedBindCellphone = true
        }
        // if (!userInfo.cellphone) {
        // }
      },
      getPhoneNumber(e) {
        const detail = e.detail
        if (detail.errMsg == 'getPhoneNumber:ok') {
          this.$http.post('distribution/auth/register-login', {
            code: this.code,
            nickname: this.userInfo.nickName,
            head_url: this.userInfo.avatarUrl,
            sex: this.userInfo.gender,
            cellphone_encrypt_data: detail.encryptedData,
            cellphone_iv: detail.iv
          }, data => {
            this.updateUserInfo(data.data)
          })
        }
      },
      updateUserInfo(data) {
        this.$storage.setUserInfo(data)
        if (!data.cellphone) {
          this.isNeedBindCellphone = true
          return
        }
        this.$navigate.goHome()
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../assets/var"
  .login
    background-color white
    .logo
      margin 200upx 0
    .logo-img
      width 179upx
      height 179upx
    .update-info button
      width 697upx
      height 98upx
      line-height 98upx
      border-radius 49upx
      margin 10upx auto
      font-size 36upx
      background-color $colorMain
      color $white
    button:after
      border 0
</style>
