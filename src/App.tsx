import Grid from './components/Grid';
import Notes from './components/Notes';
import Footer from './components/Footer';
import Header from './components/Header';
import Edit from './components/Edit';
import AuthProvider from './providers/AuthProvider';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Edit />
        </BrowserRouter>
      </AuthProvider>
      <div className="flex flex-col font-mono min-h-screen p-4">
        <Header />
        <div className="flex flex-col flex-1 items-center justify-center">
          <Grid />
        </div>
        <Footer />
      </div>
      <Notes />
    </>
  );
}

export default App;
