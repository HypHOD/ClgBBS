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
        }

    ]
})

export default router