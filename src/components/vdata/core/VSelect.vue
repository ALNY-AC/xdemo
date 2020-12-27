<template>
  <el-select
    :popper-append-to-body="false"
    v-model="model"
    @change="input()"
    class="v-select"
    size="mini"
    placeholder="请选择"
  >
    <el-option v-for="item in 10" :key="item" :label="item" :value="item"></el-option>
  </el-select>
</template>
<script>
export default {
  name: 'VSelect',
  props: {
    value: {
      type: [String, Number],
      default: '',
    }
  },
  watch: {
    value: {
      handler(v) {
        this.model = v;
      },
      immediate: true,
    }
  },
  data() {
    return {
      model: ''
    }
  },
  methods: {
    input() {
      this.$emit('input', this.model);
    }
  }

}
</script>
<style lang="scss" scoped>
.v-select {
  &.el-select {
    /deep/ {
      .el-select-dropdown {
        background-color: transparent;
        border-color: rgba(155, 222, 240, 0.2);
        .el-select-dropdown__item {
          color: #fff;
          &.hover {
            background-color: rgba(155, 222, 240, 0.2);
          }
        }
      }
      .el-select__caret {
        color: rgba(155, 222, 240, 0.2);
        //  .el-input__icon
        // height: 20px;
        line-height: 20px;
        width: auto;
      }
      .el-input__inner {
        background-color: transparent;
        color: #9bdef0;
        border-color: rgba(155, 222, 240, 0.2);
        height: 20px;
        line-height: 20px;
        padding-right: 10px;
        &::placeholder {
          color: #9bdef0;
        }
      }
    }
  }
}
</style>