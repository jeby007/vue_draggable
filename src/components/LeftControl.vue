<template>
  <div class="leftModel_Wrap">
    <div style="margin-bottom: 10px">
      <p class="title">基础组件</p>
      <draggable
        :list="controlList"
        :group="{name:'control',pull:'clone',put:false}"
        class="cards"
        :options="options"
        :clone="cloneDog"
      >
        <div class="card item" v-for="item in controlList" :key="item.id">
          <i class="iconfont" :class="item.icon"></i>
          <p>{{item.name}}</p>
        </div>
      </draggable>
    </div>
    <div>
      <p class="title">功能组件</p>
      <draggable
        class="cards"
        :list="ribbon"
        :options="options"
        :group="{name:'control',pull:'clone',put:false}"
        :clone="cloneDog"
      >
        <div class="card item ribbon" v-for="vo in ribbon" :key="vo.id">
          <i class="iconfont" :class="vo.icon"></i>
          <p>{{vo.name}}</p>
        </div>
      </draggable>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "LeftControl",
    data() {
      return {
        name:null,
        options:{
          animation:300,
        }
      }
    },
    methods:{
      cloneDog(val){
        let timestamp = (new Date()).valueOf()
        const newVal = JSON.parse(JSON.stringify(val))
        newVal.id = timestamp
        return newVal
        // switch (val.type) {
        //   case 'nav':
        //     return {
        //       name: val.name,
        //       id: timestamp,
        //       icon: val.icon,
        //       selected: val.selected,
        //       type: val.type,
        //       data: JSON.parse(JSON.stringify(val.data)),
        //       showNum: val.showNum
        //     }
        //     break
        //   case 'contact':
        //     return {
        //       name: val.name,
        //       id: timestamp,
        //       icon: val.icon,
        //       selected: val.selected,
        //       type: val.type,
        //       showTitle:val.showTitle
        //     }
        //     break
        //   case 'course':
        //     return {
        //       name: val.name,
        //       id: timestamp,
        //       icon: val.icon,
        //       selected: val.selected,
        //       type: val.type,
        //       showTitle:val.showTitle,
        //       more:val.more,
        //       autoUpdate:val.autoUpdate
        //     }
        //     break
        //   default:
        //     return {
        //       name: val.name,
        //       id: timestamp,
        //       icon: val.icon,
        //       selected: val.selected,
        //       type: val.type,
        //       data: JSON.parse(JSON.stringify(val.data)),
        //     }
        // }

      }
    },
    computed:{
      ...mapState(['controlList','ribbon','viewList'])
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../static/css/global.styl'
  .leftModel_Wrap
    width 320px
    height calc(100%)
    background #fff
    padding 20px
    position absolute
    top 0
    left 0
    box-shadow 8px 0px 8px 0px rgba(0, 0, 0, 0.05)
    & .title
      color #333
      font-size 16px
      font-weight 600
  .cards
    display flex
    padding 20px 10px
    flex-wrap wrap
    .card
      width 80px
      height 65px
      display flex
      flex-direction column
      justify-content space-around
      align-items center
      cursor: move;
      //margin-bottom 20px
      &.ribbon
        margin-bottom 10px
      &:nth-child(3n + 2)
        margin 0 10px
      p
        font-size 12px
      .iconfont
        font-size 25px
        color #333
      &:hover
        background $bgColor
        color #fff
      &:hover .iconfont.icon-lunbotu
        color #fff

</style>