<script lang="ts" setup>
import { useRoute } from "vue-router";
import { computed, onMounted, reactive } from "vue";
import { createEmployee } from "./create.data";
import { useGlobalStore } from "@/stores/global";
import { useAuthStore } from "@/stores/auth";
import { useModalStore } from "@/stores/modals";
import { useForm } from "vee-validate";
import * as yup from "yup";
import type { IEmployeeData } from "@/Interfaces/user.interface";
import {
  getDepartments,
  getPositions,
  getRoles,
} from "@/views/Users/users.data";
import router from "@/router";

const globalStore = useGlobalStore();
const authStore = useAuthStore();
const modalStore = useModalStore();

interface IUserData {
  title: string;
  admin: boolean;
}

const defaultUserData: IUserData = {
  title: "Добавить нового пользователя",
  admin: false,
};

const userData = computed<IUserData>(() => {
  return window.history.state?.userData || defaultUserData;
});

const schema = yup.object({
  firstName: yup
    .string()
    .required("Введите имя")
    .min(3, "Имя не должно быть меньше 3-х символов"),
  lastName: yup
    .string()
    .required("Введите фамилию")
    .min(3, "Фамилия не должна быть меньше 3-х символов"),
  password: yup
    .string()
    .required("Введите пароль")
    .min(6, "Пароль не должен быть меньше 6-ти символов"),
  passwordConfirm: yup
    .string()
    .required("Повторите пароль")
    .oneOf([yup.ref("password")], "Пароль не совподает"),
  departmentID: yup.number().nullable().required("Выберите отдел"),
  positionID: yup.number().nullable().required("Выберите должность"),
  roleID: yup.number().nullable().required("Выберите роль").default(0),
  phone: yup
    .string()
    .required("Введите номер телефона")
    .min(13, "Номер телефона не должен быть меньше 13-ти символов"),
});

interface ISchemaForm {
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirm: string;
  departmentID: number | null;
  positionID: number | null;
  roleID: number | null;
  phone: string;
}

const { handleSubmit, defineField, errors } = useForm<ISchemaForm>({
  validationSchema: schema,
});

const [firstName, firstNameAttrs] = defineField("firstName");
const [lastName, lastNameAttrs] = defineField("lastName");
const [password, passwordAttrs] = defineField("password");
const [passwordConfirm, passwordConfirmAttrs] = defineField("passwordConfirm");
const [departmentID, departmentIDAttrs] = defineField("departmentID");
const [positionID, positionIDAttrs] = defineField("positionID");
const [roleID, roleIDAttrs] = defineField("roleID");
const [phone, phoneAttrs] = defineField("phone");

const onSubmit = handleSubmit(async (values) => {
  const submitForm: IEmployeeData = {
    name: values.firstName,
    last_name: values.lastName,
    password: values.password,
    password_confirmation: values.passwordConfirm,
    department_id: values.departmentID ?? 1,
    position_id: values.positionID ?? 1,
    role_id: userData.value.admin ? Number(values.roleID) : 0,
    phone: values.phone,
    organization_id: authStore.organizationID ?? 1,
  };

  globalStore.setLoading(true);

  try {
    const response = await createEmployee(submitForm);
    router.push("/users");
    globalStore.setLoading(false);
    modalStore.successModal = true;
    modalStore.successModalText = userData.value.admin
      ? "Новый модератор создан!"
      : "Новый пользователь создан";
    setTimeout(() => {
      modalStore.successModal = false;
      modalStore.successModalText = "";
    }, 3500);
  } catch (error: any) {
    if (error?.response?.data?.detail === "Username is already taken") {
      globalStore.setLoading(false);
      modalStore.warningModal = true;
      modalStore.warningModalText =
        "Пользователь с таким логином уже существует";
      setTimeout(() => {
        modalStore.warningModal = false;
        modalStore.warningModalText = "";
      }, 3500);
    } else {
      globalStore.setLoading(false);
      modalStore.dangerModal = true;
      modalStore.dangerModalText = "Не удалось создать пользователя";
      setTimeout(() => {
        modalStore.dangerModal = false;
        modalStore.dangerModalText = "";
      }, 3500);
      router.push("/users");
    }
  }
});

