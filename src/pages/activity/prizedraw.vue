<template>
  <div id="prizedraw">
    <div class="go-back" @click="$router.push('/')">
      <van-icon
        color="#fff"
        style="margin-right: 5px; display: inline-block;"
        size="16"
        name="arrow-left"
      />返回首页
    </div>
    <div class="bg">
      <img class="title-img" src="../../static/images/文字@2x.png" alt />
      <div class="rotator">
        <transition-group
          tag="div"
          :class="classMap"
          name="list"
          :style="[{'transform':`rotateZ(-${(default_rotate+1)*36}deg)`}]"
        >
          <div
            v-for="(item,index) in list"
            class="item"
            :style="[{'transform':`rotate(${rotateNum(index)}deg)`}]"
            :key="item.id"
          >
            <span class="title">{{item.title}}</span>
            <van-image fit="contain" width="30" height="30" radius="4" :src="$getUrl(item.img)" />
          </div>
        </transition-group>
        <img class="img" @click="httpJx" src="../../static/images/转盘中心@3x.png" alt />
      </div>
      <div class="tiems">剩余抽奖次数：{{number_tiems}}</div>
      <img class="prize-logo" src="../../static/images/奖杯@2x.png" alt />
      <div class="prize-namelist">
        <div class="title">中奖名单</div>
        <div class="viewable">
          <div class="namelist-box" :style="[{'margin-top':`${0-number}px`}]">
            <div class="item" v-for="(item,index) in prize_namelist" :key="index">
              <div class="user-num">{{item.phone}}</div>
              <div class="text">获得{{item.name}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-overlay :show="show" @click="show = false">
      <img style="width: 100%; height: 100%;" src="../../static/images/share_help.png" alt />
    </van-overlay>
  </div>
</template>

<script>
export default {
  name: 'prizedraw',
  layout: "root",
  data() {
    return {
      number: -5,
      times: '',
      number_tiems: 0,
      click: false,
      default_rotate: 100,
      bl_index: 0,
      classMap: ['box'],
      list: [],
      blArr: [],
      prize_namelist: [],
      apis: [
        'updateAppMessageShareData',
        'updateTimelineShareData',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'onMenuShareQZone',
        'startRecord',
        'stopRecord',
        'onVoiceRecordEnd',
        'playVoice',
        'pauseVoice',
        'stopVoice',
        'onVoicePlayEnd',
        'uploadVoice',
        'downloadVoice',
        'chooseImage',
        'previewImage',
        'uploadImage',
        'downloadImage',
        'translateVoice',
        'getNetworkType',
        'openLocation',
        'getLocation',
        'hideOptionMenu',
        'showOptionMenu',
        'hideMenuItems',
        'showMenuItems',
        'hideAllNonBaseMenuItem',
        'showAllNonBaseMenuItem',
        'closeWindow',
        'scanQRCode',
        'chooseWXPay',
        'openProductSpecificView',
        'addCard',
        'chooseCard',
        'openCard',
      ],
      show: false,
      // shareurl: ''
    };
  },
  methods: {
    // 用于初始化一些数据
    init() {
      this.update();
    },
    // 用于更新一些数据
    async update() {
      //   if (!this.isAdd) {
      //     localStorage.from_id = this.$route.query.from_id
      //     // this.$router.replace('/login');
      //     window.location.replace('https://h5.take-out.yihuo-cloud.com/prizedraw')
      //   }
      //   const userInfo = await this.$http.post('/user/info');
      //   if (userInfo.code > 0) {
      //     // this.shareurl = `https://h5.take-out.yihuo-cloud.com${this.$route.path}?from_id=${userInfo.data.id}`
      //     this.wxFx(userInfo.data.id);
      //   }
      const res = await this.$http.post('/prize/list', {});
      if (res.code > 0) {
        this.list = res.data
      }
      this.httpitems()
      this.times = setInterval(() => {
        this.number += 1
        if (this.number > 116) {
          this.number = 0
        }
      }, 100);
      this.getMoble()
    },
    build() { // 将从接口拿的概率进行百分比化
      this.blArr = [];
      this.list.forEach(el => {
        let max = el.bl;
        for (let i = 0; i < max; i++) {
          this.blArr.push(el.title)
        }
      })
    },
    rotateNum(index) {
      return (360 / this.list.length) * (index + 1)
    },
    async httpitems() {
      //   const res = await this.$http.post('/prize/prize_num', {});
      //   if (res.code > 0) {
      this.number_tiems = 3
      if (this.number_tiems > 0) {
        this.click = true
      }
      //   }
    },
    async httpJx() {
      if (this.number_tiems <= 0) {
        let pd = await this.$dialog.confirm({
          title: '抽奖次数不足!!',
          message: '邀请好友注册获取更多抽奖次数'
        })
        if (pd == 'confirm') {
          this.show = true
        }
      }
      if (!this.click) return //判断是否正在抽奖
      this.build()
      await this.setDefault(); //上一轮抽奖完毕转动角度归零
      let index = Math.ceil(Math.random() * 100); //随机生成奖项
      this.bl_index = index;
      let item = this.blArr[index]; // 中奖奖项名称
      this.default_rotate = this.list.findIndex(el => el.title == item); // 获取中奖项的下标
      setTimeout(async () => {
        try {
          let loading = this.$toast.loading({
            message: '奖励生成中...',
            overlay: true,
          });
          let title, message;
          if (item.indexOf('谢谢惠顾') < 0) {
            title = '中奖了！！';
            message = `获得${item}！！`
          } else {
            title = item;
          }
          // let res = await this.$http.post('/prize/save', {
          //   id: this.list[this.default_rotate].id
          // });
          await this.httpitems()
          loading.clear()
          let pd = await this.$dialog.alert({
            title: title,
            message: message
          })
          if (this.list[this.default_rotate].type == 1) {
            window.location.href = this.list[this.default_rotate].url
          }

        } catch (error) {

        }
      }, 3000);


    },
    setDefault() {
      this.click = false
      return new Promise(e => {
        this.classMap = ['box'];
        this.default_rotate = 100;
        this.$nextTick(() => {
          setTimeout(() => {
            this.classMap = ['box', 'transform'];
            e();
          }, 300);
        })
      })
    },
    getMoble() {
      let prefixArray = ["130", "131", "132", "133", "135", "137", "138", "170", "187", "189"];
      this.prize_namelist = prefixArray.map(el => {
        let home = ''
        for (let index = 0; index < 4; index++) {
          home = home + Math.floor(Math.random() * 10);
        }
        return {
          phone: `${prefixArray[Math.floor(Math.random() * 10)]}****${home}`,
          name: `${this.list[Math.floor(Math.random() * 10)].title}`
        }
      })
    },
    async wxFx(user_id) { // 微信分享
      const res = await this.$http.post('/jdk/sign', {
        apis: this.apis,
        url: `https://h5.take-out.yihuo-cloud.com${this.$route.path}`
      });
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: 'wx5bf6a90a691706d0', // 必填，公众号的唯一标识
        timestamp: res.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.nonceStr, // 必填，生成签名的随机串
        signature: res.signature,// 必填，签名
        jsApiList: res.jsApiList // 必填，需要使用的JS接口列表
      });
      //  朋友圈分享
      wx.ready(() => { //需在用户可能点击分享按钮前就先调用
        wx.updateAppMessageShareData({
          title: '逐天外卖', // 分享标题
          desc: '快来抽奖啦！！', // 分享描述
          link: `https://h5.take-out.yihuo-cloud.com${this.$route.path}?from_id=${user_id}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: 'https://api.take-out.yihuo-cloud.com/public/files/20200202/202002020250332716.jpg', // 分享图标
          success: () => {
            // 设置成功
            this.show = false

          }
        });


        wx.updateTimelineShareData({
          title: '逐天外卖', // 分享标题
          link: `https://h5.take-out.yihuo-cloud.com${this.$route.path}?from_id=${user_id}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: 'https://api.take-out.yihuo-cloud.com/public/files/20200202/202002020250332716.jpg', // 分享图标
          success: () => {
            // 设置成功
            this.show = false

          }
        })
      });
    },
  },
  // 计算属性
  computed: {
    // isAdd() {
    //   return typeof this.$route.query.from_id == 'undefined';
    // }
  },
  // 包含 Vue 实例可用过滤器的哈希表。
  filters: {},
  // 在实例创建完成后被立即调用
  created() { },
  // 在挂载开始之前被调用：相关的 render 函数首次被调用。
  beforeMount() { },
  // el 被新创建的 vm.el 替换，并挂载到实例上去之后调用该钩子。
  mounted() {
    this.init();
    this.$nextTick(() => { });
  },
  // 数据更新时调用，发生在虚拟 DOM 打补丁之前。
  beforeUpdate() { },
  // keep-alive 组件激活时调用。
  activated() { },
  // keep-alive 组件停用时调用。
  deactivated() { },
  // 实例销毁之前调用。在这一步，实例仍然完全可用。
  beforeDestroy() { },
  //Vue 实例销毁后调用。
  destroyed() { },
  // 当捕获一个来自子孙组件的错误时被调用。
  errorCaptured() { },
  // 包含 Vue 实例可用指令的哈希表。
  directives: {},
  // 一个对象，键是需要观察的表达式，值是对应回调函数。
  watch: {},
  // 组件列表
  components: {},
};
</script>

