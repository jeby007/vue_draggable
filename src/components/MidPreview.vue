<template>
  <div class="midPreviewWrap">
    <div class="config_wrap">
      <div class="config_header">
        <div class="config_header-title">{{orgName}}</div>
      </div>
      <draggable
        class="previewList"
        :list="viewList"
        :group="{ name: 'control' }"
        :options="options"
        @change="emitLog"
        :style="{height:screenH + 'px'}"
      >
        <div class="previewList_item"
             v-for="(item,index) in viewList"
             :key="index"
             :class="item.selected ? 'active' : ''"
             @click.stop.prevent="selectOrSetItem(index,item)"
        >
          <!-- 轮播图 -->
          <Swp_item :item="item" v-if="item.type == 'swp'" />
          <!-- 栏目导航 -->
          <NavBar_item :item="item" v-if="item.type == 'nav'" />
          <!-- 环境照片 -->
          <Env_item :item="item" v-if="item.type == 'env'"/>
          <!-- 联系我们 -->
          <ContactUs_item :item="item" v-if="item.type == 'contact'" />
          <!-- 课程介绍 -->
          <Course_item :item="item" v-if="item.type == 'course'" />
          <!-- 师资介绍 -->
          <TeacherBrief_item :item="item" v-if="item.type == 'teacher'" />
          <!-- 招生活动 -->
          <Enrollment_item :item="item" v-if="item.type == 'enrollment'" />
          <!-- 申请试听 -->
          <ApplyAudition_item :item="item" v-if="item.type == 'audition'" />
          <!-- 优惠券 -->
          <Coupon_item :item="item" v-if="item.type == 'coupon'" />
          <!-- 特惠课程 -->
          <Disc_course_item :item="item" v-if="item.type == 'disc_course'"/>
          <!-- 活动报名 -->
          <Activity_item :item="item" v-if="item.type == 'activity'" />
          <!-- 线上课程 -->
          <OnlineCourse_item :item="item" v-if="item.type == 'online_course'" />
          <!-- 商城 -->
          <Disc_course_item :item="item" v-if="item.type == 'store'"/>
        </div>
      </draggable>
      <FooterNav_item />
    </div>
  </div>
</template>

<script>
  import Bus from "@/utils/bus";
  import {mapState} from 'vuex'
  import Swp_item from "./SwpTemplate/Swp_item";
  import NavBar_item from "./NavBar/NavBar_item";
  import FooterNav_item from "./FooterNav/FooterNav_item";
  import Env_item from "./Env/Env_item";
  import ContactUs_item from "./ContactUs/ContactUs_item";
  import Course_item from "./Course/Course_item";
  import TeacherBrief_item from "./TeacherBrief/TeacherBrief_item";
  import Enrollment_item from "./Enrollment/Enrollment_item";
  import ApplyAudition_item from "./ApplyAudition/ApplyAudition_item";
  import Coupon_item from "./Coupon/Coupon_item";
  import Activity_item from "./Activity/Activity_item";
  import Disc_course_item from "./Disc_course/Disc_course_item";
  import OnlineCourse_item from "./OnlineCourse/OnlineCourse_item";
  export default {
    name: "MidPreview",
    data() {
      return {
        options: {
          animation: 300,
          ghostClass: 'ghost',
        },
        screenH:null,
      }
    },
    methods: {
      emitLog(evt) {
        let newDragItem
        const timestamp = (new Date()).valueOf()
        if (evt.added){
          newDragItem = evt.added.element
          newDragItem.id = timestamp
          this.setSelectedItem(newDragItem)
        }
      },
      //选中项目
      selectOrSetItem(index,item){
        this.setSelectedItem(item)
      },
      //设置选中项
      setSelectedItem(item){
        this.footerNav.selected = false
        this.viewList.forEach(vo=>{
          item.id === vo.id ? vo.selected = true : vo.selected = false
        })
      },
    },
    computed: {
      ...mapState(['viewList','footerNav','orgName'])
    },
    components:{
      OnlineCourse_item,
      Disc_course_item,
      Activity_item,
      Coupon_item,
      ApplyAudition_item,
      Enrollment_item,
      TeacherBrief_item,
      Course_item,
      ContactUs_item,
      FooterNav_item,
      Swp_item,
      NavBar_item,
      Env_item
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../static/css/global.styl'
  .active
    border 2px solid $bgColor

  .midPreviewWrap
    flex 1
    padding 40px 0 20px 320px
    overflow-y auto
    background #f9f9f9
    display flex
    justify-content center

    .config_wrap
      width 375px
      min-height 100px
      background #fff
      box-shadow 0 2px 5px #d9d9d9
      position relative
      .config_header
        width 375px
        height 64px
        background url("../static/images/img_top_weixin.png") no-repeat center
        background-size 100% auto
        .config_header-title
          position absolute
          top 34px
          left 50%
          transform translate(-50%)
          font-size 16px
          color #333
          font-weight 600
          max-width 300px
          overflow hidden
          white-space nowrap
          text-overflow ellipsis

      .previewList
        display flex
        align-items center
        //justify-content center
        flex-direction column
        position relative
        width 100%
        min-height calc(100% - 64px - 56px)
        background #fff
        .previewList_item
          width 100%
          &.active
            border 2px solid $bgColor

          & >>> .el-carousel
            width 100%
            height 100%

            .el-carousel__indicators--outside
              position absolute
              bottom 0
              left 50%
              transform translateX(-50%)

            .el-carousel__container
              width 100%
              height 100%

              .el-carousel__item
                display flex
                align-items center
                justify-content center

          .view_card
            display flex
            //color #fff
            align-items center
            justify-content center
            position relative
            .iconfont
              color $bgColor
              font-size 35px

            p
              color #333
              font-size 14px
              margin-top 10px

          .defalutSwp
            width 100%
            height 100%

</style>