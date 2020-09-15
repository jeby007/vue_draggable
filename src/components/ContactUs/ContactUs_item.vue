<template>
  <div class="view_card">
    <p class="title" v-if="item.showTitle">联系我们</p>
    <div class="contact_item">
      <i class="iconfont icon-dizhi"></i>
      <span>{{ item.data.address }}（距离<span class="dist">500米</span>）</span>
    </div>
    <div class="contact_item">
      <i class="iconfont icon-phone"></i>
      <span>{{ item.data.tel }}</span>
    </div>
    <slot name="sidebtn"></slot>
    <SideBtn :item="item" v-if="item.selected"/>
  </div>
</template>

<script>
    export default {
        name: "ContactUs_item",
        props: ['item']
    }
</script>

<style lang="stylus" scoped>
  @import "../../static/css/global.styl"
  .view_card
    color #333 !important
    padding 20px 10px
    flex-direction column
    align-items flex-start !important

    .title
      margin-bottom 10px

    .contact_item
      margin-top 10px
      display flex

      > span
        line-height 20px
        font-size 14px

      .iconfont
        margin-top 3px
        color #999
        margin-right 10px

      .dist
        color $bgColor
</style>