import { createComponentJson, getComponentTemplate } from '../views/builders/componentsTempl.js';

export function initializeDragDrop(addComponentCallback) {
  $(document).ready(() => {
    // Khởi tạo draggable cho các component trong sidebar
    $('.component-item').draggable({
      helper: 'clone',
      revert: 'invalid',
      cursor: 'move',
      zIndex: 1000,
      start: function(event, ui) {
        $(this).addClass('dragging');
      },
      stop: function(event, ui) {
        $(this).removeClass('dragging');
      }
    });

    // Khởi tạo droppable cho khu vực builder
    $('.builder-area').droppable({
      accept: '.component-item',
      drop: function(event, ui) {
        const componentName = ui.draggable.find('.component-text').text();
        const componentJson = createComponentJson(componentName);
        addComponentCallback(componentJson); // Gọi callback để thêm vào Vue
      }
    });

    // Khởi tạo sortable cho các builder-item
    $('.builder-area').sortable({
      items: '.builder-item',
      cursor: 'move',
      placeholder: 'sortable-placeholder',
      update: function(event, ui) {
        const sortedIds = $(this).sortable('toArray', { attribute: 'data-id' });
        console.log('Sorted IDs:', sortedIds);
      }
    });
  });
}

export function refreshSortable() {
  $(document).ready(() => {
    if ($('.builder-area').sortable('instance')) {
      $('.builder-area').sortable('refresh');
    }
  });
}