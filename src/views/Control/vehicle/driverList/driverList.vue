<template>
  <div>
    <commonTitle :commonTitleText="'注册司机列表'"></commonTitle>
    <div class="table_box">
      <el-table
        :data="tableData"
        :header-cell-style="{ background: '#00446f', color: '#fff' }"
        style="width: 100%"
      >
        <el-table-column prop="driverName" align="center" label="注册司机名">
        </el-table-column>
        <el-table-column prop="mobile" align="center" label="手机号">
        </el-table-column>
        <el-table-column prop="truckLicense" align="center" label="车牌照">
        </el-table-column>
        <el-table-column prop="identityCard" align="center" label="身份证号">
        </el-table-column>
        <el-table-column prop="applyTime" align="center" label="注册时间">
        </el-table-column>
        <el-table-column align="center" label="是否比中重点人员">
          <template slot-scope="scope">
            <span>{{ scope.row.isKeyPerson | isKeyPersons }}</span>
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
import { getList } from "@/api/Control/vehicle/index.js";
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
  filters: {
    isKeyPersons(val) {
      if (val == 1) {
        return "是";
      } else if (val == 0) {
        return "否";
      }
    },
  },
  created() {
    // 注册司机列表接口
    this.getLists();
  },
  methods: {
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