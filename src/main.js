import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

//引入elementUI
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import '@/static/css/element-variables.scss'
Vue.use(ElementUI)


//引入拖拽库
import draggable from "vuedraggable";
Vue.component('draggable',draggable)

//引入Vuex
import store from "@/store";

//引入封装ajax
import ajax from '@/api/ajax'
Vue.prototype.$ajax = ajax

//注册miditem右侧操作按钮
import SideBtn from "./components/SideBtn";
Vue.component('SideBtn',SideBtn)

//引入lazyload
import VueLazyload from "vue-lazyload";
Vue.use(VueLazyload,{loading:require('./static/images/Spinner.gif'),error:require('./static/images/broken_image.png')})

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
