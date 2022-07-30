<template>
  <div class="icon-library">
    <div class="icon-search">
      <div class="icon-search-box">
        <div class="icon-btn">
          <button>Search</button>
        </div>
        <div class="icon-ipt"><input type="text" placeholder="......" /></div>
      </div>
    </div>
    <div class="icon-main">
      <div class="icon-main-box">
        <div class="icon-banner">
          <div class="icon-banner-nav nav-active">全部图标</div>
          <div class="icon-banner-nav">logo</div>
        </div>
        <div class="icon-content">
          <div class="icon-con">
            <div v-for="items in 6" :key="items" class="icon-con-item">
              <i
                v-for="item in 15"
                :key="item"
                class="iconfont icon-dangaojuan"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'IconLibrary',
  setup() {}
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
      border: 1px solid #dcd4b9;
      border-radius: 40px;
      // background: rgba(239, 236, 223, 0.5);
      display: flex;
      justify-content: space-between;
      align-items: center;
      overflow: hidden;
      .icon-btn {
        width: 130px;
        height: 40px;
        border: 1px solid #dad5b5;
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
    min-height: 700px;
    // background-color: rgb(253, 249, 249);
    .icon-main-box {
      margin: 0 100px;
      // 图标选项
      .icon-banner {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        // border-bottom: 1px solid #ccc;
        .icon-banner-nav {
          margin: 10px 20px 30px;
          cursor: pointer;
        }
        .nav-active {
          border-bottom: 3px solid #f2debc;
        }
      }
      // 图标盒子
      .icon-content {
        margin: 10px 0;
        .icon-con {
          background-color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          .icon-con-item {
            margin: 22px 33px 20px 12px;
            padding: 20px 0;
            width: 316px;
            white-space: wrap;
            background-color: rgba(246, 245, 242, 0.5);
            border-radius: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            .iconfont {
              font-size: 30px;
              margin: 20px 16px;
            }
          }
        }
      }
    }
  }
  // 图标库模块
}
</style>
