import { ref } from 'vue';
import { defineStore } from 'pinia';
//interface和type一样 声明一个类型
interface UserInfo {
  id: string;
  email: string;
  name: string;
  avator: string;
}
// 和组件里面setup一样的用法，只是库定义不一样
export const useUserStore = defineStore('user', () => {
  const userInfo = ref({
    id: '',
    email: '',
    name: '',
    avator: ''
  });

  function setUserinfo(user: UserInfo) {
    //user遵循userinfo的类型定义
    userInfo.value = user;
  }
  return {
    userInfo,
    setUserinfo
  };
});
