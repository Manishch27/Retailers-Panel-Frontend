import { Button } from "@/components/ui/button";
import { useDispatch } from 'react-redux';
import { login } from '../../actions/authActions';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useState } from 'react';

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      username: '',
      password: ''
    }
  });

  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Get auth error from Redux state

  const onSubmit = async (data) => {
    const { username, password } = data;
    try {
      await dispatch(login(username, password));
      navigate('/dashboard/home');
    } catch (error) {
      setLoginError(error.message || 'Login failed'); // Display error message
    }
  };

  return (
    <form className="flex flex-col items-center justify-center min-h-screen bg-primary" onSubmit={handleSubmit(onSubmit)}>
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-5xl">Login Now!</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Operator User ID</Label>
            <Input
              id="username"
              type="text"
              {...register('username', { required: 'Please enter your username' })}
            />
            {errors.username && <p>{errors.username.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Operator Password</Label>
            <Input
              id="password"
              type="password"
              {...register('password', { required: 'Please enter your password' })}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
        </CardContent>
        <CardFooter className="flex justify-center w-full mt-8">
          <Button className="w-1/2" type="submit">Login</Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default LoginForm;