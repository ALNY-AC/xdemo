
<template>
  <div class="p-form-item">
    <template v-if="item">
      <div class="p-form-item-header">
        <div class="title">
          <div v-if="!editTitle" @click="editTitle=true">{{item.title}}</div>
          <div v-if="editTitle">
            <el-input
              @blur="editTitle=false"
              @keydown.enter.native.stop="editTitle=false"
              v-model="item.title"
            ></el-input>
          </div>
        </div>
        <div class="tool-list">
          <div class="tool-item">
            <el-button type="text" v-if="!editScore" @click="editScore=true">(分值：{{item.score}})</el-button>
          </div>
          <div class="tool-item">
            <el-input
              v-if="editScore"
              v-model.number="item.score"
              type="number"
              ref="input-score"
              @blur="editScore=false"
              @keydown.enter.native.stop="editScore=false"
            ></el-input>
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
          <template v-if="item.type=='textarea'"></template>
          <template v-if="item.type=='input'"></template>
        </div>
      </div>
      <div class="p-form-item-footer">
        <div class="tool-list">
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
    }

  },

  mounted() { },
  methods: {

  }

}
</script>
<style lang="scss" scoped>
.p-form-item {
  .p-form-item-header {
    height: 30px;
    border-bottom: 1px solid #ddd;
    margin: 10px 0;
    display: flex;
    .title {
      flex: 1;
    }
    .tool-list {
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