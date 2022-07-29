<template>
  <el-button @click="visible = true"> 登录测试 </el-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ElButton, ElDialog } from 'element-plus';

const visible = ref(false);
</script>
