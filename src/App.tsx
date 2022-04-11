import Notes from './features/Notes';
import Editor from './features/Editor';
import AuthProvider from './providers/AuthProvider';
import Layout from './components/Layout';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <AuthProvider>
        <Editor />
        <Layout />
        <Notes />
      </AuthProvider>
      <ToastContainer />
    </>
  );
}

export default App;
