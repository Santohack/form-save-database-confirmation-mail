import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Typography, Paper, Box, Grid, Button, Snackbar, Alert } from '@mui/material'; // Import necessary MUI components

const FormDetails = () => {
  const { id } = useParams(); // Using useParams hook to get the 'id' from URL
  const [formData, setFormData] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    document.title = 'Form Details';
    const fetchFormData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching form details:', error);
      }
    };

    fetchFormData();
  }, [id]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleResponse = async (userResponse) => {
    try {

      const responseData={
        response:userResponse
      }
      // Send the user's response to the backend route
      await axios.post(`${process.env.REACT_APP_API_URL}/response-user/${id}`, responseData);

      // Show the Snackbar when response is successfully recorded
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error sending user response:', error);
    }
  };
  console.log("formData verification", formData);
  return (
    <Box mt={3} justifyContent={'center'} alignContent={'center'} m={'auto'}>
     
      {formData ? (
        <Paper elevation={1} sx={{ padding: '20px',width:'23rem' }}>
          <Grid container spacing={2} width={'23rem'}>
            <Grid item xs={12} md={12}>
            <Typography variant="h4" mb={2} align="center">Form Details</Typography>
             
            <Typography variant="subtitle1"><span style={{ fontWeight: 'bold' }}>Name: {formData.userName}</span></Typography>

              <Typography variant="subtitle1"><span style={{ fontWeight: 'bold' }}>Email: {formData.email}</span></Typography>
              <Typography variant="subtitle1"><span style={{ fontWeight: 'bold' }}>Mobile: {formData.mobile}</span></Typography>
              <Typography variant="subtitle1"><span style={{ fontWeight: 'bold' }}>Message: {formData.message}</span></Typography>
              <Typography variant="subtitle1"><span style={{ fontWeight: 'bold' }}>Reason: {formData.offer.reason}</span></Typography>

              {formData.offer.reason === 'Buy Your website/Domain' && (
                <div>
                  <Typography variant="subtitle1">Currency: {formData.offer.currency}</Typography>
                  <Typography variant="subtitle1">Amount: {formData.offer.amount}</Typography>
                </div>
              )}

              <div style={{ marginTop: '20px', justifyContent: 'center', margin: '5px', padding: '5px', display: 'flex' }}>
                <Button sx={{ marginRight: '20px' }} variant="contained" color="success" onClick={() => handleResponse('Yes')}>Yes</Button>
                <Button variant="contained" color="error" onClick={() => handleResponse('No')}>No</Button>
              </div>
            </Grid>
          </Grid>
        </Paper>
      ) : (
        <Typography variant="subtitle1">Loading...</Typography>
      )}

      {/* Snackbar for response message */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Your response has been recorded
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default FormDetails;
