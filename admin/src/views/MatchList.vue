<template>
  <div>
    <h1>赛事列表</h1>
    <el-table :data="matches">
      <el-table-column prop="_id" label="ID" width="240px"></el-table-column>
      <el-table-column prop="name" label="赛事"></el-table-column>
      <el-table-column prop="time" label="时间"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180px">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/matches/edit/${scope.row._id}`)"
            >编辑</el-button
          ><!--scope.row表示当前行的数据-->
          <el-button type="text" size="small" @click="remove(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      matches: [],
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("rest/matches");
      this.matches = res.data;
      console.log(this.matches);
    },
    async remove(row) {
      this.$confirm(`是否删除赛事 ${row.name}`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await this.$http.delete(`rest/matches/${row._id}`);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.fetch();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  created() {
    this.fetch();
  },
};
</script>
