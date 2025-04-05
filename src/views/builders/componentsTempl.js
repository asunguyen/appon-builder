// Định nghĩa các template HTML cho từng component
export const componentTemplates = {
  Grid1: `
    <div class="grid-component row" style="width: 100%; height: 200px; border: 1px dashed #666;">
      <div class="col-12" style="border: 1px solid #ccc; height: 100%;">Column 1</div>
    </div>
  `,
  Grid2: `
    <div class="grid-component row" style="width: 100%; height: 200px; border: 1px dashed #666;">
      <div class="col-12 col-md-6" style="border: 1px solid #ccc; height: 100%;">Column 1</div>
      <div class="col-12 col-md-6" style="border: 1px solid #ccc; height: 100%;">Column 2</div>
    </div>
  `,
  Grid3: `
    <div class="grid-component row" style="width: 100%; height: 200px; border: 1px dashed #666;">
      <div class="col-12 col-sm-4 col-md-4" style="border: 1px solid #ccc; height: 100%;">Column 1</div>
      <div class="col-12 col-sm-4 col-md-4" style="border: 1px solid #ccc; height: 100%;">Column 2</div>
      <div class="col-12 col-sm-4 col-md-4" style="border: 1px solid #ccc; height: 100%;">Column 3</div>
    </div>
  `,
  Grid4: `
    <div class="grid-component row" style="width: 100%; height: 200px; border: 1px dashed #666;">
      <div class="col-12 col-sm-6 col-md-4 col-lg-3" style="border: 1px solid #ccc; height: 100%;">Column 1</div>
      <div class="col-12 col-sm-6 col-md-4 col-lg-3" style="border: 1px solid #ccc; height: 100%;">Column 2</div>
      <div class="col-12 col-sm-6 col-md-4 col-lg-3" style="border: 1px solid #ccc; height: 100%;">Column 3</div>
      <div class="col-12 col-sm-6 col-md-4 col-lg-3" style="border: 1px solid #ccc; height: 100%;">Column 4</div>
    </div>
  `,
  Button: `
    <button class="button-component" style="background-color: #007bff; color: white; padding: 8px 16px; border-radius: 4px; border: none;">
      Click Me
    </button>
  `,
  Input: `
    <input class="input-component" type="text" placeholder="Enter text" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
  `,
  Textarea: `
    <textarea class="textarea-component" placeholder="Enter longer text" style="width: 100%; height: 100px; padding: 8px; border: 1px solid #ccc; border-radius: 4px;"></textarea>
  `,
  Text: `
    <p class="text-component" style="font-size: 1rem; color: #000;">
      Sample Text
    </p>
  `,
  Image: `
    <img class="image-component" src="https://via.placeholder.com/150" alt="Sample Image" style="max-width: 100%; height: auto;">
  `,
  Form: `
    <form class="form-component" style="display: flex; flex-direction: column; gap: 10px;">
      <input class="input-component" type="text" placeholder="Name" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
      <button class="button-component" type="submit" style="padding: 8px; background-color: #28a745; color: white; border-radius: 4px; border: none;">
        Submit
      </button>
    </form>
  `
};

// Định nghĩa dữ liệu JSON cho các component
export const componentData = {
  Grid1: { id: '', type: 'Grid1', props: { columns: 1 }, style: { width: '100%', height: '200px', border: '1px dashed #666' }, children: [] },
  Grid2: { id: '', type: 'Grid2', props: { columns: 2 }, style: { width: '100%', height: '200px', border: '1px dashed #666' }, children: [] },
  Grid3: { id: '', type: 'Grid3', props: { columns: 3 }, style: { width: '100%', height: '200px', border: '1px dashed #666' }, children: [] },
  Grid4: { id: '', type: 'Grid4', props: { columns: 4 }, style: { width: '100%', height: '200px', border: '1px dashed #666' }, children: [] },
  Button: { id: '', type: 'Button', props: { text: 'Click Me', disabled: false }, style: { backgroundColor: '#007bff', color: 'white', padding: '8px 16px', borderRadius: '4px' }, children: [] },
  Input: { id: '', type: 'Input', props: { placeholder: 'Enter text', value: '', type: 'text' }, style: { width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }, children: [] },
  Textarea: { id: '', type: 'Textarea', props: { placeholder: 'Enter longer text', value: '' }, style: { width: '100%', height: '100px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }, children: [] },
  Text: { id: '', type: 'Text', props: { content: 'Sample Text' }, style: { fontSize: '1rem', color: '#000' }, children: [] },
  Image: { id: '', type: 'Image', props: { src: 'https://via.placeholder.com/150', alt: 'Sample Image' }, style: { maxWidth: '100%', height: 'auto' }, children: [] },
  Form: {
    id: '',
    type: 'Form',
    props: {},
    style: { display: 'flex', flexDirection: 'column', gap: '10px' },
    children: [
      { id: '', type: 'Input', props: { placeholder: 'Name', value: '', type: 'text' }, style: { padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }, children: [] },
      { id: '', type: 'Button', props: { text: 'Submit', type: 'submit' }, style: { padding: '8px', backgroundColor: '#28a745', color: 'white', borderRadius: '4px' }, children: [] }
    ]
  }
};

// Hàm tạo JSON cho component với ID duy nhất
export function createComponentJson(componentName) {
  const baseId = `${componentName.toLowerCase()}_${Date.now()}`;
  const data = JSON.parse(JSON.stringify(componentData[componentName]));
  data.id = baseId;
  if (data.children && data.children.length) {
    data.children = data.children.map(child => ({
      ...child,
      id: `${baseId}_${child.type.toLowerCase()}`
    }));
  }
  return data;
}

// Hàm lấy template HTML theo type
export function getComponentTemplate(element) {
  return componentTemplates[element.type] || '<div>Unknown Component</div>';
}