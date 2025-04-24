import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import SignIn from './pages/Signin';
import MyPage from './pages/MyPage';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<div>首頁</div>} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/my" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;