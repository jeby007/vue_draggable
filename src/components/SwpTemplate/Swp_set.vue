<template>
  <div class="setSwpWrap">
    <p class="title">轮播图</p>
    <span class="explain">拖动选中的，可对其排序</span>
    <a href="https://www.chuangkit.com/tupian/kechengxuanchuan-pi1-si438-or0-pt0-pn1-rd72.html" target="_blank">
      <span>在线图库</span>
    </a>
    <div class="swpWrap">
      <draggable
        class="swpList"
        element="ul"
        :list="swpList.data"
        :options="options"
      >
        <li class="swpItem" v-for="(swp,i) in swpList && swpList.data">
          <i class="close iconfont icon-close" @click="removeSwp(swp.id)"></i>
          <div class="leftImg">
            <!-- action="http://devhome.weizaojiao.cn/Home/Notify/uploadImg?type=image" -->
            <!--action="/Home/Notify/uploadImg?type=image"-->
            <el-upload
              action="/Home/Notify/uploadImg?type=image"
              :multiple="false"
              :nam="`swp${i}`"
              accept="image/*"
              name="imgFile"
              :show-file-list="false"
              :on-success="value=> uploadSucc(swp,value)"
              :data="{index:swp.id}"
            >
              <img :src="swp.image">
              <div class="changeImg">
                <span>{{swp.image ? '修 改' : '添 加'}}</span>
               <!-- <div class="proress" :style="{width:swp.percent}"></div>-->
              </div>
            </el-upload>
          </div>
          <div class="rightInfo">
            <div class="rightInfo_item">
              <span>标题</span>
              <el-input size="small" placeholder="(选填)不超过10字" :maxlength="10" v-model="swp.title" show-word-limit></el-input>
            </div>
            <div class="rightInfo_item">
              <span>跳转</span>
              <a href="javascript:void(0)" @click="selectLink(true,swp.id)">{{swp.name ? swp.name :'选择跳转链接'}}</a>
            </div>
          </div>
        </li>
      </draggable>
      <div class="addItem" @click="addSwp">
        <p>+ 添加（最多添加10个）</p>
        <span>图片建议尺寸840*480像素</span>
      </div>
      <LinksModel :visible="isShowLinkModel" />
    </div>
  </div>
</template>

<script>
  import LinksModel from "../LinksModel";
  import Bus from '@/utils/bus'
  import {mapState} from 'vuex'
  export default {
    name: "Set_item",
    data(){
      return {
        title:'',
        isShowLinkModel:false,
        options:{animation:300}
      }
    },
    mounted() {
      Bus.$on('setJumpLink',this.setJumpLink)
    },
    methods:{
      //设置swp跳转路径
      setJumpLink(arg){
        this.$store.commit('SETJUMPLINK',{parentId:this.swpList.id,selfId:arg.id,link:arg.link,name:arg.name})
      },
      selectLink(status,id){
        let arg = {flag:'swp',id}
        Bus.$emit('getPsrentId',arg)
        this.isShowLinkModel = status
      },
      addSwp(){
        const emptyItem = {image:require('../../static/images/defalutSwp.png'),title:'',jumpLink:'',id:this.swpList.data.length,name:''}
        this.swpList.data.length < 10 ? this.$store.commit('ADDSWPLIST',{emptyItem,id:this.swpList.id}) : this.$message.warning('最多添加10张轮播图')
      },
      removeSwp(id){
        this.$store.commit('REMOVEITEM', {selfId:id,parentId:this.swpList.id})
      },
      uploadSucc(item,val){
        const url = val.url
        this.$store.commit('SETSWPIMAGE', {parentId:this.swpList.id,selfId:item.id,url})
      }
    },
    components:{LinksModel},
    computed:{
      ...mapState({
        swpList : state=>state.viewList.find(item=>item.type == 'swp' && item.selected)
      })
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../static/css/global.styl"
  .setSwpWrap
    width 100%
    display flex
    flex-direction column
    padding-top 30px
    a
      font-size 14px
      max-width 195px
    .swpWrap
      margin-top 20px
      padding 0 10px
      background #f9f9f9
      .addItem
        cursor: pointer;
        background #fff
        margin-bottom 20px
      .swpList
        width 100%
        display flex
        padding-top 20px
        flex-direction column
        li
          background #fff
          width 100%
          margin-bottom 10px
          cursor: move;
        .swpItem
          display flex
          align-items center
          height 100px
          padding 0 12px
          justify-content space-between
          position relative
          .close
            /*width 20px*/
            /*height 20px*/
            color #bfbfbf
            position absolute
            font-size 26px
            top -8px
            right -8px
          .leftImg
            width 78px
            height 78px
            position relative
            img
              width 100%
              height auto
            .changeImg
              width 90px
              height 20px
              background rgba(0,0,0,.3)
              position absolute
              left -6px
              bottom -4px
              display flex
              align-items center
              justify-content center
              font-size 14px
              color #fff
              cursor: pointer;
              .proress
                position absolute
                width 0
                height 2px
                background yellowgreen
                left 0
                bottom 0
          .rightInfo
            .rightInfo_item
              display flex
              align-items center
              font-size 16px
              color #333
              span
                margin-right 12px
                font-size 14px
              &:first-child
                margin-bottom 14px
              & >>> .el-input
                width 196px


</style>