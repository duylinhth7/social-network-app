import { Route, Routes } from 'react-router-dom';
import LayoutDefault from './layouts/layoutDefault';
import Login from './pages/login';
import Register from './pages/register';
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/profile';
import Edit from './pages/profile/edit';
import Home from './pages/home';
import PostDetail from './pages/postDetail';
import { useEffect } from 'react';
import socket from './sockets/socket';
import Chat from './pages/chat';
import ListChat from './pages/chat/listChat';


function App() {
  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);
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
          <Route path='post/:id' element={<PostDetail />} />
          <Route path='chat/:id' element={<Chat />}/>
          <Route path='listchat' element={<ListChat />}/>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
