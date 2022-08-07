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
        <!--803 购物车 -->
        <div class="icon-shop">
          <el-icon :size="25" @click="shopCarRef.showcar()"
            ><ShoppingCartFull
          /></el-icon>
          <ShopCar ref="shopCarRef" />
        </div>
        <!-- 文件上传 -->
        <div class="icon-upload">
          <router-link to="/upload"
            ><el-icon :size="25"><MostlyCloudy /></el-icon
          ></router-link>
        </div>
        <!-- 登录成功后的个人头像 -->
        <!-- 先写死方便调试 -->
        <!-- <div class="icon-avatar"> -->
        <div class="icon-avatar">
          <!-- 🔥点击图片才出现下拉框 -->
          <el-dropdown v-if="store.isLogin" trigger="click">
            <img :src="`api${store.userInfo.avator}`" alt="" />
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>我的主页</el-dropdown-item>
                <el-dropdown-item>我的图标</el-dropdown-item>
                <el-dropdown-item divided>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <!-- 登录 -->
        <div v-if="!store.isLogin" class="icon-login">
          <!-- 点击展示模态框 -->
          <a @click="loginRef.show()">登录</a>
          <Login ref="loginRef" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { MostlyCloudy, ShoppingCartFull } from '@element-plus/icons-vue';
import { useUserStore } from '../store/user';
import Login from './Login.vue';
import ShopCar from './ShopCar.vue';

export default {
  name: 'NavBar',
  components: { Login, MostlyCloudy, ShoppingCartFull, ShopCar },
  setup() {
    const loginRef = ref(null); //<Login ref="loginRef" />相当于拿到login组件，可以调用里面的方法
    const shopCarRef = ref(null);
    const store = useUserStore();
    return {
      loginRef,
      shopCarRef,
      store
    };
  }
};
</script>

<style lang="less" scoped>
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
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
        }
      }
    }
    .icon-right {
      cursor: pointer;
      .icon-upload,
      .icon-shop {
        margin-top: 8px;
        margin-left: 40px;
      }
      .icon-avatar {
        margin: 0 30px;
        img {
          width: 25px;
          height: 25px;
          border-radius: 50%;
          vertical-align: middle;
        }
      }
      .icon-login {
        margin: 0 45px 0 0;
      }
    }
  }
}
a {
  text-decoration: none;
  color: black;
}
</style>
