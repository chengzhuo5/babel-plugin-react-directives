import runtimeResolver from './runtime';

const preview = document.querySelector('.preview-iframe');

let style = null;
let ready = false;
let previewWindow = null;
let previewDocument = null;

preview.addEventListener('load', () => {
  ready = true;
  previewWindow = preview.contentWindow;
  previewDocument = preview.contentWindow.document;
});

function updateCSS(css = '') {
  if (!style) {
    style = previewDocument.getElementById('style');
  }
  style.innerHTML = css;
}

function render(js, options) {
  try {
    let { code } = Babel.transform(js, {
      presets: [
        [
          require('@babel/preset-env'),
          { modules: false }
        ],
        require('@babel/preset-react')
      ],
      plugins: [
        [
          require('../../src/index'),
          JSON.parse(options)
        ]
      ]
    });

    runtimeResolver.forEach((item) => {
      code = code.replace(item.code, item.resolve);
    });

    code = code.replace(/export[\s\S]+default/g, 'window.__App__ =');
    code = code.replace(/export/g, '');
    code = code.replace(/module.exports/g, 'window.__App__');

    previewWindow.__render__(code);
    console.log(code);
  } catch (e) {
    previewWindow.__catchError__(e);
  }
}

export function renderPreview({ js, css, options }) {
  if (ready) {
    render(js, options);
    updateCSS(css);
  }
}
