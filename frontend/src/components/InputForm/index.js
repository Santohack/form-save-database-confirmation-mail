import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function InputForm({ label, type, error, helperText, id, varient, onChange, value, isRequired }) {
  return (
    <Box

      sx={{
        '& > :not(style)': { m: 1, width: '60ch' },
      }}

    >
      <TextField
        error={isRequired && error}
        helperText={isRequired && helperText}
        value={value}
        required={isRequired}
        type={type}
        label={label}
        id={id}
        variant={varient}
        onChange={onChange}
      />

    </Box>
  );
}