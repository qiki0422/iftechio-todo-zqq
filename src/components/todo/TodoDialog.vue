<template>
  <el-dialog v-model="dialogVisible" :title="dialogTitle" width="500px">
    <el-form ref="formRef" :model="formData" :rules="rules" label-width="100px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="formData.title" placeholder="请输入待办事项标题" />
      </el-form-item>
      <el-form-item label="描述">
        <el-input
          v-model="formData.description"
          type="textarea"
          placeholder="请输入待办事项描述（可选）"
          :rows="3"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleConfirm">确认</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// Props
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  mode: {
    type: String,
    default: 'add',
  },
  todoData: {
    type: Object,
    default: () => ({}),
  },
})

// Emits
const emit = defineEmits(['update:visible', 'confirm'])

// 响应式数据
const formData = ref({
  title: '',
  description: '',
})

const formRef = ref(null)

// 表单验证规则
const rules = {
  title: [
    {
      required: true,
      message: '请输入待办事项标题',
      trigger: 'blur',
    },
  ],
}

// 计算属性
const dialogVisible = computed({
  get: () => props.visible,
  set: (value) => emit('update:visible', value),
})

const dialogTitle = computed(() => {
  return props.mode === 'add' ? '添加待办事项' : '编辑待办事项'
})

// 初始化表单数据
const initFormData = () => {
  if (props.mode === 'edit' && props.todoData) {
    formData.value = { ...props.todoData }
  } else {
    formData.value = {
      title: '',
      description: '',
    }
  }
}

// 监听对话框显示状态，每次打开时都重置表单
watch(
  () => props.visible,
  (newVisible) => {
    if (newVisible) {
      initFormData()
      // 延迟重置表单验证状态，确保对话框完全显示
      setTimeout(() => {
        if (formRef.value) {
          formRef.value.clearValidate()
        }
      }, 0)
    }
  },
)

// 方法
const handleCancel = () => {
  // 重置表单验证状态
  if (formRef.value) {
    formRef.value.resetFields()
  }
  dialogVisible.value = false
}

const handleConfirm = () => {
  // 验证表单
  formRef.value.validate((valid) => {
    if (valid) {
      // 验证通过，发送确认事件
      emit('confirm', { ...formData.value })
      dialogVisible.value = false
    }
  })
}
</script>

<style scoped>
.el-form-item {
  margin-bottom: 20px;
}
</style>
