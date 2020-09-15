<template>
  <div class="setNavWrap">
    <p class="title">栏目导航</p>
    <span class="explain">拖动选中的，可对其排序</span>
    <span class="name">一行显示</span>
    <div class="radios">
      <el-radio :label="3" v-model="navBars.showNum">三个</el-radio>
      <el-radio :label="4" v-model="navBars.showNum">四个</el-radio>
      <el-radio :label="5" v-model="navBars.showNum">五个</el-radio>
    </div>
    <span class="name">添加内容</span>
    <div class="addList">
      <draggable
        :list="navBars.data"
        element="ul"
        class="items"
        :options="options"
      >
        <li class="swpItem" v-for="(vo,i) in navBars.data">
          <i class="close iconfont icon-close" @click="removeItem(vo.id)"></i>
          <div class="leftImg" @click="selectIcon(vo)">
            <img :src="vo.image" alt="" v-if="vo.image">
            <div class="btn" v-else>
              <span>+</span>
              <span>{{vo.image ? '修改图片' : '添加图片'}}</span>
            </div>
          </div>
          <div class="rightInfo">
            <div class="rightInfo_item">
              <span>标题</span>
              <el-input size="small" placeholder="(选填)不超过4字" :maxlength="4" v-model="vo.title" show-word-limit></el-input>
            </div>
            <div class="rightInfo_item">
              <span>跳转</span>
              <span class="link" @click="selectLink(true,vo.id)">{{vo.name ? vo.name : '选择跳转到的页面'}}</span>
            </div>
          </div>
        </li>
      </draggable>
      <div class="addItem" @click="addItem">
        <p>+ 添加图片导航</p>
        <span>上传建议：尺寸为1:1,png、jpg、bmp、gif格式，不大于2M</span>
      </div>
    </div>
    <AddIconModel :visible="isShowIconModel" />
    <LinksModel :visible="isShowLinksModel" />
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import AddIconModel from "../AddIconModel";
  import LinksModel from "../LinksModel";
  import Bus from '@/utils/bus.js'
  export default {
    name: "NavBar_set",
    data(){
      return {
        options:{
          animation:300,
        },
        title:'',
        dropMenu:[
          {lable:'微页面',id:0},
          {lable:'知识商品',id:0},
          {lable:'商品分组',id:0},
          {lable:'我的消息',id:0},
          {lable:'我的已购',id:0},
          {lable:'店铺主页',id:0},
          {lable:'店铺主页',id:0}
        ],
        isShowIconModel:false,
        isShowLinksModel:false
      }
    },
    mounted() {
      Bus.$on('setNavJumpLink',this.setNavJumpLink)
    },
    methods:{
      addItem(){
        const emptyItem = {id:this.navBars.data.length,image:'',jumpLink:'',name:'',title:'新增导航'}
        this.navBars.data.length < 10 ? this.$store.commit('ADDSWPLIST',{emptyItem,id:this.navBars.id}) : this.$message.warning('最多添加10个图片导航')
      },
      removeItem(id){
        this.navBars.data.length <= 1 ? this.$message.warning('至少有三个图片导航') : this.$store.commit('REMOVEITEM',{selfId:id,parentId:this.navBars.id})
      },
      selectIcon(item){
        Bus.$emit('getChangedIcon',{parentId:this.navBars.id,selfId:item.id})
        this.changeIcon(true)
      },
      changeIcon(status){
        this.isShowIconModel = status
      },
      selectLink(status,id){
        const arg = {flag:'nav',id}
        Bus.$emit('getPsrentId',arg)
        this.isShowLinksModel = status
      },
      setNavJumpLink(arg){
        this.$store.commit('SETJUMPLINK',{parentId:this.navBars.id,selfId:arg.id,link:arg.link,name:arg.name})
      }
    },
    watch:{
      radio(){
        this.$store.commit('CHANGENAVNUM',{parentId:this.navBars.id,showNum:this.radio})
      }
    },
    computed:{
      ...mapState({
        navBars:state=>state.viewList.find(vo=>vo.type == 'nav' && vo.selected)
      })
    },
    components:{LinksModel, AddIconModel}
  }
</script>

<style lang="stylus" scoped>
  @import "../../static/css/global.styl"
  .setNavWrap
    width 100%
    display flex
    flex-direction column
    padding-top 30px
    .name
      font-size 14px
      color #aca9a9
    .radios
      display flex
      justify-content space-between
      align-items center
      padding  20px 20px
      border-bottom 1px solid #f0f0f0
      margin-bottom 20px
    .addList
      margin-top 20px
      background #f5f5f5
      padding 10px 10px
      .addItem
        background #fff
      .items
        width 100%
        li
          background #fff
          margin-bottom 10px
          cursor: move;
  .leftImg
    border 1px solid #f0f0f0
    display flex
    flex-direction column
    align-items center
    justify-content center
    color $bgColor
    font-size 14px
    cursor: pointer;
    img
      width 50px !important
      height 50px !important
    .btn
      position absolute
      top: 0
      left: 0
      width 100%
      height 100%
      display flex
      flex-direction column
      justify-content center
      align-items center
      span:first-child
        font-size 26px
        margin-bottom 6px
  .rightInfo
    & .rightInfo_item
      position relative
      span
        margin-right 16px
      & .link
        font-size 14px
        color $bgColor
        cursor: pointer;
</style>