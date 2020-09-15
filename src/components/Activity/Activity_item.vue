<template>
  <div class="view_card courseWrap">
    <div class="courseWrap_header" v-if="item.showTitle">
      <span>活动报名</span>
      <div class="more" v-if="item.more">更多<i class="iconfont icon-right"></i></div>
    </div>
    <ul class="courseList" v-if="item.showType === 0">
      <li class="left" v-for="(vo,i) in item.filterList" v-if="i <= 5 && item.autoUpdate">
        <div class="imgWrap">
          <img v-lazy="vo.img" alt="">
        </div>
        <div class="courseList_info">
          <p class="courseList_info-title ellipsis" :title="vo.name">{{vo.name}}</p>
          <p class="uptime">开始时间：{{vo.uptime | formatDate}}</p>
          <p class="intro">{{vo.brief}}</p>
        </div>
      </li>
      <li class="left" v-for="(vo,i) in item.data" v-if="!item.autoUpdate">
        <div class="imgWrap">
          <img v-lazy="vo.img" alt="" v-show="vo.img">
        </div>
        <div class="courseList_info">
          <p class="courseList_info-title ellipsis" :title="vo.name">{{vo.name}}</p>
          <p class="uptime" v-if="vo.uptime">开始时间：{{vo.uptime | formatDate}}</p>
          <p class="intro">{{vo.brief}}</p>
        </div>
        <p v-if="!vo.name" class="hint">请选择活动</p>
      </li>
    </ul>
    <!-- 小图模板 -->
    <ul class="course_vtc" v-if="item.showType === 1">
      <li class="shadow" v-for="(vo,i) in item.filterList" v-if="i <= 5 && item.autoUpdate">
        <div class="topImg">
          <img v-lazy="vo.img" alt="">
        </div>
        <p class="name ellipsis" :title="vo.name">{{vo.name}}</p>
        <p class="uptime">开始时间:{{vo.uptime | formatDate}}</p>
        <!--<p class="brief">{{vo.brief}}</p>-->
      </li>
      <li class="shadow" v-for="(vo,i) in item.data" v-if="!item.autoUpdate">
        <div class="topImg">
          <img v-lazy="vo.img" alt="" v-show="vo.img">
        </div>
        <p class="name ellipsis" :title="vo.name">{{vo.name}}</p>
        <p class="uptime" v-if="vo.uptime">开始时间:{{vo.uptime | formatDate}}</p>
        <p class="hint" v-if="!vo.name">请选择活动</p>
      </li>
    </ul>
    <div class="noData" v-if="item.data.length === 0 && !item.autoUpdate">暂无数据</div>
    <slot name="sidebtn"></slot>
    <SideBtn :item="item" v-if="item.selected"/>
  </div>
</template>

<script>
  export default {
    props:['item'],
    name: "activity_item",
    filters:{
      formatDate(val){
        if (val != undefined){
          const date = val.split('-')
          const newDate = date[2].split(':')
          return `${date[0]}/${date[1]}/${newDate[0]}:${newDate[1]}`
        }else {
          return ''
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../static/css/global.styl"
  .courseWrap
    color #333
    padding 10px
    font-size 14px
    flex-direction column
  .courseWrap_header
      width 100%
      display flex
      align-items center
      justify-content space-between
      margin 10px 0
      >span
        font-weight 700
        font-size 16px
      .more
        font-size 14px
        color #999
        display flex
        cursor: pointer;
        align-items center
        .iconfont
          line-height 14px
    .courseList
      margin-top 10px
      width 100%
      li
        display flex
        justify-content space-between
        width 100%
        height 120px
        margin-bottom 14px
        position relative
        &:last-child
          margin-bottom 0
        >div
          width 49%
        .imgWrap
          overflow hidden
          display flex
          align-items center
          justify-content center
          img
            width auto
            height 100%
          img[lazy='error'],img[lazy='loading']
            width 50px
            height 50px
        .courseList_info
          padding-top 10px
          .courseList_info-title
            font-size 15px
            color #666
            font-weight 700
          .explain
            line-height 22px
          .uptime
            color #999
            font-size 12px
            margin-top 4px
          .intro
            color #999
            font-size 12px
            line-height 17px
            margin-top 6px
            max-height 70px
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
    .course_vtc
      display flex
      flex-wrap wrap
      width 100%
      justify-content space-between
      li
        width 49%
        margin-top 10px
        position relative
        .topImg
          width 100%
          height 100px
          overflow hidden
          margin-bottom 4px
          display flex
          align-items center
          justify-content center
          img
            width auto
            height 100%
          img[lazy='error'],img[lazy='loading']
            width 50px
            height 50px
        .name,.uptime,.brief
          padding 0 6px
        .uptime
          color #999
          font-size 12px
          margin 8px 0
        .brief
          margin-bottom 10px
          color #999
          font-size 12px
          line-height 16px
        .ellipsis
          max-width 100%
          overflow hidden
          white-space nowrap
          text-overflow ellipsis
  .noData
    width 100% !important
    min-height 40px
</style>