import Notes from './components/Notes';
import Editor from './components/Editor';
import AuthProvider from './providers/AuthProvider';
import Layout from './components/Layout';

function App() {
  return (
    <>
      <AuthProvider>
        <Editor />
      </AuthProvider>
      <Notes />
      <Layout />
    </>
  );
}

export default App;
