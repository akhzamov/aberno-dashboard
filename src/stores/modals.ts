import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { baseUrl, defHeader } from "@/api";
import axios from "axios";
import router from "@/router";
import { watch } from "vue";

export const useModalStore = defineStore("modals", {
  state: () => ({
    activeTab: 1,
    loader: false,
    successModal: false,
    successModalText: "",
    infoModal: false,
    infoModalText: "",
    dangerModal: false,
    dangerModalText: "",
    warningModal: false,
    warningModalText: "",
  }),
  actions: {
    setLoading(status: boolean) {
      this.loader = status;
    },
  },
});
