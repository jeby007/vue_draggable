<template>
  <el-dialog
    width="70%"
    :visible="visible"
    @close="close"
    custom-class="linksDialog"
    v-loading="globalLoading"
  >
    <div v-loading="isLoading" class="linksContent">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="nav.tab_name" :name="nav.action" v-for="(nav,i) in links.data" :key="i" />
      </el-tabs>
      <div>
        <ul class="links" v-if="activeName != 'diy_link'">
          <li :class="{active:index == selectedLinkIndex}"
              v-for="(link,index) in links.commonLinks"
              @click="selectLink(link,index)"
              v-if="activeIndex === 0"
          >
            <span>{{link.name}}</span>
            <i class="iconfont icon-duihaobeifen" v-show="index == selectedLinkIndex"></i>
          </li>
          <li :class="{active:index == selectedLinkIndex}"
              v-for="(link,index) in currenLinks.list"
              @click="selectLink(link,index)"
              v-if="activeIndex !== 0"
          >
            <span>{{link.title || link.name || link.full_name}}</span>
            <i class="iconfont icon-duihaobeifen" v-show="index == selectedLinkIndex"></i>
          </li>
          <li v-if="currenLinks.length === 0 && activeName != 'commonly_used' && activeName != 'diy_link'" class="noData">暂无数据</li>
        </ul>
        <el-pagination
          :small="true"
          :total="currenLinks.total"
          :hide-on-single-page="true"
          @current-change="switchPage"
          v-if="activeName != 'commonly_used' && activeName != 'diy_link'"
        ></el-pagination>
        <div class="customLink" v-if="activeName == 'diy_link'">
          <el-input
            placeholder="请输入自定义网址"
            v-model.lazy.trim="customLink"
            @keyup.native="customLinkRule"
          ></el-input>
          <p class="rule">{{rule}}</p>
        </div>
      </div>
    </div>
    <div slot="footer" v-show="!isLoading">
      <el-button type="info" @click="close">取消</el-button>
      <el-button type="primary" @click="confirm">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {mapState} from 'vuex'
  import Bus from '@/utils/bus'
  export default {
    name: "LinksModel",
    props: ['visible'],
    data() {
      return {
        activeName: 'commonly_used',
        activeIndex:0,
        selectedLinkIndex:null,
        customLink:'',
        selectedName:'',
        selectedLink:'',
        currenLinks:[],
        isLoading:true,
        parentFlag:null,
        rule:''
      }
    },
    mounted() {
      this.$store.dispatch('getLinks')
      Bus.$on('getPsrentId',arg=>this.parentFlag = arg)
      this.$nextTick(()=>{
        this.isLoading = false
      })
    },
    methods: {
      customLinkRule(){
        if (!/^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i.test(this.customLink) && this.customLink){
           this.rule = '网址格式不正确'
        } else {
          this.rule = ''
        }
      },
      switchPage(page){
        this.isLoading = true
        this.$ajax(`/Mp/OrgIndexCompoApi/${this.activeName}/&page=${page}`).then(async (res)=>{
          Array.isArray(res.data.result) ? this.currenLinks = [] : this.currenLinks = await res.data
          this.isLoading = false
        })
      },
      selectLink(link,index){
        this.selectedLinkIndex = index
        this.selectedLink = link.generate_url
        this.selectedName = link.name || link.full_name || link.title
      },
      close() {
        this.$parent.selectLink(false)
      },
      confirm(){
        let link = this.customLink ?  this.customLink : this.selectedLink
        let name = this.customLink ? '自定义' : this.selectedName
        if (!link){
          this.$alert(this.activeName == 'diy_link' ? '抱歉，请填写网址' : '抱歉，请选择网址','提示')
        }else {
          if (this.parentFlag && this.parentFlag.flag == 'swp'){
            let arg = {id:this.parentFlag.id,link,name}
            Bus.$emit('setJumpLink',arg)
          }else if (this.parentFlag && this.parentFlag.flag == 'nav') {
            let arg = {id:this.parentFlag.id,link,name}
            Bus.$emit('setNavJumpLink',arg)
          } else if (this.parentFlag && this.parentFlag.flag == 'footernav'){
            let arg = {id:this.parentFlag.id,link,name}
            Bus.$emit('getFooterNavJumpLink',arg)
          }
          this.close()
          this.resetTab()
        }
      },
      resetTab(){
        this.handleClick({index:0})
        this.activeIndex = 0
        this.activeName = 'commonly_used'
        this.selectedLink = ''
        this.selectedLinkIndex = null
        this.selectedName = ''
      },
      handleClick(val) {
        this.customLink = ''
        this.selectedLinkIndex = null
        this.activeIndex = val.index * 1
        if (this.activeIndex != 0 && val.label != '自定义'){
          this.isLoading = true
          this.$ajax(`/Mp/OrgIndexCompoApi/${this.activeName}`).then(async (res)=>{
            Array.isArray(res.data) ? this.currenLinks = [] : this.currenLinks = await res.data
            this.isLoading = false
          }).catch(err=>{
            this.$message.error(err)
          })
        }
      }
    },
    computed:{
      ...mapState({
        links : state=>state.linksForModel,
        globalLoading : state => state.globalLoading
      })
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../static/css/global.styl"
  .links
    max-height 50vh
    overflow-y auto
    li
      height 40px
      border-bottom 1px solid #f0f0f0
      display flex
      align-items center
      justify-content space-between
      cursor: pointer;
      padding 0 20px
    .active
      color $bgColor
      .iconfont
        font-size 20px
  .el-dialog__footer
    div
      display flex
      align-items center
      justify-content center

      .el-button
        width 100px
        height 36px
  .linksContent
    &>>>.el-pagination
      display flex
      align-items center
      justify-content center
  .rule
    color red
    font-size 12px
    margin-top 4px
</style>