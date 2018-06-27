<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-button class="filter-item" type="success" v-waves icon="el-icon-edit" @click="handleCreate">{{$t('table.add')}}</el-button>
      <el-input @keyup.enter.native="handleFilter" style="width: 150px;" class="filter-item" placeholder="角色名" v-model="listQuery.name"></el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
        <!-- <el-button class="pan-btn light-blue-btn" circle size="mini">{{list.name}}</el-button> -->
    </div>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" :label="$t('table.id')" width="65">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="80px" :label="$t('table.name')">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" min-width="80px" :label="$t('table.fix')">
        <template slot-scope="scope">
          <span>{{scope.row.fix}}</span>
        </template>
      </el-table-column> -->
      <el-table-column class-name="status-col" :label="$t('table.fix')" min-width="80px">
        <template slot-scope="scope">
          <el-tag :type="scope.row.fix | statusFilter">{{scope.row.fix}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="80px" :label="$t('table.lastTime')">
        <template slot-scope="scope">
          <span>{{scope.row.lastTime}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column mix-width="120px" align="center" :label="$t('table.menuList')">
        <template slot-scope="scope">
          <span class="link-type" v-for="(item, index) in scope.row.menus" :key="index">{{item.name}}，</span>
        </template>
      </el-table-column>
      <el-table-column mix-width="120px" align="center" :label="$t('table.operations')">
        <template slot-scope="scope">
          <span class="link-type" v-for="(item, index) in scope.row.operations" :key="index">{{item.name}}，</span>
        </template>
      </el-table-column> -->
      <el-table-column align="center" :label="$t('table.actions')" min-width="90" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <i class="el-icon-edit" @click="handleUpdate(scope.$index, scope.row)"></i>
          <i class="el-icon-delete" @click="handleDelete(scope.$index, scope.row)"></i>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
import { queryRole, deleteRole } from '@/api/api'
import waves from '@/directive/waves'
import _ from 'lodash'

export default {
  name: 'complexTable',
  directives: {
    waves
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        name: undefined
      },
      dialogStatus: ''
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        '可修改': 'success',
        '不可修改': 'info'
      }
      return statusMap[status]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      queryRole(this.listQuery).then(res => {
        this.list = res.data.data
        // console.log(this.list)
        this.total = res.data.count
        _.forEach(this.list, (value, key) => {
          if (value.fix === true) {
            value.fix = '可修改'
          } else if (value.fix === false) {
            value.fix = '不可修改'
          }
        })
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.pageIndex = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageIndex = val
      this.getList()
    },
    handleCreate() {
      this.dialogStatus = 'create'
      this.$router.push({ name: '新增角色' })
    },
    handleUpdate(index, row) {
      this.$router.push({ path: 'roledetails', query: { id: row.id }})
    },
    handleDelete(index, row) {
      this.$confirm('确认删除该文章吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        deleteRole(row.id).then(res => {
          this.listLoading = false
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
          this.getList()
        })
      })
    }
  }
}
</script>

<style>
.svg-icon[data-v-5d4549d3] {
  width: 18px;
  height: 18px;
}
.el-icon-edit:before, .el-icon-delete:before {
  font-size: 18px;
}
.demo-table-expand .el-form-item {
    min-width: 25%;
    margin-right: 50px;
    display: inline-block;
  }
  .pan-btn {
      padding: 14px 25px;
      float: right;
  }
</style>
