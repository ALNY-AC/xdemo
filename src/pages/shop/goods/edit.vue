<template>
  <div id="goodsEdit">
    <!-- <el-card> -->
    <el-form :model="form" :rules="rules" label-width="100px">
      <el-tabs type="border-card" v-model="tagsActive">
        <el-tab-pane label="基本信息" name="base">
          <el-form-item label="商品标题">
            <el-input style="width:300px" v-model="form.name" maxlength="32" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="次级标题">
            <el-input style="width:300px" v-model="form.sub_name" maxlength="32" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="商品标签">
            <el-input
              style="width:160px"
              v-model="tag"
              @keydown.enter.native="addTag()"
              maxlength="10"
              show-word-limit
            ></el-input>
            <el-tag
              closable
              @close="form.tags.splice(i,1)"
              v-for="(item,i) in form.tags"
              :key="item"
            >{{item}}</el-tag>
          </el-form-item>
          <el-form-item label="所属分类"></el-form-item>
        </el-tab-pane>
        <el-tab-pane label="sku配置" name="sku"></el-tab-pane>
      </el-tabs>
    </el-form>
    <!-- </el-card> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        name: '',
        sub_name: '',
        tags: [],
      },
      tag: '',
      rules: {},
      tagsActive: 'sku',
    };
  },
  methods: {
    addTag() {
      if (this.form.tags.findIndex(el => el == this.tag) >= 0) {
        this.$message.info('标签已存在～');
        return;
      }
      this.form.tags.push(this.tag);
      this.tag = '';
    },
  }
}
</script>
<style lang="scss" scoped>
#goodsEdit {
  padding: 20px;
}
</style>