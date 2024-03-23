import { createRouter, createWebHistory } from 'vue-router';
import firebaseApp from '@/firebase.js';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', 
        component: () => import("../views/homepage/Index.vue"),
        meta:{
          requiresAuth: true,
        }, 
        name: 'home' },
      { path: '/login', component: () => import("../views/Login.vue"), name: 'login' },
      { path: '/register', component: () => import("../views/Register.vue"), name: 'register' },
      { path: '/newspage', component: () => import("../views/newspage/NewsPage.vue"),
       meta: {
        requiresAuth: true,
      }, 
      name: 'newspage'},
      { path: '/repository', component: () => import("../views/repository/RepositoryPage.vue"), name: 'repository'}
    ],
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  };
});
export default router;
