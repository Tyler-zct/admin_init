<template>
  <div class="components-container">
    <el-form ref="form" :model="add" label-width="80px" v-loading="listLoading" element-loading-text="给我一点时间">
      <el-row :gutter="20" class="row-item">
        <el-col :span=1>
          <i class="el-icon-back" @click="handleSkip"></i>
        </el-col>
        <el-col :span=8>
          <label>{{$t('table.id')}}：</label>
          <el-input v-model="add.id"></el-input>
        </el-col>
        <el-col :span=6>
          <label>是否上线：</label>
          <el-switch v-model="add.status" active-text="" inactive-text=""></el-switch>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="row-item">
        <el-col>
          <label>{{$t('table.type')}}：</label>
          <el-select clearable class="filter-item" v-model="add.type" placeholder="请选择类型" style="width: 130px;">
            <el-option v-for="item in articleType" :key="item.key" :label="item.key" :value="item.key"></el-option>
          </el-select>
        </el-col>
      </el-row>

      <MDinput name="name" v-model="add.title" required :maxlength="100" style="margin: 40px 0 20px;">
        标题
      </MDinput>
      
      <el-row :gutter="20" class="row-item">
        <el-col :span=10>
          <label>图片：</label>
          <div class="editor-container">
            <dropzone v-on:dropzone-removedFile="dropzoneR" v-on:dropzone-success="dropzoneS" v-bind:defaultImg="initImg" id="myVueDropzone" url="https://upload-z2.qiniup.com"></dropzone>
          </div>
        </el-col>
      </el-row>
      
      <el-row :gutter="20" class="row-item">
        <el-col>
          <label>{{$t('table.url')}}：</label>
          <el-input v-model="add.url"></el-input>
        </el-col>
      </el-row>
      <el-button type="primary" class="issue" @click="updateData">修改</el-button>      
    </el-form>
  </div>

</template>

<script>
import Tinymce from '@/components/Tinymce'
import { updBanner, findBanner } from '@/api/api'
import _ from 'lodash'
import Dropzone from '@/components/Dropzone/editArticleImg'
import MDinput from '@/components/MDinput'
import ImageCropper from '@/components/ImageCropper'

const articleLayout = [
  { key: '大图排版' },
  { key: '单图排版' },
  { key: '多图排版' }
]
const articleType = [
  { key: '常规Banner' },
  { key: '活动Banner' }
]

export default {
  name: 'edit-article',
  components: { Tinymce, Dropzone, MDinput, ImageCropper },
  data() {
    return {
      imagecropperShow: false,
      imagecropperKey: 0,
      image: 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191',
      listLoading: false,
      Pictures: [],
      user: '',
      initImg: undefined,
      articleLayout,
      articleType,
      add: {
        title: undefined,
        type: undefined,
        id: undefined,
        picture: undefined,
        status: false,
        url: undefined
      }
    }
  },
  computed: {
    contentShortLength() {
      return this.add.outline.length
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      const para = this.$route.query.id
      this.listLoading = true
      findBanner(para).then((res) => {
        this.listLoading = false
        this.add = res.data
        // console.log(res.data)
        this.Pictures = res.data.picture
        this.initImg = res.data.picture
        // console.log(this.Pictures)
      })
    },
    dropzoneS(file) {
      if (this.Pictures.length < 1) {
        const visitor = file.url + file.name
        this.Pictures.push(visitor)
        // console.log(this.Pictures)
        this.$message({ message: '上传成功', type: 'success' })
      } else {
        this.$message({ message: '只能上传一张图片', type: 'warning' })
      }
    },
    dropzoneR(file) {
      const visitor = file.url + file.name
      _.forEach(this.Pictures, (value, key) => {
        if (visitor === value) {
          this.Pictures.splice(key, 1)
        }
      })
      // this.$message({ message: '取消上传', type: 'success' })
    },
    cropSuccess(resData) {
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
      this.image = resData.files.avatar
    },
    close() {
      this.imagecropperShow = false
    },
    handleDeleteImg(e) {
      const visitor = e.currentTarget.previousElementSibling.src
      _.forEach(this.Pictures, (value, key) => {
        if (visitor === value) {
          this.Pictures.splice(key, 1)
        }
      })
    },
    handleSkip() {
      this.$router.push({ name: 'Banner' })
    },
    updateData() {
      this.$confirm('确认提交吗?', '提示', {
        type: 'warning'
      }).then(() => {
        if (this.add.title === '') {
          this.add.title = undefined
        } else if (this.add.type === '') {
          this.add.type = undefined
        } else if (this.add.status === '') {
          this.add.status = undefined
        } else if (this.add.picture === '') {
          this.add.picture = undefined
        } else if (this.add.url === '') {
          this.add.url = undefined
        }
        const para = {
          title: this.add.title,
          status: this.add.status,
          picture: this.Pictures,
          url: this.add.url,
          type: this.add.type
        }
        const id = this.$route.query.id
        // console.log(para)
        updBanner(id, para).then((res) => {
          this.$notify({
            title: '修改成功',
            type: 'success',
            duration: 2000
          })
          this.$router.push({ name: 'Banner' })
        }).catch((err) => {
          this.$message({
            message: err,
            type: 'error'
          })
        })
      })
    }
  }
}
</script>

<style scoped>

form.el-form {
  padding: 0 0 50px 0;
}
.el-form-item {
  display: inline-block;
}

.dropzone .dz-preview .dz-image img{
  width: 150px !important;
  height: 150px !important;
}
.el-form-item__label {
  text-align: left !important;
}
.el-input {
  width: auto;
}
.word-counter{
  position: absolute;
  top: 2px;
  right: 0;
}
.issue {
  float: right;
}
.row-item{
  margin: 15px 0;
}
</style>


