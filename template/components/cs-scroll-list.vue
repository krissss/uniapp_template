<template>
  <view>
    <slot></slot>
    <uni-load-more :status="loadingStatus"></uni-load-more>
  </view>
</template>

<script>
  import uniLoadMore from './uni-load-more.vue'

  export default {
    components: {
      uniLoadMore
    },
    data() {
      return {
        page: 1,
        pageSize: 10,
        list: [],
        loadingStatus: 'more'
      }
    },
    props: {
      apiUrl: {
        type: String,
        required: true
      },
      apiParams: {
        type: Object
      },
      triggerLoadMore: {
        type: null
      },
      triggerRefresh: {
        type: null
      },
      fetchOnInit: {
        type: Boolean,
        default: true
      }
    },
    watch: {
      triggerLoadMore() {
        this.getList()
      },
      triggerRefresh() {
        this.getList(true)
      }
    },
    methods: {
      getList(reset = false) {
        if (reset) {
          this.page = 1
          this.list = []
          this.loadingStatus = 'more'
        }
        if (this.loadingStatus == 'noMore') {
          return
        }
        this.loadingStatus = 'loading'
        this.$http.get(this.apiUrl, this.getParams(), data => {
          this.list = this.list.concat(data.items)
          this.page++
          this.loadingStatus = (this.page > data.pagination.pageCount) ? 'noMore' : 'more'
          this.$emit('getListData', this.list)
        })
      },
      getParams() {
        const pageParams = {
          page: this.page,
          per_page: this.pageSize
        }
        if (!this.apiParams) {
          return pageParams
        }
        return Object.assign(pageParams, this.apiParams)
      }
    },
    mounted() {
      if (this.fetchOnInit) {
        this.getList()
      }
    }
  }
</script>
