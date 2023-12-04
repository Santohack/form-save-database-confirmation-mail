
import HomeScreen from './pages/HomeScreen';
import Container from '@mui/material/Container'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';
import FormDetails from './pages/Verification/FormDetails ';
function App() {
  return (
    <>
    <Container maxWidth="lg" sx={{

      display: 'flex',
      flexDirection: 'column',
     padding:'23px',
    }}>
      
   <Router>
    <Routes>
      <Route path="/" element={<HomeScreen />} />
   <Route path ="/form/:id" element={<FormDetails />} />
    </Routes>
   </Router>
     
    </Container>

  
    </>
  );
}

export default App;
