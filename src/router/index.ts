import {createRouter, createWebHistory,} from 'vue-router'


const router = createRouter({
    history: createWebHistory(),
    routes: [
        // {
        //     path: '/',
        //     name: 'Home',
        //     redirect: '/app-layout'
        // },
        {
            path: '/post-list',
            name: 'PostList',
            component: () => import('../components/PostList.vue')
        },
        {
            path: '/',
            name: 'Home',
            redirect: '/sign-in'
        },
        {
            path: '/sign-in',
            name: 'SignIn',
            component: () => import('../components/SignIn.vue')
        },
        {
            path: '/app-layout',
            name: 'AppLayout',
            component: () => import('../components/AppLayout.vue')
        },
        {
            path: '/create-account',
            name: 'CreateAccount',
            component: () => import('../components/CreateAccount.vue')
        },
        {
            path:'/create-account-success',
            name: 'CreateAccountSuccess',
            component: () => import('../components/CreateAccountSuccess.vue')
        },
        {
            path: '/404',
            name: 'NotFound',
            component: () => import('../components/NotFound.vue')
        },
        {
            path: '/personal-homepage',
            name: 'PersonalHomePage',
            component: () => import('../components/PersonalHomePage.vue')
        },
        {
            path: '/test-page',
            name: 'TestPage',
            component: () => import('../components/TestPage.vue')
        },
        {
            path: '/forget-password',
            name: 'ForgetPassword',
            component: () => import('../components/ForgetPassword.vue')
        },
        {
            path: '/post-detail/:uid',
            name: 'PostDetail',
            component: () => import('../components/PostDetail.vue')
        },
        {
            path: '/sign-in',
            name: 'SignIn',
            component: () => import('../components/SignIn.vue')
        },


    ]
})

export default router