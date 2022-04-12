import Notes from './features/Notes';
import Editor from './features/Editor';
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
      <Editor />
      <Layout />
      <Notes />
    </>
  );
}

export default App;
