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
          <el-button type="primary" class="searchButton">搜索</el-button>
        </div>
      </div>
      <div class="todoForm">
        <TodoForm
          :todos="todos"
          @update-todo="updateTodo"
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
import { ref } from 'vue'

// 定义待办事项数据 - 添加description字段
const todos = ref([
  { id: 1, title: '学习Vue3', description: '了解Vue3的组合式API', completed: false },
  { id: 2, title: '完成项目', description: '完成TODO应用的开发', completed: true },
])

// 更新待办事项状态
const updateTodo = (id) => {
  const todo = todos.value.find((t) => t.id === id)
  if (todo) {
    todo.completed = !todo.completed
  }
}

// 删除待办事项
const deleteTodo = (id) => {
  todos.value = todos.value.filter((t) => t.id !== id)
}
// 处理添加待办事项
const handleAddTodo = (todoData) => {
  const newTodo = {
    id: Date.now(),
    title: todoData.title,
    description: todoData.description || '',
    completed: false,
  }
  todos.value.push(newTodo)
}

// 处理编辑待办事项
const handleEditTodo = (todo) => {
  const index = todos.value.findIndex((t) => t.id === todo.id)
  if (index !== -1) {
    todos.value[index] = {
      ...todo,
      description: todo.description || '',
    }
  }
}

// 搜索关键字
const searchKeyword = ref('')
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
