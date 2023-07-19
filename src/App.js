import './App.css';
import Navbar from './components/navbar'
import Sidebar from './components/sidebar'

// pages 
import Welcome from './pages/welcome'
import Home from './pages/home';
import Settings from './pages/settings';
import Help from './pages/help';
import Premium from './pages/premium';
import Wallets from './pages/wallets';
import Transactions from './pages/transactions';
import Portfolio from './pages/portfolio';
import Favorites from './pages/favorites';
import NotFound from './pages/notfound';

// react router
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute';

// firebase
import { AuthProvider } from './components/AuthContext'

function App() {

  function renderDashboard(component) {
    return (
      <>
        <Navbar />
        <Sidebar>
          {component}
        </Sidebar>
      </>
    )
  }

  return (
    <div className="bg-gray-50">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<Welcome />} />
            <Route element={<PrivateRoute />}>
              <Route path='/dashboard' element={renderDashboard(<Home />)} />
              <Route path='/myads' element={renderDashboard(<Portfolio />)} />
              <Route path='/transactions' element={renderDashboard(<Transactions />)} />
              <Route path='/wallets' element={renderDashboard(<Wallets />)} />
              <Route path='/favorites' element={renderDashboard(<Favorites />)} />
              <Route path='/settings' element={renderDashboard(<Settings />)} />
              <Route path='/premium' element={renderDashboard(<Premium />)} />
              <Route path='/support' element={renderDashboard(<Help />)} />
              <Route path='*' element={<NotFound />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
