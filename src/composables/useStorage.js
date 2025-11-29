import { ref, watch } from 'vue'

/**
 * 通用本地存储钩子
 * @param {string} key 存储的键名
 * @param {any} defaultValue 默认值
 * @returns {object} { value }
 */
export function useStorage(key, defaultValue) {
  // 从本地存储加载数据
  const loadData = () => {
    try {
      const saved = localStorage.getItem(key)
      return saved ? JSON.parse(saved) : defaultValue
    } catch (e) {
      console.error(`加载本地存储 ${key} 失败:`, e)
      return defaultValue
    }
  }

  // 创建响应式数据
  const value = ref(loadData())

  // 监听数据变化，自动保存
  watch(
    value,
    () => {
      try {
        localStorage.setItem(key, JSON.stringify(value.value))
      } catch (e) {
        console.error(`保存到本地存储 ${key} 失败:`, e)
      }
    },
    { deep: true },
  )

  return {
    value
  }
}
