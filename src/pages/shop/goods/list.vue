<template>
  <div id="goodsList">
    <el-card>
      <el-form ref="queryForm" inline :model="query">
        <el-form-item label="商品名称:" prop="name">
          <el-input v-model="query.name" @keydown.enter.native="updateInit()"></el-input>
        </el-form-item>
        <el-form-item label>
          <el-button @click="updateInit()">搜索</el-button>
        </el-form-item>
      </el-form>
      <p>
        <span>
          <el-button icon="el-icon-plus" @click="$router.push('/shop/goods/edit')">新增商品</el-button>
          <el-button @click="saveUp(selectList.map(el=>el.id),1)">批量上架</el-button>
          <el-button @click="saveUp(selectList.map(el=>el.id),0)">批量下架</el-button>
        </span>
        <span class="float-right">
          <el-button icon="el-icon-delete" type="danger">批量删除</el-button>
        </span>
      </p>
      <el-table
        ref="table"
        row-key="id"
        :data="list"
        v-loading="loading"
        border
        @selection-change="e=>selectList=e"
      >
        <el-table-column reserve-selection width="55" align="center" type="selection"></el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-switch
              title="上架/下架"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.is_up"
              @change="saveUp([scope.row.id],scope.row.is_up)"
            ></el-switch>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin:10px 0"
        :current-page.sync="query.page"
        :page-size.sync="query.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>
<script>
export default {

  data() {
    return {
      // 查询参数
      query: {
        //================系统标准参数
        //页数
        page: 1,
        // 分页大小
        size: 10,
        //================业务参数
        // 根据商品名称查找
        name: '',
        // 数据添加时间范围-开始
        start_time: '',
        // 数据添加时间范围-结束
        end_time: '',
      },
      //   主数据加载状态
      loading: false,
      //   主数据
      list: [],
      //   主数据被选择的数据
      selectList: [],
      //分类数据
      classList: [],
      //   属性数据
      propList: [],
      //   标签数据
      labelList: [],
      //   主数据总数
      total: 0,
    };
  },
  watch: {

  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.updateInit();
    },
    updateInit() {
      this.query.page = 1;
      this.update();
    },
    update() {
      this.httpGoods();
      //   this.httpClass();
      //   this.httpProp();
      //   this.httpLabel();
    },
    async saveUp(ids, is_up) {
      console.warn(ids, is_up);
    },
    async httpClass() {
      try {
        const res = await this.$http.post('');
        if (res.code >= 0) {

        } else {

        }

      } catch (e) {
        console.error(e);
      }
    },
    async httpGoods() {
      try {
        const res = await this.$http.post('');
        if (res.code >= 0) {

        } else {

        }

      } catch (e) {
        console.error(e);
      }
    },
    async httpProp() {
      try {
        const res = await this.$http.post('');
        if (res.code >= 0) {

        } else {

        }

      } catch (e) {
        console.error(e);
      }
    },
    async httpLabel() {
      try {
        const res = await this.$http.post('');
        if (res.code >= 0) {

        } else {

        }

      } catch (e) {
        console.error(e);
      }
    },

  },
}
</script>
<style lang="scss" scoped>
#goodsList {
  padding: 20px;
}
</style>