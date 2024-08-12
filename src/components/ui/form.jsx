import { Button } from "@/components/ui/button";
import image from "../../assets/sd.webp";
import { useForm } from "react-hook-form";
import { CaptureFinger } from "../../Mfs100-Utils/mfs100";
import { useState } from 'react';
import axios from "axios";

import { useNavigate } from "react-router-dom";

import { application } from "../../../apis/api";

// shadcn import
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast"

export function Form() {
  const { toast } = useToast()
  const navigate = useNavigate();

  const { register, handleSubmit, setValue, formState: { errors, isValid } } = useForm({
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      fatherName: "",
      dob: "",
      gender: "",
      aadhaarNo: "",
      mobileNo: "",
      emailId: "",
      address: "",
      postOffice: "",
      district: "",
      state: "",
      finger1: "",
      finger2: "",
      finger3: "",
      finger4: "",
      finger5: ""
    }
  });

  const [fingerprints, setFingerprints] = useState([
    { image, quality: "" },
    { image, quality: "" },
    { image, quality: "" },
    { image, quality: "" },
    { image, quality: "" }
  ]);

  const [loading, setLoading] = useState(false);

  const captureFingerprints = async (index) => {
    if (index < 0 || index >= fingerprints.length) {
      return;
    }
    try {
      // Assuming CaptureFinger returns an image URL or binary data
      const captureResult = await new CaptureFinger(1, 5000);
      console.log(captureResult);

      // Convert the binary data to base64
      const base64Image = `data:image/png;base64,${captureResult.data.BitmapData}`;

      // Update the state with the base64-encoded image
      const newFingerprints = [...fingerprints];
      newFingerprints[index] = {
        image: base64Image,
        quality: captureResult.data.Quality
      };
      setFingerprints(newFingerprints);

      // Set the value of the fingerprint field in the form
      setValue(`finger${index + 1}`, base64Image);
    } catch (error) {
      console.log(error);
    }
  };

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

      await axios.post(application.createApplication.url, data, config);
      setLoading(false);
        toast({
          description: "Application submitted successfully",
        })

        navigate('/dashboard/home');

    } catch (error) {

      // if (error.response && error.response.data) {
      //   console.log(error.response.data.message || 'Application failed');
      // } else {
      //   console.log('Application failed');
      // }
      console.log(error);

    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="w-full">
        <CardHeader></CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-3 gap-x-16 gap-y-8">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name*</Label>
              <Input id="name" type="text" placeholder="Full Name"
                {...register('fullName', { required: 'Please enter the name' })}
              />
              {errors.name && <p className="text-red500">{errors.name.message}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="fathername">Father Name</Label>
              <Input id="fathername" type="text" placeholder="Father Name"
                {...register('fatherName')}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="dob">Date Of Birth</Label>
              <Input id="dob" type="text" placeholder="25/07/2000"
                {...register('dob')}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="gender">Gender</Label>
              <Input id="gender" type="text" placeholder=""
                {...register('gender')}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="Aadhaar">Aadhaar No.*</Label>
              <Input id="Aadhaar" type="text" placeholder=""
                {...register('aadhaarNo', { required: 'Please enter the Aadhaar No' })}
              />
              {errors.aadhaarNo && <p className="text-red500">{errors.aadhaarNo.message}</p>}
            </div>


            <div className="grid gap-2">
              <Label htmlFor="phone">Mobile No.*</Label>
              <Input id="phone" type="number" placeholder=""
                {...register('mobileNo', { required: 'Please enter the Mobile No' })}
              />
              {errors.mobileNo && <p className="text-red500">{errors.mobileNo.message}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="gender">Email Id</Label>
              <Input id="gender" type="text" placeholder=""
                {...register('emailId')}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" type="text" placeholder=""
                {...register('address')}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="postoffice">Post Office</Label>
              <Input id="postoffice" type="text" placeholder=""
                {...register('postOffice')}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="district">District</Label>
              <Input id="district" type="text" placeholder=""
                {...register('district')}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="state">State</Label>
              <Input id="state" type="text" placeholder=""
                {...register('state')}
              />
            </div>
          </div>

          <div className="grid grid-cols-5 gap-4 justify-center items-center mt-10">
            {fingerprints.map((fingerprint, index) => (
              <Card key={index}>
                <CardContent className="mt-5 flex flex-col justify-center items-center gap-4">
                  <img src={fingerprint.image} alt={`fingerprint ${index + 1}`} className="w-36"
                  />
                  <p className="text-xl font-bold">{fingerprint.quality}</p>
                  <Button className="w-full bg-white border border-black" type="button" onClick={() => captureFingerprints(index)}>
                    Capture Finger {index + 1}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center mt-16">
          <Button className="w-36" type="submit" onClick = {()=>{
            isValid&&setLoading(true)
          }}>{loading==true?   <svg aria-hidden="true" class="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-[#000]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>:'Submit'}</Button>
        </CardFooter>
      </Card>
    </form>
  );
}