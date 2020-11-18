<template>
  <div class="p-edit-input">
    <div @click="isEdit=true" v-if="!isEdit">
      <slot>
        <div v-html="showContent"></div>
      </slot>
    </div>
    <!-- @keydown.enter.native.stop="isEdit=false" -->

    <slot name="input">
      <el-input
        ref="input"
        :type="type"
        rows="1"
        autosize
        v-if="isEdit"
        @blur="isEdit=false"
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
    },
    type: {
      type: String,
      default: 'textarea'
    }
  },
  computed: {
    showContent() {
      if (this.type == 'textarea') {
        return (this.value + '').replace(/[\r|\n]/gim, '<br/>');
      } else {
        return this.value;
      }
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