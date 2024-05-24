<script lang="ts" setup>
import { useRoute } from "vue-router";
import { computed, onMounted, reactive } from "vue";
import { editEmployee, getEmployeeByID } from "./edit.data";
import { useGlobalStore } from "@/stores/global";
import { useForm } from "vee-validate";
import * as yup from "yup";
import {
  getDepartments,
  getPositions,
  getRoles,
} from "@/views/Users/users.data";
import type { IRole } from "@/Interfaces/user.interface";

const globalStore = useGlobalStore();

interface IUserData {
  title: string;
  admin: boolean;
  id: number;
}

const defaultUserData: IUserData = {
  title: "Редактирование пользователя",
  admin: false,
  id: 1,
};

const userData = computed<IUserData>(() => {
  return window.history.state?.userData || defaultUserData;
});

interface ISchemaForm {
  name: string;
  last_name: string;
  username: string;
  password: string;
  department_id: number | string;
  position_id: number | string;
  role_id: number;
  phone: string;
}

const schema = yup.object({
  name: yup
    .string()
    .required("Введите имя")
    .min(3, "Имя не должена быть меньше 3-ех символов"),
  last_name: yup
    .string()
    .required("Введите фамилию")
    .min(6, "Фамилия не должена быть меньше 3-ех символов"),
  username: yup
    .string()
    .required("Введите логин")
    .min(5, "Логин не должен быть меньше 5-ех символов"),
  password: yup
    .string()
    .required("Введите пароль")
    .min(6, "Пароль не должен быть меньше 6-и символов"),
  department_id: yup.string().required("Выберите отдел"),
  position_id: yup.string().required("Выберите должность"),
  role_id: yup.string().required("Выберите роль"),
  phone: yup
    .string()
    .required("Введите номер телефона")
    .min(6, "Пароль не должен быть меньше 6-и символов"),
});

const { values, handleSubmit, meta, handleReset, defineField, errors } =
  useForm<ISchemaForm>({
    validationSchema: schema,
  });

const [name, nameAttrs] = defineField("name");
const [last_name, last_nameAttrs] = defineField("last_name");
const [username, usernameAttrs] = defineField("username");
const [password, passwordAttrs] = defineField("password");
const [department_id, department_idAttrs] = defineField("department_id");
const [position_id, position_idAttrs] = defineField("position_id");
const [role_id, role_idAttrs] = defineField("role_id");
const [phone, phoneAttrs] = defineField("phone");

const onSubmit = handleSubmit(async () => {
  let submitForm = {
    name: name.value,
    last_name: last_name.value,
    username: username.value,
    password: password.value,
    password_confirmation: password.value,
    position_id: Number(position_id.value),
    phone: phone.value,
    department_id: Number(department_id.value),
    organization_id: Number(1),
    role_id: userData.value.admin ? Number(role_id.value) : Number(0),
  };

  console.log(submitForm);

  // try {
  //   const response = await editEmployee(submitForm);
  //   console.log(response);
  //   console.log("User created successfully:", response);
  // } catch (error) {
  //   console.error("Error creating user:", error);
  // }
});

onMounted(async () => {
  getDepartments();
  getPositions();
  getRoles();

  const res = await getEmployeeByID(userData.value.id);
  const roles = res.user.roles;

  console.log(res);

  name.value = res.user.name;
  last_name.value = res.user.last_name ? res.user.last_name : "";
  username.value = res.user.username;
  res.department
    ? (department_id.value = res.department.id)
    : (department_id.value = "");
  res.position
    ? (position_id.value = res.position.id)
    : (position_id.value = "");
  userData.value.admin && roles.length > 0
    ? (role_id.value = roles[roles.length - 1].id)
    : (role_id.value = 0);
  phone.value = res.phone;
});
</script>

