<template>
  <div class="components-container">
    <el-form ref="form" :model="add" label-width="80px">
     
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

      <el-form-item label="是否推送" style="margin-left: 20px;">
        <el-switch v-model="add.isPush" active-text="" inactive-text=""></el-switch>
      </el-form-item>
      
      <el-form-item label="图片列表" style="width: 80%;">
          <div class="editor-container">
            <dropzone v-on:dropzone-removedFile="dropzoneR" v-on:dropzone-success="dropzoneS" id="myVueDropzone" url="https://upload-z2.qiniup.com"></dropzone>
          </div>
      </el-form-item>
      
      <div style="margin-top: 20px;">
        <tinymce :height="300" v-model="add.content"></tinymce>
        <!-- <div>{{add.content}}</div> -->
      </div>
        <!-- <el-button v-if="dialogStatus=='update'" type="primary" class="issue" @click="updateData">修改</el-button>       -->
        <el-button class="issue" type="primary" @click="handleSubmit">发布</el-button>
    </el-form>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce/tinymce'
import { userRobot, createNews } from '@/api/api'
import _ from 'lodash'
import Dropzone from '@/components/Dropzone'
import MDinput from '@/components/MDinput'

const articleLayout = [
  { key: '大图排版' },
  { key: '单图排版' },
  { key: '多图排版' }
]

export default {
  name: 'edit-article',
  props: {
    index: {
      type: Number
    }
  },
  components: { Tinymce, Dropzone, MDinput },
  data() {
    return {
      Pictures: [],
      user: '',
      articleLayout,
      add: {
        title: undefined,
        outline: '',
        pictures: undefined,
        content: undefined,
        publisherId: 4,
        layout: '大图排版',
        isPush: false
      }
    }
  },
  computed: {
    contentShortLength() {
      return this.add.outline.length
    }
  },
  created() {
    this.getUserRobot()
  },
  methods: {
    handleSubmit() {
      // console.log(this.Pictures)
      const para = {
        id: '',
        title: this.add.title,
        outline: this.add.outline,
        pictures: this.Pictures,
        content: this.add.content,
        publisherId: this.add.publisherId,
        layout: this.add.layout,
        push: this.add.isPush
      }
      // console.log(para)
      if (this.Pictures.length < 1) {
        this.$message({ message: '最少上传一张图片', type: 'warning' })
      } else {
        createNews(para).then((res) => {
          this.$notify({
            title: '成功',
            message: '创建成功',
            type: 'success',
            duration: 2000
          })
          this.$router.push({ name: '文章管理' })
        })
      }
    },
    getUserRobot() {
      userRobot().then(res => {
        const response = res.data.data
        const arr = []
        _.forEach(response, (value, key) => {
          arr.push(value.id)
        })
        this.user = arr
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
      const visitor = file.url + file.name
      // console.log(visitor)
      _.forEach(this.Pictures, (value, key) => {
        if (visitor === value) {
          this.Pictures.splice(key, 1)
        }
      })
      // console.log(this.Pictures)
      // this.$message({ message: '取消上传', type: 'success' })
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
.cover {
  width: 23%;
  max-height: 200px;
  margin-right: 10px;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}
.dropzone .dz-preview .dz-image img{
  width: 150px !important;
  height: 150px !important;
}
.el-form-item__label{
  text-align: left;
}
.word-counter{
  position: absolute;
  top: 2px;
  right: 0;
}
</style>


