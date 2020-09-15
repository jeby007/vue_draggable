<template>
  <div v-loading="!showPage">
    <div class="header">
      <p>拖拽组件，自由搭建微官网</p>
      <ul>
        <li>
          <a href="javascript:void(0)" @click="saveData">
            <i class="iconfont icon-baocun"></i>
            <span>保存</span>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)" slot="reference" @click="preview">
            <i class="iconfont icon-preview"></i>
            <span>预览</span>
          </a>
        </li>
<!--
        <li style="margin-left: 40px">
          <a href="javascript:void(0)" @click="deleteData">
            <i class="iconfont icon-shanchu"></i>
            <span>删除数据（开发）</span>
          </a>
        </li>
-->
      </ul>
    </div>
    <div class="container">
      <LeftControl/>
      <MidPreview/>
      <RightSetControl/>
    </div>
    <el-dialog
      :visible="visible"
      @close="closeModel"
      width="650px"
      custom-class="qrModel"
      destroy-on-close
    >
      <p slot="title">预览分享</p>
      <div class="midContainer">
        <el-input type="textarea" :rows="4" v-model="previewLink" resize="none" size="medium"></el-input>
        <div>
          <div ref="qrCode" class="qrCode" v-loading="loadedQr"></div>
          <p class="text">扫码预览</p>
        </div>
      </div>
      <div class="btmHint">提示：可将该网址在微信群发中通过阅读原文群发出去</div>
    </el-dialog>
  </div>
</template>
P
<script>
import LeftControl from "../components/LeftControl";
import MidPreview from "../components/MidPreview";
import RightSetControl from "../components/RightSetControl";
import {mapState} from 'vuex'
import QRCode from 'qrcodejs2'
export default {
  name: "mainComponet",
  data() {
    return {
      showPage: false,
      loadedQr:false,
      visible:false
    }
  },
  // created() {
  //   this.$ajax('/Business/ApiContract/getPackageCourseClass').then(res => {
  //     this.$message.success(res.message)
  //   })
  // },
  mounted() {
    Promise.all([
      this.$store.dispatch('savaOrGetData', {type: 'get'}),
      this.$store.dispatch('getCourseList'),
      this.$store.dispatch('getTeacherList', {firstReq: true}),
      this.$store.dispatch('getEnrollList', {size: 10}),
      this.$store.dispatch('getCouponList'),
      this.$store.dispatch('getActivityList'),
      this.$store.dispatch('getOlcourseList'),
      this.$store.dispatch('getExhibition'),
      this.$store.dispatch('getContact'),
      // this.$store.dispatch('getLinks')
    ]).then(() => {
      this.showPage = true
    })
  },
  methods: {
    closeModel(){
      this.visible = false
    },
    getPreviewQr(){
      new QRCode(this.$refs['qrCode'],{
        text:this.previewLink,
        width:150,
        height:150,
        colorDark: "#333333",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.L
      })
    },
    preview(){
      this.loadedQr = true
      this.visible = true
      this.$nextTick(()=>{
        this.getPreviewQr()
        this.$store.dispatch('savaOrGetData', {type: 'preview'}).then(()=>{
          this.loadedQr = false
        })
      })
    },
    saveData() {
      try {
        const filterItem = this.viewList.filter(item => (item.data && item.data.length === 0 && !item.autoUpdate) || (item.filterList && item.filterList.length === 0 && item.autoUpdate)) || []
        filterItem.length > 0 ? this.$message.warning(`${filterItem[0].name}不能为空`) : this.$store.dispatch('savaOrGetData', {type: 'set'})
      } catch (err) {

      }
    },
    deleteData() {
      this.$ajax('/Mp/OrgIndexCompoApi/del').then(res => {
        this.$message.success(res.message)
      })
    }
  },
  components: {RightSetControl, MidPreview, LeftControl,QRCode},
  computed: {
    ...mapState(['viewList','previewLink'])
  }
}
</script>
<style lang="stylus" scoped>
@import '../static/css/global.styl'
.container
  display flex
  justify-content space-between
  position relative
  min-width 1280px
  height: calc(100vh - 50px - 10px);

.header
  width 100%
  height 50px
  min-width 1280px
  background $bgColor
  display flex
  align-items center
  justify-content center
  padding 0 40px
  position relative
  p
    color #fff
    padding-right 80px
.header > ul
  display flex
  align-items center
  justify-content center
  position absolute
  right 40px
  top 50%
  transform translateY(-50%)

.header > ul li:first-child
  margin-right 40px

.header > ul a
  color #fff
  display flex
  align-items center

.header > ul a span
  font-size 14px

.header > ul a .iconfont
  font-size 20px
  margin-right 10px
>>>.qrModel
  .el-dialog__header
    color #666
    text-align center
    border-bottom 2px solid #e5e5e5
  .el-dialog__body
    padding 0 !important
    color #666
    .midContainer
      padding 15px
      display flex
      align-items center
      justify-content space-around
      .el-textarea
        width 400px
      .qrCode
        width 150px
        height 150px
      .text
        color $bgColor
        margin-top 10px
        text-align center
    .btmHint
      padding 20px
      border-top 2px solid #e5e5e5
</style>