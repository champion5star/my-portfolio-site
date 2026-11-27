import { BrowserRouter, HashRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';

const Router = import.meta.env.VITE_ROUTER_MODE === 'hash' ? HashRouter : BrowserRouter;

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
