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
      <div class="icon-banner">
        <div class="icon-banner-nav" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'IconLibrary'
});
</script>
<style lang="less" scoped>
.icon-library {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: #ddd;
  .icon-search {
    padding-top: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    .icon-search-box {
      width: 500px;
      height: 50px;
      border: 1px solid #dcd4b9;
      border-radius: 40px;
      background: rgba(239, 236, 223, 0.5);
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
          background-color: #f2debc;
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
}
</style>
