<template>
  <el-button @click="visible = true">
    Open Dialog with customized header
  </el-button>
  <el-dialog v-model="visible" :show-close="false">
    <template #header="{ titleId, titleClass }">
      <div class="my-header">
        <h4 :id="titleId" :class="titleClass">登入</h4>
        <!-- <el-button type="danger" @click="close">
          <el-icon class="el-icon--left" />
          Close
        </el-button> -->
      </div>
    </template>
    <div class="icon-con">1</div>
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
