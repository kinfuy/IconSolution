import { reactive } from 'vue';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
  const userInfo = reactive({
    sessionid: '',
    id: '',
    name: '',
    avator: ''
  });

  return {
    userInfo
  };
});
