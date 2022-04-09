import { useRef } from 'react';
import Footer from '../Footer';
import Grid from '../../features/Grid';
import Header from '../Header';

function Layout() {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);
  return (
    <div className="overflow-hidden relative flex flex-col font-mono h-screen items-center p-2.5 md:p-4">
      <Header ref={headerRef} />
      <div className="flex-1"></div>
      <Grid headerRef={headerRef} footerRef={footerRef} />
      <Footer ref={footerRef} />
    </div>
  );
}

export default Layout;
