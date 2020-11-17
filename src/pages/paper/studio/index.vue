<template>
  <div id="studio">
    <div>
      <el-button @click="addSubject(item)" v-for="item in tools" :key="item.label">{{item.label}}</el-button>
    </div>
    <div v-if="config" class="form-panel">
      <div class="form-list">
        <div class="form-item" v-for="(item,i) in config.subjects" :key="i">
          <p-form-item :config="config" :index="i" :item="item"></p-form-item>
        </div>
      </div>
    </div>
    <div></div>
    <div></div>
    <pre v-html="config"></pre>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "index.scss";
</style>