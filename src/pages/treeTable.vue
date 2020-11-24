
<template>
  <div id="test">
    <el-card>
      <table class="table">
        <thead>
          <tr>
            <th v-for="(th,i) in tableHeader" :key="i">{{th}}</th>
          </tr>
        </thead>
        <tbody v-html="table"></tbody>
      </table>
    </el-card>
    <el-card>
      <el-tree :props="{children:'child'}" :data="data" default-expand-all></el-tree>
    </el-card>
  </div>
</template>
<script>

import data from './data';
import treeToTable from './treeToTable';

export default {
  data() {
    return {
      selected: [],
      tableHeader: [''],
      data: [],
      list: [],
      table: '',
    }
  },
  mounted() {
    this.tableHeader = [
      '一级指标',
      '评分',
      '二级指标',
      '评分',
      '三级指标',
      '评分',
      '指标评分细则',
      '数据值',
      '得分',
    ];
    //测试数据
    this.data = new Array(4).fill('').map((el, i) => {
      let item = JSON.parse(JSON.stringify(data));
      item.label += i;
      return item
    });
    console.warn(this.data.map(el => el.label));
    this.table = treeToTable(this.data);
  },
  methods: {



  }
}
</script>
<style lang="scss" scoped>
#test {
  padding: 20px;
  /deep/ {
    .table {
      width: 100%;
      border: solid 1px #ddd;
      border-collapse: collapse;

      th,
      td {
        border: solid 1px #ddd;
        text-align: center;
      }
    }
  }
}
.el-card {
  margin-bottom: 20px;
}
</style>