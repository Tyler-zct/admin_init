<template>
  <div class="components-container">
    <el-form ref="form" :model="add" label-width="80px" v-loading="listLoading" element-loading-text="给我一点时间">
      <el-row :gutter="20" class="oneBill">
        <el-col :span=1>
          <i class="el-icon-back" @click="handleSkip"></i>
        </el-col>
        <el-col :span=5>
          <label>{{$t('table.id')}}：</label>
          <span class="contColor">{{add.id}}</span>
        </el-col>
        <el-col :span=6>
          <label>{{$t('table.stick')}}：</label>
          <span class="contColor">{{add.stick}}</span>
        </el-col>
        <el-col :span=6>
          <label>{{$t('table.price')}}：</label>
          <span class="contColor">{{add.price}}{{add.unit}}</span>
        </el-col>
        <el-col :span=6>
          <label>{{$t('table.status')}}：</label>
          <span class="contColor">{{add.state}}</span>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="oneBill">
        <el-col :span=20>
          <label>{{$t('table.title')}}：</label>
          <span class="contColor">{{add.title}}</span>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="oneBill">
        <el-col :span=9>
          <label>{{$t('table.origin')}}：</label>
          <span class="contColor">{{add.province}}-{{add.city}}-{{add.district}}</span>
        </el-col>
        <el-col :span=12>
          <label>{{$t('table.location')}}：</label>
          <span class="contColor">{{add.location}}</span>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="oneBill">
        <el-col :span=6>
          <label>{{$t('table.baseline')}}：</label>
          <span class="contColor">{{add.baseline}}</span>
        </el-col>
        <el-col :span=6>
          <label>{{$t('table.unsalable')}}：</label>
          <span class="contColor">{{add.unsalable}}</span>
        </el-col>
        <el-col :span=6>
          <label>{{$t('table.friendliness')}}：</label>
          <span class="contColor">{{add.friendliness}}</span>
        </el-col>
        <el-col :span=6>
          <label>{{$t('table.express')}}：</label>
          <span class="contColor">{{add.express}}</span>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="oneBill">
        <el-col :span=6>
          <label>{{$t('table.deliveryType')}}：</label>
          <span class="contColor">{{add.method}}</span>
        </el-col>
        <el-col :span=6>
          <label>{{$t('table.catties')}}：</label>
          <span class="contColor">{{add.catties}}</span>
        </el-col>
        <el-col :span=6>
          <label>{{$t('table.bonus')}}：</label>
          <span class="contColor">{{add.bonus}}</span>
        </el-col>
        <el-col :span=6>
          <label>{{$t('table.dhint')}}：</label>
          <span class="contColor">{{add.dhint}}</span>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="oneBill">
        <el-col :span=6>
          <label>{{$t('table.supplementary')}}：</label>
          <span class="contColor">{{add.supplementary}}</span>
        </el-col>
        <el-col :span=6>
          <label>{{$t('table.collected')}}：</label>
          <span class="contColor">{{add.collected}}</span>
        </el-col>
        <el-col :span=6>
          <label>{{$t('table.contact')}}：</label>
          <span class="contColor">{{add.contact}}</span>
        </el-col>
        
      </el-row>

      <el-row :gutter="20" class="oneBill">
        <el-col :span=8>
          <label>{{$t('table.delivery')}}：</label>
          <span class="contColor">{{add.delivery}}</span>
        </el-col>
        <el-col :span=8>
          <label>{{$t('table.period')}}：</label>
          <span class="contColor">{{add.period}}</span>
        </el-col>
        <el-col :span=8>
          <label>{{$t('table.pubdate')}}：</label>
          <span class="contColor">{{add.pubdate}}</span>
        </el-col>
      </el-row>
      
      <el-row :gutter="20" class="oneBill">
        <el-col :span=12>
          <label>{{$t('table.label')}}：</label>
          <span v-for="(item, i) in add.labels" :key="i" class="person_tit">#{{item}}</span>
        </el-col>
        <el-col :span=4>
          <el-button type="primary" plain size="mini" @click="showVariety">查看品种</el-button>
        </el-col>
        <el-col :span=4>
          <el-button type="primary" plain size="mini" @click="showSpecification">查看规格</el-button>
        </el-col>
        <el-col :span=4>
          <el-button type="primary" plain size="mini" @click="showPublisher">查看发布者</el-button>
        </el-col>
      </el-row>
      <div class="editor-container">
        <dropzone v-on:dropzone-removedFile="dropzoneR" v-on:dropzone-success="dropzoneS" v-bind:defaultImg="initImg" id="myVueDropzone" url="https://upload-z2.qiniup.com"></dropzone>
      </div>

    </el-form>
    
    <el-dialog :title="$t('table.variety')" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="variety" label-position="left" label-width="150px" style='margin: 0 10px 0 20px;'>
      <el-row :gutter="20" style="padding: 10px;">
        <el-col :span="24">
            <el-row style="margin: 10px 0;">
              <el-col :span=8>
                <label>{{$t('table.id')}}：</label>
                <span class="contColor">{{variety.id}}</span>
              </el-col>
              <el-col :span=8>
                <label>{{$t('table.fruitName')}}：</label>
                <span class="contColor">{{variety.name}}</span>
              </el-col>
            </el-row>

            <el-row style="margin: 10px 0;">
              <el-col :span=8>
                <label>{{$t('table.parent')}}：</label>
                <span class="contColor">{{variety.parent}}</span>
              </el-col>
              <el-col :span=8>
                <label>{{$t('table.fruitLevel')}}：</label>
                <span class="contColor">{{variety.level}}</span>
              </el-col>
              <el-col :span=8>
                <label>{{$t('table.initial')}}：</label>
                <span class="contColor">{{variety.initial}}</span>
              </el-col>
            </el-row>

            <label>{{$t('table.specification')}}：</label>
            <el-row :gutter="20" class="oneBill" v-for="(item, num) in variety.specification" :key="num" style="margin-top: 10px;">
              <el-row :gutter="20" style="padding-left: 10px;">
                <el-col :span=7>
                  <label>{{$t('table.fruitName')}}：</label>
                  <span class="contColor">{{item.name}}</span>
                </el-col>
                <!-- <el-col :span=4>
                  <label>{{$t('table.required')}}：</label>
                  <span class="contColor">{{item.required}}</span>
                </el-col> -->
              </el-row>
              <el-row :gutter="20" style="margin-top: 10px;padding-left: 10px;">
                <el-col :span=24>
                  <label>{{$t('table.items')}}：</label>
                  <span v-for="(lab, ind) in item.items" :key="ind" class="person_tit contColor" style="word-wrap: break-word;word-break:break-all;"><span>#{{lab}}</span></span>
                </el-col>
              </el-row>
            </el-row>

            <label>{{$t('table.service')}}：</label>
            <el-row :gutter="20" class="oneBill" v-for="(item, num2) in variety.service" :key="7 + num2" style="margin-top: 10px;">
              <el-row :gutter="20" style="padding-left: 10px;">
                <el-col :span=7>
                  <label>{{$t('table.serviceName')}}：</label>
                  <span class="contColor">{{item.name}}</span>
                </el-col>
              </el-row>
              <el-row :gutter="20" style="margin-top: 10px;padding-left: 10px;">
                <el-col :span=24>
                  <label>{{$t('table.serviceItems')}}：</label>
                  <span v-for="(lab, ind2) in item.items" :key="4 + ind2" class="person_tit contColor" style="word-wrap: break-word;word-break:break-all;"><span>#{{lab}}</span></span>
                </el-col>
              </el-row>
            </el-row>
        </el-col>
      </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" type="primary">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="$t('table.specification')" :visible.sync="specificationForm">
      <el-form ref="dataForm" :model="add" label-position="left" label-width="150px" style='margin: 0 10px 0 20px;'>
      <el-row :gutter="20" style="padding: 10px;">
        <el-col :span="24">
            <el-row :gutter="20" class="oneBill" v-for="(item, num) in specification" :key="num" style="margin-top: 10px;">
              <el-row :gutter="20" style="padding-left: 10px;">
                <el-col :span=7>
                  <label>{{$t('table.fruitName')}}：</label>
                  <span class="contColor">{{item.name}}</span>
                </el-col>
                <!-- <el-col :span=4>
                  <label>{{$t('table.required')}}：</label>
                  <span class="contColor">{{item.required}}</span>
                </el-col> -->
              </el-row>
              <el-row :gutter="20" style="margin-top: 10px;padding-left: 10px;">
                <el-col :span=24>
                  <label>{{$t('table.items')}}：</label>
                  <span v-for="(lab, ind) in item.items" :key="ind" class="person_tit contColor" style="word-wrap: break-word;word-break:break-all;"><span>#{{lab}}</span></span>
                </el-col>
              </el-row>
            </el-row>
        </el-col>
      </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="specificationForm = false" type="primary">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="$t('table.publisher')" :visible.sync="publisherForm">
      <el-form ref="dataForm" :model="publisher" label-position="left" label-width="150px" style='margin: 0 10px 0 20px;'>
      <el-row :gutter="20">
        <el-col :span="24">
            <el-row style="margin: 10px 0;padding: 10px;" class="oneBill">
              <el-col :span=12>
                <label>{{$t('table.id')}}：</label>
                <span class="contColor">{{publisher.id}}</span>
              </el-col>
              <el-col :span=12>
                <label>{{$t('table.nickname')}}：</label>
                <span class="contColor">{{publisher.nickname}}</span>
              </el-col>
            </el-row>

            <el-row style="margin: 10px 0;padding: 10px;" class="oneBill">
              <el-col :span=12>
                <label>{{$t('table.level')}}：</label>
                <span class="contColor">{{publisher.level}}</span>
              </el-col>
              <el-col :span=12>
                <label>{{$t('table.userState')}}：</label>
                <span class="contColor">{{publisher.state}}</span>
              </el-col>
            </el-row>

            <el-row style="margin: 10px 0;padding: 10px;" class="oneBill">
              <el-col :span=12>
                <label>{{$t('table.mobile')}}：</label>
                <span class="contColor">{{publisher.mobile}}</span>
              </el-col>
              <el-col :span=12>
                <label>{{$t('table.certification')}}：</label>
                <span class="contColor">{{publisher.certification}}</span>
              </el-col>
            </el-row>

            <el-row style="margin: 10px 0;padding: 10px;" class="oneBill">
              <el-col :span=12>
                <label>{{$t('table.senior')}}：</label>
                <span class="contColor">{{publisher.senior}}</span>
              </el-col>
              <el-col :span=12>
                <label>{{$t('table.corporate')}}：</label>
                <span class="contColor">{{publisher.corporate}}</span>
              </el-col>
            </el-row>

            <el-row style="margin: 10px 0;padding: 10px;" class="oneBill">
              <el-col :span=24>
                <label>{{$t('table.mid')}}：</label>
                <span class="contColor" style="word-wrap: break-word;word-break:break-all;">{{publisher.mid}}</span>
              </el-col>
            </el-row>

        </el-col>
      </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="publisherForm = false" type="primary">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>

  </div>
  
