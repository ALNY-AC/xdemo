<template>
  <div class="p-options">
    <div class="opt-list">
      <div v-for="(opt,i) in item.options" :key="opt.id" class="opt-item">
        <div class="opt-item-body">
          <div class="opt-input">
            <!-- <el-radio v-if="item.type=='radio'" :label="opt.value"></el-radio> -->
            <!-- <el-checkbox v-if="item.type=='checkbox'" :label="opt.value"></el-checkbox> -->
            <i v-if="item.type=='select'" class="icon fa fa-caret-square-o-down"></i>
            <i v-if="item.type=='checkbox'" class="icon fa fa-square-o"></i>
            <i v-if="item.type=='radio'" class="icon fa fa-circle-o"></i>
            <i v-if="item.type=='input'" class="icon fa fa-edit"></i>
            <i v-if="item.type=='textarea'" class="icon fa fa-edit"></i>
          </div>
          <div class="opt-label">
            <div class="num" v-if="item.options.length>1">{{i+1}}.</div>
            <p-edit-input v-model="opt.label"></p-edit-input>
          </div>
          <div class="tool-list">
            <div class="tool-item">
              <p-edit-input type="number" v-model.number="opt.score">
                <span class="tool-label">(分值：{{opt.score}})</span>
              </p-edit-input>
            </div>
            <div class="tool-item">
              <el-checkbox v-model="opt.required">
                <span class="tool-label">必填</span>
              </el-checkbox>
            </div>
            <div class="tool-item">
              <span class="tool-label" @click="item.options.splice(i,1)">
                <i class="el-icon-close"></i>
              </span>
            </div>
          </div>
        </div>
        <div class="opt-item-footer">
          <div class="j-input" v-if="['input','textarea'].indexOf(item.type)>=0">填表人在这里填写</div>
        </div>
      </div>
      <div class="opt-item" v-if="item.isOther">
        <div class="opt-item-body">
          <div class="opt-input"></div>
          <div class="opt-label">
            <div class="other-box">
              <div class="other-title">其他：</div>
              <div class="other-line"></div>
            </div>
          </div>
          <div class="tool-list">
            <div class="tool-item">
              <p-edit-input type="number" v-model.number="item.otherScore">
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
    </div>
    <div>
      <el-button type="default" @click="addOpt()" icon="el-icon-plus">添加选项</el-button>
      <template v-if="!item.isOther">
        <span style="color:#888;font-size:12px">或</span>
        <el-button type="text" @click="item.isOther=true">添加「其他」</el-button>
      </template>
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
      let map = {
        radio: '选项',
        checkbox: '选项',
        input: '问题项',
        textarea: '问题项',
      };
      let opt = config.getOptionItem(map[this.item.type]);
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
  // align-items: center;
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
  .opt-item-body {
    display: flex;
    height: 100%;
    min-height: 30px;
    font-size: 14px;
    color: #333;
    padding: 0 10px;
    padding-bottom: 0;
    box-sizing: border-box;
    border-radius: 4px;
    margin-bottom: 5px;
  }
  .opt-item-footer {
    padding: 0 10px;
    margin-bottom: 10px;
  }

  .opt-input {
    width: 30px;
    .icon {
      color: #999;
      cursor: not-allowed;
    }
  }

  .opt-label {
    flex: 1;
    height: 100%;
    display: flex;
    // align-items: center;
    .num {
      margin-right: 3px;
      color: #666;
    }
  }
  .other-box {
    flex: 1;
    display: flex;
    align-items: center;
    height: 30px;
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
.j-input {
  background-color: #f7f7f7;
  border: 1px solid #e5e5e5;
  box-shadow: none;
  cursor: not-allowed;
  height: 35px;
  font-size: 14px;
  color: #999;
  line-height: 35px;
  padding: 0 15px;
  margin-left: 30px;
}
</style>