<template>
  <!-- 803 -->
  <div class="icon-shopcar">
    <el-drawer v-model="drawer" title="I am the title" :with-header="false">
      <div class="icon-car">
        <div class="icon-clear">
          <div class="icon-close">
            <el-icon @click="drawer = false"><ArrowRightBold /></el-icon>
          </div>
          <div class="icon-clear-car">
            <el-icon><Brush /></el-icon>
            <span>清空购物车</span>
          </div>
        </div>
        <div class="icon-ico">
          <div class="icon-icons">
            <div v-for="items in 10" :key="items" class="icon-item">
              <el-icon><Brush /></el-icon>
            </div>
          </div>
        </div>
        <div class="icon-footer">
          <div class="icon-foo">
            <div class="icon-add foot">添加至项目</div>
            <div class="icon-source foot">下载素材</div>
            <div class="icon-code foot">下载代码</div>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { ArrowRightBold, Brush } from '@element-plus/icons-vue';
export default defineComponent({
  name: 'ShopCar',
  components: { Brush, ArrowRightBold },
  setup() {
    const drawer = ref(false);
    const showcar = () => {
      drawer.value = true;
    };
    return {
      drawer,
      showcar
    };
  }
});
</script>
<style lang="less" scoped>
.icon-shopcar {
  :deep(.el-overlay) {
    .el-drawer {
      width: 21% !important;
      .el-drawer__body {
        padding: 0;
      }
    }
  }
}
.icon-shopcar {
  .icon-car {
    // background-color: aliceblue;
    .icon-clear {
      height: 60px;
      background-color: #0a0f30;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-right: 10px;
      .icon-close {
        width: 30px;
        height: 100%;
        background-color: red;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size: 20px;
      }
      .icon-clear-car {
        display: flex;
        align-items: center;
        color: #fff;
        span {
          margin-left: 5px;
          font-size: 14px;
        }
      }
    }
    .icon-ico {
      height: 380px;
      .icon-icons {
        margin-top: 30px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;

        .icon-item {
          font-size: 30px;
          margin: 0 10px 10px;
        }
      }
    }
    .icon-footer {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      background-color: #f7f7f7;
      height: 300px;
      .icon-foo {
        margin-top: 20px;
        .foot {
          margin-bottom: 25px;
          width: 180px;
          height: 35px;
          background-color: #dcd8d8;
          border-radius: 20px;
          text-align: center;
          padding-top: 5px;
        }
      }
    }
  }
}
</style>
