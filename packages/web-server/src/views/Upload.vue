<template>
  <div class="icon-upload">
    <div v-if="!showCreateIconModel" class="icon-wrapper">
      <div class="icon-box">
        <div class="icon-svg">
          <el-icon :size="100" color="#f67504"><Orange /></el-icon>
        </div>
        <div class="icon-description">
          <div class="tips">将图标 SVG 文件拖拽至框内上传</div>
          <!-- 81⭐️accept 属性限制了上传文件的类型。这里使用 image/* 限制只能选择图片文件 -->
          <label>
            <div class="icon-merge">
              <input
                type="file"
                accept="image/*"
                multiple
                class="icon-input"
                @change="uploadFile"
              />
              <button id="submit" class="icon-btn">上传图标</button>
            </div>
          </label>
        </div>
      </div>
    </div>
    <div v-if="showCreateIconModel" class="icon-success-upload">
      <div class="icon-choose">
        <div class="icon-left"><img :src="`api${images}`" alt="图标" /></div>
        <div class="icon-right">
          <label class="icon-name">
            <span>名称</span>
            <el-input v-model="inputName" type="text" />
          </label>
          <label class="icon-desc">
            <span>描述</span>
            <el-input v-model="inputDesc" type="text" />
          </label>
          <!-- 自定义标签 -->
          <div class="icon-des">
            <span> 关键字 </span>
            <el-tag
              v-for="tag in dynamicTags"
              :key="tag"
              class="mx-1"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
            >
              {{ tag }}
            </el-tag>
            <!-- 输入的值inputVisible，最终push到dynamicTags里面 -->
            <el-input
              v-if="inputVisible"
              ref="InputRef"
              v-model="inputValue"
              class="ml-1 w-20"
              size="small"
              @keyup.enter="handleInputConfirm"
              @blur="handleInputConfirm"
            />
            <el-button
              v-else
              class="button-new-tag ml-1"
              size="small"
              @click="showInput"
            >
              + New Tag
            </el-button>
          </div>
        </div>
      </div>
      <div class="icon-submit">
        <button @click="getIcon">提 交</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, nextTick, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { Orange } from '@element-plus/icons-vue';
import { createIconApi, uploadfileApi } from '../apis/common';
import type { ResponseOption } from '../apis/common';
export default defineComponent({
  name: 'Upload',
  components: { Orange },
  setup() {
    //展示上传图标页面或者提交图标页面
    const showCreateIconModel = ref(false);
    // 🌼文件上传
    const images = ref('');
    function uploadFile(e: any) {
      const formData = new FormData();
      // console.log(e.target.files[0]);
      formData.append('file', e.target.files[0]);
      uploadfileApi(formData).then((res: ResponseOption) => {
        if (res.code == '000000') {
          // console.log(res.data);
          showCreateIconModel.value = true; //请求成功跳到提交页面
          images.value = res.data.url; //提交文件后返回的地址，接收拿来用
        }
      });
    }
    // 展示第二个页面
    const inputValue = ref('');
    const dynamicTags = ref<string[]>([]);
    const inputVisible = ref(false);
    const InputRef = ref();
    //引入的input框代码
    // 关闭标签-点击到谁的索引就删掉哪位
    const handleClose = (tag: string) => {
      dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1);
    };

    const showInput = () => {
      inputVisible.value = true;
      nextTick(() => {
        InputRef.value!.input!.focus();
      });
    };
    // 把添加的tag标签push到tag里面
    const handleInputConfirm = () => {
      //807标签不能重复
      if (inputValue.value.trim()) {
        const index = dynamicTags.value.findIndex(x => x === inputValue.value);
        if (index !== -1) {
          ElMessage.error('标签名不能重复哦！');
          return;
        }
        dynamicTags.value.push(inputValue.value);
      }
      inputVisible.value = false;
      inputValue.value = '';
    };
    // 三个input框双向绑定的数据
    const inputName = ref('');
    const inputDesc = ref('');
    // 提交图标
    //💧 验证图标信息
    const checkQuery = () => {
      if (inputName.value === '' || inputDesc.value === '') {
        ElMessage.error('名称、标签、描述都不能为空哦');
        return false;
      }
      return true;
    };
    //🌼 提交 请求创建图标接口
    const getIcon = () => {
      // 1.判断图标信息是否为空
      if (!checkQuery()) return;
      // 2.判断-标签不能为空
      if (dynamicTags.value.length === 0) {
        ElMessage.error('标签至少写一个');
        return false;
      }
      //
      const query = {
        name: inputName.value,
        keywords: dynamicTags.value.join(','),
        description: inputDesc.value,
        path: images.value
      };
      createIconApi(query).then((res: ResponseOption) => {
        if (res.code == '000000') {
          // console.log(res.data);
        }
      });
    };
    return {
      uploadFile,
      images,
      inputName,
      inputDesc,
      showCreateIconModel,
      handleClose,
      showInput,
      handleInputConfirm,
      dynamicTags,
      inputVisible,
      inputValue,
      InputRef,
      checkQuery,
      getIcon
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
        // border: 1px dashed black;
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
        .icon-merge {
          position: relative;
          display: inline-block;
          .icon-input {
            position: absolute;
            width: 100px;
            height: 36px;
            z-index: 1;
            opacity: 0;
          }
          .icon-btn {
            position: relative;
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
  // 807
  .icon-success-upload {
    min-height: 500px;
    // background-color: rgb(249, 247, 244);
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    .icon-choose {
      width: 80%;
      padding: 100px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .icon-left {
        width: 500px;
        min-height: 500px;
        background-color: aliceblue;
        margin-right: 50px;
        img {
          width: 80px;
          height: 80px;
        }
      }
      .icon-right {
        width: 500px;
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        // flex-wrap: nowrap;
        .icon-name,
        .icon-tag,
        .icon-desc {
          width: 382px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: nowrap;
          margin-bottom: 30px;
          span {
            width: 42px;
          }
        }
        .icon-des {
          margin-bottom: 35px;
          margin-top: 20px;
          span {
            margin-right: 10px;
          }
          .el-tag {
            width: 70px;
            height: 34px;
            color: black;
            margin-right: 31px;
            margin-bottom: 20px;
          }
        }
      }
    }
    .icon-submit {
      button {
        width: 100px;
        height: 35px;
        background-color: #2694ab;
        border-radius: 5px;
        border: none;
        color: #fff;
        cursor: pointer;
      }
    }
  }
}
</style>