<template>
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
                v-model="name"
                v-bind="nameAttrs"
                class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-color focus:border-primary-color border-custom-color"
              />
              <span class="text-sm warning-text" v-if="errors.name">
                {{ errors.name }}
              </span>
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
                v-model="last_name"
                v-bind="last_nameAttrs"
                class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-color focus:border-primary-color border-custom-color"
              />
              <span class="text-sm warning-text" v-if="errors.last_name">
                {{ errors.last_name }}
              </span>
            </div>
            <div>
              <label
                for="username"
                class="block text-sm font-medium text-main-text-color"
                >Логин</label
              >
              <input
                type="text"
                id="username"
                placeholder="ivanov"
                v-model="username"
                v-bind="usernameAttrs"
                class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-color focus:border-primary-color border-custom-color"
              />
              <span class="text-sm warning-text" v-if="errors.username">
                {{ errors.username }}
              </span>
            </div>
            <div>
              <label
                for="password"
                class="block text-sm font-medium text-main-text-color"
                >Пароль</label
              >
              <input
                type="text"
                id="password"
                placeholder="пароль"
                v-model="password"
                v-bind="passwordAttrs"
                class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-color focus:border-primary-color border-custom-color"
              />
              <span class="text-sm warning-text" v-if="errors.password">
                {{ errors.password }}
              </span>
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
                v-model="department_id"
                v-bind="department_idAttrs"
                class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-color focus:border-primary-color border-custom-color"
              >
                <option value="" disabled>Выбрать</option>
                <option
                  :value="departmentItem.id"
                  v-for="departmentItem in globalStore.departments"
                  :key="departmentItem.id"
                >
                  {{ departmentItem.name }}
                </option>
              </select>
              <span class="text-sm warning-text" v-if="errors.department_id">
                {{ errors.department_id }}
              </span>
            </div>
            <div>
              <label
                for="position"
                class="block text-sm font-medium text-main-text-color"
                >Должность</label
              >
              <select
                id="position"
                v-model="position_id"
                v-bind="position_idAttrs"
                class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-color focus:border-primary-color border-custom-color"
              >
                <option value="" disabled>Выбрать</option>
                <option
                  :value="positionItem.id"
                  v-for="positionItem in globalStore.positions"
                  :key="positionItem.id"
                >
                  {{ positionItem.name }}
                </option>
              </select>
              <span class="text-sm warning-text" v-if="errors.position_id">
                {{ errors.position_id }}
              </span>
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
              <span class="text-sm warning-text" v-if="errors.phone">
                {{ errors.phone }}
              </span>
            </div>
            <!-- <div class="hidden items-center space-x-4">
              <div>
                <label
                  for="workStart"
                  class="block text-sm font-medium text-main-text-color"
                  >Время работы</label
                >
                <select
                  id="workStart"
                  v-model="form.workStart"
                  class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-color focus:border-primary-color border-custom-color"
                >
                  <option value="" disabled>Выбрать</option>
                  <option value="8:00">8:00</option>
                  <option value="9:00">9:00</option>
                  <option value="10:00">10:00</option>
                </select>
              </div>
              <div>
                <label
                  for="workEnd"
                  class="block text-sm font-medium text-main-text-color"
                  >До</label
                >
                <select
                  id="workEnd"
                  v-model="form.workEnd"
                  class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-color focus:border-primary-color border-custom-color"
                >
                  <option value="" disabled>Выбрать</option>
                  <option value="17:00">17:00</option>
                  <option value="18:00">18:00</option>
                  <option value="19:00">19:00</option>
                </select>
              </div>
              <div class="flex justify-center items-center h-full">
                <input
                  type="checkbox"
                  id="overtime"
                  v-model="form.overtime"
                  class="h-4 w-4 text-primary-color border-gray-300 rounded focus:ring-primary-color"
                />
                <label
                  for="overtime"
                  class="ml-2 block text-sm text-main-text-color"
                  >Сверхурочка</label
                >
              </div>
            </div> -->
            <div v-if="userData.admin">
              <label
                for="role"
                class="block text-sm font-medium text-main-text-color"
                >Должность Модератора</label
              >
              <select
                id="role"
                v-model="role_id"
                v-bind="role_idAttrs"
                class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-color focus:border-primary-color border-custom-color"
              >
                <option value="" disabled>Выбрать</option>
                <template
                  v-for="roleItem in globalStore.roles"
                  :key="roleItem.id"
                >
                  <option :value="roleItem.id" v-if="roleItem.id != 0">
                    {{ roleItem.name }}
                  </option>
                </template>
              </select>
              <span class="text-sm warning-text" v-if="errors.role_id">
                {{ errors.role_id }}
              </span>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <RouterLink to="/users" type="submit" class="button default">
              Отменить
            </RouterLink>
            <button type="submit" class="button send">Сохранить</button>
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
