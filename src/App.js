import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Category from './pages/Category';
import Exercise from './pages/Exercise';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BodyPartsCategory from './pages/BodyPartsCategory';
import EquipmentCategory from './pages/EquipmentCategory';

function App() {
  return (
    <>
      <Navbar />  {/* Navbar remains outside Routes */}
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:id" element={<Category />} />
          <Route path="/exercise/:id" element={<Exercise />} />
          <Route path="/body-parts" element={<BodyPartsCategory />} />
          <Route path="/equipment" element={<EquipmentCategory />} />
        </Routes>
      </div>
      <Footer />  {/* Footer remains outside Routes */}
    </>
  );
}

export default App;