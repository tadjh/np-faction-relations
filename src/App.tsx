import Notes from './features/Notes';
import Editor from './features/Editor';
import AuthProvider from './providers/AuthProvider';
import Layout from './components/Layout';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster
        toastOptions={{
          style: { borderRadius: '0px', fontFamily: 'monospace' },
        }}
      />
      <AuthProvider>
        <Editor />
        <Layout />
        <Notes />
      </AuthProvider>
    </>
  );
}

export default App;
