<template>
  <div class="v-card">
    <div class="v-card-line">
      <img src="/images/vdata/line.png" alt />
    </div>
    <div class="v-card-header">
      <div class="v-card-header-cell cell-left">
        <div class="cell-body">
          <slot name="left"></slot>
        </div>
      </div>
      <div class="v-card-header-cell cell-center">
        <img src="/images/vdata/card_title.png" alt />
        <div class="v-card-title">{{title}}</div>
      </div>
      <div class="v-card-header-cell cell-right">
        <div class="cell-body">
          <slot name="right"></slot>
        </div>
      </div>
    </div>
    <div class="v-card-body">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'VCard',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped>
$card-height: 340px;
$card-header-height: 30px;
$card-body-height: $card-height - $card-header-height;
.v-card {
  position: relative;
  width: 100%;
  min-height: $card-height;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
  background-image: url("/images/vdata/card.png");
  .v-card-line {
    position: absolute;
    top: -7px;
    display: flex;
    justify-content: center;
    right: 0;
    left: 0;
    img {
      display: block;
    }
  }
  .v-card-header {
    text-align: center;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    max-height: $card-header-height;
    height: $card-header-height;
    overflow: hidden;
    img {
      display: block;
      margin: 0 auto;
      height: $card-header-height;
      width: 100%;
    }
    .v-card-header-cell {
      display: flex;
      position: relative;
      justify-self: stretch;
      &.cell-left {
      }
      &.cell-right {
      }
      &.cell-center {
        // width: 70%;
      }
      .cell-body {
        padding: 10px;
      }
    }
    .v-card-title {
      font-size: 14px;
      color: #ffffff;
      position: absolute;
      right: 0;
      left: 0;
      top: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .v-card-body {
    position: relative;
    height: $card-body-height;
    padding: 5px;
  }
}
</style>