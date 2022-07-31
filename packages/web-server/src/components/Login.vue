<template>
  <div class="icon-lo">
    <el-dialog
      v-model="visible"
      :show-close="false"
      width="400px"
      custom-class="icon-dialog"
    >
      <template #header="{ titleId, titleClass, close }">
        <div class="my-header">
          <h4 v-if="!showMsg" :id="titleId" :class="titleClass">账号注册</h4>
          <h4 v-if="showMsg" :id="titleId" :class="titleClass">账号登录</h4>
          <el-button type="danger" @click="close">
            <el-icon class="el-icon--left" />
            ×
          </el-button>
        </div>
      </template>
      <!-- 1，账号注册-->
      <div v-if="!showMsg" class="icon-con">
        <!--💥 邮箱登录 -->
        <div class="icon-inputc">
          <input
            v-model="email"
            class="icon-text"
            type="text"
            placeholder="邮箱"
          />
        </div>
        <!-- 输入密码 -->
        <div class="icon-password-input">
          <input
            v-model="password"
            class="icon-password"
            type="password"
            placeholder="密码"
          />
        </div>
        <!-- 输入验证码 -->
        <div class="icon-inputp">
          <input
            v-model="code"
            class="icon-code"
            type="text"
            placeholder="验证码"
          />
          <button @click="getCode">
            <span v-if="time == 60">获取验证码</span>
            <span v-else>{{ time }}s</span>
          </button>
        </div>
      </div>
      <!--2，账号登录  -->
      <div v-if="showMsg" class="icon-con">
        <!--💥 邮箱手机号 -->
        <div class="icon-inputc">
          <input
            v-model="email"
            class="icon-text"
            type="text"
            placeholder="邮箱/手机号"
          />
        </div>
        <!-- 密码 -->
        <div class="icon-inputp">
          <input
            v-model="password"
            class="icon-password"
            type="password"
            placeholder="请输入密码"
          />
        </div>
      </div>
      <!-- 登录按钮 -->
      <div class="icon-footer">
        <div v-if="showMsg" class="icon-log" @click="getLogin">
          <button>登录</button>
        </div>
        <div v-if="!showMsg" class="icon-log" @click="getSignIn">
          <button>注册</button>
        </div>
      </div>
      <!--  底部提示-->
      <div class="icon-other">
        <!-- 切换登录页面 -->
        <a v-if="!showMsg" href="#" @click="handleMsg">已有账号？登录</a>
        <!-- 切换注册页面 -->
        <div v-if="showMsg" class="icon-more">
          <div class="icon-top">
            <a href="#" @click="handleMsg">账号注册</a>
            <a href="#">忘记密码？</a>
          </div>
          <!-- <div class="icon-bottom">密码登录</div> -->
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { reqGetCode, reqGetLogin, reqGetSignIn } from '../apis/common';
import { useUserStore } from '../store/user';
import type { ResponseOption } from '../apis/common';
export default defineComponent({
  name: 'Login',
  setup() {
    const store = useUserStore();
    const visible = ref(false);
    const show = () => {
      visible.value = true;
    };
    //切换登录和注册页面
    const showMsg = ref(true);
    function handleMsg() {
      showMsg.value = !showMsg.value;
    }
    //💧 一。730请求注册接口
    // 1.抽取公共判断部分方便调用
    const email = ref('');
    const password = ref('');
    const code = ref('');
    // 验证邮箱
    const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    function checkParams() {
      if (email.value === '' || password.value === '') {
        ElMessage.error('邮箱和密码不能为空哦');
        return;
      }
      if (!reg.test(email.value)) {
        ElMessage.error('邮箱格式不正确');
        return;
      }
      if (password.value.length < 6 || password.value.length > 12) {
        ElMessage.error('密码长度在6-16位');
        return;
      }
    }
    // 2.把定时器抽取出来
    const time = ref(60);
    let timer: any;
    function getTime() {
      timer = setInterval(() => {
        if (time.value !== 0) {
          time.value--;
        } else {
          clearInterval(timer);
          time.value = 60;
        }
      }, 1000);
    }
    //730 请求验证码接口
    function getCode() {
      // 防止重复请求，先判断定时器是否还在，还在就不执行
      if (timer) return;
      //1.得到请求结果
      checkParams();
      reqGetCode({ email: email.value, password: password.value }).then(
        (res: { code: string; data: any }) => {
          // eslint-disable-next-line no-debugger
          // debugger;
          if (res.code === '000000') {
            //🌸🌸2.点击后，验证成功后，才开始倒计时60秒
            getTime();
            // return res.data;//这里不需要获得数据，成功的回调可以不写
          }
        }
      );
      /*  .catch(error => {
          console.log(error);
        }); */
    }
    //🔥 注册成功后清除定时器，时间=60秒显示 获取验证码，清除input框的值
    function clear() {
      clearInterval(timer);
      time.value = 60;
      email.value = '';
      password.value = '';
      code.value = '';
    }
    // 730请求注册接口
    function getSignIn() {
      // 1.判断邮箱和密码
      checkParams();
      // 2.额外判断验证码是否传值
      if (code.value === '') return;
      // 后端需要接收传过去的参数email,password,code验证码
      reqGetSignIn({
        email: email.value,
        password: password.value,
        code: code.value
      }).then((res: ResponseOption) => {
        //这里res成功的类型限制也可以直接这样写，因为ResponseOption本身就是api里面给接口数据限制的类型
        if (res.code === '000000') {
          ElMessage.success('注册成功！');
          //🔥 注册成功后清除定时器，时间=60秒显示 获取验证码,清空密码邮箱验证码
          clear();
          showMsg.value = true; //注册成功跳到登录界面
        }
      });
    }
    //💧二.731 请求登录接口
    function getLogin() {
      // 判断邮箱和密码
      checkParams();
      reqGetLogin({ email: email.value, password: password.value }).then(
        res => {
          store.setUserinfo(res.data);
          // 响应拦截器配置了失败的回调 所以这里可以不写
          ElMessage.success('登录成功');
        }
      );
    }
    return {
      visible,
      show,
      showMsg,
      handleMsg,
      getCode,
      getSignIn,
      email,
      password,
      code,
      reg,
      checkParams,
      time,
      getTime,
      clear,
      getLogin
    };
  }
});
</script>

