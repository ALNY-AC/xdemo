<template>
  <div class="v-title">
    <img src="/images/vdata/title.png" alt />
    <div class="v-title-text">{{title}}</div>
  </div>
</template>
<script>
export default {
  name: 'VTitle',
  props: {
    title: {
      type: String,
      default: '',
    }
  },
}
</script>
<style lang="scss" scoped>
.v-title {
  max-width: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
  user-select: none;
  .v-title-text {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 18px;
  }
  img {
    display: block;
    width: 100%;
    max-width: 100%;
  }
}
</style>