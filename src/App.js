import { Route, Routes } from 'react-router-dom';
import LayoutDefault from './layouts/layoutDefault';
import Login from './pages/login';
import Register from './pages/register';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutDefault/>}>
          <Route path="user/login" element={<Login/>}/>
          <Route path='user/register' element={<Register/>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
