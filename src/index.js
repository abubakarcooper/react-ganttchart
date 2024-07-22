import React from 'react';
// import ReactDOM from 'react-dom';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';
import { registerLicense } from '@syncfusion/ej2-base';

const domNode = document.getElementById('root');
const root = createRoot(domNode);
registerLicense(`ORg4AjUWIQA/Gnt2UFhhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hTX5WdEViWX5bcnNdTmNa`)
root.render(
  <App />
);

reportWebVitals();
