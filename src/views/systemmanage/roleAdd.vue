<template>
  <div class="components-container">
    <el-form ref="form" :model="add" label-width="80px" v-loading="listLoading" element-loading-text="给我一点时间">
      <el-row :gutter="20" class="oneBill">
        <el-col :span=1>
          <i class="el-icon-back" @click="handleSkip"></i>
        </el-col>
        <el-col :span=8>
          <label>{{$t('table.roleName')}}：</label>
          <el-input v-model="add.name"></el-input>
        </el-col>
        <el-col :span=8>
            <label>{{$t('table.fix')}}：</label>
            <div>
          <el-select class="filter-item" v-model="add.fix" placeholder="" style="width: 110px;">
            <el-option v-for="item in isFixs" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
          </div>
          </el-col>
      </el-row>

        <el-row :gutter="20" class="row-item oneBill">
          <el-col :span=24>
            <label>{{$t('table.operations')}}：</label>
            <el-checkbox :indeterminate="operaIsIndeterminate" v-model="operationIdsAll" @change="handleCheckAlloOeration">全选</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="checkedoperationIds">
              <el-checkbox v-for="operation in operationOptions" :label="operation" :key="operation">{{operation}}</el-checkbox>
            </el-checkbox-group>
          </el-col>
        </el-row>

        <el-row :gutter="20" class="row-item oneBill">
          <el-col :span=24>
            <label>{{$t('table.menuList')}}：</label>
            <el-checkbox :indeterminate="menuIsIndeterminate" v-model="menuIdsAll" @change="handleCheckAlloMenu">全选</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="checkedcontentMenu">
              <el-checkbox v-for="menu in contentMenu" :label="menu" :key="menu">{{menu}}</el-checkbox>
            </el-checkbox-group>
            <el-checkbox-group v-model="checkeduserMenu">
              <el-checkbox v-for="menu in userMenu" :label="menu" :key="menu">{{menu}}</el-checkbox>
            </el-checkbox-group>
            <el-checkbox-group v-model="checkedbill">
              <el-checkbox v-for="menu in billMenu" :label="menu" :key="menu">{{menu}}</el-checkbox>
            </el-checkbox-group>
            <el-checkbox-group v-model="checkedsystem">
              <el-checkbox v-for="menu in systemMenu" :label="menu" :key="menu">{{menu}}</el-checkbox>
            </el-checkbox-group>
            <el-checkbox-group v-model="checkedbanner">
              <el-checkbox v-for="menu in bannerMenu" :label="menu" :key="menu">{{menu}}</el-checkbox>
            </el-checkbox-group>
          </el-col>
        </el-row>
        <el-button type="primary" class="issue" @click="createData">创建</el-button>
    </el-form>
  </div>
  
</template>

<script>
import { getMenus, getOperations, insertRole } from '@/api/api'
import Dropzone from '@/components/Dropzone/editArticleImg'
import _ from 'lodash'
import Vue from 'vue'

