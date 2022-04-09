import Notes from './features/Notes';
import Editor from './features/Editor';
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
