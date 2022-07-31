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
          <h4 :id="titleId" :class="titleClass">
            {{ inputType ? '账号登录' : '账号注册' }}
          </h4>
          <el-icon class="header-close" :size="20" color="#333" @click="close">
            <Close />
          </el-icon>
        </div>
      </template>
      <!-- 1，账号注册-->
      <div class="icon-con">
        <!--💥 邮箱登录 -->
        <div class="icon-inputc">
          <el-input
            v-model="email"
            class="icon-text"
            type="text"
            placeholder="邮箱"
            :prefix-icon="Message"
          />
        </div>
        <!-- 输入密码 -->
        <div class="icon-password-input">
          <el-input
            v-model="password"
            class="icon-password"
            type="password"
            placeholder="密码"
            :prefix-icon="Key"
          />
        </div>
        <!-- 输入验证码 -->
        <div v-if="!inputType" class="icon-inputp">
          <el-input
            v-model="code"
            class="icon-code"
            type="text"
            placeholder="验证码"
          />
          <button @click="getCode">
            <span v-if="countTime == 60">获取验证码</span>
            <span v-else>{{ countTime }}s</span>
          </button>
        </div>
      </div>
      <!-- 登录按钮 -->
      <div class="icon-footer">
        <div class="icon-log" @click="handleSubmit">
          {{ inputType ? '登录' : '注册' }}
        </div>
      </div>
      <!--  底部提示-->
      <div class="icon-other">
        <!-- 切换登录页面 -->
        <span class="icon-tips" @click="handleSwitch">{{
          inputType ? '账号注册' : '已有账号？登录'
        }}</span>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { Close, Key, Message } from '@element-plus/icons-vue';
import { reqGetCode, reqGetLogin, reqGetSignIn } from '../apis/common';
import { useUserStore } from '../store/user';
import type { ResponseOption } from '../apis/common';
export default defineComponent({
  name: 'Login',
  components: { Close },
  setup() {
    const store = useUserStore();
    const visible = ref(false);
    const show = () => {
      visible.value = true;
    };

    //切换登录和注册页
    const inputType = ref(true); // true 登录 // fasle- 注册

    const handleSwitch = () => {
      inputType.value = !inputType.value;
      clear();
    };
    //💧 一。730请求注册接口
    // 1.抽取公共判断部分方便调用
    const email = ref('');
    const password = ref('');
    const code = ref('');
    // 验证邮箱
    const checkParams = () => {
      const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (email.value === '' || password.value === '') {
        ElMessage.error('邮箱和密码不能为空哦');
        return false;
      }
      if (!reg.test(email.value)) {
        ElMessage.error('邮箱格式不正确');
        return false;
      }
      if (password.value.length < 6 || password.value.length > 12) {
        ElMessage.error('密码长度在6-16位');
        return false;
      }
      return true;
    };
    // 2.把定时器抽取出来
    const countTime = ref(60);
    let timer: any;
    const getTime = () => {
      timer = setInterval(() => {
        if (countTime.value !== 0) {
          countTime.value--;
        } else {
          clearInterval(timer);
          countTime.value = 60;
        }
      }, 1000);
    };
    //730 请求验证码接口
    const getCode = () => {
      // 防止重复请求，先判断定时器是否还在，还在就不执行
      if (timer) return;
      //1.得到请求结果
      if (!checkParams()) return;
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
    };
    //🔥 注册成功后清除定时器，时间=60秒显示 获取验证码，清除input框的值
    const clear = () => {
      clearInterval(timer);
      countTime.value = 60;
      email.value = '';
      password.value = '';
      code.value = '';
    };
    // 730请求注册接口
    const getSignIn = () => {
      // 1.判断邮箱和密码
      if (!checkParams()) return;
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
          inputType.value = true;
        }
      });
    };
    //💧二.731 请求登录接口
    const getLogin = () => {
      // 判断邮箱和密码
      if (!checkParams()) return;
      reqGetLogin({ email: email.value, password: password.value }).then(
        res => {
          store.setUserinfo(res.data);
          // 响应拦截器配置了失败的回调 所以这里可以不写
          ElMessage.success('登录成功');
        }
      );
    };

    const handleSubmit = () => {
      if (inputType.value) getLogin();
      else getSignIn();
    };
    return {
      Message,
      Key,
      visible,
      show,
      handleSwitch,
      getCode,
      getSignIn,
      email,
      password,
      code,
      checkParams,
      countTime,
      getTime,
      clear,
      getLogin,
      handleSubmit,
      inputType
    };
  }
});
</script>

<style lang="less" scoped>
.icon-lo {
  :deep(.icon-dialog) {
    border-radius: 5px;
    .el-dialog__header {
      margin-right: 0;
    }
    .my-header {
      display: flex;
      justify-content: center;
      position: relative;
      .header-close {
        position: absolute;
        right: 0;
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
        width: 300px;
        height: 41px;
        margin-top: 30px;
        font-size: 16px;
        position: relative;
        .icon-text,
        .icon-password,
        .icon-code {
          width: 100%;
          height: 100%;
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
    }
    .icon-footer {
      display: flex;
      justify-content: center;
      align-items: center;
      .icon-log {
        width: 300px;
        height: 41px;
        background-color: #2694ab;
        line-height: 41px;
        text-align: center;
        border: none;
        color: #fff;
        font-size: 16px;
      }
    }
    .icon-other {
      margin-top: 20px;
      margin-left: 20px;
      .icon-tips {
        &:hover {
          color: #f67504;
        }
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
