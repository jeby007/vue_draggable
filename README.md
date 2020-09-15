# minisite_weizaojiao

## Project setup
```
npm i
```

### Compiles and hot-reloads for development
```
npm start
```

### Compiles and minifies for production
```
npm run build
```

####项目介绍

---
>组件介绍
>+ 每个组件目录下含有一个_item文件和_set文件
>+ _item文件对应的中间view展示区
>+ _set文件对应右侧的设置功能区
>
>业务交互
>+ 前后台交互基于axios进行请求业务封装
>
>ui框架
>+ 项目全局引入element-ui
>+ '#03a9f4'为项目主体色号
>
>项目目录
```
|-- minisite_weizaojiao
    |-- .eslintignore                           -->eslint忽略文件
    |-- .gitignore                              -->git忽略文件
    |-- babel.config.js                         -->babel配置文件
    |-- package.json                            -->项目源                            
    |-- vue.config.js                           -->项目配置文件
    |-- public
    |   |-- favicon.ico
    |   |-- index.html                          -->出口html
    |-- src
        |-- App.vue
        |-- main.js
        |-- api
        |   |-- ajax.js                         -->封装ajax
        |   |-- index.js                        -->接口地址
        |-- components
        |   |-- AddIconModel.vue                -->图标弹窗
        |   |-- LeftControl.vue                 -->左侧功能区
        |   |-- LinksModel.vue                  -->链接选择弹窗
        |   |-- MidPreview.vue                  -->中间展示区
        |   |-- RightSetControl.vue             -->右侧功能区
        |   |-- SideBtn.vue                     -->组件右侧操作槽
        |   |-- Activity                        -->活动报名组件
        |   |   |-- Activity_item.vue
        |   |   |-- Activity_set.vue
        |   |-- Env                             -->环境展示组件
        |   |   |-- Env.vue
        |   |   |-- Env.vue
        |   |-- ApplyAudition                   -->申请试听组件
        |   |   |-- ApplyAudition_item.vue
        |   |   |-- ApplyAudition_set.vue
        |   |-- ContactUs                       -->联系我们组件
        |   |   |-- ContactUs_item.vue
        |   |   |-- ContactUs_set.vue
        |   |-- Coupon                          -->优惠券组件
        |   |   |-- Coupon_item.vue
        |   |   |-- Coupon_set.vue
        |   |-- Course                          -->课程介绍组件
        |   |   |-- Course_item.vue
        |   |   |-- Course_set.vue
        |   |-- Disc_course
        |   |   |-- Disc_course_item.vue
        |   |-- Enrollment                      -->招生活动组件
        |   |   |-- Enrollment_item.vue
        |   |   |-- Enrollment_set.vue
        |   |-- FooterNav                       -->底部导航组件
        |   |   |-- FooterNav_item.vue
        |   |   |-- FooterNav_set.vue
        |   |-- NavBar                          -->栏目导航组件
        |   |   |-- NavBar_item.vue
        |   |   |-- NavBar_set.vue
        |   |-- OnlineCourse                    -->线上课程组件
        |   |   |-- OnlineCourse_item.vue
        |   |-- SwpTemplate                     -->轮播图组件
        |   |   |-- Swp_item.vue
        |   |   |-- Swp_set.vue
        |   |-- TeacherBrief                    -->师资介绍组件
        |       |-- TeacherBrief_item.vue
        |       |-- TeacherBrief_set.vue
        |-- pages
        |   |-- control.vue                     -->页面
        |-- static                              -->静态资源
        |   |-- css
        |   |   |-- global.styl                 -->全局css
        |   |   |-- reset.css                   
        |   |-- images                          -->图片目录
        |       |-- broken_image.png
        |       |-- course.png
        |       |-- course_ed.png
        |       |-- defalutSwp.png
        |       |-- Down.png
        |       |-- home.png
        |       |-- home_ed.png
        |       |-- img_top_weixin.png
        |       |-- mine.png
        |       |-- mine_ed.png
        |       |-- schedule.png
        |       |-- schedule_ed.png
        |       |-- Spinner.gif
        |       |-- store.png
        |       |-- store_ed.png
        |-- store                               -->vuex
        |   |-- actions.js
        |   |-- getters.js
        |   |-- index.js
        |   |-- mutations.js
        |   |-- state.js
        |-- utils                               -->功能模块
            |-- bus.js
```