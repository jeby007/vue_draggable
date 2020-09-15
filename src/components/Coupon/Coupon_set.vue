<template>
  <div class="setCoupon">
    <p class="title">优惠券</p>
    <span class="explain">拖动选中的，可对其排序</span>
    <div class="selectColor">
      <span class="label">领取按钮颜色</span>
      <el-color-picker v-model="coupon.btnBg" :predefine="predefineColors"></el-color-picker>
    </div>
    <div class="title_toggle">
      <span class="lable">展示方式</span>
      <el-radio v-model="coupon.autoUpdate" :label="true">自动更新</el-radio>
      <el-radio v-model="coupon.autoUpdate" :label="false">手动更新</el-radio>
    </div>
    <p class="explain">自动更新是指将最新4个未下架线上课堂更新到微官网中</p>
    <div class="couponSet">
      <draggable
        class="couponSetList"
        :options="{animation:300}"
        :list="coupon.data"
        v-if="!coupon.autoUpdate"
      >
        <div class="couponSetItem" v-for="(item,index) in coupon.data" :key="index">
          <p>选择优惠券</p>
          <el-select
            v-model="item.model"
            size="small"
            filterable
            @change="val=>selectChange(val,index)"
            remote
            clearable
            :remote-method="val=>remoteMethod(val,item)"
            @clear="clearHandle(item)"
            :loading="filterLoading"
            @focus="getItemFilterList"
          >
            <el-option
              v-for="option in itemFilterList"
              :key="option.id"
              :label="option.qtitle"
              :value="option.id"
            ></el-option>
          </el-select>
          <div class="close" @click="deleteItem(index)" v-if="!coupon.autoUpdate">
            <i class="iconfont icon-close"></i>
          </div>
        </div>
      </draggable>
      <div class="addItem" @click="addItem">
        +添加（最多添加5个）
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: "Coupon_set",
    data(){
      return {
        predefineColors:['#ff0000','#ff6f00','#ffd700','#8fe24f','#00dcf2','#0077ed','#9b6ee5','#03a9f4'],
        value:'',
        filterLoading:false,
        itemFilterList:[]
      }
    },
    methods:{
      getItemFilterList(){
        this.filterLoading = true
        this.$ajax('/Mp/OrgIndexCompoApi/couponList').then(res=>{
          this.itemFilterList = res.data.list
          this.filterLoading = false
        })
      },
      deleteItem(index){
        this.coupon.data.length <= 1 ? this.$message.warning('至少保留一张优惠券') : this.coupon.data.splice(index,1)
      },
      selectChange(val,index){
        this.$ajax('/Mp/OrgIndexCompoApi/couponList',{search_id:val}).then(res=>{
          this.$store.commit('SETCHECKEDITEM',{parentId:this.coupon.id,index,data:res.data.list[0]})
        })
      },
      addItem(){
        const empty = {model:null}
        this.coupon.data.length >= 5 ? this.$message.warning('最多添加5张优惠券') : this.coupon.data.push(empty)
      },
      remoteMethod(name,item){
        if (name !== ''){
          this.filterLoading = true
          this.$ajax('/Mp/OrgIndexCompoApi/couponList', {qtitle: name}).then(res=>{
            if (res.code === 200){
              this.filterLoading = res.data.list
            }
            this.filterLoading = false
          })
        }
      },
      clearHandle(item){
        item.filters = this.couponFilters
      }
    },
    computed:{
      ...mapState({
        coupon:state=>state.viewList.find(vo=>vo.type == 'coupon' && vo.selected),
        couponFilters:state=>state.viewList.find(vo=>vo.type == 'coupon' && vo.selected).filterList
      })
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../static/css/global.styl"
  .couponSet
    display flex
    background #f9f9f9
    padding 10px
    flex-direction column
  .title_toggle
    font-size 14px
    margin-top 18px
    color #333
    .lable
      margin-right 30px
      display inline-block
      width 70px
  .selectColor
      display flex
      align-items center
      font-size 14px
      background #fff
      width 100%
      height 60px
      >span
        margin-right 20px
      >>>.el-color-picker__trigger
        width 60px
  .addItem
    background #fff
    font-size 12px
    color $bgColor
    height 50px
  .couponSetList
    .couponSetItem
      margin-bottom 10px
      background #fff
      padding 10px
      font-size 14px
      position relative
      cursor: move;
      &>p
        margin 10px 0
      &>>>.el-select
        width 100%
        margin-bottom 10px
</style>