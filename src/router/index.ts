import { createRouter, createWebHistory } from "vue-router";
import AuthLayout from "@/layouts/auth.vue";
import DefaultLayout from "@/layouts/default.vue";
import HomeView from "@/views/Home/index.vue";
import AuthView from "@/views/Auth/index.vue";
import RollCall from "@/views/RollCall/index.vue";
import Users from "@/views/Users/index.vue";
import UsersCreate from "@/views/Users/Create/Create.vue";
import UsersEdit from "@/views/Users/Edit/Edit.vue";
import UserInfo from "@/views/Users/Info/Info.vue";
import Report from "@/views/Report/index.vue";
import Settings from "@/views/Settings/index.vue";
import Finance from "@/views/Finance/index.vue";
import HR from "@/views/HR/index.vue";
import Management from "@/views/Management/index.vue";
import Marketing from "@/views/Marketing/index.vue";
import Production from "@/views/Production/index.vue";
import Sales from "@/views/Sales/index.vue";
import Stock from "@/views/Stock/index.vue";
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
      redirect: "/users",
      children: [
        {
          path: "home",
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
      path: "/users/info/:id",
      component: DefaultLayout,
      children: [
        {
          path: "",
          name: "UserInfo",
          component: UserInfo,
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
    {
      path: "/hr",
      component: DefaultLayout,
      children: [
        {
          path: "",
          name: "HR",
          component: HR,
          meta: {
            guard: true,
          },
        },
      ],
    },
    {
      path: "/finance",
      component: DefaultLayout,
      children: [
        {
          path: "",
          name: "Finance",
          component: Finance,
          meta: {
            guard: true,
          },
        },
      ],
    },
    {
      path: "/marketing",
      component: DefaultLayout,
      children: [
        {
          path: "",
          name: "Marketing",
          component: Marketing,
          meta: {
            guard: true,
          },
        },
      ],
    },
    {
      path: "/sales",
      component: DefaultLayout,
      children: [
        {
          path: "",
          name: "Sales",
          component: Sales,
          meta: {
            guard: true,
          },
        },
      ],
    },
    {
      path: "/stock",
      component: DefaultLayout,
      children: [
        {
          path: "",
          name: "Stock",
          component: Stock,
          meta: {
            guard: true,
          },
        },
      ],
    },
    {
      path: "/management",
      component: DefaultLayout,
      children: [
        {
          path: "",
          name: "Management",
          component: Management,
          meta: {
            guard: true,
          },
        },
      ],
    },
    {
      path: "/production",
      component: DefaultLayout,
      children: [
        {
          path: "",
          name: "Production",
          component: Production,
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
