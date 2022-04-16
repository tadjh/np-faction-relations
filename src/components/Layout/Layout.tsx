import { useRef } from 'react';
import Footer from '../Footer';
import Grid from '../../features/Grid';
import Header from '../Header';

function Layout() {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);
  return (
    <div className="relative flex h-screen flex-col items-center overflow-hidden p-2.5 font-mono md:p-4">
      <Header ref={headerRef} />
      <div className="relative w-full flex-1">
        <Grid headerRef={headerRef} footerRef={footerRef} />
      </div>
      <Footer ref={footerRef} />
    </div>
  );
}

export default Layout;
