<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-menu mode="vertical" :show-timeout="200" :default-active="$route.path" :collapse="isCollapse" background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF" >
      <sidebar-item :routes="newRouters"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import { getUserInfo } from '@/api/login'
import _ from 'lodash'

export default {
  data() {
    return {
      newRouters: [
        {
          path: '',
          children: [{
            path: 'dashboard',
            name: 'dashboard',
            meta: { title: 'dashboard', icon: 'dashboard' }
          }]
        }, {
          path: '/systemmanage',
          // redirect: '/systemmanage/RoleManage',
          name: '系统管理',
          meta: { title: 'authorityManage', icon: 'password' },
          children: [
            { path: 'rolemanage', name: '角色管理', meta: { title: 'role' }},
            { path: 'adminmanage', name: '管理员管理', meta: { title: 'adminManage' }},
            { path: 'roledetails', name: '角色详情', hidden: true, meta: { title: 'roleDetails' }},
            { path: 'roleadd', name: '新增角色', hidden: true, meta: { title: 'roleAdd' }},
            { path: 'admindetails', name: '管理员详情', hidden: true, meta: { title: 'adminDetails' }}
          ]
        }
      ]
    }
  },
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  created() {
    this.getRouters()
  },
  methods: {
    getRouters() {
      getUserInfo().then(res => {
        // this.newRouters = res.data.administrator.role.menus
        _.forEach(this.newRouters, (value, key) => {
          if (value.children !== '' || value.children !== null) {
            _.forEach(value.children, (val, i) => {
              switch (val.name) {
                case '角色详情':
                  val.hidden = true
                  break
                case '管理员详情':
                  val.hidden = true
                  break
                case '账单详情':
                  val.hidden = true
                  break
                case '采购详情':
                  val.hidden = true
                  break
                case '供应详情':
                  val.hidden = true
                  break
                case '角色新增':
                  val.hidden = true
                  break
                case '新增文章':
                  val.hidden = true
                  break
                case '编辑文章':
                  val.hidden = true
                  break
                case '编辑Banner':
                  val.hidden = true
                  break
              }
            })
          }
          // console.log(this.newRouters)
        })
      })
    }
  }
}
</script>
