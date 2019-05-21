import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      // @ts-ignore
      component: () => import(/* webpackChunkName: "home" */ "./views/home.vue")
    },
    {
      path: "/articles",
      name: "articles",
      component: () =>
          // @ts-ignore
          import(/* webpackChunkName: "articles" */ "./views/articles.vue")
    },
    {
      path: "/timeline",
      name: "timeline",
      component: () =>
          // @ts-ignore
          import(/* webpackChunkName: "timeline" */ "./views/timeline.vue")
    },
    {
      path: "/articleDetail",
      name: "articleDetail",
      component: () =>
          // @ts-ignore
          import(/* webpackChunkName: "articleDetail" */ "./views/articleDetail.vue")
    },
    {
      path: "/adminHome",
      name: "adminHome",
      component: () =>
          // @ts-ignore
          import(/* webpackChunkName: "adminHome" */ "./views/adminHome.vue")
    }
  ]
})