<style lang="less" scoped>
.icon-lo {
  :deep(.icon-dialog) {
    border-radius: 5px;
    .my-header {
      display: flex;
      flex-direction: row;
      justify-content: center;
      position: relative;
      margin-top: 20px;
      .el-button {
        font-size: 30px;
        color: black;
        background-color: #fff;
        border: none;
        position: absolute;
        margin-left: 335px;
        vertical-align: middle;
        color: #3b9a9c;
        margin-top: -3px;
        span {
          i {
            display: none;
          }
        }
      }
    }
    .el-dialog__body {
      padding-top: 0px;
    }
    .icon-con {
      margin: 0 0 40px 0;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .icon-inputc,
      .icon-password-input,
      .icon-inputp {
        width: 309px;
        height: 41px;
        margin-top: 30px;
        font-size: 16px;
        position: relative;
        .icon-text,
        .icon-password,
        .icon-code {
          width: 100%;
          height: 100%;
          padding-left: 16px;
          font-size: 16px;
        }
        button {
          position: absolute;
          top: 0;
          right: 13px;
          height: 100%;
          background-color: transparent;
          border: none;
          color: #007fff;
          cursor: pointer;
        }
      }
      //#region
      // .icon-password {
      //   width: 309px;
      //   height: 41px;
      //   margin-top: 30px;
      //   font-size: 16px;
      //   padding-left: 16px;
      // }
      // .icon-input {
      //   width: 309px;
      //   height: 41px;
      //   .icon-text {
      //     width: 309px;
      //     height: 41px;
      //     font-size: 16px;
      //     padding-left: 16px;
      //   }
      // }
      //#endregion
    }
    .icon-footer {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .icon-log {
        button {
          width: 200px;
          height: 41px;
          background-color: #2694ab;
          border: none;
          color: #fff;
          font-size: 16px;
        }
      }
    }
    .icon-other {
      margin-top: 25px;
      text-indent: left;
      a {
        text-decoration: none;
        margin: 0 28px;
      }
      .icon-more {
        display: flex;
        flex-direction: column;
        .icon-top,
        .icon-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .icon-bottom {
          justify-content: space-around;
          margin-top: 15px;
        }
      }
    }
  }
}
</style>
