<template>
  <div class="setContactWrap">
    <p class="title">联系我们</p>
    <div class="title_toggle">
      <span class="lable">标题栏</span>
      <el-radio v-model="contact.showTitle" :label="true">显示</el-radio>
      <el-radio v-model="contact.showTitle" :label="false">隐藏</el-radio>
    </div>
    <p class="explain">门店地址和联系电话为必填项</p>
    <p class="explain">在门店基本信息中修改，<a href="javascript:void(0)">点击修改</a></p>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: "ContactUs_set",
    computed:{
      ...mapState({
        contact:state=>state.viewList.find(vo=>vo.type == 'contact' && vo.selected)
      })
    }
  }
</script>

<style lang="stylus" scoped>
.setContactWrap
  width 100%
  display flex
  flex-direction column
  padding-top 30px
  .title_toggle
    font-size 14px
    margin 20px 0
    color #333
    .lable
      margin-right 30px
  .explain
    color #999
    font-size 13px
    line-height 22px
</style>