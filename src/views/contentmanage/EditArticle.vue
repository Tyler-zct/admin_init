<template>
  <div class="components-container">
    <el-form ref="form" :model="add" label-width="80px" v-loading="listLoading" element-loading-text="给我一点时间">
      <MDinput name="name" v-model="add.title" required :maxlength="100" style="margin: 50px 0 20px;">
        标题
      </MDinput>

      <el-form-item label="摘要" style="width: 80%;">
        <el-input type="textarea" class="article-textarea" :rows="1" autosize placeholder="请输入内容" v-model="add.outline"></el-input>
        <span class="word-counter" v-show="contentShortLength">{{contentShortLength}}字</span>
      </el-form-item>

      <el-form-item label="发布者ID" style="width: 21%">
        <el-select v-model="add.publisherId" placeholder="发布者">
          <el-option v-for="item in user" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="排版">
        <el-select v-model="add.layout" placeholder="排版" style="width: 110px;">
          <el-option v-for="item in articleLayout" :key="item.key" :label="item.key" :value="item.key"></el-option>
        </el-select>
      </el-form-item>
      
      <el-form-item label="图片列表" style="width: 80%;">
          <!-- <template v-for="item in add.pictures">
            <div class="img_template">
              <img :src="item" class="cover">
              <span @click="handleDeleteImg($event)">删除</span>
            </div>
          </template> -->
          <div class="editor-container">
            <dropzone v-on:dropzone-removedFile="dropzoneR" v-on:dropzone-success="dropzoneS" v-bind:defaultImg="initImg" id="myVueDropzone" url="https://upload-z2.qiniup.com"></dropzone>
          </div>
      </el-form-item>
      
      <div style="margin-top: 20px;">
        <tinymce :height="300" v-model="add.content"></tinymce>
        <!-- <tinymce :height="300" v-else v-model="add.content"></tinymce> -->
      </div>
        <el-button type="primary" class="issue" @click="updateData">修改</el-button>      
        <!-- <el-button v-else class="issue" type="primary" @click="handleSubmit">发布</el-button> -->
    </el-form>
  </div>
  
</template>

<script>
import Tinymce from '@/components/Tinymce'
import { userRobot, updNews, getNews } from '@/api/api'
import _ from 'lodash'
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
  computed: {
    contentShortLength() {
      return this.add.outline.length
    }
  },
  created() {
    // this.resetTemp()
    // this.$root.eventHub.$on('getArticleId', (articleId) => {
    //   this.getData(articleId)
    // })
    // this.$root.eventHub.$on('changeState', (state) => {
    //   // alert(state)
    //   this.dialogStatus = state
    // })
    // this.$root.eventHub.$on('handleInit', (init) => {
    //   this.add = init
    //   this.Pictures = init.Pictures
    // })
    // const articleId = this.$route.query.articleId
    // this.$root.eventHub.$emit('getArticleId', articleId)
    this.getUserRobot()
    this.getData()
  },
  methods: {
    getData() {
      const para = this.$route.query.articleId
      this.listLoading = true
      getNews(para).then((res) => {
        this.listLoading = false
        this.add = res.data
        this.Pictures = res.data.pictures
        this.initImg = res.data.pictures
        // console.log(this.Pictures)
      }).catch((err) => {
        this.$message({
          message: err,
          type: 'error'
        })
      })
    },
    // handleSubmit() {
    //   const para = {
    //     title: this.add.title,
    //     outline: this.add.outline,
    //     cover: this.Pictures[0],
    //     pictures: JSON.stringify(this.Pictures),
    //     content: this.content,
    //     publisherId: this.add.publisherId,
    //     layout: this.add.layout
    //   }
    //   createNews(para).then((res) => {
    //     this.dialogFormVisible = false
    //     this.$notify({
    //       title: '成功',
    //       message: '创建成功',
    //       type: 'success',
    //       duration: 2000
    //     })
    //     this.$router.push({ name: 'article-manage' })
    //   })
    // },
    getUserRobot() {
      userRobot().then(res => {
        const response = res.data.data
        const arr = []
        _.forEach(response, (value, key) => {
          arr.push(value.id)
        })
        this.user = arr
      }).catch((err) => {
        this.$message({
          message: err,
          type: 'error'
        })
      })
    },
    dropzoneS(file) {
      if (this.Pictures.length < 3) {
        const visitor = file.url + file.name
        this.Pictures.push(visitor)
        // console.log(this.Pictures)
        this.$message({ message: '上传成功', type: 'success' })
      } else {
        this.$message({ message: '最多上传三张图片', type: 'warning' })
      }
    },
    dropzoneR(file) {
      const visitor = file.url
      // console.log(visitor)
      _.forEach(this.Pictures, (value, key) => {
        if (visitor === value) {
          this.Pictures.splice(key, 1)
        }
      })
      // this.$message({ message: '取消上传', type: 'success' })
    },
    handleDeleteImg(e) {
      const visitor = e.currentTarget.previousElementSibling.src
      _.forEach(this.Pictures, (value, key) => {
        if (visitor === value) {
          this.Pictures.splice(key, 1)
        }
      })
    },
    updateData() {
      this.$confirm('确认提交吗?', '提示', {
        type: 'warning'
      }).then(() => {
        const para = {
          id: this.add.id,
          title: this.add.title,
          outline: this.add.outline,
          pictures: this.Pictures,
          content: this.add.content,
          publisherId: this.add.publisherId,
          layout: this.add.layout
        }
        if (this.Pictures.length < 1) {
          this.$message({ message: '最少上传一张图片', type: 'warning' })
        } else {
          updNews(this.add.id, para).then((res) => {
            this.$notify({
              title: '修改成功',
              type: 'success',
              duration: 2000
            })
            this.$router.push({ name: '文章管理' })
          }).catch((err) => {
            this.$message({
              message: err,
              type: 'error'
            })
          })
        }
      }).catch((err) => {
        this.$message({
          message: err,
          type: 'error'
        })
      })
    }
  }
}
</script>

<style scoped>
.editor-content {
  margin-top: 20px;
}
.issue {
  float: right;
  margin-top: 20px;
}
form.el-form {
  padding: 0 0 50px 0;
}
.el-form-item {
  display: inline-block;
}

.img_template{
  display: inline-block;
  width: 23%;
  text-align: center;
  margin-right: 10px;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.cover {
  width: 100%;
}
.dropzone .dz-preview .dz-image img{
  width: 150px !important;
  height: 150px !important;
}
.el-form-item__label {
  text-align: left !important;
}
.word-counter{
  position: absolute;
  top: 2px;
  right: 0;
}
</style>


