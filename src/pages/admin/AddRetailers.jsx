import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useState } from 'react';

import axios from "axios";
import { user } from '../../../apis/api';

// Popup Component
const Popup = ({ message, onClose }) => (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
    <div className="bg-white p-4 rounded shadow-lg">
      <p>{message}</p>
      <Button onClick={onClose} className="mt-2">Close</Button>
    </div>
  </div>
);

const AddRetailer = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      username: '',
      password: ''
    }
  });

  const [registerError, setRegisterError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found, please log in again');
      }
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      await axios.post(user.createUser.url, data, config); 
      setSuccessMessage('Retailer created successfully');
    } catch (error) {
      if (error.response && error.response.data) {
        setRegisterError(error.response.data.message || 'Registration failed');
      } else {
        setRegisterError('Registration failed');
      }
    }
  };

  const closePopup = () => {
    setSuccessMessage('');
    navigate('/dashboard/home'); // Navigate to dashboard after closing the popup
  };

  return (
    <>
      <form className="flex flex-col items-center justify-center min-h-screen" onSubmit={handleSubmit(onSubmit)}>
        <CardTitle className="text-5xl mb-24">Create a Retailer😊</CardTitle>
        <Card className="w-full max-w-lg pt-5">
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                {...register('name', { required: 'Please enter the name' })}
              />
              {errors.name && <p>{errors.name.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                {...register('username', { required: 'Please enter the username' })}
              />
              {errors.username && <p>{errors.username.message}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register('password', { required: 'Please enter the password' })}
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>

            {registerError && <p style={{ color: 'red' }}>{registerError}</p>}
          </CardContent>
          <CardFooter className="flex justify-center w-full mt-8">
          <Button className="w-1/2" type="submit">Create</Button>
          </CardFooter>
        </Card>
      </form>

      {successMessage && <Popup message={successMessage} onClose={closePopup} />}
    </>
  );
};

export default AddRetailer;