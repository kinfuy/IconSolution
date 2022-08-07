<template>
  <div class="icon-upload">
    <div class="icon-wrapper">
      <div class="icon-box">
        <div class="icon-svg">
          <el-icon :size="100" color="#f67504"><Orange /></el-icon>
        </div>
        <div class="icon-description">
          <div class="tips">将图标 SVG 文件拖拽至框内上传</div>
          <!-- 81⭐️accept 属性限制了上传文件的类型。这里使用 image/* 限制只能选择图片文件 -->
          <input type="file" accept="image/*" multiple @change="uploadFile" />
          <button id="submit">上传图标</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Orange } from '@element-plus/icons-vue';
export default defineComponent({
  name: 'Upload',
  components: { Orange },
  setup() {
    function uploadFile(this: { uploadFile: () => void }) {
      console.log(this);
    }
    return {
      uploadFile
    };
  }
});
</script>
<style lang="less" scoped>
.icon-upload {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  // background-color: antiquewhite;
  .icon-wrapper {
    width: 90%;
    height: 100%;
    min-height: 530px;
    // background-color: rgb(232, 242, 242);
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    .icon-box {
      background-color: rgb(249, 247, 247);
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .icon-svg {
        width: 400px;
        height: 200px;
        border: 1px dashed black;
        margin-bottom: 65px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .icon-description {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .tips {
          margin-bottom: 30px;
        }
        button {
          width: 100px;
          height: 36px;
          background-color: red;
          color: #fff;
          border: none;
          border-radius: 18px;
        }
      }
    }
  }
}
</style>
