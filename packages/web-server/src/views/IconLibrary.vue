<template>
  <div class="icon-library">
    <div class="icon-search">
      <div class="icon-search-box">
        <div class="icon-btn">
          <button>Search</button>
        </div>
        <div class="icon-ipt"><input type="text" /></div>
      </div>
    </div>
    <div class="icon-main">
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="全部图标" name="all">
          <div class="icon-content">
            <div class="icon-con">
              <div v-for="items in 6" :key="items" class="icon-con-item">
                <el-icon v-for="item in 15" :key="item" class="icon-item">
                  <Message />
                </el-icon>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="线性图标" name="line">线性图标</el-tab-pane>
        <el-tab-pane label="多色图标" name="color">多色图标</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Message } from '@element-plus/icons-vue';

export default defineComponent({
  name: 'IconLibrary',
  components: { Message },
  setup() {
    const activeName = ref('all');
    return {
      activeName
    };
  }
});
</script>
<style lang="less" scoped>
.icon-library {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  // background-color: #ddd;
  min-width: 1080px;
  // 搜索框模块
  .icon-search {
    padding: 50px 0 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    .icon-search-box {
      width: 500px;
      height: 50px;
      border: 1px solid #666;
      border-radius: 40px;
      // background: rgba(239, 236, 223, 0.5);
      display: flex;
      justify-content: space-between;
      align-items: center;
      overflow: hidden;
      .icon-btn {
        width: 130px;
        height: 40px;
        border-radius: 40px;
        overflow: hidden;
        margin-left: 4px;
        button {
          width: 100%;
          height: 100%;
          color: #fff;
          font-weight: 700;
          font-size: 20px;
          background-color: #f67504;
          border: none;
        }
      }
      .icon-ipt {
        input {
          width: 342px;
          height: 50px;
          border-radius: 40px;
          background-color: transparent;
          border: none;
          outline: none;
          font-size: 20px;
        }
      }
    }
  }
  .icon-main {
    width: 1100px;
    margin: 0 auto;
    min-height: 700px;
    // background-color: rgb(253, 249, 249);
    .icon-content {
      margin: 10px 0;
      .icon-con {
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        .icon-con-item {
          margin: 0 33px 20px 12px;
          width: 316px;
          white-space: wrap;
          background-color: rgba(246, 245, 242, 0.5);
          border-radius: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          .icon-item {
            font-size: 30px;
            margin: 20px 16px;
            cursor: pointer;
          }
        }
      }
    }
  }
  // 图标库模块
}
</style>
