<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <!-- <el-button class="filter-item" type="success" v-waves icon="el-icon-edit" @click="handleCreate">{{$t('table.add')}}</el-button> -->
      <el-input @keyup.enter.native="handleFilter" style="width: 300px;" class="filter-item" placeholder="标题" v-model="listQuery.title"></el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 88px;" class="filter-item" placeholder="发布人ID" v-model="listQuery.publisherId"></el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 88px;" class="filter-item" placeholder="所在省份" v-model="listQuery.province"></el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 88px;" class="filter-item" placeholder="所在城市" v-model="listQuery.city"></el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 88px;" class="filter-item" placeholder="区/县" v-model="listQuery.district"></el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 80px;" class="filter-item" placeholder="水果ID" v-model="listQuery.fruitId"></el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 80px;" class="filter-item" placeholder="品种ID" v-model="listQuery.fruitVarietyId"></el-input>
      <el-select clearable class="filter-item" v-model="listQuery.state" placeholder="请选择状态" style="width: 120px;">
        <el-option v-for="item in articleState" :key="item.key" :label="item.key" :value="item.key"></el-option>
      </el-select>
       <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
    </div>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" :label="$t('table.id')" width="65">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="200px" :label="$t('table.title')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column width="90px" align="center" :label="$t('table.variety')">
        <template slot-scope="scope">
          <span>{{scope.row.variety}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" :label="$t('table.requirement')"  min-width="150px">
        <template slot-scope="scope">
          <span>{{scope.row.requirement}}</span>
        </template>
      </el-table-column> -->
      <el-table-column align="center" :label="$t('table.origin')" width="120">
        <template slot-scope="scope">
          <span>{{scope.row.originProvince}}-{{scope.row.originCity}}-{{scope.row.originDistrict}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" :label="$t('table.originCity')" width="80">
        <template slot-scope="scope">
          <span>{{scope.row.originCity}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.originDistrict')" width="80">
        <template slot-scope="scope">
          <span>{{scope.row.originDistrict}}</span>
        </template>
      </el-table-column> -->
      <el-table-column align="center" :label="$t('table.location')" min-width="120px">
        <template slot-scope="scope">
          <span>{{scope.row.location}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.province')" width="80">
        <template slot-scope="scope">
          <span>{{scope.row.province}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.city')" width="80">
        <template slot-scope="scope">
          <span>{{scope.row.city}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.district')" width="80">
        <template slot-scope="scope">
          <span>{{scope.row.district}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" :label="$t('table.pubdate')">
        <template slot-scope="scope">
          <span>{{scope.row.pubdate}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" :label="$t('table.delivery')">
        <template slot-scope="scope">
          <span>{{scope.row.delivery}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" :label="$t('table.deadline')">
        <template slot-scope="scope">
          <span>{{scope.row.deadline}}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.state | statusFilter">{{scope.row.state}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.actions')" width="90" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-tooltip content="详情" placement="top">
            <i class="el-icon-edit" @click="handleUpdate(scope.$index, scope.row)"></i>
          </el-tooltip>
          <el-tooltip content="上线" placement="top">
            <span @click="handleToPublish(scope.$index, scope.row)" v-if="scope.row.state!='已上线'" ><svg-icon icon-class="published" /></span>
          </el-tooltip>
          <el-tooltip content="下线" placement="top">
            <span v-if="scope.row.state!='已下线'" @click="handleToPublish(scope.$index, scope.row)"><svg-icon icon-class="drafts"  /></span>
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
import { queryPurchasing, forbiddenPurchasing } from '@/api/api'
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
        stick: undefined,
        title: undefined,
        province: undefined,
        city: undefined,
        district: undefined,
        fruitId: undefined,
        fruitVarietyId: undefined,
        state: undefined,
        publisherId: undefined
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
      queryPurchasing(this.listQuery).then(res => {
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
      } else if (this.listQuery.stick === '') {
        this.listQuery.stick = undefined
        this.getList()
      } else if (this.listQuery.province === '') {
        this.listQuery.province = undefined
        this.getList()
      } else if (this.listQuery.city === '') {
        this.listQuery.city = undefined
        this.getList()
      } else if (this.listQuery.district === '') {
        this.listQuery.district = undefined
        this.getList()
      } else if (this.listQuery.fruitId === '') {
        this.listQuery.fruitId = undefined
        this.getList()
      } else if (this.listQuery.fruitVarietyId === '') {
        this.listQuery.fruitVarietyId = undefined
        this.getList()
      } else if (this.listQuery.state === '') {
        this.listQuery.state = undefined
        this.getList()
      } else if (this.listQuery.publisherId === '') {
        this.listQuery.publisherId = undefined
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
      // this.$router.push({ name: '新增文章' })
    },
    handleUpdate(index, row) {
      const getId = row.id
      this.$router.push({ path: 'purchasedetails', query: { id: getId }})
    },
    handleToPublish(index, row) {
      // console.log(row.state)
      if (row.state === '已上线') {
        row.state = '已下线'
      } else if (row.state === '已下线') {
        row.state = '已上线'
      }
      const para = {
        state: row.state
      }
      const id = row.id
      forbiddenPurchasing(id, para).then(res => {
        this.$notify({
          title: '成功',
          message: res.data,
          type: 'success',
          duration: 2000
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
  cursor: pointer;
}
.el-icon-edit:before, .el-icon-delete:before {
  font-size: 18px;
  cursor: pointer;
}
.demo-table-expand .el-form-item {
    min-width: 25%;
    margin-right: 50px;
    display: inline-block;
  }
</style>
