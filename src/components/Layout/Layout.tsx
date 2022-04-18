import Footer from '../Footer';
import Grid from '../../features/Grid';
import Header from '../Header';
import Main from '../Main';

function Layout() {
  return (
    <div className="flex h-screen max-h-screen flex-col gap-y-2 p-2.5 font-mono md:items-center md:p-4">
      <Header />
      <Main>
        <Grid />
      </Main>
      <Footer />
    </div>
  );
}

export default Layout;
