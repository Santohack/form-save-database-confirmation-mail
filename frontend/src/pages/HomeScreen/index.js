import React, { useState } from 'react';
import { HomeContainer } from '../../styles/HomeScreen';
import InputForm from '../../components/InputForm';
import { Button, FormControl, Typography, Snackbar, FormControlLabel, Radio, RadioGroup, TextField, Select, MenuItem, Box, Alert } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import TextFormArea from '../../components/TextFormArea';
import axios from 'axios';


const HomeScreen = () => {
  const [userName, setUserName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [mobile, setMobile] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [offer, setOffer] = useState({
    reason: '',
    currency: 'EUR',
    amount: ''
  });
  const [fieldError, setFieldError] = useState(false);
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setOffer({ ...offer, [name]: value });
  };

  const handleUsernameChange = (e) => {
    setUserName(e.target.value);
    setFieldError(e.target.value === ''); // Set error based on username length
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setFieldError(e.target.value === ''); // Set error based on username length
  };
  const handleCurrencyChange = (event) => {
    setOffer({ ...offer, currency: event.target.value });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!userName || !email) {
      setFieldError(true); // Set error if username or email is empty on form submission
      return;
    }

    try {
      const formData = {
        userName,
        email,
        mobile,
        message,
        offer,
      };

      const response = await axios.post(process.env.REACT_APP_API_URL, formData);
      // setSuccessMessage(`Form data submitted successfully! Form details: ${response.data.formLink}`);
      setSuccessMessage('Form data submitted successfully!');
      setOpenSnackbar(true);
      console.log('Form Data Sent:', response.data);
      setUserName('');
      setEmail('');
      setMobile('');
      setMessage('');
      setOffer({
        reason: '',
        currency: 'EUR',
        amount: ''
      });


    } catch (error) {
      console.error('Error Sending Form Data:', error);

    }


  };


  return (
    <>
      <Typography variant="h4" mt={3} sx={{ fontWeight: 'bold', marginBottom: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        Contact Form
      </Typography>
      <HomeContainer>
        <form onSubmit={handleSubmit}>
          <FormControl >
            <InputForm
              value={userName}
              id="name"
              label="Name"
              variant="outlined"
              type={"text"}
              isRequired={fieldError}
              onChange={handleUsernameChange}
              error={userName.length === 0} // Example validation for error
              helperText={userName.length === 0 ? 'Name is required' : ''}
            />

            <InputForm
              id="email"
              value={email}
              label="Email"
              variant="outlined"
              type={"email"}
              onChange={handleEmailChange}
              isRequired={fieldError}
              error={email.length === 0} // Example validation for error
              helperText={email.length === 0 ? 'Emai is required' : ''}
            />
            <InputForm
              id="mobile"
              value={mobile}
              label="Mobile (Optional)"
              variant="outlined"
              type={"tel"}
              onChange={(e) => setMobile(e.target.value)}
            />
            <TextFormArea
              id="message"
              value={message}
              label="Message"
              minRows={5}

              onChange={(e) => setMessage(e.target.value)}
            />
            <Box>


              <Typography variant="h6" sx={{ marginBottom: '1rem', marginTop: '1rem', display: 'flex', }}> Reason : </Typography>
              <RadioGroup
                name="reason"
                value={offer.reason}
                onChange={handleInputChange}
              >
                <FormControlLabel value="General" control={<Radio />} label="General" />
                <FormControlLabel value="Buy this website/Domain" control={<Radio />} label="Buy this website/Domain" />
                <FormControlLabel value="Complaint" control={<Radio />} label="Complaint" />
              </RadioGroup>


              {offer.reason === 'Buy this website/Domain' && (
                <div>
                  <Typography id="currency-label" variant="h6" sx={{ marginBottom: '1rem', display: 'flex', }}>  Offer: </Typography>
                  {/* <InputLabel >Currency:</InputLabel> */}
                  <Select
                    labelId="currency-label"
                    id="currency"
                    name="currency"
                    value={offer.currency}
                    onChange={handleCurrencyChange}
                  >
                    <MenuItem value="EUR">EUR</MenuItem>
                    <MenuItem value="USD">USD</MenuItem>
                    <MenuItem value="GBP">GBP</MenuItem>
                    <MenuItem value="CHF">CHF</MenuItem>
                    <MenuItem value="CNY">CNY</MenuItem>
                    <MenuItem value="JPY">JPY</MenuItem>
                  </Select>

                  <TextField
                    id="amount"
                    name="amount"
                    label="Amount"
                    value={offer.amount}
                    onChange={handleInputChange}
                  />
                </div>
              )}

            </Box>
            <Button endIcon={<SendIcon />} color="success" type="submit" variant="contained" sx={{ padding: '1rem', borderRadius: '15px', marginTop: '1rem' }}>
              Send
            </Button>
          </FormControl>
        </form>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}

          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Alert severity="success">{successMessage}</Alert>
        </Snackbar>
      </HomeContainer>
    </>
  );
};

export default HomeScreen;
