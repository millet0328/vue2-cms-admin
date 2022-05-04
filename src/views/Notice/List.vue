<template>
  <el-card class="box-card">
    <div slot="header">
      <span>公告列表</span>
    </div>
    <el-table :data="tableData">
      <el-table-column prop="id" label="#" width="40">
      </el-table-column>
      <el-table-column prop="title" label="标题" width="250">
      </el-table-column>
      <el-table-column prop="create_time" label="发布日期">
      </el-table-column>
      <el-table-column prop="update_time" label="更新日期">
      </el-table-column>
      <el-table-column prop="is_sticky" label="是否置顶">
        <template slot-scope="scope">
          <el-tag :type="scope.row.is_sticky ? 'success' : 'info' ">{{ scope.row.is_sticky ? '置顶' : '正常' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="280">
        <template slot-scope="scope">
          <el-link :href="`#/notice/edit/${scope.row.id}`" class="am-margin-right-sm" type="primary">
            <el-button icon="el-icon-edit" type="primary" plain>编辑</el-button>
          </el-link>
          <el-button @click="handleStick(scope.row)" :type="scope.row.is_sticky ? 'info' : 'success' "
                     :icon="scope.row.is_sticky ? 'el-icon-video-pause' : 'el-icon-upload2'" plain>
            {{ scope.row.is_sticky ? '取消' : '置顶' }}
          </el-button>
          <el-button @click="handleRemove(scope.row.id,scope.$index)" icon="el-icon-delete" type="danger" plain>
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { Notice } from '@/api/';
import { Slide } from '../Slide/List'

export default {
  name: "List",
  data() {
    return {
      tableData: [],
    }
  },
  created() {
    document.title = "公告列表";
    this.loadList();
  },
  methods: {
    // 加载公告列表
    async loadList() {
      let { status, data } = await Notice.list();
      if (status) {
        this.tableData = data;
      }
    },
    // 置顶/取消置顶
    handleStick(notice) {
      let { id, is_sticky } = notice;
      this.$confirm(`此操作将${is_sticky === 1 ? '取消置顶' : '置顶'}该公告，是否继续？`, { type: 'warning' })
          .then(async () => {
            // 切换状态
            is_sticky = is_sticky === 1 ? 0 : 1;
            let { status, msg } = await Notice.stick({ id, is_sticky });
            if (status) {
              // 操作DOM
              Object.assign(notice, { is_sticky });
              this.$message.success(msg);
            }
          })
          .catch(() => {
            this.$message.info('取消成功')
          });
    },
    // 删除公告
    async handleRemove(id, index) {
      this.$confirm('此操作将永久删除该公告, 是否继续?', { type: 'warning' })
          .then(async () => {
            let { status, msg } = await Notice.remove({ id });
            if (status) {
              this.tableData.splice(index, 1);
              this.$message.success(msg);
            }
          })
          .catch(() => {
            this.$message.info('取消成功')
          });
    },
  }
}
</script>

<style>
</style>
