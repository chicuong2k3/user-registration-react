import { useState, ChangeEvent, FormEvent } from 'react';
import axios, { AxiosError } from 'axios';
import { TextField, Button, Typography, Box, Link, Card, CardContent, Snackbar, Alert } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
}

interface RegisterResponseError {
  errors: Record<string, string[]>;
}

type RegisterResponse = string | RegisterResponseError;

export default function RegisterPage() {
  const [formData, setFormData] = useState<RegisterFormData>({
    username: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: ''
  });

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

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post<RegisterResponse>('https://localhost:7149/user/register', formData);
      if (response.status === 200) {
        setSnackbarOpen(true);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (err) {
      const errResponse = (err as AxiosError<RegisterResponseError>).response;
      setErrors({
        username: errResponse?.data.errors?.username?.join(' ') ?? '',
        email: errResponse?.data.errors?.email?.join(' ') ?? '',
        password: errResponse?.data.errors?.password?.join(' ') ?? ''
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Card sx={{ maxWidth: 500, margin: '40px auto', padding: '16px' }}>
      <CardContent>
        <Box component="form" onSubmit={handleRegister} sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}>
          <Typography variant="h5" textAlign="center">Sign Up</Typography>

          <TextField
            label="Username"
            name="username"
            value={formData.username}
            size="small"
            onChange={handleChange}
            required
            error={Boolean(errors.username)}
            helperText={errors.username}
          />
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
            Sign Up
          </Button>

          <Typography sx={{ textAlign: 'center' }}>
            Already have an account?{' '}
            <RouterLink to="/login" style={{ textDecoration: 'none' }}>
              <Link>Sign in</Link>
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
          Register successfully!
        </Alert>
      </Snackbar>
    </Card>
  );
}
