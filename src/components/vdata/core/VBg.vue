<template>
  <div class="v-bg">
    <div class="v-bg-img v-bg-img-1"></div>
    <div class="v-bg-img v-bg-img-2"></div>
  </div>
</template>

<script>
export default {
  name: 'VBg'
}
</script>
<style lang="scss" scoped>
.v-bg {
  position: absolute;
  z-index: 0;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  overflow: hidden;
  background-color: #070f29;
  .v-bg-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover cover;
    &-1 {
      background-size: 100% 100%;
      background-image: url("/images/vdata/bg.jpg");
    }
    &-2 {
      background-size: 900px;
      background-image: url("/images/vdata/bg-logo.png");
    }
  }
}
</style>