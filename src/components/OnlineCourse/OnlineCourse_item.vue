<template>
  <div class="view_card courseWrap">
    <div class="courseWrap_header" v-if="item.showTitle">
      <span>线上课堂</span>
      <div class="more" v-if="item.more">更多<i class="iconfont icon-right"></i></div>
    </div>
    <ul class="courseList" v-if="item.showType === 0">
      <li class="left" v-for="(vo,i) in item.filterList" v-if="i < 4 && item.autoUpdate">
        <div class="imgWrap">
          <img v-lazy="vo.img_url" alt="">
          <span class="typeName">{{vo.type_name}}</span>
        </div>
        <div class="courseList_info">
          <p class="courseList_info-title ellipsis">{{vo.name}}</p>
          <!--<p class="explain">{{vo.ctime}}</p>-->
          <p class="intro">{{vo.description}}</p>
        </div>
      </li>
      <li class="left" v-for="(vo,i) in item.data" v-if="!item.autoUpdate">
        <div class="imgWrap" v-show="vo.img_url">
          <img v-lazy="vo.img_url" alt="">
          <span class="typeName">{{vo.type_name}}</span>
        </div>
        <div class="courseList_info" v-show="vo.name">
          <p class="courseList_info-title ellipsis">{{vo.name}}</p>
          <!--<p class="explain">{{vo.checked.ctime}}</p>-->
          <p class="intro">{{vo.description}}</p>
        </div>
        <div class="hint" v-show="!vo.img_url">请选择课程</div>
      </li>
    </ul>
    <!-- 小图模板 -->
    <ul class="course_vtc" v-if="item.showType === 1">
      <li class="shadow" v-for="(vo,i) in item.filterList" v-if="i < 4 && item.autoUpdate">
        <div class="topImg">
          <img v-lazy="vo.img_url" alt="">
          <span class="typeName">{{vo.type_name}}</span>
        </div>
        <p class="name ellipsis" :title="vo.name">{{vo.name}}</p>
        <!--<p class="age">{{vo.ctime}}</p>-->
        <p class="brief">{{vo.description}}</p>
      </li>
      <li class="shadow" v-for="(vo,i) in item.data" v-if="!item.autoUpdate">
        <div class="topImg">
          <img v-lazy="vo.img_url" alt="">
          <span class="typeName">{{vo.type_name}}</span>
        </div>
        <p class="name ellipsis" :title="vo.name" v-show="vo.name">{{vo.name}}</p>
        <!--<p class="age">{{vo.checked.ctime}}</p>-->
        <p class="brief">{{vo.description}}</p>
        <p class="hint" v-show="!vo.model">请选择课程</p>
      </li>
    </ul>
    <div class="noData" v-if="item.data.length === 0 && !item.autoUpdate">暂无数据</div>
    <slot name="sidebtn"></slot>
    <SideBtn :item="item" v-if="item.selected"/>
  </div>
</template>

<script>
  export default {
    name: "OnlineCourse_item",
    props:['item']
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
          position relative
          .typeName
            position absolute
            bottom 10px
            right 10px
            color #fff
            font-size 12px
            padding 2px 4px
            border-radius 4px
            line-height 15px
            background rgba(0,0,0,.4)
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
        width 49%
        margin-top 10px
        position relative
        .topImg
          width 100%
          height 100px
          overflow hidden
          display flex
          align-items center
          justify-content center
          position relative
          margin-bottom 10px
          img
            width auto
            height 100%
          img[lazy='error'],img[lazy='loading']
            width 50px
            height 50px
          .typeName
            position absolute
            bottom 4px
            right 8px
            background rgba(0,0,0,.5)
            padding 2px 4px
            font-size 12px
            color #fff
            border-radius 4px
        .name,.age,.brief
          padding 2px 6px
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

  .noData
    width 100% !important
    min-height 40px</style>