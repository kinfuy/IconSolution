<template>
  <el-button @click="visible = true"> 登录页 </el-button>
  <el-dialog v-model="visible" :show-close="false">
    <template #header="{ titleId, titleClass, close }">
      <div class="my-header">
        <h4 :id="titleId" :class="titleClass">登入</h4>
        <el-button type="danger" @click="close">
          <el-icon class="el-icon--left" />
          Close
        </el-button>
      </div>
    </template>
    <div class="icon-con">
      <input type="text" placeholder="账户" />
      <input type="password" placeholder="密码" />
    </div>
    <div class="icon-footer">
      <div class="icon-log"><a href="#">登入</a></div>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ElButton, ElDialog } from 'element-plus';

const visible = ref(false);
</script>

<style scoped>
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
>>>>>>> 766caf6dae6a3d1c67a0b90bda81c47c93c91f51
