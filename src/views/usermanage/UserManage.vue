<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 150px;" class="filter-item" placeholder="手机号" v-model="listQuery.mobile">
      </el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 90px;" class="filter-item" placeholder="昵称" v-model="listQuery.nickname">
      </el-input>
      <el-select clearable class="filter-item" style="width: 120px" v-model="listQuery.level" placeholder="用户等级">
        <el-option v-for="item in userLevel" :key="item.key" :label="item.key" :value="item.key">
        </el-option>
      </el-select>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
      <!-- <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">{{$t('table.add')}}</el-button> -->
    </div>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
        <el-table-column type="expand">
            <template slot-scope="props">
                <el-form label-position="left"  class="demo-table-expand">
                    <el-form-item label="ID：">
                        <span>{{ props.row.id}}</span>
                    </el-form-item>
                    <el-form-item label="昵称：">
                        <span>{{ props.row.nickname}}</span>
                    </el-form-item>
                    <el-form-item label="手机号：">
                        <span>{{ props.row.mobile}}</span>
                    </el-form-item>
                    <el-form-item label="用户等级：">
                        <span>{{ props.row.level}}</span>
                    </el-form-item>
                    <el-form-item label="是否实名认证：">
                        <span>{{ props.row.certification}}</span>
                    </el-form-item>
                    <el-form-item label="是否企业认证：">
                        <span>{{ props.row.corporate}}</span>
                    </el-form-item>
                    <el-form-item label="即时通讯Token：" style="width: 100%;">
                        <span>{{ props.row.mid}}</span>
                    </el-form-item>
                    <el-form-item label="邀请人：">
                        <span>{{ props.row.senior}}</span>
                    </el-form-item>
                </el-form>
            </template>
        </el-table-column>
      <el-table-column align="center" :label="$t('table.id')" width="65">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="90px" align="center" :label="$t('table.nickname')">
        <template slot-scope="scope">
          <span>{{scope.row.nickname}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="80px" align="center" :label="$t('table.mobile')">
        <template slot-scope="scope">
          <span>{{scope.row.mobile}}</span>
        </template>
      </el-table-column>
      <el-table-column width="95px" align="center" :label="$t('table.level ')">
        <template slot-scope="scope">
          <span>{{scope.row.level }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="80px" align="center" :label="$t('table.senior')">
        <template slot-scope="scope">
          <span>{{scope.row.senior}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column min-width="150px" align="center" :label="$t('table.mid')">
        <template slot-scope="scope">
          <span>{{scope.row.mid}}</span>
        </template>
      </el-table-column> -->
      <el-table-column width="100px" align="center" :label="$t('table.certification')">
        <template slot-scope="scope">
          <el-tag :type="scope.row.certification | statusFilter">{{scope.row.certification}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" :label="$t('table.corporate')">
        <template slot-scope="scope">
          <el-tag :type="scope.row.corporate | statusFilter">{{scope.row.corporate}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.state | statusFilter">{{scope.row.state}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.actions')" width="120" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <i class="el-icon-edit" @click="handleUpdate(scope.$index, scope.row)"></i>
          <span @click="handleToNormal(scope.$index, scope.row)" v-if="scope.row.state!='正常账号'" ><svg-icon icon-class="normal" /></span>
          <span v-if="scope.row.state!='账号禁言'" @click="handleToSpeech(scope.$index, scope.row)"><svg-icon icon-class="speech"  /></span>
          <span v-if="scope.row.state!='账号禁用'" @click="handleToForbidden(scope.$index, scope.row)"><svg-icon icon-class="forbidden"  /></span>
          <i class="el-icon-delete" @click="handleDelete(scope.$index, scope.row)"></i>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.pageIndex" :page-sizes="[10,20,30, 50]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
import { queryUser, forbiddenUser } from '@/api/api'
import waves from '@/directive/waves'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
import _ from 'lodash'

const userLevel = [
  { key: '普通用户' },
  { key: '黄金加盟' },
  { key: '铂金加盟' },
  { key: '砖石加盟' }
]
const accountType = [
  { key: '尚未缴纳' },
  { key: '现金缴纳' },
  { key: '开业活动' },
  { key: '活动1099' },
  { key: 'VIP' },
  { key: '特殊开放' }
]
export default {
  name: 'complexTable',
  directives: {
    waves
  },
  components: { ImageCropper, PanThumb },
  data() {
    return {
      tableKey: 0,
      imagecropperShow: false,
      imagecropperKey: 0,
      list: null,
      total: null,
      listLoading: true,
      userLevel,
      accountType,
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        nickname: undefined,
        mobile: undefined,
        level: undefined
      },
      account: {
        id: '',
        no: '',
        userId: '',
        deposit: '',
        depositType: '',
        depositRemark: '',
        depositLastTime: '',
        depositExpiration: '',
        balance: '',
        balanceLastTime: '',
        voucher: '',
        freeExperienceTime: '',
        lastTime: '',
        crtTime: '',
        addMoon: undefined,
        stature: ''
      },
      user: {
        audience: '',
        brief: '',
        currencyType: '',
        deadline: ''
      },
      showReviewer: false,
      add: {
        id: undefined,
        accountDTO: {
          depositType: undefined
        },
        addMoon: undefined
      },
      dialogFormVisible: false,
      classFormVisible: false,
      accountFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改用户',
        create: '新增用户'
      },
      isFix: ['true', 'false'],
      dialogPvVisible: false
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        '正常账号': 'success',
        '账号禁言': 'info',
        '账号禁用': 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    formatDegree(value) {
      value = Math.abs(value)
      var v1 = Math.floor(value)
      var v2 = Math.floor((value - v1) * 60)
      var v3 = Math.round((value - v1) * 3600 % 60)
      return v1 + '°' + v2 + '\'' + v3 + '"'
    },
    cropSuccess(resData) {
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
      this.image = resData.files.avatar
    },
    close() {
      this.imagecropperShow = false
    },
    getList() {
      this.listLoading = true
      queryUser(this.listQuery).then(res => {
        this.list = res.data
        // console.log(res.data)
        _.forEach(this.list, (value, key) => {
          if (value.certification === true) {
            value.certification = '已认证'
          } else if (value.certification === false) {
            value.certification = '未认证'
          }
          if (value.corporate === true) {
            value.corporate = '已认证'
          } else if (value.corporate === false) {
            value.corporate = '未认证'
          }
          switch (value.level) {
            case 0:
              value.level = '普通用户'
              break
            case 1:
              value.level = '黄金加盟'
              break
            case 2:
              value.level = '铂金加盟'
              break
            case 3:
              value.level = '砖石加盟'
              break
            default: value.level = '未知'
              break
          }
        })
        this.total = res.data.count
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.pageIndex = 1
      if (this.listQuery.id === '') {
        this.listQuery.id = undefined
        this.getList()
      } else if (this.listQuery.mobile === '') {
        this.listQuery.mobile = undefined
        this.getList()
      } else if (this.listQuery.nickname === '') {
        this.listQuery.nickname = undefined
        this.getList()
      } else if (this.listQuery.identity === '') {
        this.listQuery.identity = undefined
        this.getList()
      } else {
        if (this.listQuery.identity === '普通用户') {
          this.listQuery.identity = 0
        } else if (this.listQuery.identity === '私教') {
          this.listQuery.identity = 1
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
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    handleUpdate(index, row) {
      this.add = Object.assign({}, row) // copy obj
      if (this.add.identity === 0) {
        this.add.identity = '普通用户'
      } else if (this.add.identity === 1) {
        this.add.identity = '私教'
      }
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleToNormal(index, row) {
      const para = {
        state: '正常账号'
      }
      const id = row.id
      forbiddenUser(id, para).then(res => {
        row.state = '正常账号'
        this.$notify({
          title: '成功',
          message: res.data,
          type: 'success',
          duration: 2000
        })
      })
    },
    handleToSpeech(index, row) {
      const para = {
        state: '账号禁言'
      }
      const id = row.id
      forbiddenUser(id, para).then(res => {
        row.state = '账号禁言'
        this.$notify({
          title: '成功',
          message: res.data,
          type: 'success',
          duration: 2000
        })
      })
    },
    handleToForbidden(index, row) {
      const para = {
        state: '账号禁用'
      }
      const id = row.id
      forbiddenUser(id, para).then(res => {
        row.state = '账号禁用'
        this.$notify({
          title: '成功',
          message: res.data,
          type: 'success',
          duration: 2000
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