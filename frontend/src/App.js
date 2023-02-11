import './App.css';
import './login.css'
import './navbar.css'
import 'bootstrap/dist/css/bootstrap.min.css';

// Layouts
import LoggedInLayout from './layouts/LoggedInLayout';

// Utils
import ProtectedRoutes from './utils/ProtectedRoutes';

// Pages
import Login from './pages/Login';
import Home from './pages/Home';
import ViewAccounts from './pages/ViewAccounts';
import ViewTransactions from './pages/ViewScheduledTrans';
import MakeTransactions from './pages/MakeTransactions';


import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<LoggedInLayout />}>
          <Route index element={<Home />} />
          <Route path="view-accounts" element={<ViewAccounts />} />
          <Route path="account/:accountId" element={<ViewTransactions />} />
          <Route path="make-transactions" element={<MakeTransactions />} />
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;