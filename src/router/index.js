import Vue from 'vue'
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect:'/main'
        },
        {
            path: '/main',
            name: 'Main',
            component: () => import('../components/Main'),
            children: [
                {
                    path: 'child1',
                    component:()=> import('../components/mainchild/Child1')
                },
                {
                    path: 'child2',
                    component:()=> import('../components/mainchild/Child2')
                }
            ]
        },
        {
            path: '/home/:id',
            name: 'Home',
            component:()=>import('../components/child/Home')
        }
    ]
});

