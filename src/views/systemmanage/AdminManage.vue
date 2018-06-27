<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-button class="filter-item" type="success" v-waves icon="el-icon-edit" @click="handleCreate">{{$t('table.add')}}</el-button>
      <el-input @keyup.enter.native="handleFilter" style="width: 150px;" class="filter-item" placeholder="ID" v-model="listQuery.id"></el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 150px;" class="filter-item" placeholder="账号名" v-model="listQuery.username"></el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 150px;" class="filter-item" placeholder="角色ID" v-model="listQuery.roleId"></el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
        <!-- <el-button class="pan-btn light-blue-btn" circle size="mini">{{list.name}}</el-button> -->
    </div>
    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" :label="$t('table.id')" width="65">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="100px" :label="$t('table.admin')">
        <template slot-scope="scope">
          <span>{{scope.row.username}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="80px" :label="$t('table.roleId')">
        <template slot-scope="scope">
          <span>{{scope.row.roleId}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="100px" :label="$t('table.lastTime')">
        <template slot-scope="scope">
          <span>{{scope.row.lastTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.actions')" min-width="90" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-tooltip content="详情" placement="top">
            <i class="el-icon-edit-outline" @click="handleDetails(scope.$index, scope.row)"></i>
          </el-tooltip>
          <el-tooltip content="编辑" placement="top">
            <i class="el-icon-edit" @click="handleUpdate(scope.$index, scope.row)"></i>
          </el-tooltip>
          <!-- <el-tooltip content="删除" placement="top">
            <i class="el-icon-delete" @click="handleDelete(scope.$index, scope.row)"></i>
          </el-tooltip> -->
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="add" label-position="left" label-width="100px" style='width: 400px; margin-left:50px;'>
        <el-form-item :label="$t('table.id')" v-if="dialogStatus=='update'">
          <el-input v-model="add.id"></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.admin')" v-if="dialogStatus=='create'">
          <el-input v-model="add.username"></el-input>
        </el-form-item>
        <el-form-item :label="$t('login.password')">
          <el-input v-model="add.password"></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.roleName')">
          <el-select class="filter-item" v-model="add.roleId" placeholder="" style="width: 120px;">
            <el-option v-for="item in roleNames" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{$t('table.confirm')}}</el-button>
        <el-button v-else type="primary" @click="updateData">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { queryAdmin, deleteRole, getAllRole, updateAdmin, insertAdmin } from '@/api/api'
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
      roleNames: [],
      rolesgroup: [],
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        username: undefined,
        id: undefined,
        roleId: undefined
      },
      add: {
        username: undefined,
        id: undefined,
        roleId: undefined,
        password: undefined
      },
      textMap: {
        update: '修改账号',
        create: '新增账号'
      },
      dialogFormVisible: false,
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
    this.handleGetRole()
  },
  methods: {
    getList() {
      this.listLoading = true
      queryAdmin(this.listQuery).then(res => {
        this.list = res.data.data
        // console.log(this.list)
        this.total = res.data.count
        this.listLoading = false
      })
    },
    handleGetRole() {
      getAllRole().then(res => {
        const allData = res.data
        // console.log(allData)
        _.forEach(allData, (value, key) => {
          this.rolesgroup.push({
            id: value.id,
            name: value.name
          })
          this.roleNames.push(value.name)
        })
        // console.log(this.roleNames)
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
    handleDetails(index, row) {
      this.$router.push({ path: 'admindetails', query: { id: row.id }})
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          _.forEach(this.rolesgroup, (value, key) => {
            if (this.add.roleId === value.name) {
              this.add.roleId = value.id
            }
          })
          const para = {
            roleId: this.add.roleId,
            username: this.add.username,
            password: this.add.password
          }
          insertAdmin(para).then(() => {
            this.getList()
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(index, row) {
      this.add = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      _.forEach(this.rolesgroup, (value, key) => {
        if (this.add.roleId === value.id) {
          this.add.roleId = value.name
        }
      })
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    resetTemp() {
      this.add = {
        username: undefined,
        id: undefined,
        roleId: undefined,
        password: undefined
      }
    },
    updateData() {
      this.$confirm('确认提交吗?', '提示', {
        type: 'warning'
      }).then(() => {
        _.forEach(this.rolesgroup, (value, key) => {
          if (this.add.roleId === value.name) {
            this.add.roleId = value.id
          }
        })
        const para = {
          roleIds: this.add.roleId,
          password: this.add.password
        }
        updateAdmin(this.add.id, para).then((res) => {
          this.dialogFormVisible = false
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success',
            duration: 2000
          })
          this.getList()
        })
      })
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
.el-icon-edit:before, .el-icon-delete:before, .el-icon-edit-outline:before {
  font-size: 18px;
  margin: 0 5px;
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
