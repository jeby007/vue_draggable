<template>
  <div>
    <ul class="sideBtnWrap" slot="sideBtn">
      <li v-if="changedIndex !== 0">
        <i class="iconfont icon-up" @click.stop="move('up')"></i>
      </li>
      <li v-if="changedIndex !== viewList.length - 1">
        <i class="iconfont icon-down" @click.stop="move('down')"></i>
      </li>
      <li>
      <el-popconfirm
        title="确定要删除该项目？"
        @onConfirm="deleteItem"
      >
        <i class="iconfont icon-close1" slot="reference" @click.stop></i>
      </el-popconfirm>
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: "SideBtn",
    props:['item'],
    data(){
      return {
        changedIndex:null
      }
    },
    mounted() {
      this.$nextTick(()=>{
        this.changedIndex = this.viewList.findIndex(vo => vo.id === this.item.id)
      })
    },
    methods:{
      deleteItem(){
        this.$store.commit('DELETEMIDITEM', {id:this.item.id})
      },
      move(moveStatus) {
        const curItemId = this.item.id
        let curIndex = this.viewList.findIndex(vo => vo.id === curItemId)
        moveStatus == 'up' ? this.zIndexUp(this.viewList,curIndex,this.viewList.length) : this.zIndexDown(this.viewList,curIndex,this.viewList.length)
        this.changedIndex = this.viewList.findIndex(vo => vo.id === curItemId)
      },
      zIndexDown(arr,index,length){
        if(index+1 != length){
          this.swapArray(arr, index, index+1);
        }
      },
      zIndexUp(arr,index){
        if(index!= 0){
          this.swapArray(arr, index, index-1);
        }
      },
      swapArray(arr, index1, index2) {
        arr[index1] = arr.splice(index2, 1, arr[index1])[0];
        arr.forEach(vo=>{
          vo.id === this.item.id ? vo.selected = true : vo.selected = false
        })
      }
    },
    computed:{
      ...mapState(['viewList'])
    }
  }
</script>

<style lang="stylus" scoped>
  .sideBtnWrap
    position absolute
    top 0
    right -40px
    width 35px
    display flex
    flex-direction column
    justify-content center
    align-items center
    background #fff
    box-shadow 0px 0px 5px #D1D1D1

    li
      width 100%
      height 35px
      display flex
      align-items center
      justify-content center

      &:nth-child(2)
        border-top 1px solid #f0f0f0
        border-bottom 1px solid #f0f0f0

    & .iconfont
      color #333
      font-size 22px
      cursor: pointer;
</style>