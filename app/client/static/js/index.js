import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './components';

const reactMount = document.getElementById('app');
const root = createRoot(reactMount);

root.render(<App />);