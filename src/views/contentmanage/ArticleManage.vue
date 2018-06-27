<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-button class="filter-item" type="success" v-waves icon="el-icon-edit" @click="handleCreate">{{$t('table.add')}}</el-button>
      <el-input @keyup.enter.native="handleFilter" style="width: 300px;" class="filter-item" placeholder="标题" v-model="listQuery.title"></el-input>
      <el-select clearable class="filter-item" v-model="listQuery.state" placeholder="请选择状态" style="width: 120px;">
        <el-option v-for="item in articleState" :key="item.key" :label="item.key" :value="item.key"></el-option>
      </el-select>
      <el-select clearable class="filter-item" v-model="listQuery.type" placeholder="请选择类型" style="width: 120px;">
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
                    <el-form-item label="排版：">
                        <span>{{ props.row.layout}}</span>
                    </el-form-item>
                    <el-form-item label="优先权：">
                        <span>{{ props.row.priority}}</span>
                    </el-form-item>
                    <el-form-item label="标题：">
                        <span>{{ props.row.title}}</span>
                    </el-form-item>
                    <el-form-item label="状态：">
                        <span>{{ props.row.state}}</span>
                    </el-form-item>
                    <el-form-item label="发布者ID：">
                        <span>{{ props.row.publisherId}}</span>
                    </el-form-item>
                    <el-form-item label="评论：">
                        <span>{{ props.row.comments}}</span>
                    </el-form-item>
                    <el-form-item label="阅读数：">
                        <span>{{ props.row.reads}}</span>
                    </el-form-item>
                    <el-form-item label="点赞：">
                        <span>{{ props.row.likes}}</span>
                    </el-form-item>
                    <el-form-item label="发布时间：" style="width: 45%;">
                        <span>{{ props.row.pubdate}}</span>
                    </el-form-item>
                </el-form>
            </template>
        </el-table-column>
      <el-table-column align="center" :label="$t('table.id')" width="65">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" :label="$t('table.date')">
        <template slot-scope="scope">
          <span>{{scope.row.pubdate}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="150px" :label="$t('table.title')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.title}}</span>
          <!-- <el-tag>{{scope.row.type | typeFilter}}</el-tag> -->
        </template>
      </el-table-column>
      <el-table-column width="90px" align="center" label="作者">
        <template slot-scope="scope">
          <span>{{scope.row.publisherId}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column width="80px" label="重要性">
        <template slot-scope="scope">
          <svg-icon v-for="n in +scope.row.priority" icon-class="star" class="meta-item__icon" :key="n"></svg-icon>
        </template>
      </el-table-column> -->
      <el-table-column align="center" label="阅读数" width="95">
        <template slot-scope="scope">
          <span v-if="scope.row.reads">{{scope.row.reads}}</span>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.state | statusFilter">{{scope.row.state}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.actions')" width="110" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-tooltip content="详情" placement="top">
            <i class="el-icon-edit" @click="handleUpdate(scope.$index, scope.row)"></i>
          </el-tooltip>
          <el-tooltip content="上线" placement="top">
            <span @click="handleToPublish(scope.$index, scope.row)" v-if="scope.row.state!='已上线'" ><svg-icon icon-class="published" /></span>
          </el-tooltip>
          <el-tooltip content="下线" placement="top">
            <span v-if="scope.row.state!='已下线'" @click="handleToDraft(scope.$index, scope.row)"><svg-icon icon-class="drafts"  /></span>
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

  </div>
</template>

<script>
import { searchNews, newsOff, newsPublish } from '@/api/api'
import waves from '@/directive/waves'

const articleState = [
  { key: '已上线' },
  { key: '已下线' },
  { key: '已禁用' }
]
const articleType = [
  { key: '常规资讯' }
]

export default {
  name: 'complexTable',
  directives: {
    waves
  },
  data() {
    return {
      showPublished: true,
      showDraft: true,
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
        state: undefined
      },
      importanceOptions: [0, 1, 2, 3],
      dialogFormVisible: false,
      dialogStatus: '',
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      }
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
      // console.log(this.listQuery)
      searchNews(this.listQuery).then(res => {
        this.list = res.data.data
        // console.log(this.list)
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
      } else if (this.listQuery.state === '') {
        this.listQuery.state = undefined
        this.getList()
      } else {
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
      this.$router.push({ name: '新增文章' })
    },
    handleUpdate(index, row) {
      this.$router.push({ path: 'editarticle', query: { articleId: row.id }})
    },
    handleToPublish(index, row) {
      newsPublish(row.id).then(res => {
        // console.log(res)
        row.state = res.data.state
        this.$message({
          message: '操作成功',
          type: 'success'
        })
      }).catch((err) => {
        this.$message({
          message: err,
          type: 'error'
        })
      })
    },
    handleToDraft(index, row) {
      newsOff(row.id).then(res => {
        row.state = res.data.state
        this.$message({
          message: '操作成功',
          type: 'success'
        })
      }).catch((err) => {
        this.$message({
          message: err,
          type: 'error'
        })
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
  }
</style>
