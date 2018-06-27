<template>
  <el-row class="panel-group" :gutter="40">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class='card-panel' @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">{{$t('dashboard.totalRegisteredUsers')}}</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="totalRegisteredUsers" :duration="2600">123456</count-to>
        </div>
      </div>
    </el-col>

    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="money" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">{{$t('dashboard.totalOrderPaymentToday')}}</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="totalOrderPaymentToday" :duration="3200"></count-to>
        </div>
      </div>
    </el-col>
    
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-shoppingCard">
          <svg-icon icon-class="shoppingCard" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">{{$t('dashboard.totalOrdersToday')}}</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="totalOrdersToday" :duration="3600"></count-to>
        </div>
      </div>
    </el-col>

    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper icon-shoppingCard">
          <svg-icon icon-class="form" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">{{$t('dashboard.totalOrdersCompletedToday')}}</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="totalOrdersCompletedToday" :duration="3200"></count-to>
        </div>
      </div>
    </el-col>

    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="user" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">{{$t('dashboard.newRegisteredUserToday')}}</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="newRegisteredUserToday" :duration="3000"></count-to>
        </div>
      </div>
    </el-col>

    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('people')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="people" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">{{$t('dashboard.newRegisteredUserWeek')}}</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="newRegisteredUserWeek" :duration="3000"></count-to>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import { dashboard } from '@/api/api'

export default {
  data() {
    return {
      newRegisteredUserToday: this.newRegisteredUserToday,
      totalOrderPaymentToday: this.totalOrderPaymentToday,
      totalOrdersCompletedToday: this.totalOrdersCompletedToday,
      totalRegisteredUsers: this.totalRegisteredUsers,
      totalOrdersToday: this.totalOrdersToday,
      newRegisteredUserWeek: this.newRegisteredUserWeek
    }
  },
  components: {
    CountTo
  },
  created() {
    this.getDashboard()
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    },
    getDashboard() {
      dashboard().then(res => {
        if (res.status === 203) {
          this.$message({ message: '对不起,您暂时没有访问权限!', type: 'warning' })
        } else {
          this.totalRegisteredUsers = res.data.countUserNumber
          this.totalOrdersToday = res.data.totalGenerateOrders
          this.totalOrdersCompletedToday = res.data.totalCompleteOrders
          this.totalOrderPaymentToday = res.data.todayRevenue
          this.newRegisteredUserToday = res.data.addedUserToday
          this.newRegisteredUserWeek = res.data.addedUserThisWeek
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col{
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
         background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shoppingCard {
        background: #34bfa3
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shoppingCard {
      color: #34bfa3
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>