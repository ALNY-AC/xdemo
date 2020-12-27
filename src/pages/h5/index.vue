<template>
  <div>
    <div>
      <div class="title"></div>
      <div class="list">
        <div class="card" v-for="i in 20" :key="i">
          <div class="card-body" @click="select(i)">
            <div
              class="bg-img"
              :style="`background-image:url(${'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607593206063&di=3ec005e59ae1d38217cbf3c63ba55724&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fd53e3fef42f1edccfeae94f56226159b33d6f80810914-MAMN7k_fw658'});`"
            ></div>
            <!-- icon自己找 -->
            <div class="icon" v-if="selectList.indexOf(i)>=0"></div>
            <div class="footer">科幻</div>
          </div>
        </div>
      </div>
      <div class="fix-tool">
        <div class="btn">下一步</div>
        <div class="back">跳过</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'root',

  data() {
    return {
      selectList: [],
    }
  },
  methods: {

    /**
     * 选择，可以传入id等唯一的属性
     * @param {Number} 唯一的标识符
     */
    select(i) {
      if (this.selectList.length >= 3) {
        //   可以在这里弹框提示，如果超过3个或者x个就不让添加了
        console.warn('3个了，别加了');
        return;
      }
      // 先去掉再添加，防止重复
      this.selectList = this.selectList.filter(el => el != i);
      this.selectList.push(i);
      console.warn(this.selectList);
    }
  }
}
</script>
<style lang="scss" scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  padding: 5px;
  $max: 100%;
  .card {
    width: $max / 3;
    height: 150px;
    padding: 5px;
    .card-body {
      border-radius: 5px;
      background-color: #f00;
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      .bg-img {
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background-color: #ddd;
        background-position: center center;
        background-size: 100%;
        background-repeat: no-repeat;
        z-index: 1;
      }
      .icon {
        position: relative;
        width: 30px;
        height: 30px;
        background-color: #ff0000;
        z-index: 2;
      }
      .footer {
        padding: 5px 0;
        color: #fff;
        text-align: center;
        position: absolute;
        right: 0;
        left: 0;
        bottom: 0;
        z-index: 2;
      }
    }
  }
}
.fix-tool {
  position: fixed;
  bottom: 10px;
  right: 0;
  left: 0;
  z-index: 10;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .btn {
    width: 80%;
    padding: 10px 0;
    text-align: center;
    border-radius: 25px;
    background-color: rgba($color: #000000, $alpha: 0.8);
    color: #fff;
  }
  .back {
    font-size: 12px;
    text-decoration: underline;
  }
}
</style>