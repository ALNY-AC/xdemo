<template>
  <div id="propEdit">
    <el-card>
      <el-button type="text" @click.stop="addGroup(data.id)" icon="el-icon-plus">添加规格组</el-button>
      <el-tree
        :props="{label:'name',children:'props'}"
        default-expand-all
        style="width:300px"
        :data="list"
        node-key="id"
      >
        <div class="custom-tree-node" slot-scope="{ node, data }">
          <span class="item-label">{{ data.name }}</span>
          <span class="item-tool">
            <el-button
              type="text"
              @click.stop="add(data.id)"
              v-if="data.depth<2"
              icon="el-icon-plus"
            >添加规格</el-button>
            <el-button type="text" @click.stop="save(data)" icon="el-icon-edit">修改</el-button>
            <el-button type="text" @click.stop="del(data)" icon="el-icon-delete">删除</el-button>
          </span>
        </div>
      </el-tree>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          name: '规格组1', props: [
            { name: '规格1' },
            { name: '规格2' },
          ]
        },
      ]
    }
  },
  methods: {
    update() {

    },
    /**
     * 添加规格组
     */
    async addGroup() {
      let value = '';
      try {
        const res = await this.$prompt('请输入名称', '添加规格组', {
          inputValidator: (e) => !!e,
          inputErrorMessage: "请输入规格组名称！"
        })
        value = res.value;
      } catch (error) {
        return;
      }
      try {
        // 调用接口
        const res = await this.$http.post('/prop/group/save', { name: value });
        if (res.code >= 0) {
          this.$message.success('操作成功～');
        } else {
          this.$message.error('操作失败～');
        }
        // 请求完毕后刷新分类
      } catch (error) {
        console.error(error);
        this.$message.error('接口异常～');
      }
      this.update();

    },
    async save(data) {
      let value = '';
      try {
        const res = await this.$prompt('请输入规格', '编辑规格', {
          inputValue: data.name,
          inputValidator: (e) => !!e,
          inputErrorMessage: "请输入规格名称！"
        })
        value = res.value;
      } catch (error) {
        return;
      }
      try {
        const res = await this.$http.post('/class/save', { id: data.id, name: value });
        if (res.code == 0) {
          this.$message.success('操作成功～');
        } else {
          this.$message.error(res.msg);
        }
      } catch (error) {
        console.error(error);
        this.$message.error('接口异常～');
      }
      this.update();
    },
    depth(list = [], level = -1) {
      level++;
      list.forEach(el => {
        el.depth = level;
        if (el.children && el.children.length > 0) {
          this.depth(el.children, level);
        }
      });
    },
  }
}
</script>
<style lang="scss" scoped>
#propEdit {
  padding: 20px;
  .custom-tree-node {
    font-size: 14px;
    display: flex;
    align-items: center;
    width: 100%;
    .item-label {
      flex: 1;
    }
  }
}
</style>