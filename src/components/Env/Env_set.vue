<template>
  <div class="AmbientWrap">
    <p class="title">环境展示</p>
    <span class="explain">默认展示多少张，最大不超过10</span>
    <div class="item">
      <span class="item_vo-lable">展示数量</span>
      <el-input-number v-model="env.showNum" :maxlength="2" size="small" :max="10" :min="1" type="number"></el-input-number>
    </div>
    <div class="addImg">添加图片</div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: "AmbientImages_set",
    data(){
      return {
        showNum:5
      }
    },
    computed:{
      ...mapState({
        env:state=>state.viewList.find(vo=>vo.type == 'env' && vo.selected)
      })
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../static/css/global.styl"
  .AmbientWrap
    display flex
    flex-direction column
    width 100%
    .addImg
      font-size 14px
      color $bgColor
      margin 10px 0
      cursor: pointer;
    .item
      display flex
      align-items center
      font-size 14px
      & b
        color red
      &>>>.el-input-number
        width 100px
        margin-left 10px
</style>