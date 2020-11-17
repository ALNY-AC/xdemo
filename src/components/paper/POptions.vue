<template>
  <div class="p-options">
    <div class="opt-list">
      <div v-for="(opt,i) in item.options" :key="i" class="opt-item">
        <div class="opt-input">
          <el-radio v-if="item.type=='radio'" :label="opt.value"></el-radio>
          <el-checkbox v-if="item.type=='checkbox'" :label="opt.value"></el-checkbox>
        </div>
        <div class="opt-label">
          <div @click="activeEditIndex=i" v-if="activeEditIndex!=i">{{opt.label}}</div>
          <el-input
            v-if="activeEditIndex==i"
            v-model="opt.label"
            :ref="`input-${i}`"
            @blur="activeEditIndex=-1"
            @keydown.enter.native.stop="activeEditIndex=-1"
          ></el-input>
        </div>
        <div class="opt-tool">
          <div class="tool-item">
            <el-checkbox v-model="opt.required">
              <span class="tool-label">必选</span>
            </el-checkbox>
          </div>
          <div class="tool-item">
            <el-button
              type="text"
              v-if="activeEditValue!=i"
              @click="activeEditValue=i"
            >(分值：{{opt.score}})</el-button>
          </div>
          <div class="tool-item">
            <el-input
              v-if="activeEditValue==i"
              v-model.number="opt.score"
              type="number"
              :ref="`input-value-${i}`"
              @blur="activeEditValue=-1"
              @keydown.enter.native.stop="activeEditValue=-1"
            ></el-input>
          </div>
          <div class="tool-item">
            <el-button type="text" icon="el-icon-close" @click="item.options.splice(i,1)"></el-button>
          </div>
        </div>
      </div>
      <div class="opt-item" v-if="item.isOther">
        <div class="opt-input"></div>
        <div class="opt-label">
          <div class="other-title">其他：</div>
          <!-- <el-input></el-input> -->
          <div class="other-line"></div>
        </div>
        <div class="opt-tool">
          <div class="tool-item">
            <el-checkbox v-model="item.requiredOther">
              <span class="tool-label">必填</span>
            </el-checkbox>
          </div>
          <div class="tool-item">
            <el-button
              type="text"
              v-if="activeEditValue!=-2"
              @click="activeEditValue=-2"
            >(分值：{{item.otherScore}})</el-button>
          </div>
          <div class="tool-item">
            <el-input
              v-if="activeEditValue==-2"
              v-model.number="item.otherScore"
              type="number"
              :ref="`input-value-${-2}`"
              @blur="activeEditValue=-1"
              @keydown.enter.native.stop="activeEditValue=-1"
            ></el-input>
          </div>
          <div class="tool-item">
            <el-button type="text" icon="el-icon-close" @click="item.isOther=false"></el-button>
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
.opt-item {
  display: flex;
  align-items: center;
  height: 30px;
  font-size: 14px;
  color: #333;
  padding: 5px 10px;
  border-radius: 4px;

  .tool-label {
    font-size: 12px;
    color: #777;
  }

  .opt-input {
    width: 30px;
  }

  .opt-label {
    flex: 1;
    display: flex;
    align-items: center;
    height: 100%;
    .other-title {
      font-size: 12px;
      white-space: nowrap;
      color: #666;
      margin-right: 10px;
    }
    .other-line {
      border-bottom: solid 1px #ddd;
      flex: 1;
      height: 100%;
    }
  }

  .opt-tool {
    display: flex;
    align-items: center;
    .tool-item {
      padding: 0 5px;
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