<script lang="ts" setup></script>
<template>
  <div class="user-info__detail">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-lg font-semibold text-main-text-color">Информация</h2>
      <router-link to="/edit-user" class="text-primary-color"
        >Редактировать</router-link
      >
    </div>
    <ul class="space-y-3 mb-6">
      <li><strong>Ф.И.О.</strong> Нигора Анисимова</li>
      <li><strong>ID пользователя</strong> 888767676</li>
      <li><strong>Должность, отдел</strong> Название должности и отдела</li>
      <li><strong>Логин</strong> nigora_rob@yahoo.com</li>
      <li><strong>Модератор</strong> имя модератора</li>
      <li><strong>Телефон номер</strong> +998 98 988 89 77</li>
    </ul>
    <button
      class="w-full py-2 text-danger-color bg-danger-bg-color rounded hover:bg-red-200"
    >
      Удалить учетную запись пользователя
    </button>
  </div>
</template>
<style lang="scss"></style>
