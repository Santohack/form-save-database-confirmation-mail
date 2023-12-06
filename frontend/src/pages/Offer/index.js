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

    document.title = 'Offer Details';
    const fetchFormData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/${id}`);
        setFormData(response.data);
        if (response.data && response.data.offerStatus === 'Accepted') {
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
  console.log("formData", formData);
  const handleResponse = async (responseValue) => {
    try {
      const responseData = {
        response: responseValue, // Rename the 'response' variable to 'responseValue'
      };

      // Send the response form data to the backend route
      await axios.post(`${process.env.REACT_APP_API_URL}/response/${id}`, responseData);
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

      {formData ? (
     <Paper elevation={1} sx={{ padding: '20px', width: '23rem' }}>
     <Grid container spacing={2} width={'23rem'}>
            <Grid item xs={12} md={12}>
              <Typography variant="h4" sx={{ textAlign: 'center' }} mb={2}>Offer Details</Typography>
              <Typography variant="subtitle1"><span style={{ fontWeight: 'bold' }}>Name: {formData.userName}</span></Typography>
              <Typography variant="subtitle1"><span style={{ fontWeight: 'bold' }}>Email: {formData.email}</span></Typography>
              <Typography variant="subtitle1"><span style={{ fontWeight: 'bold' }}>Mobile: {formData.mobile}</span></Typography>
              <Typography variant="subtitle1"><span style={{ fontWeight: 'bold' }}>Message: {formData.message}</span></Typography>
              <Typography variant="subtitle1"><span style={{ fontWeight: 'bold' }}>Reason: {formData.offer.reason}</span></Typography>

              {formData.offer && formData.offer.reason === 'Buy this website/Domain' && (
               

                  <><Typography variant="subtitle1"><span style={{ fontWeight: 'bold' }}>Currency: {formData.offer.currency}</span></Typography>
                  <Typography variant="subtitle1"><span style={{ fontWeight: 'bold' }}>Amount: {formData.offer.amount}</span></Typography>


                  {formData.offerStatus === 'Accepted' ? (
                    <Typography variant="subtitle1"><span style={{ fontWeight: 'bold' }}>Offer Status: Accepted</span></Typography>
                  ) : (
                    <>
                      <Typography variant="subtitle1"><span style={{ fontWeight: 'bold' }}>Offer Status: {offerStatus}</span></Typography>
                      {offerStatus === 'Pending' && (
                         <div style={{ marginTop: '20px', justifyContent: 'center', margin: '5px', padding: '5px', display: 'flex' }}>
                          <Button sx={{ marginRight: '30px' }} variant="contained" color="success" onClick={() => handleResponse('Yes')}>Accept Offer</Button>
                          <Button variant="contained" color="error" onClick={() => handleResponse('No')}>Reject Offer</Button>
                        </div>

                      
                      )}
                    </>
                  )}
                </>
              )}

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
