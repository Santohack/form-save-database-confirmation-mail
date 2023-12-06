import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Typography, Paper, Box, Grid, Button, Snackbar, Alert } from '@mui/material'; // Import necessary MUI components

const FormDetails = () => {
  const { id } = useParams(); // Using useParams hook to get the 'id' from URL
  const [formData, setFormData] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/contact/${id}`);
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
      // Send the user's response to the backend route
      await axios.post(`http://localhost:3001/api/contact/response-user/${id}`, { response: userResponse });

      // Show the Snackbar when response is successfully recorded
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error sending user response:', error);
    }
  };

  return (
    <Box mt={3} justifyContent={'center'} alignContent={'center'} m={'auto'}>
      <Typography variant="h4" mb={2}>Form Details</Typography>
      {formData ? (
        <Paper elevation={3} sx={{ padding: '20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Typography variant="subtitle1">Name: {formData.userName}</Typography>
              <Typography variant="subtitle1">Email: {formData.email}</Typography>
              <Typography variant="subtitle1">Mobile: {formData.mobile}</Typography>
              <Typography variant="subtitle1">Message: {formData.message}</Typography>
              <Typography variant="subtitle1">Reason: {formData.offer.reason}</Typography>

              {formData.offer.reason === 'Buy Your website/Domain' && (
                <div>
                  <Typography variant="subtitle1">Currency: {formData.offer.currency}</Typography>
                  <Typography variant="subtitle1">Amount: {formData.offer.amount}</Typography>
                </div>
              )}

              <div style={{ marginTop: '20px', justifyContent: 'space-between', display: 'flex' }}>
                <Button variant="contained" color="success" onClick={() => handleResponse('Yes')}>Yes</Button>
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
