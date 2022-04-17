import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClientProvider, QueryClient } from 'react-query';
import FactionsProvider from './providers/FactionsProvider';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './providers/AuthProvider';
import EditorProvider from './providers/EditorProvider';
import NotesProvider from './providers/NotesProvider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <FactionsProvider>
          <AuthProvider>
            <EditorProvider>
              <NotesProvider>
                <App />
              </NotesProvider>
            </EditorProvider>
          </AuthProvider>
        </FactionsProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
