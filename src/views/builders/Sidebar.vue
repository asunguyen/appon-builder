<template>
  <aside class="sidebar" :class="{ collapsed: collapsed }">
    <h2 v-if="!collapsed">Components</h2>
    <div class="component-grid" v-if="!collapsed">
      <div 
        v-for="component in components" 
        :key="component.name" 
        class="component-item"
      >
        <span class="component-icon">{{ component.icon }}</span>
        <span class="component-text">{{ component.name }}</span>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  collapsed: { type: Boolean, default: false }
});

// Danh sách component mặc định với icon
const components = ref([
  { name: 'Grid', icon: '📏' },
  { name: 'Button', icon: '🔘' },
  { name: 'Input', icon: '📝' },
  { name: 'Textarea', icon: '📑' },
  { name: 'Text', icon: '✍️' },
  { name: 'Image', icon: '🖼️' },
  { name: 'Form', icon: '📋' }
]);
</script>

<style scoped>
.sidebar {
  width: 250px;
  background-color: #f4f4f4;
  padding: 20px;
  border-right: 1px solid #ddd;
  overflow-y: auto;
  transition: width 0.3s ease;
}

.sidebar.collapsed {
  width: 0;
  padding: 0;
  overflow: hidden;
}

.component-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.component-item {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: move;
  transition: background-color 0.2s;
}

.component-item:hover {
  background-color: #e0e0e0;
}

.component-icon {
  margin-right: 8px;
  font-size: 1.2rem;
}

.component-text {
  font-size: 1rem;
}

.sidebar h2 {
  margin-bottom: 15px;
}
</style>