
<template>
  <div>
    <el-input type="textarea" v-model="form"></el-input>
    <el-button @click="httpTest()">请求接口</el-button>
    <pre v-html="msg"></pre>
    <el-button @click="鼠标函数()">防抖</el-button>
    <el-select
      v-model="model"
      popper-append-to-body
      class="v-data-select"
      size="mini"
      placeholder="请选择"
    >
      <el-option v-for="item in 10" :key="item" :label="item" :value="item"></el-option>
    </el-select>
    <hr />
    <el-dropdown trigger="click">
      <el-button type="primary">
        更多菜单
        <i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu class="dropdown-menu" slot="dropdown">
        <el-dropdown-item>黄金糕</el-dropdown-item>
        <el-dropdown-item>狮子头</el-dropdown-item>
        <el-dropdown-item>螺蛳粉</el-dropdown-item>
        <el-dropdown-item>双皮奶</el-dropdown-item>
        <el-dropdown-item>蚵仔煎</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import test from './test.data';
export default {
  data() {
    return {
      msg: '',
      form: '{test:1}',
      selected: [],
      info: test,
      // 记录防抖线程变量
      timeout: null,
    }
  },
  computed: {

  },
  mounted() {
    this.httpTest();
  },
  methods: {

    // 鼠标事件可以调用这个函数，或者直接调用防抖函数也行
    鼠标函数() {
      this.防抖函数();
    },
    防抖函数() {
      // 先结束上一次的线程
      clearTimeout(this.timeout);
      // 再创建新线程
      this.timeout = setTimeout(() => {
        // 调用处理的函数
        this.处理函数();
      }, 1000);//秒数写死就行了
    },
    处理函数() {
      // 实际的业务处理
      console.warn('处理函数');
    },


    async httpTest() {
      try {
        this.msg = await this.$http.post('/test', JSON.parse(this.form));
      } catch (error) {
      }
    },
  }

}
</script>
<style lang="scss" scoped>
.table {
}
.dropdown-menu {
  background-color: #0000ff;
  margin-top: 0px;
}
.block {
  width: 100px;
  height: 100px;
  background-color: #ff0000;
}
</style>