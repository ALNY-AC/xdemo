<template>
  <div>
    <el-button @click="httpTest()">请求接口</el-button>
    <pre v-html="msg"></pre>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: ''
    }
  },
  methods: {
    async httpTest() {
      try {
        this.msg = await this.$http.post('/test');
      } catch (error) {
      }
    }
  }

}
</script>
<style lang="scss" scoped>
</style>