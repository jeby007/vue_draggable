<template>
  <div class="footerNavSet_Wrap">
    <p class="title" style="margin-bottom: 6px">底部导航</p>
    <span class="explain" style="line-height: 26px">不支持删除本空间，不能修改位置</span>
    <span class="explain">拖动选中的，可对其排序</span>
    <div class="setWrap">
      <div class="selectColor">
        <span>选中文字颜色</span>
        <el-color-picker v-model="footerNavs.checkedColor" :predefine="predefineColors"></el-color-picker>
      </div>
      <draggable
        class="setItems"
        :list="footerNavs.data"
        :options="options"
      >
        <div class="navItem" v-for="vo in footerNavs.data" v-if="vo.type != 'home' && vo.type != 'mine'">
          <div class="item_vo">
            <span class="item_vo-lable">标题</span><el-input size="small" show-word-limit maxlength="3" v-model="vo.title"></el-input>
          </div>
          <div class="item_vo">
            <span class="item_vo-lable">跳转</span><span class="link" @click="selectLink(true,vo.id)">{{vo.name ? vo.name : '选择跳转链接'}}</span>
          </div>
          <div class="item_vo vertical">
            <span class="item_vo-lable" style="font-size: 16px">默认图标</span>
            <div class="changeIcon">
              <i class="iconfont" :class="vo.icon"></i>
              <span @click="changeIcon(true,vo)">修改</span>
            </div>
          </div>
          <div class="close" @click="removeItem(vo.id)">
            <i class="iconfont icon-close"></i>
          </div>
        </div>
        <div class="addItem" @click="addItem">
          <p>+ 添加（最多添加3个）</p>
          <span>首页和个人中心不支持修改</span>
        </div>
      </draggable>
    </div>
    <LinksModel :visible="isShowLinkModel" />
    <AddIconModel :visible="isShowAddIconModel" :flag="1"/>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import LinksModel from "../LinksModel";
  import AddIconModel from "../AddIconModel";
  import Bus from '../../utils/bus'
  export default {
    name: "FooterNav_set",
    data(){
      return {
        predefineColors:['#ff0000','#ff6f00','#ffd700','#8fe24f','#00dcf2','#0077ed','#9b6ee5','#03a9f4'],
        options:{
          animation:300,
        },
        isShowLinkModel:false,
        isShowAddIconModel:false,
        title:''
      }
    },
    mounted() {
      Bus.$on('getFooterNavJumpLink',this.setJumpLink)
    },
    methods:{
      addItem(){
        const arr = [
          {title: '课表',icon:'icon-schedule',checked:false,jumpLink: '',id:3,name:'',type:'schedule'},
          {title: '商城',icon:'icon-store',checked:false,jumpLink: '',id:4,name:'',type:'store'},
          {title: '微课',icon:'icon-course',checked:false,jumpLink: '',id:5,name:'',type:'course'},
        ]
        if (this.footerNavs.data.length > 4){
          this.$message.warning('最多添加3个底部导航')
        }else {
          if (!this.footerNavs.data.find(vo => vo.id === 3)){
            this.footerNavs.data.splice(this.footerNavs.data.length - 1,0,arr[0])
          }else if (!this.footerNavs.data.find(vo => vo.id === 4)){
            this.footerNavs.data.splice(this.footerNavs.data.length - 1,0,arr[1])
          }else{
            this.footerNavs.data.splice(this.footerNavs.data.length - 1,0,arr[2])
          }
        }
      },
      removeItem(id){
        this.footerNavs.data.length <= 2 ? this.$message.warning('至少有2个底部导航') : this.footerNavs.data = this.footerNavs.data.filter(vo => vo.id !== id);
      },
      selectLink(status,id){
        if (status){
          const arg = {flag:'footernav',id}
          Bus.$emit('getPsrentId',arg)
        }
        this.isShowLinkModel = status
      },
      changeIcon(status,current){
        Bus.$emit('getChangedIcon',current)
        this.isShowAddIconModel = status
      },
      setJumpLink(arg){
        this.footerNavs.data.forEach(vo=>{
          if (vo.id === arg.id){
            vo.jumpLink = arg.link
            vo.name = arg.name
          }
        })
      }
    },
    computed:{
      ...mapState({
        footerNavs:state=>state.footerNav
      })
    },
    components: {AddIconModel, LinksModel},
  }
</script>

<style lang="stylus" scoped>
  @import "../../static/css/global.styl"
.footerNavSet_Wrap
  display flex
  flex-direction column
  width 100%
  .explain
    line-height 12px
  .setWrap
    margin-top 10px
    background #f5f5f5
    padding 10px
    .selectColor
      display flex
      align-items center
      font-size 14px
      margin-bottom 10px
      >span
        margin-right 20px
      >>>.el-color-picker__trigger
        width 60px
    .setItems
      .addItem
        background #fff
      .navItem
        background #fff
        cursor: move;
        padding 10px
        margin-bottom 10px
        position relative
        .item_vo
          display flex
          align-items center
          margin-bottom 10px
          &.vertical
            flex-direction column
            align-items flex-start
            margin-top 20px
          .item_vo-lable
            margin-right 20px
            font-size 14px
          >>>.el-input
            width 220px
          .link
            font-size 14px
            color $bgColor
            cursor: pointer;
          .changeIcon
            display flex
            align-items center
            justify-content center
            margin-top 10px
            font-size 14px
            .iconfont
              font-size 24px
              border 1px solid #f0f0f0
              padding 2px
              color #999
              margin-right 10px
            span
              color $bgColor
              cursor: pointer;

</style>