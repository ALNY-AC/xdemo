<template>
  <div class="v-box-matrix">
    <el-row :gutter="25" style="margin-bottom:20px">
      <el-col :span="12">
        <v-box></v-box>
      </el-col>
      <el-col :span="12">
        <v-box></v-box>
      </el-col>
    </el-row>
    <el-row :gutter="25" style="margin-bottom:20px">
      <el-col :span="12" :offset="6">
        <v-box></v-box>
      </el-col>
    </el-row>
    <el-row :gutter="25">
      <el-col :span="12">
        <v-box></v-box>
      </el-col>
      <el-col :span="12">
        <v-box></v-box>
      </el-col>
    </el-row>
  </div>
</template>
<script>
// import VBox from './VBox'
export default {
  // components: { VBox },
  name: 'VBoxMatrix'
}
</script>
<style lang="scss" scoped>
.v-box-matrix {
  min-height: 340px;
  height: 340px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  * {
    box-sizing: border-box;
  }
  .el-row {
    flex: 1;
    align-items: stretch;
    .el-col {
      .v-box {
      }
    }
  }
}
</style>