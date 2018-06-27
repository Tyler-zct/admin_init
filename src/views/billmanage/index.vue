<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 88px;" class="filter-item" :placeholder="$t('table.amount')" v-model="listQuery.amount">
      </el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 80px;" class="filter-item" :placeholder="$t('table.userId')" v-model="listQuery.userId">
      </el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 88px;" class="filter-item" :placeholder="$t('table.coin')" v-model="listQuery.coin">
      </el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 88px;" class="filter-item" :placeholder="$t('table.bonus')" v-model="listQuery.bonus">
      </el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 88px;" class="filter-item" :placeholder="$t('table.remark ')" v-model="listQuery.remark ">
      </el-input>
      <el-select clearable class="filter-item" style="width: 120px" v-model="listQuery.type" :placeholder="$t('table.type')">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.key" :value="item.key"></el-option>
      </el-select>
      <el-select clearable class="filter-item" style="width: 120px" v-model="listQuery.channel" :placeholder="$t('table.channel')">
        <el-option v-for="item in disbursement" :key="item.key" :label="item.key" :value="item.key">
        </el-option>
      </el-select>
      <el-select clearable class="filter-item" style="width: 120px" v-model="listQuery.state" :placeholder="$t('table.state')">
        <el-option v-for="item in selectState" :key="item.key" :label="item.key" :value="item.key">
        </el-option>
      </el-select>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
    </div>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" :label="$t('table.no')" min-width="100px">
        <template slot-scope="scope">
          <span>{{scope.row.no}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.userId')" width="70px">
        <template slot-scope="scope">
          <span>{{scope.row.userId}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.type')" width="80px">
        <template slot-scope="scope">
          <span>{{scope.row.type}}</span>
        </template>
      </el-table-column>
      <el-table-column width="80px" align="center" :label="$t('table.amount')">
        <template slot-scope="scope">
          <span>¥{{scope.row.amount}}</span>
        </template>
      </el-table-column>
      <el-table-column width="80px" align="center" :label="$t('table.channel')">
        <template slot-scope="scope">
          <span>{{scope.row.channel}}</span>
        </template>
      </el-table-column>
      <el-table-column width="90px" align="center" :label="$t('table.state')">
        <template slot-scope="scope">
          <span>{{scope.row.state}}</span>
        </template>
      </el-table-column>
      <el-table-column width="90px" align="center" :label="$t('table.remark')">
        <template slot-scope="scope">
          <span>{{scope.row.remark}}</span>
        </template>
      </el-table-column>
      <el-table-column width="80px" align="center" :label="$t('table.bonus')">
        <template slot-scope="scope">
          <span>{{scope.row.bonus}}</span>
        </template>
      </el-table-column>
      <el-table-column width="80px" align="center" :label="$t('table.coin')">
        <template slot-scope="scope">
          <span>{{scope.row.coin}}</span>
        </template>
      </el-table-column>
      <el-table-column width="80px" align="center" :label="$t('table.content')">
        <template slot-scope="scope">
          <span>{{scope.row.content}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" :label="$t('table.crtTime')">
        <template slot-scope="scope">
          <span>{{scope.row.crtTime}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" :label="$t('table.lastTime')">
        <template slot-scope="scope">
          <span>{{scope.row.lastTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.actions')" width="65" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-tooltip content="详情" placement="top">
            <i class="el-icon-edit" @click="toBillDetail(scope.$index, scope.row)"></i>
          </el-tooltip>
          <!-- <i class="el-icon-edit" @click="toBillDetail(scope.$index, scope.row)"></i> -->
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.pageIndex" :page-sizes="[10,20,30, 50]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="$t('table.billDetails')" :visible.sync="billFormVisible">
      <el-form :model="bill" label-position="left" label-width="90px" style='min-width: 330px; margin-left:50px;'>
        <el-row :gutter="20" class="oneBill">
          <el-col :span=7>
            <label>{{$t('table.orderNo')}}：</label>
            <el-input v-model="bill.orderNo" disabled="disabled"></el-input>
          </el-col>
          <el-col :span=4>
            <label>{{$t('table.numbersOfItems')}}：</label>
            <el-input v-model="bill.numbersOfItems" disabled="disabled"></el-input>
          </el-col>
          <el-col :span=4>
            <label>{{$t('table.totalPrice')}}：</label>
            <el-input v-model="bill.totalPrice" disabled="disabled"></el-input>
          </el-col>
          <el-col :span=7>
            <label>{{$t('table.time')}}：</label>
            <el-input v-model="bill.time" disabled="disabled"></el-input>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span=5 v-for="oneBill in bill.items" :key="oneBill.key" class="oneBill">
            <label>{{$t('table.itemType')}}：</label>
            <el-input v-if="oneBill.itemType === 1" value="普通健身消费" disabled="disabled"></el-input>
            <el-input v-else-if="oneBill.itemType === 2" value="体测消费" disabled="disabled"></el-input>
            <el-input v-else-if="oneBill.itemType === 3" value="公开课消费" disabled="disabled"></el-input>
            <el-input v-else-if="oneBill.itemType === 4" value="私教课消费" disabled="disabled"></el-input>
            <el-input v-else value="免费体验时间" disabled="disabled"></el-input>
            <label>{{$t('table.times')}}：</label>
            <el-input v-model="oneBill.times" disabled="disabled"></el-input>
            <label>{{$t('table.item')}}：</label>
            <el-input v-model="oneBill.item" disabled="disabled"></el-input>
            <label>{{$t('table.itemPrice')}}：</label>
            <el-input v-model="oneBill.itemPrice" disabled="disabled"></el-input>
            <label>{{$t('table.currencyType')}}：</label>
            <el-input v-if="oneBill.currencyType === 2" value="能量瓶" disabled="disabled"></el-input>
            <el-input v-else value="人民币" disabled="disabled"></el-input>
            <label>{{$t('table.payStatus')}}：</label>
            <el-input v-if="oneBill.payStatus === true" value="已支付" disabled="disabled"></el-input>
            <el-input v-else value="未支付" disabled="disabled"></el-input>
            <label>{{$t('table.totalPrice')}}：</label>
            <el-input v-model="oneBill.totalPrice" disabled="disabled"></el-input>
            <label>{{$t('table.startTime')}}：</label>
            <el-input v-model="oneBill.startTime" disabled="disabled"></el-input>
            <label>{{$t('table.endTime')}}：</label>
            <el-input v-model="oneBill.endTime" disabled="disabled"></el-input>
          </el-col>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
				<el-button @click="handleRead" type="primary">{{$t('table.confirm')}}</el-button>
			</div>
    </el-dialog>

    <el-dialog :title="$t('table.userDetails')" :visible.sync="userFormVisible">
      <el-form :model="user" label-position="left" label-width="90px" style='min-width: 330px; margin-left:50px;'>
        <el-row>
          <img :src='user.portrait' class="portrait" />
        </el-row>
        <el-row :gutter="20" class="row-item">
          <el-col span=3>
            <label>{{$t('table.id')}}：</label>
            <el-input v-model="user.id" disabled="disabled"></el-input>
          </el-col>
          <el-col span=5>
            <label>{{$t('table.username')}}：</label>
            <el-input v-model="user.username"></el-input>
          </el-col>
          <el-col span=4>
            <label>{{$t('table.nickname')}}：</label>
            <el-input v-model="user.nickname"></el-input>
          </el-col>
          <el-col span=3>
            <label>{{$t('table.gender')}}：</label>
            <el-input v-model="user.gender"></el-input>
          </el-col>
        </el-row>

        <el-row :gutter="20" class="row-item">
          <el-col span=5>
            <label>{{$t('table.model')}}：</label>
            <el-input v-model="user.model"></el-input>
          </el-col>
          <el-col span=3>
            <label>{{$t('table.stature')}}：</label>
            <el-input v-model="user.stature"></el-input>
          </el-col>
          <el-col span=3>
            <label>{{$t('table.weight')}}：</label>
            <el-input v-model="user.weight"></el-input>
          </el-col>
          <el-col span=3>
            <label>{{$t('table.lng')}}：</label>
            <el-input v-model="user.lng"></el-input>
          </el-col>
          <el-col span=3>
            <label>{{$t('table.lat')}}：</label>
            <el-input v-model="user.lat"></el-input>
          </el-col>
        </el-row>

        <el-row :gutter="20" class="row-item">
          <el-col span=7>
            <label>{{$t('table.birthday')}}：</label>
            <el-input v-model="user.birthday"></el-input>
          </el-col>
          <el-col span=5>
            <label>{{$t('table.mobile')}}：</label>
            <el-input v-model="user.mobile"></el-input>
          </el-col>
          <el-col span=7>
            <label>{{$t('table.email')}}：</label>
            <el-input v-model="user.email"></el-input>
          </el-col>
        </el-row>

        <el-row :gutter="20" class="row-item">
          <el-col span=14>
            <label>{{$t('table.signature')}}：</label>
            <el-input type="textarea" :rows="2" v-model="user.signature"></el-input>
          </el-col>
        </el-row>

        <el-row :gutter="20" class="row-item">
          <el-col span=4>
            <label>{{$t('table.fitnessExperience')}}：</label>
            <el-input v-model="user.fitnessExperience"></el-input>
          </el-col>
          <el-col span=4>
            <label>{{$t('table.gexinCid')}}：</label>
            <el-input v-model="user.gexinCid"></el-input>
          </el-col>
          
          <el-col span=10>
            <label>{{$t('table.region')}}：</label>
            <el-input :value="user.region"></el-input>
          </el-col>
        </el-row>

        <el-row :gutter="20" class="row-item">
          <el-col span=10>
            <label>{{$t('table.caseHistory')}}：</label>
            <div><span v-for="item in user.caseHistory" class="person_tit">#{{item}}</span></div>
          </el-col>
           <el-col span=10>
            <label>{{$t('table.goal')}}：</label>
            <div><span v-for="item in user.goal" class="person_tit">#{{item}}</span></div>
          </el-col>
        </el-row>

        <el-row :gutter="20" class="row-item">
          <el-col span=7>
            <label>{{$t('table.crtTime')}}：</label>
            <el-input v-model="user.crtTime"></el-input>
          </el-col>
          <el-col span=7>
            <label>{{$t('table.lastTime')}}：</label>
            <el-input v-model="user.lastTime"></el-input>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
				<el-button @click="handleRead" type="primary">{{$t('table.confirm')}}</el-button>
			</div>
    </el-dialog>

    <el-dialog :title="$t('table.accountDetails')" :visible.sync="accountFormVisible">
      <el-form :model="account" label-position="left" label-width="90px" style='min-width: 330px;margin: 0 10px 0 20px;'>
        <el-row :gutter="20" class="row-item">
          <el-col :span=3>
            <label>{{$t('table.id')}}：</label>
            <el-input v-model="account.id" disabled="disabled"></el-input>
          </el-col>
          <el-col :span=4>
            <label>{{$t('table.userId')}}：</label>
            <el-input v-model="account.userId"></el-input>
          </el-col>
          <el-col :span=4>
            <label>{{$t('table.deposit')}}：</label>
            <el-input v-model="account.deposit"></el-input>
          </el-col>
          <el-col :span=4>
            <label>{{$t('table.balance')}}：</label>
            <el-input v-model="account.balance"></el-input>
          </el-col>
        </el-row>

        <el-row :gutter="20" class="row-item">
          <el-col :span=4>
            <label>{{$t('table.depositType')}}：</label>
            <el-input v-model="account.depositType"></el-input>
          </el-col>
          <el-col :span=4>
            <label>{{$t('table.voucher')}}：</label>
            <el-input v-model="account.voucher"></el-input>
          </el-col>
          <el-col :span=6>
            <label>{{$t('table.freeExperienceTime')}}：</label>
            <el-input v-model="account.freeExperienceTime"></el-input>
          </el-col>
        </el-row>

        <el-row :gutter="20" class="row-item">
          <el-col :span=13>
            <label>{{$t('table.remark')}}：</label>
            <el-input type="textarea" :rows="2"  v-model="account.depositRemark"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="row-item">
          <el-col :span=12>
            <label>{{$t('table.no')}}：</label>
            <el-input v-model="account.no"></el-input>
          </el-col>
        </el-row>

        <el-row :gutter="20" class="row-item">
          <el-col :span=7>
            <label>{{$t('table.depositLastTime')}}：</label>
            <el-input v-model="account.depositLastTime"></el-input>
          </el-col>
          <el-col :span=7>
            <label>{{$t('table.depositExpiration')}}：</label>
            <el-input v-model="account.depositExpiration"></el-input>
          </el-col>
          <el-col :span=7>
            <label>{{$t('table.balanceLastTime')}}：</label>
            <el-input v-model="account.balanceLastTime"></el-input>
          </el-col>
        </el-row>

        <el-row :gutter="20" class="row-item">
          <el-col :span=7>
            <label>{{$t('table.crtTime')}}：</label>
            <el-input v-model="account.crtTime"></el-input>
          </el-col>
          <el-col :span=7>
            <label>{{$t('table.lastTime')}}：</label>
            <el-input v-model="account.lastTime"></el-input>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
				<el-button @click="handleRead" type="primary">{{$t('table.confirm')}}</el-button>
			</div>
    </el-dialog>

    <el-dialog :title="$t('table.changePayment')" :visible.sync="stateFormVisible">
			<el-form :model="billState" label-position="left" label-width="110px" style='min-width: 350px;max-width: 430px;margin: 0 10px 0 20px;'>
        <el-form-item :label="$t('table.billID')">
          <span>{{billState.id}}</span>
        </el-form-item>
        <el-form-item :label="$t('table.state')">
          <el-select clearable class="filter-item" style="width: 130px" v-model="billState.state" :placeholder="billState.state">
            <el-option v-for="item in selectState" :key="item.key" :label="item.key" :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>        
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="handleUpdBill()" type="primary">{{$t('table.confirm')}}</el-button>
			</div>
		</el-dialog>
  </div>
</template>

<script>
import { queryBill } from '@/api/api'
import waves from '@/directive/waves'
import PanThumb from '@/components/PanThumb'

const calendarTypeOptions = [
  { key: '账户充值' },
  { key: '押金缴纳' },
  { key: '订单消费' },
  { key: '发布采购' },
  { key: '查看报价' },
  { key: '发布供应' },
  { key: '采购置顶' },
  { key: '供应置顶' },
  { key: '账户提现' },
  { key: '用户加盟' }
]
const selectState = [
  { key: '未支付' },
  { key: '已支付' },
  { key: '退款中' },
  { key: '已退款' },
  { key: '申请提现' },
  { key: '确认提现' },
  { key: '提现成功' }
]
const disbursement = [
  { key: '余额支付' },
  { key: '阿里支付' },
  { key: '微信支付' },
  { key: '连连支付' }
]

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
      userFormVisible: false,
      accountFormVisible: false,
      billFormVisible: false,
      stateFormVisible: false,
      bill: {
        totalPrice: '',
        numbersOfItems: '',
        items: [{
          item: '',
          itemType: '',
          itemPrice: '',
          times: '',
          currencyType: '',
          totalPrice: '',
          startTime: '',
          endTime: ''
        }],
        time: undefined,
        orderNo: ''
      },
      user: {
        id: '',
        username: '',
        nickname: '',
        gender: '',
        signature: '',
        mobile: '',
        birthday: '',
        region: ''
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
        crtTime: ''
      },
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        coin: undefined,
        userId: undefined,
        amount: undefined,
        type: undefined,
        channel: undefined,
        bonus: undefined,
        remark: undefined,
        status: undefined,
        state: undefined
      },
      billState: {
        accountBillId: '',
        state: ''
      },
      calendarTypeOptions,
      selectState,
      disbursement
    }
  },
  components: { PanThumb },
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
    getList() {
      this.listLoading = true
      queryBill(this.listQuery).then(res => {
        const data = res.data.data
        this.list = data
        this.total = res.data.count
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.pageIndex = 1
      if (this.listQuery.type === '') {
        this.listQuery.type = undefined
        this.getList()
      } else if (this.listQuery.channel === '') {
        this.listQuery.channel = undefined
        this.getList()
      } else if (this.listQuery.state === '') {
        this.listQuery.state = undefined
        this.getList()
      } else if (this.listQuery.userId === '') {
        this.listQuery.userId = undefined
        this.getList()
      } else if (this.listQuery.coin === '') {
        this.listQuery.coin = undefined
        this.getList()
      } else if (this.listQuery.amount === '') {
        this.listQuery.amount = undefined
        this.getList()
      } else if (this.listQuery.bonus === '') {
        this.listQuery.bonus = undefined
        this.getList()
      } else if (this.listQuery.remark === '') {
        this.listQuery.remark = undefined
        this.getList()
      } else if (this.listQuery.status === '') {
        this.listQuery.status = undefined
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
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    showUserDTO(index, row) {
      this.user = Object.assign({ }, row.userDTO)
      this.user.lat = this.formatDegree(this.user.lat)
      this.user.lng = this.formatDegree(this.user.lng)
      this.user.region = this.user.country + '-' + this.user.province + '-' + this.user.city
      this.userFormVisible = true
    },
    showAccountDTO(index, row) {
      this.account = Object.assign({ }, row.accountDTO)
      this.accountFormVisible = true
    },
    toBillDetail(index, row) {
      this.$router.push({ path: 'billdetails', query: { no: row.no }})
    },
    showBillState(index, row) {
      this.billState = Object.assign({ }, row)
      this.stateFormVisible = true
    },
    handleUpdBill() {
      // const data = {
      //   accountBillId: this.billState.id,
      //   state: this.billState.state
      // }
      // updBill(data).then(res => {
      //   this.getList()
      //   this.stateFormVisible = false
      // })
    },
    handleRead() {
      this.userFormVisible = false
      this.accountFormVisible = false
      this.billFormVisible = false
    }
  }
}
</script>

<style>
    .marginR {
      margin-right: 10px;
    }
    .borderB {
      border-bottom: 1px solid #ccc;
      padding: 5px 0;
    }
    .el-form {
      margin-left: 20px !important;
    }
    .el-dialog__body{
      padding: 0 20px 10px 10px;
    }
    .portrait{
      width: 150px;
      height: 150px;
      border-radius: 50%;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    }
    .person_tit {
      margin-right: 5px;
      color: #ff7c00;
    }
    .oneBill {
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
      margin: 20px 20px 0 0;
      padding: 10px;
    }
    .el-dialog__body {
      padding-right: 30px;
    }
    .svg-icon[data-v-5d4549d3] {
      width: 18px;
      height: 18px;
    }
    .el-icon-edit:before, .el-icon-delete:before {
      font-size: 18px;
    }
</style>