export default {
  name: 'edit-article',
  data() {
    return {
      listLoading: false,
      operationIds: null,
      menuIdsAll: false,
      operationIdsAll: false,
      operations: [],
      operationgroup: [],
      menugroup: [],
      menuOptions: [],
      operationOptions: [],
      checkedMenuIds: [],
      checkedcontentMenu: [],
      checkeduserMenu: [],
      checkedbill: [],
      checkedsystem: [],
      checkedbanner: [],
      checkedoperationIds: [],
      contentMenu: [],
      userMenu: [],
      billMenu: [],
      systemMenu: [],
      bannerMenu: [],
      pushMenu: [],
      pushOperation: [],
      operaIsIndeterminate: true,
      menuIsIndeterminate: true,
      isFixs: ['可修改', '不可修改'],
      add: {
        name: undefined,
        menus: undefined,
        operations: undefined,
        fix: undefined
      }
    }
  },
  components: { Dropzone },
  created() {
    this.handleGetOperationIds()
    this.handleGetMenus()
  },
  methods: {
    handleSkip() {
      this.$router.push({ name: '角色管理' })
    },
    handleGetOperationIds() {
      getOperations().then(res => {
        this.operationIds = res.data
        _.forEach(this.operationIds, (value, key) => {
          this.operationgroup.push({
            id: value.id,
            name: value.name
          })
          this.operationOptions.push(value.name)
        })
        // console.log(this.operationOptions)
      })
    },
    handleCheckAlloOeration(val) {
      this.checkedoperationIds = val ? this.operationOptions : []
      this.operaIsIndeterminate = false
    },
    handleGetMenus() {
      getMenus().then(res => {
        const allData = res.data
        this.menuIds = res.data
        // console.log(allData)
        _.forEach(allData, (value, key) => {
          this.menugroup.push({
            id: value.id,
            name: value.name
          })
          this.menuIds.push(value)
          if (value.children !== '' || value.children !== null) {
            _.forEach(value.children, (value, index) => {
              this.menugroup.push({
                id: value.id,
                name: value.name
              })
              this.menuIds.push(value)
            })
          }
        })
        this.menuIds = [...new Set(this.menuIds)]
        if (allData[1].children !== '' || allData[1].children !== null) {
          _.forEach(allData[1].children, (value, index) => {
            this.contentMenu.push(value.name)
          })
        }
        if (allData[2].children !== '' || allData[2].children !== null) {
          _.forEach(allData[2].children, (value, index) => {
            this.userMenu.push(value.name)
          })
        }
        if (allData[3].children !== '' || allData[3].children !== null) {
          _.forEach(allData[3].children, (value, index) => {
            this.billMenu.push(value.name)
          })
        }
        if (allData[4].children !== '' || allData[4].children !== null) {
          _.forEach(allData[4].children, (value, index) => {
            this.systemMenu.push(value.name)
          })
        }
        if (allData[5].children !== '' || allData[5].children !== null) {
          _.forEach(allData[5].children, (value, index) => {
            this.bannerMenu.push(value.name)
          })
        }
      })
    },
    handleCheckAlloMenu(val) {
      this.checkedcontentMenu = val ? this.contentMenu : []
      this.checkeduserMenu = val ? this.userMenu : []
      this.checkedbill = val ? this.billMenu : []
      this.checkedsystem = val ? this.systemMenu : []
      this.checkedbanner = val ? this.bannerMenu : []
      this.menuIsIndeterminate = false
    },
    createData() {
      this.$confirm('确认提交吗?', '提示', {
        type: 'warning'
      }).then(() => {
        _.forEach(this.menugroup, (value, i) => {
          if (this.checkedcontentMenu.length > 0) {
            for (var j = 0; j < this.checkedcontentMenu.length; j++) {
              if (this.checkedcontentMenu[j] === value.name) {
                this.pushMenu.push(value.id)
              }
            }
            this.pushMenu.push(2)
          }
          if (this.checkeduserMenu.length > 0) {
            for (var k = 0; k < this.checkeduserMenu.length; k++) {
              if (this.checkeduserMenu[k] === value.name) {
                this.pushMenu.push(value.id)
              }
            }
            this.pushMenu.push(7)
          }
          if (this.checkedbill.length > 0) {
            for (var m = 0; m < this.checkedbill.length; m++) {
              if (this.checkedbill[m] === value.name) {
                this.pushMenu.push(value.id)
              }
            }
            this.pushMenu.push(9)
          }
          if (this.checkedsystem.length > 0) {
            for (var n = 0; n < this.checkedsystem.length; n++) {
              if (this.checkedsystem[n] === value.name) {
                this.pushMenu.push(value.id)
              }
            }
            this.pushMenu.push(11)
          }
          if (this.checkedbanner.length > 0) {
            for (var q = 0; q < this.checkedbanner.length; q++) {
              if (this.checkedbanner[q] === value.name) {
                this.pushMenu.push(value.id)
              }
            }
            this.pushMenu.push(14)
          }
        })
        this.pushMenu.push(1)
        _.forEach(this.operationgroup, (value, i) => {
          for (var k = 0; k < this.checkedoperationIds.length; k++) {
            if (this.checkedoperationIds[k] === value.name) {
              this.pushOperation.push(value.id)
            }
          }
        })
        if (this.add.fix === '不可修改') {
          this.add.fix = false
        } else if (this.add.fix === '可修改') {
          this.add.fix = true
        }
        if (this.pushMenu === [] && this.pushOperation === []) {
          this.$message({ message: '数据不能为空', type: 'warning' })
        } else {
          this.pushMenu = [...new Set(this.pushMenu)]
          this.pushOperation = [...new Set(this.pushOperation)]
          const menus = []
          const operations = []
          const allMenu = this.menuIds
          _.forEach(allMenu, (value, key) => {
            Vue.delete(value, 'children')
            Vue.delete(value, 'meta')
          })
          // console.log(allMenu)
          _.forEach(allMenu, (value, i) => {
            for (var k = 0; k < this.pushMenu.length; k++) {
              if (this.pushMenu[k] === value.id) {
                menus.push(value)
              }
            }
          })
          _.forEach(this.operationIds, (value, i) => {
            for (var k = 0; k < this.pushOperation.length; k++) {
              if (this.pushOperation[k] === value.id) {
                operations.push(value)
              }
            }
          })
          // console.log(menus)
          // console.log(operations)
          const para = {
            name: this.add.name,
            fix: this.add.fix
          }
          const data = {
            menus: menus,
            operations: operations
          }
          insertRole(para, data).then((res) => {
            this.$notify({
              title: '创建成功',
              type: 'success',
              duration: 2000
            })
            this.$router.push({ name: '角色管理' })
          })
        }
      })
    }
  }
}
</script>

<style scoped>
label {
    font-size: 14px;
    color: #606266;
}
.oneBill {
    padding: 10px 0;
    box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.2);
    margin-bottom: 15px;
}
.contColor{
  color: #606266;
}
i, span {
  cursor: pointer;
}
.person_tit {
  margin-right: 15px;
  color: #ff7c00;
}
.components-container .el-dialog__wrapper .el-dialog {
  width: 80% !important;
}
.dropzone .dz-preview .dz-image img{
  width: 150px !important;
  height: 150px !important;
}
.el-checkbox {
  margin-left: 30px;
  margin-bottom: 8px;
}
.issue {
  float: right;
}
</style>


