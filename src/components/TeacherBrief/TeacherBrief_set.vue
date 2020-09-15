<template>
  <div class="setCourseWrap">
    <p class="title">师资介绍</p>
    <span class="explain">拖动选中的，可对其排序</span>
    <a href="javascript:void(0)">编辑师资介绍</a>
    <div class="title_toggle">
      <span class="lable">标题栏</span>
      <el-radio v-model="teachers.showTitle" :label="true">显示</el-radio>
      <el-radio v-model="teachers.showTitle" :label="false">隐藏</el-radio>
    </div>
    <div class="title_toggle">
      <span class="lable">查看全部</span>
      <el-radio v-model="teachers.more" :label="true">显示</el-radio>
      <el-radio v-model="teachers.more" :label="false">隐藏</el-radio>
    </div>
    <div class="title_toggle">
      <span class="lable">展示方式</span>
      <el-radio v-model="teachers.autoUpdate" :label="true">自动更新</el-radio>
      <el-radio v-model="teachers.autoUpdate" :label="false">手动更新</el-radio>
    </div>
    <p class="explain">自动更新是指全部未下架的师资介绍更新到微官网中</p>
    <div class="listWrap" v-if="!teachers.autoUpdate">
      <draggable
        class="manualCourses"
        :options="{animation:300}"
        :list="teachers.data"
      >
        <div class="manualCourses_item" v-for="(item,index) in teachers.data">
          <p>选择老师</p>
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
              v-for="(vo,i) in itemFilterList"
              :key="vo.id"
              :label="vo.full_name"
              :value="vo.id"
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
  import {mapState} from 'vuex'
  export default {
    name: "TeacherBrief_set",
    data(){
      return {
        filterLoading:false,
        itemFilterList:[]
      }
    },
    methods:{
      getItemFilterList(){
        this.filterLoading = true
        this.$ajax('/Mp/OrgIndexCompoApi/teachList').then(res=>{
          this.itemFilterList = res.data.list
          this.filterLoading = false
        })
      },
      remoteMethod(name,item){
        if (name !== ''){
          this.filterLoading = true
          this.$ajax('/Mp/OrgIndexCompoApi/teachList', {full_name:name}).then(res=>{
            if (res.code === 200){
              this.itemFilterList = res.data.list
            }
            this.filterLoading = false
          })
        }
      },
      clearHandle(item){
        item.filterList = this.tcFilterList
      },
      selectChange(id,index){
        this.$ajax('/Mp/OrgIndexCompoApi/teachList',{search_id:id}).then(res=>{
          this.$store.commit('SETCHECKEDITEM',{parentId:this.teachers.id,index,data:res.data.list[0]})
        })
      },
      deleteItem(index){
        this.teachers.data.length <= 1 ? this.$message.warning('至少保留一条师资') : this.teachers.data.splice(index,1)
      },
      addItem(){
        const emptyItem = {model:null}
        this.teachers.data.length >= 10 ? this.$message.warning('最多添加十条师资') : this.$store.commit('ADDTEACHER',{id:this.teachers.id,emptyItem})
      }
    },
    computed:{
      ...mapState({
        teachers:state=>state.viewList.find(vo=>vo.type == 'teacher' && vo.selected),
        tcFilterList:state=>state.viewList.find(vo=>vo.type == 'teacher' && vo.selected).filterList
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