<template>
  <div class="applyAudWrap">
    <div class="btn" :style="{background:item.theme}">{{item.btnName}}</div>
    <slot name="sidebtn"></slot>
    <SideBtn :item="item" v-if="item.selected"/>
  </div>
</template>

<script>
  export default {
    name: "ApplyAudition_item",
    props:['item'],
  }
</script>

<style lang="stylus" scoped>
  .applyAudWrap
    position relative
    height 90px
    display flex
    align-items center
    justify-content center
    .btn
      display flex
      align-items center
      justify-content center
      color #fff
      width 100px
      height 35px
      font-size 14px
      border-radius 4px
      cursor: pointer;
</style>