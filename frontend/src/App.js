
import HomeScreen from './pages/HomeScreen';
import Container from '@mui/material/Container'
import './App.css';
function App() {
  return (
    <>
    <Container maxWidth="lg" sx={{

      display: 'flex',
      flexDirection: 'column',
     padding:'23px',
    }}>
      
   
      <HomeScreen />
    </Container>

  
    </>
  );
}

export default App;
