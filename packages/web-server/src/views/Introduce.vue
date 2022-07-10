<template>
  <div class="Introduce" @click="buildServer">打包</div>
</template>
<script lang="ts" setup>
import { buildGenerateApi } from '@apis/common';
const buildServer = () => {
  buildGenerateApi().then(res => {
    console.log('log=>Introduce=>8:res:%o', res);
  });
};
</script>
<style lang="less" scoped></style>
