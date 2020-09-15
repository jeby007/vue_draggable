export default {
  //保存数据
  SAVEDATA(state, payload) {
    state.viewList = payload.data.view_list || []
    state.footerNav = payload.data.footer_nav || this.state.footerNav
    state.Ribbon = payload.data.ribbon || this.state.Ribbon
    state.previewLink = payload.data.url || ''
    state.orgName = payload.data.org_name
  },
  //修改footernav Icon
  CHANGEFOOTERNAV(state, data) {
    let origin = state.footerNav.data
    origin.forEach((vo) => {
      vo.title == data.title ? vo.icon = data.icon : ''
    })
  },
  //获取链接弹窗数据
  GETLINKSMODEL(state, data) {
    state.linksForModel.data = data
    state.linksForModel.commonLinks = data[0].tab_list
  },
  //设置全局loading状态
  CHANGELOADING(state, bool) {
    state.globalLoading = bool
  },
  //添加swp 模板
  ADDSWPLIST(state, payload) {
    let changedViewList = JSON.parse(JSON.stringify(state.viewList))
    changedViewList.forEach(vo => {
      vo.id === payload.id ? vo.data.push(payload.emptyItem) : ''
    })
    state.viewList = changedViewList
  },
  //设置swp image
  SETSWPIMAGE(state, payload) {
    let changedViewList = JSON.parse(JSON.stringify(state.viewList))
    changedViewList.forEach(vo => {
      if (vo.id === payload.parentId) {
        vo.data.forEach(item => {
          item.id === payload.selfId ? item.image = payload.url : ''
        })
      }
    })
    state.viewList = changedViewList
  },
  //删除Swp item
  REMOVEITEM(state, payload) {
    let changedViewList = JSON.parse(JSON.stringify(state.viewList))
    changedViewList.forEach(vo => {
      if (vo.id === payload.parentId) {
        vo.data = vo.data.filter(item => item.id !== payload.selfId);
      }
    })
    state.viewList = changedViewList
  },
  REMOVEFOOTERNAVITEM(state, payload) {
    let changedViewList = JSON.parse(JSON.stringify(state.footerNav))
    changedViewList.data = changedViewList.data.filter(vo => vo.id !== payload.id);
    state.footerNav = changedViewList
  },
  //设置swp 图片点击链接
  SETJUMPLINK(state, payload) {
    let changedViewList = JSON.parse(JSON.stringify(state.viewList))
    changedViewList.forEach(vo => {
      if (vo.id === payload.parentId) {
        vo.data.forEach(item => {
          item.id === payload.selfId ? item.jumpLink = payload.link : ''
          item.id === payload.selfId ? item.name = payload.name : ''
        })
      }
    })
    state.viewList = changedViewList
  },
  //删除viewList项
  DELETEMIDITEM(state, payload) {
    let changedViewList = JSON.parse(JSON.stringify(state.viewList))
    changedViewList = changedViewList.filter(item => item.id !== payload.id)
    state.viewList = changedViewList
  },
  //获取navbar icon
  GETNAVICONS(state,payload){
    state.navBarIcons = payload.data
  },
  //修改nav icon
  CHANGENAVICON(state,payload){
    let changedViewList = JSON.parse(JSON.stringify(state.viewList))
    changedViewList.forEach(vo=>{
      if (vo.id === payload.parentId){
        vo.data.forEach(item=>{
          item.id === payload.selfId ? item.image = payload.url : ''
        })
      }
    })
    state.viewList = changedViewList
  },
  //获取课程下拉框数据
  SETCOURSEDATA(state,payload){
    let changedViewList = JSON.parse(JSON.stringify(state.viewList))
    changedViewList.forEach(vo=>vo.id === payload.id ? vo.filterList = payload.data.list : '')
    state.viewList = changedViewList
  },
  //设置手动更新默认项
  SETMANUALDEFAULT(state,payload){
    let changedViewList = JSON.parse(JSON.stringify(state.viewList))
    changedViewList.forEach(vo=>{
      if (vo.id === payload.parentId){
        const defaultData = {checked:vo.filterList[0],fliterList:vo.filterList,model:vo.filterList[0].id}
        vo.data.push(defaultData)
      }
    })
    state.viewList = changedViewList
  },
  //添加师资项
  ADDTEACHER(state,payload){
    let changedViewList = JSON.parse(JSON.stringify(state.viewList))
    changedViewList.forEach(vo=>{
      if (vo.id === payload.id){
        vo.data.push(payload.emptyItem)
      }
    })
    state.viewList = changedViewList
  },
  //获取招生活动列表
  GETENROLL(state,payload){
    if (payload.id){
      let changedViewList = JSON.parse(JSON.stringify(state.viewList))
      changedViewList.forEach(vo=>{
        if (vo.id == payload.id){
          vo.filterList = payload.data
        }
      })
      state.viewList = changedViewList
    }else {
      state.ribbon.forEach(vo=>{
        if (vo.type == 'enrollment'){
          vo.filterList = payload.data
        }
      })
    }
  },
  //设置招生活动选中数据
  SETSELECTDDATA(state,payload){
    let changedViewList = JSON.parse(JSON.stringify(state.viewList))
    changedViewList.forEach(vo=>{
      if (vo.id === payload.id){
        vo.data = payload.data
      }
    })
    state.viewList = changedViewList
  },
  //设置初始筛选数据
  SETDEFAULTFILTERS(state,payload){
    state.ribbon.forEach(vo=>{
      if (vo.type == payload.type){
        vo.filterList = payload.data
      }
    })
  },
  //获取环境照片
  SETSTATICDATA(state,payload){
    state.ribbon.forEach(vo=>{
      if (vo.type == payload.type){
        vo.data = payload.data
      }
    })
  },
 //设置新添加选中的项目
  SETCHECKEDITEM(state,payload){
    let changedViewList = JSON.parse(JSON.stringify(state.viewList))
    changedViewList.forEach((vo)=>{
      vo.id === payload.parentId ? vo.data[payload.index] = Object.assign(vo.data[payload.index],payload.data) : ''
    })
    state.viewList = changedViewList
  },
  //获取联系我们数据
  SETCONTACTDATA(state,payload){

  }
}