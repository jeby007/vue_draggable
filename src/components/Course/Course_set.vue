<template>
  <div class="setCourseWrap">
    <p class="title">课程介绍</p>
    <span class="explain">拖动选中的，可对其排序</span>
    <a href="javascript:void(0)">编辑课程</a>
    <div class="title_toggle">
      <span class="lable">标题栏</span>
      <el-radio v-model="course.showTitle" :label="true">显示</el-radio>
      <el-radio v-model="course.showTitle" :label="false">隐藏</el-radio>
    </div>
    <div class="title_toggle">
      <span class="lable">查看全部</span>
      <el-radio v-model="course.more" :label="true">显示</el-radio>
      <el-radio v-model="course.more" :label="false">隐藏</el-radio>
    </div>
    <div class="title_toggle" style="margin-bottom:0">
      <span class="lable">列表样式</span>
      <el-radio v-model="course.showType" :label="0">列表</el-radio>
      <el-radio v-model="course.showType" :label="1">小图</el-radio>
    </div>
    <div class="title_toggle">
      <span class="lable">展示方式</span>
      <el-radio v-model="course.autoUpdate" :label="true">自动更新</el-radio>
      <el-radio v-model="course.autoUpdate" :label="false">手动更新</el-radio>
    </div>
    <p class="explain">自动更新是指将最新6个线上课堂更新到微官网中</p>
    <div class="listWrap" v-if="!course.autoUpdate">
      <draggable
        class="manualCourses"
        :options="options"
        :list="course.data"
      >
        <div class="manualCourses_item" v-for="(item,index) in course.data" :key="index">
          <p>选择课程介绍</p>
          <el-select
            v-model="item.model"
            size="small"
            filterable
            remote
            clearable
            :remote-method="val=>remoteMethod(val,item)"
            @clear="clearHandle(item)"
            @change="val=>selectChange(val,index)"
            :loading="filterLoading"
            @focus="getItemFilterList"
          >
            <el-option
              v-for="option in itemFilterList"
              :key="option.id"
              :label="option.title"
              :value="option.id"
            ></el-option>
          </el-select>
          <div class="close" @click="deleteItem(index)">
            <i class="iconfont icon-close"></i>
          </div>
        </div>
      </draggable>
      <div class="addItem" @click="addItem"><span>+添加（最多添加10个）</span></div>
    </div>
  </div>
</template>

<script>
  import {mapState} from "vuex";

  export default {
    name: "Course_set",
    data(){
      return {
        showTitle:true,
        options: {animation:300},
        value:'',
        tabCount:0,
        filterLoading:false,
        itemFilterList:[]
      }
    },
    methods:{
      getItemFilterList(){
        this.filterLoading = true
        this.$ajax('/Mp/OrgIndexCompoApi/courseList').then(res=>{
          this.itemFilterList = res.data.list
          this.filterLoading = false
        })
      },
      remoteMethod(name,item){
        if (name !== ''){
          this.filterLoading = true
          this.$ajax('/Mp/OrgIndexCompoApi/courseList', {name}).then(res=>{
            if (res.code === 200){
              this.itemFilterList = res.data.list
            }
            this.filterLoading = false
          })
        }
      },
      clearHandle(item){
        item.filterList = this.filterList
      },
      selectChange(val,index){
        this.$ajax('/Mp/OrgIndexCompoApi/courseList',{search_id:val}).then(res=>{
          this.$store.commit('SETCHECKEDITEM',{parentId:this.course.id,index,data:res.data.list[0]})
        })

      },
      addItem(){
        const emptyItem = {model:null}
        this.course.data.length >= 10 ? this.$message.warning('最多添加10条活动') : this.course.data.push(emptyItem)
      },
      deleteItem(index){
        this.course.data.length <= 1 ? this.$message.warning('手动更新最少保留1条活动') : this.course.data.splice(index,1)
      }
    },
    computed:{
      ...mapState({
        course:state=>state.viewList.find(vo=>vo.type == 'course' && vo.selected),
        filterList:state=>state.viewList.find(vo=>vo.type == 'course' && vo.selected).filterList
      })
    }

  }
</script>

<style lang="stylus" scoped>
  @import "../../static/css/global.styl"
.setCourseWrap
  width 100%
  display flex
  flex-direction column
  padding-top 30px
  &>a
    font-size 14px
  .title_toggle
    font-size 14px
    margin-top 18px
    color #333
    .lable
      margin-right 30px
      display inline-block
      width 70px
  .listWrap
    background #f9f9f9
    padding 15px 10px
    .manualCourses
      .manualCourses_item
        width 100%
        background #fff
        padding 15px
        position relative
        margin-bottom 10px
        cursor: move;
        >p
          font-size 14px
          margin-bottom 10px
          color #333
        &>>>.el-select
          width 100%
    .addItem
      margin-bottom 0
      background #fff
      >span
        color $bgColor
</style>