
<template>
  <div>
    <el-input type="textarea" v-model="form"></el-input>
    <el-button @click="httpTest()">请求接口</el-button>
    <pre v-html="msg"></pre>
    <el-upload
      action="/"
      :before-upload="beforeUpload"
      :before-remove="beforeRemove"
      accept=".jpg, .png, .rar, .zip, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .pdf, .txt, .mp3, .wma, .avi, .rm, .rmvb, .flv, .mpg, .mov, .mkv, .mp4"
    >
      <el-button icon="el-icon-upload" size="small">点击上传</el-button>
      <div
        slot="tip"
        class="el-upload__tip"
      >只能上传jpg、png、rar、zip、doc、docx、xls、xlsx、ppt、pptx、pdf、txt、mp3、wma、avi、rm、rmvb、flv、mpg、mov、mkv、mp4文件，且不超过1G</div>
    </el-upload>
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
    {{model}}
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
      model: '',
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
    beforeRemove(file, fileList) {
      let map = ['rar', 'zip', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf', 'txt', 'mp3', 'wma', 'avi', 'rm', 'rmvb', 'flv', 'mpg', 'mov', 'mkv', 'mp4'];
      let name = file.name.split('.')[1];
      if (map.indexOf(name) >= 0) {
        // 如果是正常类型，就提示
        return this.$confirm(`确定移除 ${file.name}？`);
      } else {
        // 如果是非法类型，就不提示，直接被删掉
        return true;
      }
    },
    /**
     * 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
     */
    beforeUpload(file) {
      let map = ['rar', 'zip', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf', 'txt', 'mp3', 'wma', 'avi', 'rm', 'rmvb', 'flv', 'mpg', 'mov', 'mkv', 'mp4'];
      let name = file.name.split('.')[1];
      if (map.indexOf(name) >= 0) {
        //如果后缀名存在在map中，则返回true，让上传程序正常上传
        return true
      } else {
        //如果后缀名存在在map中，则返回false，终止上传
        this.$message.warning(`不允许上传.${name}类型的文件！`);
        return false;
      }
    },
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