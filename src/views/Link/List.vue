<template>
  <el-card class="box-card">
    <div class="header" slot="header">
      <span>友情链接</span>
      <el-button plain size="mini" type="primary" icon="el-icon-circle-plus-outline">
        添加链接
      </el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="#" width="40">
      </el-table-column>
      <el-table-column prop="title" label="链接标题">
      </el-table-column>
      <el-table-column prop="website" label="网站地址">
        <template slot-scope="scope">
          <el-link href="#" target="_blank">{{ scope.row.website }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="create_time" label="添加日期">
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" icon="el-icon-edit" type="primary" plain>编辑</el-button>
          <el-button size="mini" icon="el-icon-delete" type="danger" plain>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  name: "List",
  data() {
    return {
      tableData: [{
        "id": 3,
        "title": "window之家",
        "website": "http://www.baidu.com",
        "create_date": "2022-03-17T15:40:14.000Z",
        "update_date": null,
        "create_time": "2022-03-17 23:40:14",
      }],
    }
  },
}
</script>

<style lang="less" scoped>
.box-card {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>