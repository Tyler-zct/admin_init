<template>
  <div class="components-container">
    <el-form ref="form" :model="add" label-width="80px" v-loading="listLoading" element-loading-text="给我一点时间">
      <el-row :gutter="20" class="oneBill">
        <el-col :span=1>
          <i class="el-icon-back" @click="handleSkip"></i>
        </el-col>
        <el-col :span=9>
          <label>{{$t('table.orderNo')}}：</label>
          <span>{{add.no}}</span>
        </el-col>
        <el-col :span=10>
          <label>{{$t('table.amount')}}：</label>
          <span>¥{{add.amount}}</span>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="oneBill">
        <el-col :span=10>
          <label>{{$t('table.type')}}：</label>
          <span>{{add.type}}</span>
        </el-col>
        <el-col :span=10>
          <label>{{$t('table.channel')}}：</label>
          <span>{{add.channel}}</span>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="oneBill">
        <el-col :span=10>
          <label>{{$t('table.userId')}}：</label>
          <span>{{add.userId}}</span>
        </el-col>
        <el-col :span=10>
          <label>{{$t('table.content')}}：</label>
          <span>{{add.content}}</span>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="oneBill">
        <el-col :span=10>
          <label>{{$t('table.state')}}：</label>
          <span>{{add.state}}</span>
        </el-col>
        <el-col :span=10>
          <label>{{$t('table.remark')}}：</label>
          <span>{{add.remark}}</span>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="oneBill">
        <el-col :span=10>
          <label>{{$t('table.lastTime')}}：</label>
          <span>{{add.lastTime}}</span>
        </el-col>
        <el-col :span=10>
          <label>{{$t('table.crtTime')}}：</label>
          <span>{{add.crtTime}}</span>
        </el-col>
      </el-row>
    
        <!-- <el-button type="primary" class="issue" @click="updateData">修改</el-button>       -->
        <!-- <el-button v-else class="issue" type="primary" @click="handleSubmit">发布</el-button> -->
    </el-form>
  </div>
  
</template>

<script>
import Tinymce from '@/components/Tinymce'
import { findBill } from '@/api/api'
import Dropzone from '@/components/Dropzone/editArticleImg'
import MDinput from '@/components/MDinput'

const articleLayout = [
  { key: '大图排版' },
  { key: '单图排版' },
  { key: '多图排版' }
]

export default {
  name: 'edit-article',
  components: { Tinymce, Dropzone, MDinput },
  data() {
    return {
      listLoading: false,
      Pictures: [],
      user: '',
      initImg: undefined,
      articleLayout,
      add: {
        title: undefined,
        outline: '',
        cover: undefined,
        pictures: undefined,
        content: undefined,
        publisherId: undefined,
        layout: undefined
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      const para = this.$route.query.no
      this.listLoading = true
      findBill(para).then((res) => {
        this.listLoading = false
        this.add = res.data
      })
    },
    handleSkip() {
      this.$router.push({ name: '账单管理' })
    },
    updateData() {
    //   this.$confirm('确认提交吗?', '提示', {
    //     type: 'warning'
    //   }).then(() => {
    //     const para = {
    //       id: this.add.id,
    //       title: this.add.title,
    //       outline: this.add.outline,
    //       pictures: this.Pictures,
    //       content: this.add.content,
    //       publisherId: this.add.publisherId,
    //       layout: this.add.layout
    //     }
    //     if (this.Pictures.length < 1) {
    //       this.$message({ message: '最少上传一张图片', type: 'warning' })
    //     } else {
    //       updNews(this.add.id, para).then((res) => {
    //         this.$notify({
    //           title: '修改成功',
    //           type: 'success',
    //           duration: 2000
    //         })
    //         this.$router.push({ name: 'article-manage' })
    //       }).catch((err) => {
    //         this.$message({
    //           message: err,
    //           type: 'error'
    //         })
    //       })
    //     }
    //   }).catch((err) => {
    //     this.$message({
    //       message: err,
    //       type: 'error'
    //     })
    //   })
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
</style>


