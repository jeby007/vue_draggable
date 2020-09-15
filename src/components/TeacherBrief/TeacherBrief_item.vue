<template>
  <div class="view_card teacherWrap">
    <div class="teacherWrap_header" v-if="item.showTitle">
      <span>师资介绍</span>
      <div class="more" v-if="item.more">更多<i class="iconfont icon-right"></i></div>
    </div>
    <div class="teacherList">
      <div class="teacherItem" v-for="(vo,i) in item.data" v-if="!item.autoUpdate">
        <el-avatar
          shape="square"
          :size="100"
          :src="vo.photo"
          v-show="vo.model"
        ></el-avatar>
        <p class="name">{{vo.full_name}}</p>
        <p v-show="vo.teach_age">{{vo.teach_age}}年教龄</p>
        <div class="hint" v-if="!vo.model">请选择老师</div>
      </div>
      <div class="teacherItem" v-for="(vo,i) in item.filterList" v-if="item.autoUpdate">
        <el-avatar
          shape="square"
          :size="100"
          :src="vo.photo"
        ></el-avatar>
        <p class="name">{{vo.full_name}}</p>
        <p>{{vo.teach_age}}年教龄</p>
      </div>
      <div class="noData" v-if="item.data.length === 0 && !item.autoUpdate">暂无数据</div>
    </div>
    <slot name="sidebtn"></slot>
    <SideBtn :item="item" v-if="item.selected"/>
  </div>
</template>

<script>
  export default {
    name: "TeacherBrief_item",
    props:['item']
  }
</script>

<style lang="stylus" scoped>
.teacherWrap
  color #333
  padding 10px
  font-size 14px
  flex-direction column
  .teacherWrap_header
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
  .teacherList
    width 100%
    display -webkit-box
    overflow-x auto
    .noData
      min-height 30px
      width 100%
    .teacherItem
      padding-bottom 6px
      width 100px
      display flex
      margin-right 10px
      flex-direction column
      position relative
      .name
        margin 6px 0
        font-size 14px
        color #666
        font-weight 700
      >p
        color #999
        font-size 14px

</style>