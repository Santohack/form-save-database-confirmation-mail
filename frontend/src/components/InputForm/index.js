import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function InputForm({label,type ,id,varient,onChange}) {
  return (
    <Box
      
      sx={{
        '& > :not(style)': { m: 1, width: '60ch' },
      }}
    
    >
      <TextField type={type} label={label} id={id} variant={varient}  onChange={onChange} />
     
    </Box>
  );
}