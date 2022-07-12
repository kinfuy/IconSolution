<template>
  <div class="Introduce" @click="buildServer">打包</div>
</template>
<script lang="ts" setup>
import { createGenerateApi } from '@apis/common';
const buildServer = () => {
  createGenerateApi({
    name: 'test-icon',
    svgs: [],
    version: '1.0.0'
  }).then(res => {
    console.log('log=>Introduce=>8:res:%o', res);
  });
};
</script>
<style lang="less" scoped></style>
