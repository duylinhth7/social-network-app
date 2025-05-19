import { Route, Routes } from 'react-router-dom';
import LayoutDefault from './layouts/layoutDefault';
import Login from './pages/login';
import Register from './pages/register';
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/profile';
import Edit from './pages/profile/edit';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutDefault/>}>
          <Route path='/'/>
          <Route path="user/login" element={<Login/>}/>
          <Route path='user/register' element={<Register/>} />
          <Route 
            path='/user/profile'
            element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>}
          /> 
          <Route 
            path='/user/profile/edit'
            element={
            <PrivateRoute>
              <Edit />
            </PrivateRoute>}
          />  
        </Route>
      </Routes>
    </>
  );
}

export default App;
