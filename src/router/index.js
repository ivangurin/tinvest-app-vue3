import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        name: "home",
        path: "/",
        component: () => import('@/views/Home.vue'),
        props: true
    },
    {
        name: "settings",
        path: '/settings',
        component: () => import('@/views/Settings.vue'),
        props: true
    },
    {
        name: "positions",
        path: '/positions',
        component: () => import('@/views/Positions.vue'),
        props: true
    },
    {
        name: "profit",
        path: '/profit',
        component: () => import('@/views/Profit.vue'),
        props: true
    }
]

const router = createRouter({
    //history: createWebHistory('/tinvest/app/'),
    history: createWebHistory('/'),
    routes: routes
})

export default router