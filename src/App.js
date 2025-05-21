import { Route, Routes } from 'react-router-dom';
import LayoutDefault from './layouts/layoutDefault';
import Login from './pages/login';
import Register from './pages/register';
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/profile';
import Edit from './pages/profile/edit';
import Home from './pages/home';
import PostDetail from './pages/postDetail';

function App() {
  return (
    <Routes>
      <Route element={<LayoutDefault />}>
        {/* Public routes */}
        <Route path="user/login" element={<Login />} />
        <Route path="user/register" element={<Register />} />

        {/* Protected routes */}
        <Route element={<PrivateRoute />}>
          <Route path="" element={<Home />} />
          <Route path="user/profile/:id" element={<Profile />} />
          <Route path="user/profile/edit" element={<Edit />} />
          <Route  path='post/:id' element={<PostDetail />}/>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
