import { BrowserRouter } from 'react-router-dom';
import { Router } from './Router';

import './index.css';

import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './@shared/services/queryClient';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
