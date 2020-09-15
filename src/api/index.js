import ajax from "./ajax";
const BASE = '/Mp'
export const reqLinks = ()=>ajax(`${BASE}/OrgIndexCompoApi/tabFun`) //获取链接弹窗数据
export const saveData = (data)=>ajax(`${BASE}/OrgIndexCompoApi/dataSave`, data,'POST') //保存数据
export const getViewData = ()=>ajax(`${BASE}/OrgIndexCompoApi/dataShow`)  //获取数据
export const getNavIcon = ()=>ajax(`${BASE}/OrgIndexCompoApi/navIconLibrary`) //获取栏目导航icon
export const getCourseList = (data={})=>ajax(`${BASE}/OrgIndexCompoApi/courseList`,{...data}) //获取课程列表
export const getTeacherList = (data={})=>ajax(`${BASE}/OrgIndexCompoApi/teachList`, {...data})  //获取师资列表
export const getEnrollList = (data={})=>ajax(`${BASE}/OrgIndexCompoApi/activityList`,{...data})  //获取招生活动列表
export const getCouponList = (data)=>ajax(`${BASE}/OrgIndexCompoApi/couponList`,{...data})  //获取优惠券列表
export const getActivityList = (data)=>ajax(`${BASE}/OrgIndexCompoApi/activitySuList`,{...data})  //获取活动报名列表
export const getOlcourseList = (data)=>ajax(`${BASE}/OrgIndexCompoApi/tinyClassList`,{...data})  //获取线上课程列表
export const getExhibition = (data)=>ajax(`${BASE}/OrgIndexCompoApi/envPhotoList`,{...data})  //获取环境照片
export const getContact = (data)=>ajax(`${BASE}/OrgIndexCompoApi/aboutus`,{...data})  //获取联系我们数据