onMounted(async () => {
  try {
    await getDepartments();
    await getPositions();
    await getRoles();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
</script>

<template>
  <SuccessModal
    v-if="modalStore.successModal"
    title="Удачно"
    :text="modalStore.successModalText"
  />
  <DangerModal
    v-if="modalStore.dangerModal"
    title="Ошибка"
    :text="modalStore.dangerModalText"
  />
  <WarningModal
    v-if="modalStore.warningModal"
    title="Предупреждение"
    :text="modalStore.warningModalText"
  />
  <div class="loader-wrap" v-if="globalStore.loader">
    <Loader />
  </div>
  <section class="user-create section" v-if="!globalStore.loader">
    <h3 class="user-create__title title-black-gl">
      {{ userData.title ? userData.title : "Добавить нового пользователя" }}
    </h3>
    <div class="user-create__content section__content">
      <div class="bg-default-color p-6 rounded-lg h-full">
        <h2 class="text-xl font-semibold text-main-text-color mb-4">
          Информация о пользователе
        </h2>
        <p class="text-sm text-secondary-text-color mb-6">Заполните все поля</p>

        <form @submit.prevent="onSubmit">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                for="firstName"
                class="block text-sm font-medium text-main-text-color"
                >Имя</label
              >
              <input
                type="text"
                id="firstName"
                placeholder="Иван"
                v-model="firstName"
                v-bind="firstNameAttrs"
                class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-color focus:border-primary-color border-custom-color"
              />
              <span class="text-sm warning-text" v-if="errors.firstName">{{
                errors.firstName
              }}</span>
            </div>
            <div>
              <label
                for="lastName"
                class="block text-sm font-medium text-main-text-color"
                >Фамилия</label
              >
              <input
                type="text"
                id="lastName"
                placeholder="Иванов"
                v-model="lastName"
                v-bind="lastNameAttrs"
                class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-color focus:border-primary-color border-custom-color"
              />
              <span class="text-sm warning-text" v-if="errors.lastName">{{
                errors.lastName
              }}</span>
            </div>
            <div>
              <label
                for="password"
                class="block text-sm font-medium text-main-text-color"
                >Пароль</label
              >
              <input
                type="password"
                id="password"
                placeholder="пароль"
                v-model="password"
                v-bind="passwordAttrs"
                class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-color focus:border-primary-color border-custom-color"
              />
              <span class="text-sm warning-text" v-if="errors.password">{{
                errors.password
              }}</span>
            </div>
            <div>
              <label
                for="password"
                class="block text-sm font-medium text-main-text-color"
                >Подтверждение пароля</label
              >
              <input
                type="password"
                id="passwordConfirm"
                placeholder="повторите пароль"
                v-model="passwordConfirm"
                v-bind="passwordConfirmAttrs"
                class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-color focus:border-primary-color border-custom-color"
              />
              <span
                class="text-sm warning-text"
                v-if="errors.passwordConfirm"
                >{{ errors.passwordConfirm }}</span
              >
            </div>
          </div>

          <h2 class="text-xl font-semibold text-main-text-color mb-4">
            Подробная информация
          </h2>
          <p class="text-sm text-secondary-text-color mb-6">
            Заполните все поля
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                for="department"
                class="block text-sm font-medium text-main-text-color"
                >Отдел</label
              >
              <select
                id="department"
                v-model="departmentID"
                v-bind="departmentIDAttrs"
                class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-color focus:border-primary-color border-custom-color"
              >
                <option :value="undefined" disabled selected>Выбрать</option>
                <option
                  :value="departmentItem.id"
                  v-for="departmentItem in globalStore.departments"
                  :key="departmentItem.id"
                >
                  {{ departmentItem.name }}
                </option>
              </select>
              <span class="text-sm warning-text" v-if="errors.departmentID">{{
                errors.departmentID
              }}</span>
            </div>
            <div>
              <label
                for="position"
                class="block text-sm font-medium text-main-text-color"
                >Должность</label
              >
              <select
                id="position"
                v-model="positionID"
                v-bind="positionIDAttrs"
                class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-color focus:border-primary-color border-custom-color"
              >
                <option :value="undefined" disabled selected>Выбрать</option>
                <template
                  v-for="positionItem in globalStore.positions"
                  :key="positionItem.id"
                >
                  <option
                    :value="positionItem.id"
                    v-if="positionItem.department_id == departmentID"
                  >
                    {{ positionItem.name }}
                  </option>
                </template>
              </select>
              <span class="text-sm warning-text" v-if="errors.positionID">{{
                errors.positionID
              }}</span>
            </div>
            <div>
              <label
                for="phone"
                class="block text-sm font-medium text-main-text-color"
                >Номер телефона</label
              >
              <input
                type="text"
                id="phone"
                placeholder="+998990000000"
                v-model="phone"
                v-bind="phoneAttrs"
                class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-color focus:border-primary-color border-custom-color"
              />
              <span class="text-sm warning-text" v-if="errors.phone">{{
                errors.phone
              }}</span>
            </div>
            <div v-if="authStore.isSuperAdmin && userData.admin">
              <label
                for="role"
                class="block text-sm font-medium text-main-text-color"
                >Должность Пользователя</label
              >
              <select
                id="role"
                v-model="roleID"
                v-bind="roleIDAttrs"
                class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-color focus:border-primary-color border-custom-color"
              >
                <option :value="undefined" disabled selected>Выбрать</option>
                <template
                  v-for="roleItem in globalStore.roles"
                  :key="roleItem.id"
                >
                  <option
                    :value="roleItem.id"
                    v-if="roleItem.id == 0 && !userData.admin"
                  >
                    {{ roleItem.name }}
                  </option>
                  <option
                    :value="roleItem.id"
                    v-if="
                      roleItem.id == 1 &&
                      authStore.isSuperAdmin &&
                      userData.admin
                    "
                  >
                    {{ roleItem.name }}
                  </option>
                  <option
                    :value="roleItem.id"
                    v-if="
                      roleItem.id == 2 &&
                      authStore.isSuperAdmin &&
                      userData.admin
                    "
                  >
                    {{ roleItem.name }}
                  </option>
                </template>
              </select>
              <span class="text-sm warning-text" v-if="errors.roleID">{{
                errors.roleID
              }}</span>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <RouterLink to="/users" class="button default">
              Отменить
            </RouterLink>
            <button class="button send" type="submit">Сохранить</button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
$default-color: #ffffff;
$body-bg-color: #f5f6fa;
$primary-color: #027bff;
$primary-color-darker: darken($primary-color, 10%);
$main-text-color: #474747;
$secondary-text-color: #707b81;
$border-color: #d0d5dd;
$danger-color: #ff3b30;

.warning-text {
  font-size: 12px;
  color: $danger-color;
}

.section {
  background-color: $body-bg-color;
}

.title-black-gl {
  color: $main-text-color;
}

.user-create__content {
  background-color: $default-color;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

input,
select {
  border-color: $border-color;
  color: $secondary-text-color;

  &::placeholder {
    color: $secondary-text-color;
  }

  &:focus {
    border-color: $primary-color;
    box-shadow: none;
  }
}
</style>
