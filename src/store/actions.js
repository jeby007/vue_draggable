import {reqLinks,saveData,getNavIcon,getCourseList,getTeacherList,getEnrollList,getCouponList,getActivityList,getOlcourseList,getExhibition,getContact} from "@/api";

import { Message } from 'element-ui';
Message.closeAll()

export default {
  async getLinks({commit}){
    commit('CHANGELOADING',true)
    const result = await reqLinks()
    if (result.code === 200){
      commit('GETLINKSMODEL',result.data)
    }
    commit('CHANGELOADING',false)
  },
  async savaOrGetData({commit},payload){
    if (payload.type == 'set' || payload.type == 'preview'){
      let savetip
      if (payload.type == 'set'){
        savetip = Message({
          message: '保存中...',
          iconClass:'el-icon-loading',
          duration:0,
          customClass:'saveing'
        })
      }
      const willSaveData = {
        view_list:this.state.viewList,
        footer_nav:this.state.footerNav,
        ribbon:this.state.ribbon
      }
      let formData = new FormData()
      formData.append('component_data',JSON.stringify(willSaveData))
      const result = await saveData(formData)
      if (result.code === 200){
        payload.type == 'set' ? savetip.close() : ''
        const commitData = result.data || {}
        commit('SAVEDATA',{data:commitData})
        payload.type == 'set' ? Message.success('保存成功') : ''
      }else {
        payload.type == 'set' ? savetip.close() : ''
        payload.type == 'set' ? Message.warning(`保存失败,${result.message}`) : ''
      }
    }else {
      const result = await saveData()
      const commitData = result.data ? result.data : {}
      commit('SAVEDATA',{data:commitData})
    }
  },
  async getNavIcon({commit}){
    const result = await getNavIcon()
    if (result.code === 200){
      commit('GETNAVICONS',{data:result.data})
    }
  },
  async getCourseList({commit},data){
    const result = await getCourseList()
    commit('SETDEFAULTFILTERS',{data:result.data.list || [],type:'course'})
  },
  async getTeacherList({commit},payload){
    let result
    payload.firstReq ? result = await getTeacherList({size:100}) : ''
    if (result.code === 200){
      commit('SETDEFAULTFILTERS', {data: result.data.list || [],type:'teacher'})
    }
  },
  async getEnrollList({commit},payload){
    const result = await getEnrollList({...payload})
    if (result.code === 200){
      payload.search_id ? commit('SETSELECTDDATA',{data:result.data.list,id:payload.id}) : commit('GETENROLL',{data:result.data.list,id:payload.id})

    }
  },
  async getCouponList({commit},payload){
    const result = await getCouponList({...payload})
    if (result.code === 200){
      commit('SETDEFAULTFILTERS', {data:result.data.list,type:'coupon'})
    }
  },
  async getActivityList({commit,payload}){
    const result = await getActivityList({...payload})
    if (result.code === 200){
      commit('SETDEFAULTFILTERS',{data:result.data.list,type:'activity'})
    }
  },
  async getOlcourseList({commit,payload}){
    const result = await getOlcourseList({...payload})
    if (result.code === 200){
      commit('SETDEFAULTFILTERS',{data:result.data.list,type:'online_course'})
    }
  },
  async getExhibition({commit},payload){
    const result = await getExhibition({...payload})
    if (result.code === 200){
      commit('SETSTATICDATA',{data:result.data,type:'env'})
    }
  },
  async getContact ({commit},payload){
    const result = await getContact({...payload})
    if (result.code === 200){
      commit('SETSTATICDATA',{data:result.data,type:'contact'})
    }
  }
}