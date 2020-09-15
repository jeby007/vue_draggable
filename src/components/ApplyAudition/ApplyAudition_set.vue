<template>
  <div class="setAuditionWrap">
    <p class="title">申请试听</p>
    <div class="selectColor">
      <span>按钮颜色<span class="required">*</span></span>
      <el-color-picker v-model="audition.theme" :predefine="predefineColors"></el-color-picker>
    </div>
    <div class="btnName">
      <span>按钮名称<span class="required">*</span></span>
      <el-input size="small" :maxlength="6" show-word-limit v-model="audition.btnName"></el-input>
      <span class="explain">必填，不超过6个字</span>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: "ApplyAudition_set",
    data(){
      return {
        predefineColors:['#ff0000','#ff6f00','#ffd700','#8fe24f','#00dcf2','#0077ed','#9b6ee5','#03a9f4'],
        checkedColor:'#03a9f4'
      }
    },
    computed:{
      ...mapState({
        audition:state=>state.viewList.find(vo=>vo.type == 'audition' && vo.selected)
      })
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../static/css/global.styl"
.setAuditionWrap
  display flex
  width 100%
  flex-direction column
  padding-top 30px
  .selectColor
    margin 20px 0
    display flex
    flex-direction column
    font-size 14px
    margin-bottom 10px
    >span
      margin-bottom 20px
    >>>.el-color-picker__trigger
      width 60px
  .btnName
    margin-top 10px
    >span
      font-size 14px
    &>>>.el-input
      margin-top 10px

</style>