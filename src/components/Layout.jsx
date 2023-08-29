import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => (
  <div>
    <Header />
    <Outlet />
  </div>
);

export default Layout;
