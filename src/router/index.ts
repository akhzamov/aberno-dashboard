import { createRouter, createWebHistory } from "vue-router";
import AuthLayout from "@/layouts/auth.vue";
import DefaultLayout from "@/layouts/default.vue";
import HomeView from "@/views/Home/index.vue";
import AuthView from "@/views/Auth/index.vue";
import RollCall from "@/views/RollCall/index.vue";
import Users from "@/views/Users/index.vue";
import UsersCreate from "@/components/Users/Create/Create.vue";
import UsersEdit from "@/components/Users/Edit/Edit.vue";
import Report from "@/views/Report/index.vue";
import Settings from "@/views/Settings/index.vue";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/authorization",
      component: AuthLayout,
      children: [
        {
          path: "",
          name: "Authorization",
          component: AuthView,
          meta: {
            guard: false,
          },
        },
      ],
    },
    {
      path: "/",
      component: DefaultLayout,
      children: [
        {
          path: "",
          name: "Home",
          component: HomeView,
          meta: {
            guard: true,
          },
        },
      ],
    },
    {
      path: "/roll-call",
      component: DefaultLayout,
      children: [
        {
          path: "",
          name: "Roll-Call",
          component: RollCall,
          meta: {
            guard: true,
          },
        },
      ],
    },
    {
      path: "/users",
      component: DefaultLayout,
      children: [
        {
          path: "",
          name: "Users",
          component: Users,
          meta: {
            guard: true,
          },
        },
      ],
    },
    {
      path: "/users/create",
      component: DefaultLayout,
      children: [
        {
          path: "",
          name: "UsersCreate",
          component: UsersCreate,
          meta: {
            guard: true,
          },
        },
      ],
    },
    {
      path: "/users/edit/:id",
      component: DefaultLayout,
      children: [
        {
          path: "",
          name: "UsersEdit",
          component: UsersEdit,
          meta: {
            guard: true,
          },
        },
      ],
    },
    {
      path: "/report",
      component: DefaultLayout,
      children: [
        {
          path: "",
          name: "Report",
          component: Report,
          meta: {
            guard: true,
          },
        },
      ],
    },
    {
      path: "/settings",
      component: DefaultLayout,
      children: [
        {
          path: "",
          name: "Settings",
          component: Settings,
          meta: {
            guard: true,
          },
        },
      ],
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.guard) {
    if (!authStore.user?.user || !authStore.user.user.is_active) {
      try {
        await authStore.getMe();
        const fetchedUser = authStore.user?.user;
        const isAdmin = authStore.isAdmin;
        const isSuperAdmin = authStore.isSuperAdmin;

        if (fetchedUser?.is_active && (isAdmin || isSuperAdmin)) {
          next();
        } else {
          next("/authorization");
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        next("/authorization");
      }
    } else {
      const isAdmin = authStore.isAdmin;
      const isSuperAdmin = authStore.isSuperAdmin;
      if (authStore.user.user.is_active && (isAdmin || isSuperAdmin)) {
        next();
      } else {
        next("/authorization");
      }
    }
  } else {
    next();
  }
});

export default router;
