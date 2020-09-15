<template>
  <el-dialog
    :visible="visible"
    width="800px"
    @close="changeModelStatus"
    title="选择图片"
  >
    <div v-loading="loading">
      <div v-if="flag === 0">
        <p class="title">从素材中心选择图片</p>
        <!--action="http://192.168.20.19:81/Home/Notify/uploadImg?type=image"-->
        <el-upload
          class="uploadIcon"
          action="/Home/Notify/uploadImg?type=image"
          accept="image/*"
          name="imgFile"
          :show-file-list="false"
          :on-success="uploadSucc"
          :before-upload="beforeUpld"
        >
          <el-button size="small" type="primary">选择上传</el-button>
          <span style="margin-left: 10px;color: #999">上传建议：尺寸为1:1，png、jpg、bmp格式，不大于2M</span>
        </el-upload>
      </div>
      <p class="cardName">图标库中选择</p>
      <ul class="iconList" v-if="flag === 0">
        <li @click="selected(nvicon,i)" v-for="(nvicon,i) in navBarIcons">
          <img v-lazy="nvicon.icon_url" alt="icon" v-if="flag === 0" src=""/>
        </li>
      </ul>
      <ul class="iconList" v-else>
        <li @click="selected(icon)" v-for="(icon,index) in iconFonts">
          <i class="iconfont" :class="`${icon.icon}`"></i>
        </li>
      </ul>
    </div>
  </el-dialog>
</template>

<script>
  import Bus from '../utils/bus'
  import {mapState} from 'vuex'
  export default {
    name: "AddIconModel",
    props:{
      visible:Boolean,
      flag:{
        type:Number,
        default:0   //默认0，底部导航1
      },
    },
    data(){
      return {
        iconFonts:[
          {icon:'icon-home1',id:0},
          {icon:'icon-msg0',id:1},
          {icon:'icon-msg1',id:2},
          {icon:'icon-wode',id:3},
          {icon:'icon-minefill',id:4},
          {icon:'icon-compass',id:5},
          {icon:'icon-comment-question',id:6},
          {icon:'icon-flag',id:7},
          {icon:'icon-fire',id:8},
          {icon:'icon-task',id:9},
          {icon:'icon-book',id:10},
          {icon:'icon-checked',id:11},
          {icon:'icon-mine1',id:12},
          {icon:'icon-appstoreadd',id:13},
          {icon:'icon-bookmark',id:14},
          {icon:'icon-books',id:15},
          {icon:'icon-home2',id:16},
          {icon:'icon-book1',id:17},
          {icon:'icon-mine3',id:18},
          {icon:'icon-store2',id:19},
          {icon:'icon-bag',id:20},
        ],
        parentFlag:{},
        loading:false
      }
    },
    mounted() {
      this.$store.dispatch('getNavIcon')
      Bus.$on('getChangedIcon',this.getChangedIcon)
    },
    methods:{
      beforeUpld(){
        this.loading = true
      },
      uploadSucc(val){
        this.$store.commit('CHANGENAVICON',{parentId:this.parentFlag.parentId,selfId:this.parentFlag.selfId,url:val.url})
        this.loading = false
        this.$message.success('上传图片成功')
        this.changeModelStatus()
      },
      changeModelStatus(){
        this.$parent.changeIcon(false)
      },
      selected(icon){
        if (this.flag === 0){
          this.$store.commit('CHANGENAVICON',{parentId:this.parentFlag.parentId,selfId:this.parentFlag.selfId,url:icon.icon_url})
        }else {
          let newItemIcon = null
          let storeIcons = this.icons
          storeIcons.map(vo=>{
            if(vo.title == this.parentFlag.title){
              vo.icon = icon.icon
              newItemIcon = vo
            }
          })
          this.$store.commit('CHANGEFOOTERNAV',newItemIcon)
        }
        this.$parent.changeIcon(false)
      },
      getChangedIcon(arg){
        this.parentFlag = arg
      }
    },
    computed:{
      ...mapState({
        icons:state=>state.footerNav.data,
        navBarIcons:state=>state.navBarIcons
      })
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../static/css/global.styl";
  .uploadIcon
    margin-top 20px
  .cardName
    font-size 16px
    margin 20px 0
  .iconList
    display flex
    flex-wrap wrap
    li
      width 88px
      height 88px
      display flex
      align-items center
      justify-content center
      border 1px solid #eee
      margin 8px 8px 0 0
      &:hover
        border 1px solid $bgColor
      &:nth-child(8n+0)
        margin-right 0
      img
        width 45px
        height 45px
      .iconfont
        font-size 30px
        color #999
      &:hover>.iconfont
        color $bgColor

</style>