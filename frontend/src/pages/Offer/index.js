import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Typography, Paper, Box, Grid, Button, Alert, Snackbar } from '@mui/material';

const OfferDetails = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [offerStatus, setOfferStatus] = useState('Pending');
  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/contact/${id}`);
        setFormData(response.data);
        if (response.data.offerStatus === 'Accepted') {
          setOfferStatus('Accepted');
        }
      } catch (error) {
        console.error('Error fetching form details:', error);
      }
    };

    fetchFormData();
  }, [id]);
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const handleResponse = async (responseValue) => {
    try {
      const responseData = {
        response: responseValue, // Rename the 'response' variable to 'responseValue'
      };

      // Send the response form data to the backend route
      await axios.post(`http://localhost:3001/api/contact/response/${id}`, responseData);
      setSnackbarOpen(true);
      // Update the UI or perform any necessary actions upon successful response recording
     // Update the offer status when the user accepts the offer
     if (responseValue === 'Yes') {
      setOfferStatus('Accepted');
    }
    } catch (error) {
      console.error('Error sending response:', error);
    }
  };

  return (
    <Box mt={3} justifyContent={'center'} alignContent={'center'} m={'auto'}>
      <Typography variant="h4" mb={2}>Form Details</Typography>
      {formData ? (
        <Paper elevation={3} sx={{ padding: '20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              {/* Display other form details */}
           
              {formData.offer && formData.offer.reason === 'Buy Your website/Domain' && (
                <div>
                  <Typography variant="subtitle1">Currency: {formData.offer.currency}</Typography>
                  <Typography variant="subtitle1">Amount: {formData.offer.amount}</Typography>

                  {/* Display offer status and buttons */}
                  {formData.offerStatus === 'Accepted' ? (
                    <Typography variant="subtitle1">Offer Status: Accepted</Typography>
                  ) : (
                    <>
                      <Typography variant="subtitle1">Offer Status: {offerStatus}</Typography>
                      {offerStatus === 'Pending' && (
                    <>
                      <Button variant="contained" color="success" onClick={() => handleResponse('Yes')}>Accept Offer</Button>
                      <Button variant="contained" color="error" onClick={() => handleResponse('No')}>Reject Offer</Button>
                    </>
                  )}
                    </>
                  )}
                </div>
              )}
              {/* Add more details here if needed */}
            </Grid>
          </Grid>
        </Paper>
      ) : (
        <Typography variant="subtitle1">Loading...</Typography>
      )}

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

export default OfferDetails;
