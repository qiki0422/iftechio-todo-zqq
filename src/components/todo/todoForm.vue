<template>
  <div class="todoForm">
    <!-- 添加按钮 -->
    <el-button type="primary" @click="addTodo" style="margin-bottom: 20px;">
      新增待办事项
    </el-button>
    
    <div class="todoItem" v-for="todo in todos" :key="todo.id">
      <input type="checkbox" :checked="todo.completed" @change="toggleTodo(todo.id)" />
      <div class="todoContent">
        <h4 :class="{ completed: todo.completed }">{{ todo.title }}</h4>
        <p v-if="todo.description" :class="{ completed: todo.completed }" class="todoDescription">
          {{ todo.description }}
        </p>
      </div>
      <button class="editBtn" @click="editTodo(todo)">
        <el-icon><Edit /></el-icon>
      </button>
      <button class="deleteBtn" @click="deleteTodo(todo.id)">
        <el-icon><Delete /></el-icon>
      </button>
    </div>
    <div v-if="todos.length === 0" class="emptyTip">暂无待办事项</div>
    
    <!-- 待办事项对话框 -->
    <TodoDialog
      v-model:visible="dialogVisible"
      :mode="dialogMode"
      :todo-data="currentTodo"
      @confirm="handleDialogConfirm"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Delete, Edit } from '@element-plus/icons-vue'
import TodoDialog from './TodoDialog.vue'

// 定义props
const props = defineProps({
  todos: {
    type: Array,
    default: () => [],
  },
})

// 定义emits
const emit = defineEmits(['update-todo', 'delete-todo', 'edit-todo', 'add-todo'])

// 对话框相关状态
const dialogVisible = ref(false)
const dialogMode = ref('add')
const currentTodo = ref({})

// 切换待办事项状态
const toggleTodo = (id) => {
  emit('update-todo', id)
}

// 编辑待办事项
const editTodo = (todo) => {
  dialogMode.value = 'edit'
  currentTodo.value = { ...todo }
  dialogVisible.value = true
}

// 添加待办事项
const addTodo = () => {
  dialogMode.value = 'add'
  currentTodo.value = {}
  dialogVisible.value = true
}

// 删除待办事项
const deleteTodo = (id) => {
  emit('delete-todo', id)
}

// 处理对话框确认
const handleDialogConfirm = (todoData) => {
  if (dialogMode.value === 'add') {
    emit('add-todo', todoData)
  } else {
    emit('edit-todo', { ...currentTodo.value, ...todoData })
  }
}
</script>

<style scoped>
.todoForm {
  padding: 10px 0;
}

.todoItem {
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.todoItem input[type='checkbox'] {
  margin-right: 10px;
  width: 18px;
  height: 18px;
}

.todoContent {
  flex: 1;
}

.todoContent h4 {
  margin: 0 0 5px 0;
  font-size: 16px;
  font-weight: normal;
  transition: all 0.3s;
}

.todoContent .todoDescription {
  margin: 0;
  font-size: 14px;
  color: #666;
  transition: all 0.3s;
}

.todoItem .completed {
  text-decoration: line-through;
  color: #999;
}

.editBtn {
  background: none;
  border: none;
  color: #1890ff;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  margin-right: 5px;
  transition: background-color 0.3s;
}

.editBtn:hover {
  background-color: #e6f7ff;
}

.deleteBtn {
  background: none;
  border: none;
  color: #ff4d4f;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.deleteBtn:hover {
  background-color: #fff1f0;
}

.emptyTip {
  text-align: center;
  color: #999;
  padding: 20px;
  font-size: 14px;
}
</style>
