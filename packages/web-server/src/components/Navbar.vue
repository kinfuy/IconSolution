<template>
  <div class="icon-nav">
    <div class="icon-navbar">
      <div class="common icon-left">
        <div class="iconfont">
          <div class="icon-logo">
            <router-link to="/"
              ><img src="/logo.svg" alt="icon-solution"
            /></router-link>
          </div>
          <div class="icon-title">icon-solution</div>
        </div>
        <div class="icon-item">
          <li><router-link to="/">图标库</router-link></li>
          <li><router-link to="/project">项目</router-link></li>
          <li><router-link to="/team">团队</router-link></li>
        </div>
      </div>
      <div class="icon-right common">
        <div class="icon-avatar">
          <!-- <img src="/壁纸小狐狸.png" alt="" /> -->
        </div>
        <div class="icon-person">
          <router-link to="/homepage">个人主页</router-link>
        </div>
        <div class="icon-login">
          <a @click="loginRef.show()">登录</a>
          <Login ref="loginRef" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import Login from './Login.vue';
export default {
  name: 'NavBar',
  components: { Login },
  setup() {
    const loginRef = ref(null); //相当于拿到login组件，可以调用里面的方法
    return {
      loginRef
    };
  }
};
</script>

<style lang="less" scoped>
.icon-nav {
  position: relative;
  width: 100%;
  height: 55px;
  // background-color: rgba(0, 0, 0, 0.2);
  .icon-navbar {
    position: absolute;
    width: 80%;
    height: 55px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-width: 1080px;
    .common {
      display: flex;
      justify-self: center;
      align-items: center;
    }
    .icon-left {
      .iconfont {
        display: flex;
        justify-self: center;
        align-items: center;
        margin-left: 150px;
        margin-right: 50px;
        cursor: pointer;
        .icon-logo {
          margin-right: 10px;
          a {
            img {
              width: 25px;
              height: 25px;
              border-radius: 50%;
              vertical-align: middle;
            }
          }
        }
        .icon-title {
          font-size: 20px;
          font-weight: 700;
          color: #f67504;
        }
      }
      .icon-item {
        display: flex;
        justify-content: center;
        align-items: center;
        li {
          list-style: none;
          margin: 0 30px;
          a {
            text-decoration: none;
            color: black;
          }
        }
      }
    }
    .icon-right {
      color: #fff;
      cursor: pointer;
      .icon-avatar {
        margin-right: 20px;
        img {
          width: 25px;
          height: 25px;
          border-radius: 50%;
          vertical-align: middle;
        }
      }
      .icon-person,
      .icon-login {
        margin: 0 45px 0 0;
        a {
          text-decoration: none;
          color: black;
        }
      }
    }
  }
}
</style>