<style lang="scss" scoped>
@import "@/styles/variable.scss";

#prizedraw {
  background-image: linear-gradient(#ffb325, #ff5f18);
  // height: 100vh;
  padding-bottom: 10px;

  .go-back {
    position: absolute;
    top: 20px;
    left: 15px;
    padding: 3px 6px;
    background-color: rgba($color: #000000, $alpha: 0.2);
    display: flex;
    align-items: center;
    border-radius: 5px;
    color: #fff;
    font-size: 18px;
  }

  .bg {
    background-image: url("../../static/images/装饰@2x.png");
    background-repeat: no-repeat;
    background-position: 0% 35%;
    background-size: 100% 65%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;

    .title-img {
      width: 90vw;
      margin-top: 30px;
      margin-bottom: 10px;
    }

    .rotator {
      width: 80vw;
      position: relative;

      .box {
        background-image: url("../../static/images/空心转盘@3x.png");
        background-position: center;
        background-size: 100% 100%;
        width: 100%;
        padding-bottom: 100%;
        display: flex;
        justify-content: center;

        &.transform {
          transition: all 3s;
        }

        .item {
          position: absolute;
          transform-origin: bottom;
          width: calc(100% / 3);
          height: 50%;
          font-size: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 25px;

          &:nth-child(2n) {
            color: #f00;
          }

          &:nth-child(odd) {
            color: #f00;
          }

          .title {
            font-weight: bold;
            width: 75%;
            text-align: center;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            margin-bottom: 5px;
          }
        }
      }

      .img {
        position: absolute;
        top: calc(50% - 110px);
        left: calc(50% - 100px);
        width: 200px;
        height: 200px;
      }
    }

    .tiems {
      font-weight: bold;
      padding-right: 20px;
      width: 100%;
      color: #fff;
      font-size: 12px;
      text-align: right;
    }

    .prize-logo {
      width: 45px;
      height: 55px;
      margin-bottom: 5px;
    }

    .prize-namelist {
      background-color: rgba($color: #ffbd07, $alpha: 0.5);
      padding: 5px 10px;
      border-radius: 5px;
      width: 70%;

      .title {
        text-align: center;
        color: #f00;
        font-weight: bold;
        font-size: 16px;
        margin-bottom: 5px;
      }

      .viewable {
        height: 80px;
        overflow: hidden;
      }

      .namelist-box {
        .item {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          font-weight: bold;
          color: #f00;
          margin-bottom: 3px;
        }
      }
    }
  }
}

.list-enter {
  opacity: 0;
}

.list-enter-active {
  transition: all 1s;
}

#prizedraw /deep/ {
}
</style>