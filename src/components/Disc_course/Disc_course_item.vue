<template>
  <div class="wrap">
    <div>{{item.name}}暂未开放</div>
    <slot name="sidebtn"></slot>
    <SideBtn :item="item" v-if="item.selected"/>
  </div>
</template>

<script>
  export default {
    name: "Disc_course_item",
    props:['item']
  }
</script>

<style lang="stylus" scoped>
.wrap
  width 100%
  text-align center
  min-height 40px
  color #999
  line-height 40px
  position relative
</style>