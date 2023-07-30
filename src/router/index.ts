import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import MainView from "../views/MainView/MainView.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: MainView,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
