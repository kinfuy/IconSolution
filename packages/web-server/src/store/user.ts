import { ref } from 'vue';
import { defineStore } from 'pinia';

export interface UserInfo {
  id: string;
  email: string;
  name: string;
  avator: string;
}
// 和组件里面setup一样的用法，只是库定义不一样
export const useUserStore = defineStore('user', () => {
  const isLogin = ref(false);
  const userInfo = ref({
    id: '',
    email: '',
    name: '',
    avator: ''
  });

  function setUserinfo(user: UserInfo) {
    //user遵循userinfo的类型定义
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
