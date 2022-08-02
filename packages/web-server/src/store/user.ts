import { defineStore } from 'pinia';

export interface UserInfo {
  id: string;
  email: string;
  name: string;
  avator: string;
}
// 和组件里面setup一样的用法，只是库定义不一样
export const useUserStore = defineStore('user', {
  state: () => ({
    isLogin: false,
    userInfo: {
      id: '',
      email: '',
      name: '',
      avator: ''
    }
  }),
  getters: {},
  // 持久化
  persist: {
    key: 'user-store',
    storage: window.localStorage
  },
  actions: {
    setUserinfo(user: UserInfo, login = true) {
      this.userInfo = user;
      this.isLogin = login;
    },
    loginout() {
      this.isLogin = false;
      this.userInfo = {
        id: '',
        email: '',
        name: '',
        avator: ''
      };
    }
  }
});
