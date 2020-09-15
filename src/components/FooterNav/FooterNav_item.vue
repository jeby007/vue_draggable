<template>
  <ul class="navList" @click="selected" :class="{active:footerNav.selected}">
        <!--@click.prevent="tabChange(i,nav)"-->
    <li v-for="(nav,i) in footerNav.data"
        class="nav_item"
        :style="[{color:i == checkedFlag ? footerNav.checkedColor : defaultColor},{width:100/footerNav.data.length + '%'}]"
        @click="tabChange(i,nav)"
    >
      <i class="iconfont" :class="nav.icon"></i>
      <span class="nav_name">{{nav.title}}</span>
    </li>
  </ul>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: "FooterNav_item",
    data(){
      return {
        checkedFlag:0,
        defaultColor:'#999',
      }
    },
    methods:{
      selected(){
        this.viewList.forEach(vo=>vo.selected = false)
        this.footerNav.selected = true

      },
      tabChange(index,item){
        //let navs = this.footerNav.data
        this.checkedFlag = index
        // navs.forEach((vo,i)=>{
        //   vo.checked = false
        //   vo.title == item.title ? vo.checked = !vo.checked : ''
        // })
      }
    },
    watch:{
      checkedColor(){
        this.$forceUpdate()
      }
    },
    computed:{
      ...mapState({
        footerNav:state => state.footerNav,
        viewList:state=>state.viewList,
      }),
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../static/css/global.styl"
  .navList
    width 100%
    height 56px
    display flex
    box-shadow $shadow
    background #fff
    margin-bottom 20px
    border-top 1px solid rgba(0,0,0,.1)
    .nav_item
      width 20%
      height 100%
      display flex
      flex-direction column
      align-items center
      justify-content center
      cursor: pointer;
      color #999
      .iconfont
        font-size 24px
        margin-bottom 4px
      &.active
        color $bgColor
      .nav_name
        font-size 12px

</style>