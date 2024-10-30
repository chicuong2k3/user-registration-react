import { useState, ChangeEvent, FormEvent } from 'react';
import axios, { AxiosError } from 'axios';
import { TextField, Button, Typography, Box, Card, CardContent, Snackbar, Alert } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginResponseSuccess {
  message: string;
  token: string;
}

interface LoginResponseError {
  errors: Record<string, string[]>;
}

type LoginResponse = LoginResponseSuccess | LoginResponseError;

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: ''
    }));
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post<LoginResponse>('https://localhost:7149/user/login', formData);
      if ('token' in response.data) {

        localStorage.setItem('token', response.data.token);
        setSuccessMessage(response.data.message);
        setSnackbarOpen(true);
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else if ('errors' in response.data) {
        setErrors({
          email: response.data.errors.email?.join(' ') ?? '',
          password: response.data.errors.password?.join(' ') ?? ''
        });
      }
    } catch (err) {
      const errResponse = (err as AxiosError<LoginResponseError>).response;
      if (errResponse?.data.errors) {
        setErrors({
          email: errResponse.data.errors.email?.join(' ') ?? '',
          password: errResponse.data.errors.password?.join(' ') ?? ''
        });
      }
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Card sx={{ maxWidth: 500, margin: '40px auto', padding: '16px' }}>
      <CardContent>
        <Box component="form" onSubmit={handleLogin} sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}>
          <Typography variant="h5" textAlign="center">Log In</Typography>

          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            size="small"
            onChange={handleChange}
            required
            error={Boolean(errors.email)}
            helperText={errors.email}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            size="small"
            onChange={handleChange}
            required
            error={Boolean(errors.password)}
            helperText={errors.password}
          />

          <Button type="submit" variant="contained" color="primary">
            Log In
          </Button>

          <Typography sx={{ textAlign: 'center' }}>
            Don't have an account?{' '}
            <RouterLink to="/register" style={{ textDecoration: 'none' }}>
              Sign up
            </RouterLink>
          </Typography>
        </Box>
      </CardContent>

      <Snackbar open={snackbarOpen} autoHideDuration={2000} onClose={handleCloseSnackbar}>
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </Card>
  );
}
