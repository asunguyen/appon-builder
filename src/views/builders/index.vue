<template>
    <div class="builder">
      <header class="header">
        <div class="header-left">
          <select v-model="selectedPage" @change="loadPage" class="page-dropdown">
            <option v-for="page in pages" :key="page" :value="page">{{ page }}</option>
          </select>
          <button @click="addPage" class="add-page-btn">+</button>
        </div>
        <div class="header-center">
          <button @click="toggleSidebar" class="collapse-btn" title="Toggle Sidebar">
            <i :class="sidebarCollapsed ? 'icon-expand' : 'icon-collapse'"></i>
          </button>
          <button :class="{ active: mode === 'desktop' }" @click="setMode('desktop')" title="Desktop Mode">
            <i class="icon-desktop"></i>
          </button>
          <button :class="{ active: mode === 'tablet' }" @click="setMode('tablet')" title="Tablet Mode">
            <i class="icon-tablet"></i>
          </button>
          <button :class="{ active: mode === 'mobile' }" @click="setMode('mobile')" title="Mobile Mode">
            <i class="icon-mobile"></i>
          </button>
        </div>
        <div class="header-right">
          <button @click="openSettings" class="action-btn">Settings</button>
          <button @click="togglePreview" class="action-btn preview">Preview</button>
          <button @click="publishPage" class="action-btn publish">Publish</button>
        </div>
      </header>
  
      <div class="main-container" :class="mode">
        <Sidebar :collapsed="sidebarCollapsed" />
        <main class="main-builder">
          <h2>Builder Area - {{ selectedPage }}</h2>
          <div class="builder-area container">
            <div 
              v-for="(element) in builderComponents" 
              :key="element.id" 
              :data-id="element.id" 
              :data-type="element.type"
              class="builder-item"
              v-html="renderComponent(element)"
            >
            </div>
          </div>
        </main>
        <aside class="rightbar">
          <h2>Properties</h2>
          <p>Edit selected component properties here.</p>
        </aside>
      </div>
  
      <div v-if="showPreview" class="preview-modal">
        <div class="preview-content" :class="mode">
          <div class="preview-header">
            <h3>Preview - {{ selectedPage }}</h3>
            <button @click="togglePreview" class="close-btn">✖</button>
          </div>
          <div class="preview-area container">
            <div 
              v-for="element in builderComponents" 
              :key="element.id" 
              v-html="renderComponent(element, true)"
            >
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  import Sidebar from './Sidebar.vue';
  import { initializeDragDrop, refreshSortable, updateComponentSize } from '../../libs/dragdropComponent.js';
  import { getComponentTemplate } from './componentsTempl.js';
  
  const pages = ref(['Home']);
  const selectedPage = ref('Home');
  const builderComponents = ref([]);
  const sidebarCollapsed = ref(false);
  const showPreview = ref(false);
  
  const addPage = () => {
    const newPageName = prompt('Enter new page name:');
    if (newPageName && !pages.value.includes(newPageName)) {
      pages.value.push(newPageName);
      selectedPage.value = newPageName;
      console.log(`Added new page: ${newPageName}`);
    } else if (!newPageName) {
      alert('Page name cannot be empty!');
    } else {
      alert('Page name already exists!');
    }
  };
  
  const loadPage = () => {
    console.log(`Loading page: ${selectedPage.value}`);
  };
  
  const mode = ref('desktop');
  const setMode = (newMode) => {
    mode.value = newMode;
    console.log(`Switched to ${newMode} mode`);
  };
  
  const toggleSidebar = () => {
    sidebarCollapsed.value = !sidebarCollapsed.value;
    console.log(`Sidebar ${sidebarCollapsed.value ? 'collapsed' : 'expanded'}`);
  };
  
  const togglePreview = () => {
    showPreview.value = !showPreview.value;
    console.log(`Preview ${showPreview.value ? 'opened' : 'closed'}`);
  };
  
  const openSettings = () => {
    alert('Settings clicked! Implement your settings logic here.');
  };
  
  const publishPage = () => {
    console.log('Page JSON:', JSON.stringify(builderComponents.value, null, 2));
    alert(`Publish clicked for ${selectedPage.value}! Check console for JSON.`);
  };
  
  const addComponentToBuilder = (componentJson, $target, parentId = null) => {
    if (parentId) {
      const parent = builderComponents.value.find(comp => comp.id === parentId);
      if (parent) {
        parent.children.push(componentJson);
      }
    } else {
      builderComponents.value.push(componentJson);
    }
    console.log('Added component:', JSON.stringify(componentJson, null, 2));
  };
  
  const removeComponent = (id) => {
    const removeFromChildren = (components) => {
      return components.filter(comp => {
        if (comp.id === id) return false;
        if (comp.children && comp.children.length) {
          comp.children = removeFromChildren(comp.children);
        }
        return true;
      });
    };
    builderComponents.value = removeFromChildren(builderComponents.value);
    console.log('Removed component with id:', id);
  };
  
  const renderComponent = (element, isPreview = false) => {
    let html = getComponentTemplate(element);
    if (element.type.startsWith('Grid') && element.children && element.children.length) {
      const columnCount = element.props.columns || 1;
      const columns = Array(columnCount).fill('').map(() => []);
      element.children.forEach((child, i) => columns[i % columnCount].push(renderComponent(child, isPreview)));
      const columnEls = html.match(/<div class="col-.*?<\/div>/g) || [];
      html = html.replace(/<div class="col-.*?<\/div>/g, (match, index) => {
        return `<div class="${match.split('"')[1]}">${columns[index] ? columns[index].join('') : columnEls[index].replace(/<\/div>$/, '')}</div>`;
      });
    } else if (!isPreview && !element.type.startsWith('Grid')) {
      const style = { ...element.style, width: `${element.style.width}px`, height: `${element.style.height}px` };
      html = html.replace(/style="([^"]*)"/, `style="$1; ${Object.entries(style).map(([k, v]) => `${k}: ${v}`).join('; ')}"`);
    }
    if (!isPreview) {
      html += `<button class="remove-btn" data-id="${element.id}">✖</button>`;
    }
    return html;
  };
  
  const handleComponentSizeUpdate = (id, width, height) => {
    const updateSizeInChildren = (components) => {
      components.forEach(comp => {
        if (comp.id === id) {
          comp.style.width = width;
          comp.style.height = height;
        }
        if (comp.children && comp.children.length) {
          updateSizeInChildren(comp.children);
        }
      });
    };
    updateSizeInChildren(builderComponents.value);
    console.log(`Updated size for ${id}: ${width}x${height}`);
  };
  
  const attachRemoveEvents = () => {
    document.querySelectorAll('.remove-btn').forEach(btn => {
      btn.removeEventListener('click', handleRemoveClick);
      btn.addEventListener('click', handleRemoveClick);
    });
  };
  
  const handleRemoveClick = (event) => {
    const id = event.target.getAttribute('data-id');
    removeComponent(id);
  };
  
  onMounted(() => {
    initializeDragDrop(addComponentToBuilder);
    attachRemoveEvents();
    window.addEventListener('updateComponentSize', (event) => {
      handleComponentSizeUpdate(event.detail.id, event.detail.width, event.detail.height);
    });
  });
  
  watch(builderComponents, () => {
    setTimeout(() => {
      refreshSortable();
      attachRemoveEvents();
    }, 0);
  }, { deep: true });
  </script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.builder {
  font-family: Arial, sans-serif;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background-color: #333;
  color: white;
  padding: 10px 20px;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.page-dropdown {
  background: #555;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

.add-page-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.add-page-btn:hover {
  background: #0056b3;
}

.header-center {
  display: flex;
  gap: 10px;
  align-items: center;
}

.header-center button {
  background: #555;
  border: none;
  padding: 8px;
  cursor: pointer;
  border-radius: 4px;
  color: white;
  transition: background 0.3s;
}

.header-center button.active {
  background: #007bff;
}

.header-center button:hover {
  background: #777;
}

.icon-collapse::before { content: '⬅️'; }
.icon-expand::before { content: '➡️'; }
.icon-desktop::before { content: '🖥️'; }
.icon-tablet::before { content: '📱'; }
.icon-mobile::before { content: '📲'; }

.header-right {
  display: flex;
  gap: 10px;
}

.action-btn {
  background: #555;
  border: none;
  padding: 8px 15px;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.3s;
}

.action-btn:hover {
  background: #777;
}

.action-btn.preview {
  background: #ffc107;
}

.action-btn.preview:hover {
  background: #e0a800;
}

.action-btn.publish {
  background: #28a745;
}

.action-btn.publish:hover {
  background: #218838;
}

.main-container {
  display: flex;
  flex: 1;
  margin-top: 60px;
  height: calc(100vh - 60px);
  transition: all 0.3s;
  background-color: #f0f0f0;
}

.main-container.desktop .main-builder {
  max-width: 100%;
}

.main-container.tablet .main-builder {
  max-width: 768px;
  margin: 0 auto;
}

.main-container.mobile .main-builder {
  max-width: 375px;
  margin: 0 auto;
}

.main-builder {
  flex: 1;
  background-color: #fff;
  padding: 20px;
  overflow-y: auto;
  border: 2px dashed #ccc;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin: 10px;
}

.builder-area {
  min-height: 200px;
}

.builder-item {
  position: relative;
  padding: 10px;
  margin: 5px;
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: move;
}

.remove-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;
  font-size: 12px;
  line-height: 20px;
  text-align: center;
}

.remove-btn:hover {
  background: #c82333;
}

.rightbar {
  width: 300px;
  background-color: #f9f9f9;
  padding: 20px;
  border-left: 1px solid #ddd;
  overflow-y: auto;
}

.main-builder h2,
.rightbar h2 {
  margin-bottom: 15px;
}

.preview-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.preview-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
}

.preview-content.desktop {
  width: 100%;
  max-width: 1200px;
}

.preview-content.tablet {
  width: 768px;
}

.preview-content.mobile {
  width: 375px;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.preview-header h3 {
  margin: 0;
}

.close-btn {
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  cursor: pointer;
  font-size: 14px;
  line-height: 25px;
  text-align: center;
}

.close-btn:hover {
  background: #c82333;
}

.preview-area {
  padding: 10px;
}

.sortable-placeholder {
  border: 2px dashed #999;
  background: #f0f0f0;
  height: 50px;
  margin: 5px;
  border-radius: 4px;
}

.drop-hover {
  background: #e0e0e0;
  border: 2px dashed #007bff;
}

/* Style cho resizable */
.ui-resizable-handle {
  background: #007bff;
  opacity: 0.7;
}

.ui-resizable-e {
  width: 10px;
  right: -5px;
  top: 0;
  bottom: 0;
}

.ui-resizable-s {
  height: 10px;
  left: 0;
  bottom: -5px;
  width: 100%;
}

.ui-resizable-se {
  width: 10px;
  height: 10px;
  right: -5px;
  bottom: -5px;
}
</style>