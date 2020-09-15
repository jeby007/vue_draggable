<template>
  <div class="couponView">
    <ul class="couponList">
      <li class="couponItem" v-for="(coupon,i) in item.filterList" v-if="item.autoUpdate && i < 4">
        <div class="left">
          <div class="yuan">&yen;{{coupon.qvalue}}</div>
          <div class="couponInfo" :title="coupon.splicing_str">{{coupon.splicing_str}}</div>
        </div>
        <div class="right">
          <div class="applyBtn" :style="{background:item.btnBg}">领取</div>
        </div>
      </li>
      <li class="couponItem" v-for="(coupon,i) in item.data" v-if="!item.autoUpdate">
        <div class="left" v-show="coupon.model">
          <div class="yuan">&yen;{{coupon.qvalue}}</div>
          <div class="couponInfo" :title="coupon.splicing_str">{{coupon.splicing_str}}</div>
        </div>
        <div class="right" v-show="coupon.model">
          <div class="applyBtn" :style="{background:item.btnBg}">领取</div>
        </div>
        <div class="hint" v-show="!coupon.model">请选择优惠券</div>
      </li>
      <li class="noData" v-if="item.data.length === 0 && !item.autoUpdate">暂无数据</li>
    </ul>
    <slot name="sidebtn"></slot>
    <SideBtn :item="item" v-if="item.selected"/>
  </div>
</template>

<script>
  export default {
    props:['item'],
    name: "Coupon_item"
  }
</script>

<style lang="stylus" scoped>
  @import "../../static/css/global.styl"
.couponView
  height 106px
  width 100%
  padding 10px
  position relative
  background #afe2f8
  .couponList
    display -webkit-box
    align-items center
    width 100%
    height 100%
    overflow-x auto
    .noData
      width 100%
    .couponItem
      height 100%
      width 230px
      display flex
      justify-content space-between
      align-items center
      background #fff
      margin-right 10px
      border 1px dotted #ccc
      border-radius 8px
      position relative
      .left
        width 140px
        padding-left 10px
        border-right 1px dashed #ccc
        position relative
        &::before
          content ''
          display block
          position absolute
          top -1px
          right -6px
          width: 0;
          height: 0;
          border: 6px solid transparent;
          border-top-color: #afe2f8
        &::after
          content ''
          display block
          position absolute
          bottom -1px
          right -6px
          width: 0;
          height: 0;
          border: 6px solid transparent;
          border-bottom-color: #afe2f8
      .right
        width 90px
        align-items center
      .left,.right
        height 100%
        display flex
        flex-direction column
        justify-content center
        color $bgColor
        font-size 14px
        .couponInfo
          font-size 12px
          overflow hidden
          max-width 118px
          text-overflow ellipsis
          white-space nowrap
        .yuan
          font-size 18px
          margin-bottom 10px
        .applyBtn
          width 70px
          height 25px
          border-radius 25px
          color #fff
          text-align center
          line-height 25px
          cursor: pointer;
</style>