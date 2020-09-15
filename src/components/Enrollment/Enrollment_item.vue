<template>
  <div class="enrollmentWrap">
    <div v-for="vo in item.data">
      <div class="topBanner">
        <el-image :src="vo.banner || ''" alt="" lazy fit="cover"></el-image>
      </div>
      <p>{{vo.name}}</p>
    </div>
    <div class="noData" v-if="item.data.length === 0">暂无数据(请先选择招生活动)</div>
    <slot name="sidebtn"></slot>
    <SideBtn :item="item" v-if="item.selected"/>
  </div>
</template>

<script>
  export default {
    props:['item'],
    name: "Enrollment_item"
  }
</script>

<style lang="stylus" scoped>
  .enrollmentWrap
    position relative
    padding 10px
    .noData
      min-height 90px
    .topBanner
      width 100%
      height 190px
      overflow hidden
      display flex
      align-items center
      justify-content center
      img
        width auto
        height 100%
      img[lazy='error'],img[lazy='loading']
        width 60px
        height 60px
    p
      font-size 14px
      color #666
      font-weight 700
      margin 10px 0 10px 0
      line-height 18px
</style>