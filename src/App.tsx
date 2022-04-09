import Notes from './components/Notes';
import Edit from './components/Edit';
import AuthProvider from './providers/AuthProvider';
import Layout from './components/Layout';

function App() {
  return (
    <>
      <AuthProvider>
        <Edit />
      </AuthProvider>
      <Notes />
      <Layout />
    </>
  );
}

export default App;
