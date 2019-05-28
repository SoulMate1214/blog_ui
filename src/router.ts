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
      component: () => import("./views/home.vue")
    },
    {
      path: "/articles",
      name: "articles",
      component: () =>
                // @ts-ignore
                import("./views/articles.vue")
    },
    {
      path: "/timeline",
      name: "timeline",
      component: () =>
                // @ts-ignore
                import("./views/timeline.vue")
    },
    {
      path: "/articleDetail",
      name: "articleDetail",
      component: () =>
                // @ts-ignore
                import("./views/articleDetail.vue")
    },
    {
      path: "/adminHome",
      name: "adminHome",
      component: (resolve) => require(["./views/adminHome.vue"], resolve),
      children: [
        {
          path: "",
          name: "adminArticle",
          component: (resolve) => require(["./views/adminArticle.vue"], resolve)
        },
        {
          path: "adminLog",
          name: "adminLog",
          component: (resolve) => require(["./views/adminLog.vue"], resolve)
        }
      ]
    }
  ]
})
