import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

const route = new Router({
    mode: "hash",
    routes: [
        //  前台
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
            path: "/friend",
            name: "friend",
            component: () =>
                // @ts-ignore
                import("./views/friend.vue")
        },
        {
            path: "/articleDetail",
            name: "articleDetail",
            component: () =>
                // @ts-ignore
                import("./views/articleDetail.vue")
        },

        // 后台
        {
            path: "/admin",
            component: (resolve) => require(["./views/admin/admin.vue"], resolve),
            children: [
                {
                    path: "",
                    name: "admin",
                    component: (resolve) => require(["./views/admin/adminDashboard.vue"], resolve)
                }
            ]
        },
        {
            path: "/admin-article",
            component: (resolve) => require(["./views/admin/admin.vue"], resolve),
            children: [
                {
                    path: "",
                    name: "admin-article",
                    component: (resolve) => require(["./views/admin/adminArticle.vue"], resolve)
                },
            ]
        },
        {
            path: "/admin-classify",
            component: (resolve) => require(["./views/admin/admin.vue"], resolve),
            children: [
                {
                    path: "",
                    name: "admin-classify",
                    component: (resolve) => require(["./views/admin/adminClassify.vue"], resolve)
                },
            ]
        },
        {
            path: "/admin-label",
            component: (resolve) => require(["./views/admin/admin.vue"], resolve),
            children: [
                {
                    path: "",
                    name: "admin-label",
                    component: (resolve) => require(["./views/admin/adminLabel.vue"], resolve)
                },
            ]
        },
        {
            path: "/admin-articleLabel",
            component: (resolve) => require(["./views/admin/admin.vue"], resolve),
            children: [
                {
                    path: "",
                    name: "admin-articleLabel",
                    component: (resolve) => require(["./views/admin/adminArticleLabel.vue"], resolve)
                },
            ]
        },
        {
            path: "/admin-discuss",
            component: (resolve) => require(["./views/admin/admin.vue"], resolve),
            children: [
                {
                    path: "",
                    name: "admin-discuss",
                    component: (resolve) => require(["./views/admin/adminDiscuss.vue"], resolve)
                },
            ]
        },
        {
            path: "/admin-file",
            component: (resolve) => require(["./views/admin/admin.vue"], resolve),
            children: [
                {
                    path: "",
                    name: "admin-file",
                    component: (resolve) => require(["./views/admin/adminFile.vue"], resolve)
                },
            ]
        },
        {
            path: "/admin-page",
            component: (resolve) => require(["./views/admin/admin.vue"], resolve),
            children: [
                {
                    path: "",
                    name: "admin-page",
                    component: (resolve) => require(["./views/admin/adminPage.vue"], resolve)
                },
            ]
        },
        {
            path: "/admin-timeLine",
            component: (resolve) => require(["./views/admin/admin.vue"], resolve),
            children: [
                {
                    path: "",
                    name: "admin-timeLine",
                    component: (resolve) => require(["./views/admin/adminTimeLine.vue"], resolve)
                },
            ]
        },
        {
            path: "/admin-log",
            component: (resolve) => require(["./views/admin/admin.vue"], resolve),
            children: [
                {
                    path: "",
                    name: "admin-log",
                    component: (resolve) => require(["./views/admin/adminLog.vue"], resolve)
                }
            ]
        },
        {
            path: "/admin-setting",
            component: (resolve) => require(["./views/admin/admin.vue"], resolve),
            children: [
                {
                    path: "",
                    name: "admin-setting",
                    component: (resolve) => require(["./views/admin/adminSetting.vue"], resolve)
                }
            ]
        },
        {
            path: "/admin-user",
            component: (resolve) => require(["./views/admin/admin.vue"], resolve),
            children: [
                {
                    path: "",
                    name: "admin-user",
                    component: (resolve) => require(["./views/admin/adminUser.vue"], resolve)
                }
            ]
        },
        {
            path: "/admin-role",
            component: (resolve) => require(["./views/admin/admin.vue"], resolve),
            children: [
                {
                    path: "",
                    name: "admin-role",
                    component: (resolve) => require(["./views/admin/adminRole.vue"], resolve)
                }
            ]
        },
        {
            path: "/admin-res",
            component: (resolve) => require(["./views/admin/admin.vue"], resolve),
            children: [
                {
                    path: "",
                    name: "admin-res",
                    component: (resolve) => require(["./views/admin/adminRes.vue"], resolve)
                }
            ]
        },
        {
            path: "/admin-userRole",
            component: (resolve) => require(["./views/admin/admin.vue"], resolve),
            children: [
                {
                    path: "",
                    name: "admin-userRole",
                    component: (resolve) => require(["./views/admin/adminUserRole.vue"], resolve)
                }
            ]
        },
        {
            path: "/admin-roleRes",
            component: (resolve) => require(["./views/admin/admin.vue"], resolve),
            children: [
                {
                    path: "",
                    name: "admin-roleRes",
                    component: (resolve) => require(["./views/admin/adminRoleRes.vue"], resolve)
                }
            ]
        },
        {
            path: "/admin-articleEditor",
            component: (resolve) => require(["./views/admin/admin.vue"], resolve),
            children: [
                {
                    path: "",
                    name: "admin-articleEditor",
                    component: (resolve) => require(["./views/admin/adminArticleEditor.vue"], resolve)
                }
            ]
        },

    ]
})


route.beforeEach((to:any,from:any,next:any)=>{
    if (to.path.startsWith('/admin')) {
        if(localStorage.getItem('token')){
            next()
        }else{
            next({
                path:'/articles'
            })
        }
    } else {
        next()
    }
});

export default route
