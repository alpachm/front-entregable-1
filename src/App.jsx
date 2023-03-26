import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import OptionsPage from './pages/OptionsPage';
import Users from './components/optionsPage/Users';
import Repairs from './components/optionsPage/Repairs';
import ProtectedRoutes from './pages/ProtectedRoutes';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/options" element={<OptionsPage />} />
          <Route path="/users" element={<Users />} />
          <Route path="/repairs" element={<Repairs />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
