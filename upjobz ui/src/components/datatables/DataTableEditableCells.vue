<template>
  <div>
    <span v-if="!isEditing" @dblclick="startEditing">{{ inputValue }}</span>
    <input
      v-else
      v-model="inputValue"
      @blur="updateValue"
      @input="handleInput"
      class="p-2 w-full"
      ref="inputRef"
    />
  </div>
</template>

<script setup>
import { ref, watchEffect, nextTick } from 'vue'

const props = defineProps(['value'])
const emit = defineEmits(['update:value'])

const isEditing = ref(false)
const inputValue = ref(props.value)
const inputRef = ref(null)
const isEdited = ref(false)

watchEffect(() => {
  if (isEditing.value) {
    nextTick(() => {
      inputRef.value.focus()
    })
  }
})

const startEditing = () => {
  isEditing.value = true
}

const updateValue = () => {
  emit('update:value', inputValue.value)
  isEditing.value = false
}

const handleInput = () => {
  isEdited.value = true
  emit('update:value', inputValue.value)
}
</script>
