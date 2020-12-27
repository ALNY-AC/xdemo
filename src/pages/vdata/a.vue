<template>
  <!-- 可视化B页面 -->
  <div id="dataVisualizationB" :class="{fill:isFill}">
    <v-bg></v-bg>
    <v-title @click.native="isFill=!isFill" title="任务可视化展示"></v-title>
    <div class="data-v-panel window-scrollbar">
      <div class="data-v-body">
        {{isFill}}
        {{model}}
        <!-- <v-box></v-box> -->
        <!-- <v-box-matrix></v-box-matrix> -->

        <div class="v-data-row">
          <div class="v-data-col">
            <v-card title="任务完成情况">
              <v-select slot="left" v-model="model"></v-select>
              <v-select slot="right" v-model="model"></v-select>
              <v-chart :option="chartOption1"></v-chart>
            </v-card>
          </div>
          <div class="v-data-col">
            <v-box-matrix></v-box-matrix>
          </div>
          <div class="v-data-col">
            <v-card title="任务完成情况">
              <v-select slot="left" v-model="model"></v-select>
              <v-select slot="right" v-model="model"></v-select>
            </v-card>
          </div>
        </div>
        <div class="v-data-row">
          <div class="v-data-col">
            <v-card title="任务完成情况">
              <v-select slot="left" v-model="model"></v-select>
              <v-select slot="right" v-model="model"></v-select>
            </v-card>
          </div>
          <div class="v-data-col">
            <v-card title="任务完成情况">
              <v-select slot="left" v-model="model"></v-select>
              <v-select slot="right" v-model="model"></v-select>
            </v-card>
          </div>
          <div class="v-data-col">
            <v-card title="任务完成情况">
              <v-select slot="left" v-model="model"></v-select>
              <v-select slot="right" v-model="model"></v-select>
            </v-card>
          </div>
        </div>

        <!-- <el-row :gutter="10">
          <el-col :span="8" style="margin-bottom:30px">
            <v-card title="任务完成情况">
              <v-select slot="left" v-model="model"></v-select>
              <v-select slot="right" v-model="model"></v-select>
            </v-card>
          </el-col>
          <el-col :span="8" style="margin-bottom:30px">
            <div style="padding:0 10px">
              <v-box-matrix></v-box-matrix>
            </div>
          </el-col>
          <el-col :span="8" style="margin-bottom:30px">
            <v-card title="任务完成情况"></v-card>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8" style="margin-bottom:30px">
            <v-card title="任务完成情况"></v-card>
          </el-col>
          <el-col :span="8" style="margin-bottom:30px">
            <div style="padding:0 10px">
              <v-card title="任务完成情况"></v-card>
            </div>
          </el-col>
          <el-col :span="8" style="margin-bottom:30px">
            <v-card title="任务完成情况"></v-card>
          </el-col>
        </el-row>-->
        <!-- <h1 v-for="i in 20" :key="i">hello</h1> -->
      </div>
    </div>
  </div>
</template>
<script>
// import VTitle from './component/VTitle'
// import VCard from './component/VCard'
// import VBox from './component/VBox'
// import VCardTitle from './component/VCardTitle'
// import VBg from './component/VBg'
// import VBoxMatrix from './component/VBoxMatrix'
import chartOption1 from './chartOption1';
export default {
  //   components: { VTitle, VCard, VBox, VCardTitle, VBg, VBoxMatrix },
  // layout: 'root',
  data() {
    return {
      isFill: true,
      model: '',
      chartOption1: chartOption1,
    }
  },
}
</script>
<style lang="scss" scoped>
#dataVisualizationB {
  position: relative;
  min-height: 100%;
  box-sizing: border-box;
  //   display: flex;
  //   flex-direction: column;
  overflow: hidden;
  height: 100%;
  color: #fff;
  &.fill {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 980;
  }
  * {
    box-sizing: border-box;
  }
  .data-v-panel {
    overflow: auto;
    padding: 10px;
    height: 100%;
    position: relative;
    z-index: 2;
    .data-v-body {
      margin: 0 auto;
      max-width: 1186px;
      position: relative;
    }
  }
  .v-data-row {
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    margin-bottom: 20px;
    .v-data-col {
      width: 34%;
      &:nth-child(2) {
        width: 29%;
        // margin: 0 10px;
      }
    }
  }
}
.window-scrollbar {
  overflow-y: auto;

  &::-webkit-scrollbar-track-piece {
    //滚动条凹槽的颜色，还可以设置边框属性
    background-color: transparent;
  }

  &::-webkit-scrollbar {
    //滚动条的宽度
    width: 1px;
    height: 1px;
  }

  &::-webkit-scrollbar-thumb {
    //滚动条的设置
    background-color: #777;
    background-clip: padding-box;
    min-height: 28px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #777;
  }
}
</style>
