import { useStorage } from './useStorage'

/**
 * 待办事项管理钩子
 * @returns {object} 待办事项相关的数据和方法
 */
export function useTodos() {
  // 默认待办事项数据（空数组，不显示默认事项）
  const defaultTodos = []

  // 使用本地存储钩子
  const { value: todos } = useStorage('todo-items', defaultTodos)

  // 添加待办事项
  const addTodo = (todoData) => {
    const newTodo = {
      id: Date.now(),
      title: todoData.title,
      description: todoData.description || '',
      completed: false,
    }
    todos.value.push(newTodo)
  }

  // 更新待办事项状态
  const toggleTodo = (id) => {
    const todo = todos.value.find((t) => t.id === id)
    if (todo) {
      todo.completed = !todo.completed
    }
  }

  // 编辑待办事项
  const updateTodo = (updatedTodo) => {
    const index = todos.value.findIndex((t) => t.id === updatedTodo.id)
    if (index !== -1) {
      todos.value[index] = {
        ...updatedTodo,
        description: updatedTodo.description || '',
      }
    }
  }

  // 删除待办事项
  const deleteTodo = (id) => {
    todos.value = todos.value.filter((t) => t.id !== id)
  }

  // 搜索待办事项
  const searchTodos = (keyword) => {
    if (!keyword || !keyword.trim()) {
      return todos.value
    }

    const searchTerm = keyword.toLowerCase().trim()
    return todos.value.filter(
      (todo) =>
        todo.title.toLowerCase().includes(searchTerm) ||
        (todo.description && todo.description.toLowerCase().includes(searchTerm)),
    )
  }

  return {
    todos,
    addTodo,
    toggleTodo,
    updateTodo,
    deleteTodo,
    searchTodos,
  }
}
