<template>
  <div class="setEnrollWrap">
    <p class="title">营销招生</p>
    <p class="explain">必填，只能添加1个活动</p>
    <div class="enrollItemWrap">
      <div class="enrollItem">
        <span class="label">选择活动</span>
        <el-select
          v-model="velue"
          size="small"
          filterable
          placeholder="选择营销活动"
          @change="val=>selectChange(val)"
          remote
          clearable
          :remote-method="remoteMethod"
          @clear="clearHandle"
          :loading="filterLoading"
        >
          <el-option
            v-for="(vo,i) in enrollFilters"
            :key="vo.id"
            :label="vo.name"
            :value="vo.id"
          ></el-option>
        </el-select>
        <div class="setImg" v-show="velue">
          <span class="label">活动图片</span>
          <div>
            <!-- action="http://devhome.weizaojiao.cn/Home/Notify/uploadImg?type=image" -->
            <!-- action="/Home/Notify/uploadImg?type=image" -->
            <el-upload
              action="/Home/Notify/uploadImg?type=image"
              :multiple="false"
              name="imgFile"
              :show-file-list="false"
              :on-success="uploadSucc"
              :before-upload="beforeUp"
            >
              <el-button type="primary" size="small">上传图片</el-button>
            </el-upload>
            <span class="explain">尺寸900×383</span>
            <a href="https://www.chuangkit.com/tupian/kechengxuanchuan-pi1-si438-or0-pt0-pn1-rd72.html" target="_blank">在线图库</a>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: "Enrollment_set",
    data(){
      return {
        velue:'',
        filterLoading:false,
        msgTip:''
      }
    },
    mounted() {
      this.$nextTick(()=>{
        this.velue = this.enrollment.data.length === 0 ? '' : this.enrollment.data[0].id
      })
    },
    methods:{
      beforeUp(){
        this.msgTip = this.$message.info({message:'上传图片中...',duration:0,iconClass:'el-icon-loading',customClass:'saveing'})
      },
      uploadSucc(val){
        this.msgTip.close()
        this.$set(this.enrollment.data[0],'banner',val.url);
        this.$message.success('上传图片成功')
      },
      selectChange(val){
        this.$store.dispatch('getEnrollList',{search_id:val,id:this.enrollment.id})
      },
      clearHandle(){
        this.$store.dispatch('getEnrollList',{id:this.enrollment.id,name:''})
      },
      remoteMethod(name){
        if (name !== ''){
          this.filterLoading = true
          this.$store.dispatch('getEnrollList',{id:this.enrollment.id,name}).then(res=>{
            this.filterLoading = false
          })
        }
      }
    },
    computed:{
      ...mapState({
        enrollment:state=>state.viewList.find(vo=>vo.type == 'enrollment' && vo.selected),
        enrollFilters:state=>state.viewList.find(vo=>vo.type == 'enrollment' && vo.selected).filterList
      })
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../static/css/global.styl"
  .setEnrollWrap
    width 100%
    display flex
    flex-direction column
    padding-top 30px
    .label
      color #333
      font-size 14px
    &>>>.el-select
      margin 10px 0 16px
      width 90%
    .enrollItemWrap
      background #f9f9f9
      padding 10px
      .enrollItem
        background #fff
        padding 10px
        .setImg
          display flex
          flex-direction column
          &>div
            display flex
            align-items center
            margin-top 8px
            font-size 12px
            &>>>.el-button
              width 80px
              height 30px
            .explain
              margin 0 10px
</style>