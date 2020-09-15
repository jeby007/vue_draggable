<template>
  <div class="setCourseWrap">
    <p class="title">活动报名</p>
    <span class="explain">拖动选中的，可对其排序</span>
    <a href="javascript:void(0)">创建活动</a>
    <div class="title_toggle">
      <span class="lable">标题栏</span>
      <el-radio v-model="activity.showTitle" :label="true">显示</el-radio>
      <el-radio v-model="activity.showTitle" :label="false">隐藏</el-radio>
    </div>
    <div class="title_toggle">
      <span class="lable">查看全部</span>
      <el-radio v-model="activity.more" :label="true">显示</el-radio>
      <el-radio v-model="activity.more" :label="false">隐藏</el-radio>
    </div>
    <div class="title_toggle" style="margin-bottom:0">
      <span class="lable">列表样式</span>
      <el-radio v-model="activity.showType" :label="0">列表</el-radio>
      <el-radio v-model="activity.showType" :label="1">小图</el-radio>
    </div>
    <div class="title_toggle">
      <span class="lable">展示方式</span>
      <el-radio v-model="activity.autoUpdate" :label="true">自动更新</el-radio>
      <el-radio v-model="activity.autoUpdate" :label="false">手动更新</el-radio>
    </div>
    <p class="explain">自动更新是指将最新的6个未关闭的活动更新到微官网中</p>
    <div class="listWrap" v-if="!activity.autoUpdate">
      <draggable
        class="manualCourses"
        :options="{animation:300}"
        :list="activity.data"
      >
        <div class="manualCourses_item" v-for="(item,index) in activity.data" :key="index">
          <p>选择活动</p>
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
              :label="option.name"
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
  import {mapState} from 'vuex'
  export default {
    name: "Activity_set",
    data(){
      return {
        filterLoading:false,
        itemFilterList:[],
      }
    },
    mounted() {
      //this.addItem()
    },
    methods:{
      getItemFilterList(){
        this.filterLoading = true
        this.$ajax('/Mp/OrgIndexCompoApi/activitySuList').then(res=>{
          this.itemFilterList = res.data.list
          this.filterLoading = false
        })
      },
      remoteMethod(name,item){
        if (name !== ''){
          this.filterLoading = true
          this.$ajax('/Mp/OrgIndexCompoApi/activitySuList', {name}).then(res=>{
            if (res.code === 200){
              this.itemFilterList = res.data.list
            }
            this.filterLoading = false
          })
        }
      },
      clearHandle(item){
        item.filterList = this.activityFilters
      },
      selectChange(val,index){
        this.$ajax('/Mp/OrgIndexCompoApi/activitySuList',{search_id:val}).then(res=>{
          this.$store.commit('SETCHECKEDITEM',{parentId:this.activity.id,index,data:res.data.list[0]})
        })
      },
      deleteItem(index){
        this.activity.data.length <= 1 ? this.$message.warning('手动更新最少保留1条活动') : this.activity.data.splice(index,1)
      },
      addItem(){
        const emptyItem = {model:null}
        this.activity.data.length >= 10 ? this.$message.warning('最多添加10条活动') : this.activity.data.push(emptyItem)
      }
    },
    computed:{
      ...mapState({
        activity:state=>state.viewList.find(vo=>vo.type == 'activity' && vo.selected),
        activityFilters:state=>state.viewList.find(vo=>vo.type == 'activity' && vo.selected).filterList
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
          cursor: move
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
          color $bgColor</style>