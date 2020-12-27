<template>
  <div class="v-box">
    <img src="/images/vdata/box.png" alt />
    <div class="v-box-panel">
      <div class="v-box-panel-cell">
        <div class="info-title">{{title}}</div>
      </div>
      <div class="v-box-panel-cell">
        <div class="info-num">{{value}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'VBox',

  props: {
    title: {
      type: [String, Number],
      default: '任务总数'
    },
    value: {
      type: [String, Number],
      default: 8888
    }
  }
}
</script>
<style lang="scss" scoped>
.v-box {
  position: relative;
  img {
    display: block;
    max-width: 100%;
    width: 100%;
    height: 100%;
    max-height: 100%;
  }
  .v-box-panel {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    .v-box-panel-cell {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      .info-title {
        color: #9bdef0;
        font-size: 14px;
      }
      .info-num {
        font-size: 20px;
        font-weight: bold;
        color: #00f1ff;
      }
    }
  }
}
</style>