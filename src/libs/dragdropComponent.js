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
          addComponentCallback(componentJson, $(this));
        }
      });
  
      // Khởi tạo droppable cho các cột trong Grid
      $('.builder-area').on('mouseenter', '.grid-component .col-12, .grid-component .col-sm-6, .grid-component .col-sm-4, .grid-component .col-md-4, .grid-component .col-lg-3', function() {
        $(this).droppable({
          accept: '.component-item',
          hoverClass: 'drop-hover',
          drop: function(event, ui) {
            const componentName = ui.draggable.find('.component-text').text();
            const componentJson = createComponentJson(componentName);
            const parentId = $(this).closest('.builder-item').attr('data-id');
            addComponentCallback(componentJson, $(this), parentId);
          }
        });
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
  
      // Khởi tạo resizable cho các component không phải Grid
      $('.builder-area').on('mouseenter', '.builder-item:not([data-type^="Grid"])', function() {
        const $item = $(this);
        if (!$item.hasClass('ui-resizable')) {
          $item.resizable({
            handles: 'e, s, se', // Chỉnh kích thước từ cạnh phải, dưới và góc dưới-phải
            minWidth: 50,
            minHeight: 20,
            stop: function(event, ui) {
              const id = $item.attr('data-id');
              const newWidth = ui.size.width;
              const newHeight = ui.size.height;
              // Gọi callback để cập nhật kích thước (nếu cần)
              updateComponentSize(id, newWidth, newHeight);
            }
          });
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
  
  // Hàm cập nhật kích thước component (sẽ được gọi từ Builder.vue)
  export function updateComponentSize(id, width, height) {
    window.dispatchEvent(new CustomEvent('updateComponentSize', {
      detail: { id, width, height }
    }));
  }