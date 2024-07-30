<!-- src/components/FolderPicker.vue -->
<template>
  <div>
    <button @click="selectFolder">Select Folder</button>
  </div>
</template>

<script setup>
import { open } from '@tauri-apps/plugin-dialog';
const selectFolder = async () => {
  const file = await open({
    multiple: false,
    directory: false,
  });
  console.log(file);
};


</script>
