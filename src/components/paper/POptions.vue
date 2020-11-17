<template>
  <div class="p-options">
    <div class="opt-list">
      <div v-for="(opt,i) in item.options" :key="i" class="opt-item">
        <div class="opt-input">
          <el-radio v-if="item.type=='radio'" :label="opt.value"></el-radio>
          <el-checkbox v-if="item.type=='checkbox'" :label="opt.value"></el-checkbox>
        </div>
        <div class="opt-label">
          <p-edit-input v-model="opt.label"></p-edit-input>
        </div>
        <div class="tool-list">
          <div class="tool-item">
            <p-edit-input v-model.number="opt.score">
              <span class="tool-label">(分值：{{opt.score}})</span>
            </p-edit-input>
          </div>
          <div class="tool-item">
            <el-checkbox v-model="opt.required">
              <span class="tool-label">必选</span>
            </el-checkbox>
          </div>
          <div class="tool-item">
            <span class="tool-label" @click="item.options.splice(i,1)">
              <i class="el-icon-close"></i>
            </span>
          </div>
        </div>
      </div>
      <div class="opt-item" v-if="item.isOther">
        <div class="opt-input"></div>
        <div class="opt-label">
          <div class="other-box">
            <div class="other-title">其他：</div>
            <div class="other-line"></div>
          </div>
        </div>
        <div class="tool-list">
          <div class="tool-item">
            <p-edit-input v-model.number="item.otherScore">
              <span class="tool-label">(分值：{{item.otherScore}})</span>
            </p-edit-input>
          </div>
          <div class="tool-item">
            <el-checkbox v-model="item.requiredOther">
              <span class="tool-label">必填</span>
            </el-checkbox>
          </div>
          <div class="tool-item">
            <div class="tool-item">
              <span class="tool-label" @click="item.isOther=false">
                <i class="el-icon-close"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <el-button type="default" @click="addOpt()" icon="el-icon-plus">添加选项</el-button>
      <span style="color:#888;font-size:12px">或</span>
      <el-button type="text" @click="item.isOther=true">添加「其他」</el-button>
    </div>
  </div>
</template>
<script>
import config from '../../pages/paper/studio/config'

export default {
  name: 'POptions',
  props: {
    item: {
      type: Object,
      default: null,
    },
  },
  watch: {
    // 自动获取焦点
    async activeEditIndex(v) {
      if (v >= 0) {
        await this.$nextTick()
        this.$refs[`input-${v}`][0].focus();
      }
    },
  },
  data() {
    return {
      // 当前编辑的项
      activeEditIndex: -1,
      // 当前要设置的分值项
      activeEditValue: -1
    }
  },
  mounted() { },
  methods: {
    addOpt() {
      let opt = config.getOptionItem();
      this.item.options.push(opt);
    }
  },

}
</script>
<style lang="scss" scoped>
.p-options {
}
.opt-list {
  padding: 10px 0;
}
.tool-list {
  display: flex;
  align-items: center;
  .tool-item {
    cursor: pointer;
    padding: 0 4px;
    .tool-label {
      font-size: 12px;
      color: #666;
    }
  }
}
.opt-item {
  display: flex;
  align-items: center;
  height: 30px;
  font-size: 14px;
  color: #333;
  padding: 0 10px;
  box-sizing: border-box;
  border-radius: 4px;
  // background-color: #ff0000;

  .opt-input {
    width: 30px;
    // background-color: #0000ff;
  }

  .opt-label {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
  }
  .other-box {
    flex: 1;
    display: flex;
    align-items: center;
    height: 100%;
    .other-title {
      font-size: 12px;
      white-space: nowrap;
      color: #666;
      margin-right: 5px;
    }
    .other-line {
      border-bottom: solid 1px #ddd;
      flex: 1;
      height: 100%;
    }
  }

  &:hover {
    .tool-label {
    }
    .opt-tool {
      display: flex;
    }
  }
}
</style>