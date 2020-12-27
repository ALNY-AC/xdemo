<template>
  <div id="luck">
    <el-card shadow="never" header="抽奖管理">
      <div style="padding-bottom: 25px;">
        <span>抽奖链接二维码：</span>
        <div id="Qrcode"></div>
      </div>
      <div id="btn-box">
        <div style="color:#666;font-size:14px">总概率：{{blTotal}}% (请保证总概率为100%)</div>
        <div style="color:#666;font-size:14px">奖品总数：{{list.length}}/10</div>
        <el-button @click="add" class="Btn">添加奖品</el-button>
        <el-button @click="submit" type="primary" class="Btn">提交</el-button>
      </div>
      <el-form label-position="top">
        <div class="block-list">
          <el-row :gutter="20">
            <el-col :span="6" v-for="(form,i) in list" :key="i">
              <div class="block">
                <div class="num">No.{{i+1}}</div>
                <div class="img">
                  <upload icon="el-icon-plus" v-model="form.img">
                    <el-image
                      alt="点击上传"
                      style="width: 100px; height: 100px"
                      :src="$getUrl(form.img)"
                      fit="fill"
                    ></el-image>
                  </upload>
                  <div class="text-center" style="margin-top:5px">
                    <el-popconfirm
                      title="确定删除吗？"
                      @onConfirm="del(i)"
                      icon="el-icon-info"
                      iconColor="red"
                    >
                      <el-button icon="el-icon-delete" type="text" slot="reference"></el-button>
                    </el-popconfirm>
                  </div>
                </div>
                <div class="info">
                  <div>
                    <el-form-item label="奖品名">
                      <el-input
                        style="width:100px"
                        v-model="form.title"
                        maxlength="8"
                        placeholder="奖品名最多8字"
                      ></el-input>
                    </el-form-item>
                  </div>
                  <div>
                    <el-form-item label="奖品倍率">
                      <el-input-number
                        style="width:100px"
                        v-model="form.bl"
                        :min="0"
                        :max="100"
                        placeholder="奖品倍率"
                      ></el-input-number>
                    </el-form-item>
                  </div>
                  <div>
                    <el-form-item label="奖品类型">
                      <el-radio v-model="form.type" :label="2" size="mini">实物型</el-radio>
                      <el-radio v-model="form.type" :label="1" size="mini">链接型</el-radio>
                    </el-form-item>
                  </div>
                  <div>
                    <el-form-item label="奖品链接：" v-if="form.type=='1'" prop="url">
                      <el-input style="width:100px" v-model="form.url"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-form>
      <el-collapse v-if="false" v-model="activeNames" @change="handleChange">
        <el-collapse-item
          :title="form.title|showtitle(i)"
          :name="i"
          v-for="(form,i) in list"
          :key="i"
        >
          <el-form
            class="form"
            label-width="150px"
            size="small"
            :model="form"
            ref="form"
            :rules="rules"
          >
            <el-row>
              <el-col :span="8">
                <el-form-item label="奖品名：" prop="title">
                  <el-input v-model="form.title" maxlength="8" placeholder="奖品名最多8字"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="奖品概率：" prop="bl">
                  <el-input-number v-model="form.bl" :min="0" :max="100" label="描述文字"></el-input-number>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="奖品类型：">
                  <el-radio v-model="form.type" :label="2" border size="medium">实物型</el-radio>
                  <el-radio v-model="form.type" :label="1" border size="medium">链接型</el-radio>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="奖品链接：" v-if="form.type=='1'" prop="url">
                  <el-input v-model="form.url"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="奖品图片：" prop="img">
              <el-image style="width: 160px" v-if="form.img" :src="$getUrl(form.img)"></el-image>
              <upload v-model="form.img" icon="el-icon-plus"></upload>
            </el-form-item>

            <template>
              <el-popconfirm title="确定删除吗？" @onConfirm="del(i)" icon="el-icon-info" iconColor="red">
                <el-button type="danger" class="Btn" slot="reference">删除</el-button>
              </el-popconfirm>
            </template>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'edit',
  data() {
    return {
      list: [],
      form: {
        title: '谢谢惠顾',
        bl: 0,
        img: '',
        type: 2,
        url: '',
      },
      rules: {
        // title: [
        //   { required: true, message: '请输奖品名称', trigger: 'blur' },
        //   { min: 1, max: 8, message: '长度在 1 到 8 个字符', trigger: 'blur' }
        // ],
        // bl: [{ required: true, message: '请输奖品概率', trigger: 'blur' }],
        // img: [{ required: true, message: '请选择图片', trigger: 'blur' }],
        // url: [{ required: true, message: '请输奖品链接', trigger: 'blur' }]
      },
      activeNames: [],
      qrcode1: this.$Url.h5 + "activity/prizedraw/", //二维码
    };
  },
  methods: {
    // 用于初始化一些数据
    init() {
      this.update();
      this.qrcode()
    },
    // 用于更新一些数据
    async update() {
      const res = await this.$http.post('/prize/list', {});
      const _this = this;
      this.list = res.data;
      this.$nextTick(() => {
        _this.list.forEach((res, i) => {
          _this.activeNames.push(i);
        })
      })
      console.log(this.list)
    },
    add() {
      if (this.list.length >= 10) {
        this.$message.warning('最多十个商品');
        return
      }
      const _this = this;
      let form = JSON.stringify(this.form);
      form = JSON.parse(form);
      this.list.push(form)
      this.$nextTick(() => {
        _this.activeNames.push(_this.list.length - 1);
      })
    },
    del(i) {
      this.list.splice(i, 1);
    },
    handleChange(val) {
      console.log(val);
      this.$nextTick(() => {

      })
    },
    // 用于更新一些数据
    async submit() {
      // try {
      //   if (this.list.length > 0) {
      //     for (let i = 0; i < this.$refs['form'].length; i++) {
      //       await this.$refs['form'][i].validate();
      //     }

      //   }
      // } catch (error) {
      //   this.$message.warning('请检查填写信息');
      //   return;
      // }
      if (this.blTotal != 100) {
        this.$message.error('请保证总概率为100');
        return;
      }
      try {
        const res = await this.$http.post('/prize/save', this.list);
        if (res.code >= 0) {
          this.$message.success('保存成功~');
          // this.$router.go(-1);
        }
      } catch (error) {
        this.$message.error('操作失败！');
        return;
      }
    },
    async qrcode() {
      this.qrcode1 = new QRCode(document.getElementById('Qrcode'), {
        text: this.qrcode1,
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
    },
  },
  // 计算属性
  computed: {
    blTotal() {
      let blTotal = 0;
      this.list.forEach(res => {
        blTotal += res.bl
      })
      return blTotal;
    }
  },
  // 包含 Vue 实例可用过滤器的哈希表。
  filters: {
    showtitle(title, i) {
      if (title) return (i + 1) + '、' + title
      return '未输入奖品名'
    }
  },
  // 在实例创建完成后被立即调用
  created() { },
  // 在挂载开始之前被调用：相关的 render 函数首次被调用。
  beforeMount() { },
  // el 被新创建的 vm.el 替换，并挂载到实例上去之后调用该钩子。
  mounted() {
    this.init();
    this.$nextTick(() => { });
  },
  // 数据更新时调用，发生在虚拟 DOM 打补丁之前。
  beforeUpdate() { },
  // keep-alive 组件激活时调用。
  activated() { },
  // keep-alive 组件停用时调用。
  deactivated() { },
  // 实例销毁之前调用。在这一步，实例仍然完全可用。
  beforeDestroy() { },
  //Vue 实例销毁后调用。
  destroyed() { },
  // 当捕获一个来自子孙组件的错误时被调用。
  errorCaptured() { },
  // 包含 Vue 实例可用指令的哈希表。
  directives: {},
  // 一个对象，键是需要观察的表达式，值是对应回调函数。
  watch: {},
  // 组件列表
  components: {},
}
</script>
<style lang="scss" scoped>
#luck {
  padding: 20px;
  .block-list {
    display: flex;
    flex-wrap: wrap;
    margin: 20px 0;
    .block {
      height: 390px;
      position: relative;
      width: 100%;
      margin-bottom: 20px;
      display: flex;
      background-color: #f1f1f1;
      padding: 10px;
      border-radius: 5px;
      .num {
        position: absolute;
        top: -5px;
        left: -5px;
        background-color: rgba($color: #000000, $alpha: 0.5);
        color: #fff;
        border-radius: 3px;
        padding: 2px 6px;
        font-size: 11px;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1;
      }
      .img {
      }
      .info {
        padding-left: 10px;
      }
    }
  }
}
</style>
