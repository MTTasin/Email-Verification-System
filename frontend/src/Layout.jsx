import { Outlet } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow">
        {/* The Outlet component will render the current page's content */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

