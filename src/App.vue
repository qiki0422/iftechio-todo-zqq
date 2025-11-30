<template>
  <div class="page">
    <div class="title">TODO lIST</div>
    <div class="container">
      <div class="top">
        <div class="search">
          <el-input
            v-model="searchKeyword"
            placeholder="请输入关键字"
            class="searchInput"
            prefix-icon="Search"
          />
          <el-button type="primary" class="searchButton" @click="handleSearch">搜索</el-button>
        </div>
      </div>
      <div class="todoForm">
        <TodoForm
          :todos="filteredTodos"
          @update-todo="toggleTodo"
          @delete-todo="deleteTodo"
          @edit-todo="handleEditTodo"
          @add-todo="handleAddTodo"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import TodoForm from './components/todo/todoForm.vue'
import { ref, computed } from 'vue'
import { useTodos } from './composables/useTodos'

// 使用待办事项管理钩子
const { addTodo, toggleTodo, updateTodo, deleteTodo, searchTodos } = useTodos()

// 处理添加待办事项
const handleAddTodo = (todoData) => {
  addTodo(todoData)
}

// 处理编辑待办事项
const handleEditTodo = (todo) => {
  updateTodo(todo)
}

// 搜索关键字
const searchKeyword = ref('')
// 实际用于搜索的查询参数
const searchQuery = ref('')

// 过滤后的待办事项
const filteredTodos = computed(() => {
  return searchTodos(searchQuery.value)
})

// 处理搜索
const handleSearch = () => {
  console.log('通过搜索按钮触发搜索:', searchKeyword.value)
  // 将输入框中的内容设置为实际搜索查询
  searchQuery.value = searchKeyword.value
}
</script>
<style scoped>
.title {
  text-align: center;
  font-size: 50px;
  color: skyblue;
}
.container {
  width: 500px;
  height: 100%;
  margin: 0 auto;
}
.top {
  margin-bottom: 25px;
  width: 100%;
}
.search {
  width: 100%;
  display: flex;
  gap: 10px;
}
.searchInput {
  flex: 1;
}
.searchButton {
  white-space: nowrap;
}
</style>
