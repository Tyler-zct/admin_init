<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <!-- <el-button class="filter-item" type="success" v-waves icon="el-icon-edit" @click="handleCreate">{{$t('table.add')}}</el-button> -->
      <el-input @keyup.enter.native="handleFilter" style="width: 300px;" class="filter-item" placeholder="标题" v-model="listQuery.title"></el-input>
      <el-select clearable class="filter-item" v-model="listQuery.status" placeholder="请选择状态" style="width: 120px;">
        <el-option v-for="item in articleState" :key="item.key" :label="item.key" :value="item.key"></el-option>
      </el-select>
      <el-select clearable class="filter-item" v-model="listQuery.type" placeholder="请选择类型" style="width: 130px;">
        <el-option v-for="item in articleType" :key="item.key" :label="item.key" :value="item.key"></el-option>
      </el-select>
       <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
    </div>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
      <el-table-column type="expand">
            <template slot-scope="props">
                <el-form label-position="left"  class="demo-table-expand">
                    <el-form-item label="ID：">
                        <span>{{ props.row.id}}</span>
                    </el-form-item>
                    <el-form-item label="类型：">
                        <span>{{ props.row.type}}</span>
                    </el-form-item>
                    <el-form-item label="标题：">
                        <span>{{ props.row.title}}</span>
                    </el-form-item>
                    <el-form-item label="跳转地址：" style="width: 100%;">
                        <span>{{ props.row.url}}</span>
                    </el-form-item>
                    <el-form-item label="最近更新时间：" style="width: 50%;">
                        <span>{{ props.row.lastTime}}</span>
                    </el-form-item>
                    <el-form-item label="是否上线：">
                        <span v-if="props.row.status === true">已上线</span>
                        <span v-else>已下线</span>
                    </el-form-item>
                </el-form>
            </template>
        </el-table-column>
      <el-table-column align="center" :label="$t('table.id')" width="65">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="100px" :label="$t('table.title')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.type')" width="95">
        <template slot-scope="scope">
          <span>{{scope.row.type}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.url')" min-width="150">
        <template slot-scope="scope">
          <span>{{scope.row.url}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.lastTime')" width="95">
        <template slot-scope="scope">
          <span>{{scope.row.lastTime}}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.actions')" width="110" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <i class="el-icon-edit" @click="handleUpdate(scope.$index, scope.row)"></i>
          <span @click="handleToPublish(scope.$index, scope.row)" v-if="scope.row.status!='已上线'" ><svg-icon icon-class="published" /></span>
          <span v-if="scope.row.status!='已下线'" @click="handleToPublish(scope.$index, scope.row)"><svg-icon icon-class="drafts"  /></span>
          <!-- <i class="el-icon-delete" @click="handleDelete(scope.$index, scope.row)"></i> -->
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
import { queryBanner, updBanner } from '@/api/api'
import waves from '@/directive/waves'
import _ from 'lodash'

const articleState = [
  { key: '已上线' },
  { key: '已下线' },
  { key: '已禁用' }
]
const articleType = [
  { key: '常规Banner' },
  { key: '活动Banner' }
]

export default {
  name: 'complexTable',
  directives: {
    waves
  },
  data() {
    return {
      articleState,
      articleType,
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        type: undefined,
        title: undefined,
        status: undefined
      },
      dialogStatus: ''
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        '已上线': 'success',
        '已下线': 'info'
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
      queryBanner(this.listQuery).then(res => {
        // console.log(res.data)
        this.list = res.data
        _.forEach(this.list, (value, key) => {
          if (value.status === true) {
            value.status = '已上线'
          } else if (value.status === false) {
            value.status = '已下线'
          }
        })
        this.total = res.data.count
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.pageIndex = 1
      if (this.listQuery.title === '') {
        this.listQuery.title = undefined
        this.getList()
      } else if (this.listQuery.type === '') {
        this.listQuery.type = undefined
        this.getList()
      } else if (this.listQuery.status === '') {
        this.listQuery.status = undefined
        this.getList()
      } else {
        if (this.listQuery.status === '已上线') {
          this.listQuery.status = true
        } else if (this.listQuery.status === '已下线') {
          this.listQuery.status = false
        }
        this.getList()
      }
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
      // this.$router.push({ name: 'add-article' })
    },
    handleUpdate(index, row) {
      this.$router.push({ path: 'editbanner', query: { id: row.id }})
    },
    handleToPublish(index, row) {
      // console.log(row.status)
      let change = false
      if (row.status === '已上线') {
        change = true
      } else if (row.status === '已下线') {
        change = false
      }
      const para = {
        status: !change
      }
      const id = row.id
      updBanner(id, para).then(res => {
        if (row.status === '已上线') {
          row.status = '已下线'
        } else if (row.status === '已下线') {
          row.status = '已上线'
        }
      })
    },
    handleDelete(index, row) {
      this.$confirm('确认删除该文章吗?', '提示', {
        type: 'warning'
      }).then(() => {
        // this.listLoading = true
        // const para = {
        //   id: row.id
        // }
        // daleteGroup(para).then(res => {
        //   this.listLoading = false
        //   this.$notify({
        //     title: '成功',
        //     message: '删除成功',
        //     type: 'success',
        //     duration: 2000
        //   })
        //   this.getList()
        // })
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
  margin-bottom: 10px;
}
.row-item {
  margin-top: 15px;
}
</style>
