
import HomeScreen from './pages/HomeScreen';
import Container from '@mui/material/Container'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';
import FormDetails from './pages/Verification/FormDetails ';
import OfferDetails from './pages/Offer';
function App() {
  return (
    <>
    <Container maxWidth="sm" sx={{
   minWidth:'min-content',
      display: 'flex',
      flexDirection: 'column',
     padding:'23px',
    }}>
      
   <Router>
    <Routes>
      <Route path="/" element={<HomeScreen />} />
   <Route path ="/form/:id" element={<FormDetails />} />
   <Route path ="/formResponse/:id" element={<OfferDetails />} />
    </Routes>
   </Router>
     
    </Container>

  
    </>
  );
}

export default App;
