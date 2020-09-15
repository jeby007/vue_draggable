<template>
  <div class="ambientWrap">
    <ul class="images">
      <li class="ambientItem" v-for="(vo,i) in item.data.list" v-if="i < item.showNum">
        <el-image :src="vo.envimg_path" alt="环境照片" fit="cover" lazy></el-image>
      </li>
    </ul>
    <div class="total">
      <i class="iconfont icon-fengcaizhanshi"></i>
      <span>{{item.data.total}}</span>
    </div>
    <slot name="sidebtn"></slot>
    <SideBtn :item="item" v-if="item.selected"/>
  </div>
</template>

<script>
  import SideBtn from "../SideBtn";
  export default {
    props:['item'],
  }
</script>

<style lang="stylus" scoped>
  .ambientWrap
    position relative
    .total
      width 50px
      height 20px
      position absolute
      right 10px
      bottom 36px
      background rgba(0, 0, 0, .5)
      color #fff
      border-radius 20px
      display flex
      align-items center
      justify-content center
      font-size 12px
      .iconfont
        margin-right 2px
        font-size 14px
        line-height 14px
  .images
    display -webkit-box
    align-items center
    justify-content center
    -webkit-box-align center;
    width 100%
    height 240px
    overflow-x auto
    position relative
    li
      width calc(100% - 20px)
      height 200px
      display flex
      align-items center
      justify-content center
      overflow hidden
      border-radius 10px
      margin-right 10px

      &:first-child
        margin-left 10px

      img
        width auto
        height 100%
      img[lazy='error'],img[lazy='loading']
        width 50px
        height 50px



</style>