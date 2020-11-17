<template>
  <div class="p-edit-input">
    <div @click="isEdit=true" v-if="!isEdit">
      <slot>{{value}}</slot>
    </div>
    <slot name="input">
      <el-input
        ref="input"
        v-if="isEdit"
        @blur="isEdit=false"
        @keydown.enter.native.stop="isEdit=false"
        v-model="model"
      ></el-input>
    </slot>
  </div>
</template>
<script>
export default {
  name: 'PEditInput',
  props: {
    value: {
      type: [String, Number],
      default: '',
    }
  },
  watch: {
    value: {
      handler(v) {
        if (v !== this.model) {
          this.model = v;
        }
      },
      immediate: true
    },
    model() {
      this.input();
    },
    async isEdit(v) {
      if (v) {
        await this.$nextTick()
        this.$refs.input.focus();
      }
    }
  },
  data() {
    return {
      isEdit: false,
      model: '',
    };
  },
  methods: {
    input() {
      this.$emit('input', this.model);
    }
  }

}
</script>
<style lang="scss" scoped>
.p-edit-input {
  width: 100%;
  // display: flex;
  // align-items: stretch;
  // justify-content: stretch;
}
</style>