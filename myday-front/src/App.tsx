import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserComponent from './components/User';
import Login from './components/Login';
import ProtectedRoute from './routes/ProtectedRoute';
import Register from './components/Register';
import DefaultRoute from './routes/DefaultRoute';

// https://medium.com/@shruti.latthe/understanding-react-outlet-a-comprehensive-guide-b122b1e5e7ff
// Mettre cela en place pour le routing ! 

//       


// Ensuite mettre un hook

const App: React.FC = () => {

  return (
    <>
      <Routes>
        <Route path="/">
          <Route path="/login" element={<Login />} />
          <Route element={<DefaultRoute />}>
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<UserComponent />} />
              <Route path="/user" element={<UserComponent />} />
            </Route>
          </Route>
        </Route>
      </Routes >
    </>
  );
}

export default App;
