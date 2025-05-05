import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserComponent from './components/User';
import Login from './components/Login';
import ProtectedRoute from './routes/ProtectedRoute';
import Register from './components/Register';
// import HistoryComponent from './components/History';

// https://medium.com/@shruti.latthe/understanding-react-outlet-a-comprehensive-guide-b122b1e5e7ff
// Mettre cela en place pour le routing ! 

//       


// Ensuite mettre un hook

const App: React.FC = () => {

  return (
    <div className=''>
      <Routes>
        <Route path="/">
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<UserComponent />} />
            <Route path="/user" element={<UserComponent />} />
          </Route>
        </Route>
      </Routes >
    </div>
  );
}

export default App;
