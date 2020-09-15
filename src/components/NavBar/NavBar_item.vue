<template>
  <!-- 栏目导航 -->
  <ul class="view_card">
    <li class="bar" :style="{width:`${100 / item.showNum}%`}" v-for="(nav,i) in item.data">
      <i class="iconfont icon-tupian" v-if="!nav.image"></i>
      <img v-lazy="nav.image" alt="icon" v-else>
      <p>{{nav.title}}</p>
    </li>
    <slot name="sidebtn"></slot>
    <SideBtn :item="item" v-if="item.selected"/>
  </ul>
</template>

<script>
  export default {
    name: "NavBar_item",
    props:['item'],
    data(){
      return {
      }
    },
  }
</script>

<style lang="stylus" scoped>
  @import "../../static/css/global.styl"
  .view_card
    width 100%
    min-height 80px
    position relative
    display flex
    flex-wrap wrap
    justify-content flex-start !important
    padding 6px 0
    .bar
      height 100%
      display flex
      flex-direction column
      align-items center
      justify-content center
      margin 10px  0
      img
        width 40px
        height 40px
        margin-bottom 8px
      .iconfont
        color $bgColor
        font-size 28px
        margin-bottom 10px
        opacity .5
      p
        color #333
        font-size 12px
</style>