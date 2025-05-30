import {createRouter, createWebHistory,} from 'vue-router'


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            redirect: '/app-layout'
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
        }

    ]
})

export default router