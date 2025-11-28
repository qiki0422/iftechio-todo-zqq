<template>
  <div class="page">
    <div class="title">TODO lIST</div>
    <div class="container">
      <div class="top">
        <div class="addButton">
          <el-icon><Plus /></el-icon>
        </div>
        <div class="search">
          <div class="searchInput">
            <input type="text" placeholder="请输入关键字" />
          </div>
          <button class="searchButton">搜索</button>
        </div>
      </div>
      <div class="todoForm"></div>
    </div>
  </div>
</template>

<style scoped>
.title {
  text-align: center;
  font-size: 50px;
  color: greenyellow;
}
.container {
  width: 500px;
  height: 100%;
  margin: 0 auto;
  background-color: beige;
}
.top {
  background-color: red;
  height: 30px;
  margin-bottom: 25px;
  display: flex;
  justify-content: space-between;
}
.addButton {
  width: 30px;
  height: 30px;
  background-color: blueviolet;
  display: flex;
  align-items: center;
  justify-content: center;
}
.search {
  width: 430px;
  background-color: azure;
  display: flex;
  justify-content: space-between;
}
.searchInput {
  width: 380px;
  background-color: black;
}
.todoForm {
  background-color: cadetblue;
  padding: 0 10px 0 10px;
}
</style>
<script setup></script>