</template>

<script>
import { findSupply } from '@/api/api'
import Dropzone from '@/components/Dropzone/editArticleImg'
import _ from 'lodash'

const articleLayout = [
  { key: '大图排版' },
  { key: '单图排版' },
  { key: '多图排版' }
]

export default {
  name: 'edit-article',
  data() {
    return {
      listLoading: false,
      Pictures: [],
      user: '',
      initImg: undefined,
      dialogFormVisible: false,
      specificationForm: false,
      publisherForm: false,
      articleLayout,
      variety: {
        id: undefined,
        name: undefined,
        parent: undefined,
        level: undefined,
        specification: undefined
      },
      specification: [],
      publisher: {
        id: undefined,
        mobile: undefined,
        nickname: undefined,
        portrait: undefined,
        level: undefined,
        certification: undefined,
        corporate: undefined,
        senior: undefined,
        mid: undefined,
        state: undefined
      },
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
  components: { Dropzone },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      const para = this.$route.query.id
      this.listLoading = true
      findSupply(para).then((res) => {
        this.listLoading = false
        this.add = res.data
        this.variety = this.add.variety
        this.specification = this.add.specification
        this.publisher = this.add.publisher
        this.Pictures = res.data.pictures
        this.initImg = res.data.pictures
        if (this.add.stick === true) {
          this.add.stick = '置顶'
        } else if (this.add.stick === false) {
          this.add.stick = '未置顶'
        }
        if (this.add.collected === true) {
          this.add.collected = '已收藏'
        } else if (this.add.collected === false) {
          this.add.collected = '未收藏'
        }
        if (this.add.unsalable === true) {
          this.add.unsalable = '滞销'
        } else if (this.add.unsalable === false) {
          this.add.unsalable = '未滞销'
        }
        if (this.add.express === true) {
          this.add.express = '代发'
        } else if (this.add.express === false) {
          this.add.express = '不代发'
        }
      })
    },
    handleSkip() {
      this.$router.push({ name: '供应管理' })
    },
    showVariety() {
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    showSpecification() {
      this.specificationForm = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    showPublisher() {
      this.publisherForm = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
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
    //         this.$router.push({ name: 'purchasemanage' })
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
</style>


