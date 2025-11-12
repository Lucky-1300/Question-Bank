import './App.css';
import { Routes, Route } from 'react-router-dom';

import Navbar from './component/navbar/Navbar';
import CreatePost from './assets/pages/createpost/CreatePost';
import Home from './assets/pages/home/Home';
import SinglePost from './assets/pages/singlePost/SinglePost';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/updatepost/:postID" element={<CreatePost />} />
        <Route path="/:postID" element={<SinglePost />} />
      </Routes>
    </>
  );
}


export default App;
