<template>
  <div class="rightInfoWrap">
    <h3>组件设置</h3>
    <div v-for="item in viewList">
      <SwpSet v-if="item.type == 'swp' && item.selected"/>
      <NavBar_set v-if="item.type == 'nav' && item.selected" />
      <Env_set v-if="item.type == 'env' && item.selected" />
      <ContactUs_set v-if="item.type == 'contact' && item.selected" />
      <Course_set v-if="item.type == 'course' && item.selected" />
      <TeacherBrief_set v-if="item.type == 'teacher' && item.selected" />
      <Enrollment_set v-if="item.type == 'enrollment' && item.selected" />
      <ApplyAudition_set v-if="item.type == 'audition' && item.selected" />
      <Coupon_set v-if="item.type == 'coupon' && item.selected" />
      <Activity_set v-if="item.type == 'activity' && item.selected" />
      <OnlineCourse_set v-if="item.type == 'online_course' && item.selected" />
    </div>
    <FooterNav_set v-if="footerNav.selected" />
  </div>
</template>

<script>
  import SwpSet from "./SwpTemplate/Swp_set";
  import NavBar_set from "./NavBar/NavBar_set";
  import FooterNav_set from "./FooterNav/FooterNav_set";
  import Env_set from "./Env/Env_set";
  import ContactUs_set from "./ContactUs/ContactUs_set";
  import Course_set from "./Course/Course_set";
  import TeacherBrief_set from "./TeacherBrief/TeacherBrief_set";
  import Enrollment_set from "./Enrollment/Enrollment_set";
  import ApplyAudition_set from "./ApplyAudition/ApplyAudition_set";
  import Coupon_set from "./Coupon/Coupon_set";
  import Activity_set from "./Activity/Activity_set";
  import OnlineCourse_set from "./OnlineCourse/OnlineCourse_set";

  import {mapState} from 'vuex'

  export default {
    name: "RightSetControl",
    data(){
      return {
        midCheckedItem:''
      }
    },
    components:{
      OnlineCourse_set,
      Activity_set,
      Coupon_set,
      ApplyAudition_set,
      Enrollment_set,
      TeacherBrief_set, Course_set, ContactUs_set, Env_set, FooterNav_set, SwpSet,NavBar_set},
    computed:{
      ...mapState(['viewList','footerNav'])
    }
  }
</script>

<style lang="stylus" scoped>
  .rightInfoWrap
    flex-shrink 0
    width 400px
    background #fff
    padding 20px 10px
    display flex
    flex-direction column
    align-items center
    overflow-y auto
    > div
      width 100%
    h3
      font-size 16px
      font-weight 700

</style>