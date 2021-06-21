<template>
  <div>
    <commonTitle :commonTitleText="'重点人员列表'"></commonTitle>
    <div class="table_box">
      <el-table
        :data="tableData"
        :header-cell-style="{ background: '#00446f', color: '#fff' }"
        style="width: 100%"
      >
        <el-table-column prop="yxm" align="center" label="姓名">
        </el-table-column>
        <el-table-column prop="xb" align="center" label="性别">
        </el-table-column>
        <el-table-column prop="gmsfhm" align="center" label="身份证">
        </el-table-column>
        <el-table-column prop="mz" align="center" label="民族">
        </el-table-column>
        <el-table-column prop="jg" align="center" label="籍贯">
        </el-table-column>
        <el-table-column prop="xzdXxdz" align="center" label="居住地">
        </el-table-column>
        <el-table-column prop="pcs" align="center" label="反馈单位">
        </el-table-column>
        <el-table-column prop="zdrylbbj" align="center" label="标签">
        </el-table-column>
        <el-table-column prop="yjjb" align="center" label="级别">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="open(scope.row)">打标签</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination_box">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[20, 40, 60, 80]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getList, updateStatus } from "@/api/Control/personnel/index.js";
export default {
  data() {
    return {
      // 列表数据
      tableData: [],
      // 每页显示的数据条数
      pageSize: 20,
      // 当前页码值
      pageNum: 1,
      // 总的数据条数
      total: 0,
    };
  },
  created() {
    // 注册司机列表接口
    this.getLists();
  },
  methods: {
    // 打开确认弹框
    open(row) {
      let card = row.gmsfhm;
      this.$confirm("已阅标签", "自定义标签", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.updateStatu(card);
          this.getLists();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消已阅",
          });
        });
    },
    // 打标签
    async updateStatu(card) {
      let res = await updateStatus(card);
      if (res.code == 200) {
        this.getLists();
        this.$message({
          type: "success",
          message: "已阅",
        });
      }
    },
    // 注册司机列表接口
    async getLists() {
      let result = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      };
      let res = await getList(result);
      this.total = res.total;
      this.tableData = res.rows;
    },
    // 当前每页显示的数据条数发生变化的时候
    handleSizeChange(val) {
      this.pageSize = val;
      this.getLists();
    },
    // 当前页码值发生变化的时候
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getLists();
    },
  },
};
</script>

<style lang="less" scoped>
.table_box {
  margin-top: 0.4rem;
  /deep/.el-form-item__label {
    color: #fff;
  }
  /deep/.el-table {
    background-color: transparent;
  }
  // /deep/.el-table td {
  //   padding: 0rem 0;
  // }
  // /deep/.el-table th {
  //   padding: 0.1rem 0;
  // }
  /deep/.el-table__header {
    border: 1px solid #1c5683;
    margin-bottom: 0.1rem;
    table-layout: auto;
    background-color: #00416b;
  }
  /deep/.el-table th.is-leaf {
    border: none;
  }
  /deep/.el-table tr {
    background-color: #25456e;
    color: #fff;
  }
  /deep/.el-table tbody tr:hover > td {
    background-color: #096c7f;
  }
  /deep/.is-center {
    border: 0;
  }
  /deep/.el-table::before {
    background-color: transparent;
  }
  .table_box_img {
    width: 3rem;
    height: 2rem;
  }
  .pagination_box {
    margin-top: 0.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>