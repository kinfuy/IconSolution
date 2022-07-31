import { ref } from 'vue';
import { defineStore } from 'pinia';

export interface UserInfo {
  id: string;
  email: string;
  name: string;
  avator: string;
}
export const useUserStore = defineStore('user', () => {
  const isLogin = ref(false);
  const userInfo = ref({
    id: '',
    email: '',
    name: '',
    avator: ''
  });
  //
  function setUserinfo(user: UserInfo) {
    userInfo.value = user;
    isLogin.value = true;
  }

  function loginout() {
    isLogin.value = false;
    userInfo.value = {
      id: '',
      email: '',
      name: '',
      avator: ''
    };
  }

  return {
    userInfo,
    isLogin,
    setUserinfo,
    loginout
  };
});
