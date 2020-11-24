<template>
  <div>
    <el-button @click="httpTest()">请求接口</el-button>
    <pre v-html="msg"></pre>

    <hr />
    <h3>地址选择框</h3>
    <area-select :data="$pcaa" :level="2" type="code" v-model="selected"></area-select>
    {{selected}}
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: '',
      selected: []
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