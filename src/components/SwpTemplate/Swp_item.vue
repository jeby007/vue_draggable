<template>
  <!-- 轮播图 -->
  <div class="compWrap view_card">
    <el-carousel indicator-position="outside" class="view_card" v-if="item.data.length > 0">
      <el-carousel-item v-for="vo in item.data" :key="vo.id"  @click.native="jump(vo.jumpLink)">
        <img v-lazy="vo.image" alt="轮播图">
      </el-carousel-item>
    </el-carousel>
    <div class="view_card defalutSwp" v-else>
      <i class="iconfont icon-drxx70"></i>
      <p class="">轮播图<p/>
    </div>
    <slot name="sidebtn"></slot>
    <SideBtn :item="item" v-if="item.selected"/>
  </div>

</template>

<script>
  export default {
    name: "Swp_item",
    props:['item'],
    data() {
      return {
        isShowSideBtn: false
      }
    },
    methods: {
      //swp跳转路径
      jump(link){
        //window.open(link)
      },
    },
  }
</script>

<style lang="stylus" scoped>
  @import "../../static/css/global.styl"
  .view_card
    display flex
    width 100%
    height 180px
    position relative
    flex-direction column
    color #fff
    align-items center
    justify-content center
    & img
      width 100%
      height auto
    & img[lazy='error'],img[lazy='loading']
      width 50px
      height 50px
    .iconfont
      color $bgColor
      font-size 35px

    p
      color #333
      font-size 14px
      margin-top 10px

  .defalutSwp
    width 100%
    height 100%

  .sideBtnWrap
    position absolute
    top 0
    right -60px
    width 50px
    display flex
    flex-direction column
    justify-content center
    align-items center
    background #fff
    box-shadow 0px 0px 5px #D1D1D1

    li
      width 100%
      height 50px
      display flex
      align-items center
      justify-content center

      &:nth-child(2)
        border-top 1px solid #f0f0f0
        border-bottom 1px solid #f0f0f0

    & .iconfont
      color #333
      font-size 24px
  .view_card >>> .el-carousel .el-carousel__button
    width 5px
    height 5px
    border-radius 5px


</style>