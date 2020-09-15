export default {
  globalLoading:false,
  linksForModel: {},
  controlList: [
    {
      name: "轮播图",
      id: 1 ,
      icon:'icon-lunbotu',
      selected:false,
      type:'swp',
      data:[]
    },
    {
      name: "栏目导航",
      id: 2 ,
      icon:'icon-nav',
      selected:false,
      type:'nav',
      showNum:4,
      data:[
        {title:'导航一',image:'',jumpLink:'',id:0,name:''},
        {title:'导航二',image:'',jumpLink:'',id:1,name:''},
        {title:'导航三',image:'',jumpLink:'',id:2,name:''},
        {title:'导航四',image:'',jumpLink:'',id:3,name:''},
      ]
    },
  ],
  ribbon:[
    {name:'环境展示',icon:'icon-fengcaizhanshi',id:4,selected:false,type:'env',data:{},showNum:5},
    {name:'联系我们',icon:'icon-lianxiwomen-copy',id:5,selected:false,type:'contact',showTitle:true,data: {}},
    {name:'课程介绍',icon:'icon-tehuike',id:6,selected:false,type:'course',showTitle:true,more:true,autoUpdate:true,data:[],filterList:[],showType:0},
    {name:'师资介绍',icon:'icon-teacher',id:7,selected:false,type:'teacher',showTitle:true,autoUpdate:true,more:true,data:[],filterList:[]},
    {name:'招生活动',icon:'icon-apply',id:8,selected:false,type:'enrollment',data:[],filterList:[]},
    {name:'申请试听',icon:'icon-shiting',id:9,selected:false,type:'audition',theme:'#03a9f4',btnName:'申请试听',jumplink:''},
    {name:'优惠券',icon:'icon-coupon',id:10,selected:false,type:'coupon',btnBg:'#03a9f4',autoUpdate:true,filterList:[],data:[]},
    {name:'特惠课程',icon:'icon-fengcaizhanshi',id:11,selected:false,type:'disc_course'},
    {name:'活动报名',icon:'icon-baoming',id:12,selected:false,type:'activity',showTitle:true,more:true,autoUpdate:true,showType:0,data:[],filterList:[]},
    {name:'线上课程',icon:'icon-onlineke',id:13,selected:false,type:'online_course',showTitle:true,more:true,autoUpdate:true,showType:0,data:[],filterList: []},
    {name:'商城',icon:'icon-onlinstore',id:14,selected:false,type:'store'},
  ],
  viewList: [],
  footerNav: {
    name: "底部导航",
    id: 3 ,
    icon:'icon-footernav',
    selected:false,
    type:'footernav',
    checkedColor:'#03a9f4',
    data:[
      {title: '首页',icon:'icon-home',checked:true,jumpLink: '',id:0,name:'',type:'home'},
      {title: '课表',icon:'icon-schedule',checked:false,jumpLink: '',id:3,name:'',type:'schedule'},
      {title: '商城',icon:'icon-store',checked:false,jumpLink: '',id:4,name:'',type:'store'},
      {title: '微课',icon:'icon-course',checked:false,jumpLink: '',id:5,name:'',type:'course'},
      {title: '我的',icon:'icon-mine',checked:false,jumpLink: '',id:1,name:'',type:'mine'}
    ]
  },
  navBarIcons:[],
  previewLink:'https://www.baidu.com/',
  orgName:'微早教'
}