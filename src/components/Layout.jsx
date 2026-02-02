import { Outlet } from 'react-router-dom';
import Nav from './Nav';
import Footer from './Footer';
import './Layout.css';

export default function Layout() {
  return (
    <div className="app">
      <Nav />
      <main className="app__main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
