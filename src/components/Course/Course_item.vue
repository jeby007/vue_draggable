<template>
  <div class="view_card courseWrap">
    <div class="courseWrap_header" v-if="item.showTitle">
      <span>课程介绍</span>
      <div class="more" v-if="item.more">更多<i class="iconfont icon-right"></i></div>
    </div>
    <ul class="courseList" v-if="item.showType === 0">
      <li class="left" v-for="(course,i) in item.filterList" v-if="item.autoUpdate && i < 6">
        <div class="imgWrap">
          <img v-lazy="course.cover_img" alt="">
        </div>
        <div class="courseList_info">
          <p class="courseList_info-title ellipsis" :title="course.title">{{course.title}}</p>
          <p class="explain">适应年龄：{{course.minimum_month_age}}-{{course.maximum_month_age}}</p>
          <p class="intro" :title="course.brie">{{course.brief}}</p>
        </div>
      </li>
      <li class="left" v-for="(course,i) in item.data" v-if="!item.autoUpdate">
        <div class="imgWrap">
          <img v-lazy="course.cover_img" alt="" v-show="course.cover_img">
        </div>
        <div class="courseList_info">
          <p class="courseList_info-title ellipsis" :title="course.title">{{course.title}}</p>
          <p class="explain" v-show="course.maximum_month_age">适应年龄：{{course.minimum_month_age}}-{{course.maximum_month_age}}</p>
          <p class="intro" :title="course.brief">{{course.brief}}</p>
        </div>
        <p class="hint" v-if="!course.title">请选择课程</p>
      </li>
    </ul>
    <ul class="course_vtc" v-if="item.showType === 1">
      <li v-for="(vo,i) in item.filterList" v-if="item.autoUpdate && i < 6" class="shadow">
        <div class="topImg">
          <img v-lazy="vo.cover_img" alt="">
        </div>
        <p class="name ellipsis" :title="vo.title">{{vo.title}}</p>
        <p class="age">适应年龄：{{vo.minimum_month_age}}-{{vo.maximum_month_age}}</p>
      </li>
      <li v-for="(vo,i) in item.data" v-if="!item.autoUpdate" class="shadow">
        <div class="topImg">
          <img v-lazy="vo.cover_img" alt="" v-show="vo.cover_img">
        </div>
        <p class="name ellipsis" :title="vo.title">{{vo.title}}</p>
        <p class="age" v-show="vo.maximum_month_age">适应年龄：{{vo.minimum_month_age}}-{{vo.maximum_month_age}}</p>
        <p class="hint" v-if="!vo.title">请选择课程</p>
      </li>
    </ul>
    <div class="noData" v-if="item.data.length === 0 && !item.autoUpdate">暂无数据</div>
    <slot name="sidebtn"></slot>
    <SideBtn :item="item" v-if="item.selected"/>
  </div>
</template>

<script>
  import {mapState} from "vuex";

  export default {
    name: "Course_item",
    props:['item'],
  }
</script>

<style lang="stylus" scoped>
  @import "../../static/css/global.styl"
.courseWrap
  color #333
  padding 10px
  font-size 14px
  flex-direction column
  .noData
    height 40px
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
      position relative
      justify-content space-between
      width 100%
      height 120px
      margin-bottom 14px
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
        padding-top 2px
        .courseList_info-title
          font-size 15px
          color #666
          font-weight 700
        .explain
          line-height 22px
        .intro
          color #999
          font-size 12px
          line-height 17px
          margin-top 6px
          max-height 70px
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
  .course_vtc
    display flex
    flex-wrap wrap
    width 100%
    justify-content space-between
    li
      position relative
      width 49%
      margin-top 10px
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
      .name,.age,.brief
        padding 0 6px
      .age
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

</style>