import { ref } from 'vue';
import { defineStore } from 'pinia';

interface UserInfo {
  id: string;
  email: string;
  name: string;
  avator: string;
}
export const useUserStore = defineStore('user', () => {
  const userInfo = ref({
    id: '',
    email: '',
    name: '',
    avator: ''
  });

  function setUserinfo(user: UserInfo) {
    userInfo.value = user;
  }

  return {
    userInfo,
    setUserinfo
  };
});
