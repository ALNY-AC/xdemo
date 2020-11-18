
<template>
  <div class="p-form-item">
    <template v-if="item">
      <div class="p-form-item-header">
        <div class="title">
          <p-edit-input v-model="item.title"></p-edit-input>
        </div>
        <div class="tool-list">
          <div class="tool-item">
            <p-edit-input type="number" v-model.number="item.score">
              <span class="tool-label text-blue">(分值：{{item.score}})</span>
            </p-edit-input>
          </div>
          <div class="tool-item">
            <el-tooltip class="item" effect="dark" content="自动算分" placement="top">
              <span class="tool-label">
                <i class="el-icon-refresh" @click="autoScore()"></i>
              </span>
            </el-tooltip>
          </div>
        </div>
      </div>
      <div class="p-form-item-body">
        <div class="option-box">
          <template v-if="item.type=='radio'">
            <p-options :item="item"></p-options>
          </template>
          <template v-if="item.type=='checkbox'">
            <p-options :item="item"></p-options>
          </template>
          <template v-if="item.type=='fill'"></template>
          <template v-if="item.type=='textarea'">
            <p-options :item="item"></p-options>
          </template>
          <template v-if="item.type=='input'">
            <p-options :item="item"></p-options>
          </template>
        </div>
      </div>
      <div class="p-form-item-footer">
        <div class="tool-list">
          <div class="tool-item">
            <el-button @click="batchFill()">批量添加</el-button>
          </div>
          <div class="tool-item">
            <el-checkbox v-model="item.required">必填</el-checkbox>
          </div>
          <div class="tool-item">
            <el-button type="text" icon="el-icon-delete" @click="config.subjects.splice(index,1)"></el-button>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <el-button type="text">选择类型</el-button>
    </template>
  </div>
</template>
<script>
import config from '../../pages/paper/studio/config'

export default {
  name: 'PFormItem',
  props: {
    item: {
      type: Object,
      default: null,
    },
    index: {
      type: Number,
      default: -1,
    },
    config: {
      type: Object,
      default: null,
    }
  },
  data() {
    return {
      editTitle: false,
      editScore: false,
      fillValue: '',
    }

  },

  mounted() { },
  methods: {
    /**
     * 自动根据项目的分数算分
     */
    autoScore() {
      if (this.item.options && this.item.options.length > 0) {
        this.item.score = this.item.options.reduce((t, a) => t + a.score, 0);
      }
    },
    /**
     * 批量添加
     */
    async batchFill() {
      try {
        let { value } = await this.$msgbox({
          title: '批量添加',
          showCancelButton: true,
          showInput: true,
          message: '换行可添加多个',
          inputType: 'textarea',
        });

        value = value
          .split('\n')
          .filter(el => !!el)
          .map(el => config.getOptionItem(el));
        console.warn(value);
        this.item.options = [...this.item.options, ...value];



      } catch (error) {
        console.warn(error);
      }
    }
  }

}
</script>
<style lang="scss" scoped>
.p-form-item {
  margin-bottom: 30px;
  .p-form-item-header {
    min-height: 30px;
    border-bottom: 1px solid #ddd;
    margin: 10px 0;
    display: flex;
    .title {
      flex: 1;
    }
    .tool-list {
      display: flex;
      align-items: center;
      color: #666;
      .tool-item {
        padding: 0 5px;
        display: flex;
        align-items: center;
        cursor: pointer;
        .tool-label {
          font-size: 12px;
        }
      }
    }
  }
  .p-form-item-body {
    .option-box {
    }
  }

  .p-form-item-footer {
    .tool-list {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .tool-item {
        padding: 0 10px;
      }
    }
  }
}
</style>