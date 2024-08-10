import { Button } from "@/components/ui/button";
import image from "../../assets/sd.webp";
import { useForm } from "react-hook-form";

import { useMFS100 } from "@/customHooks/mfs100";
import { useEffect, useState } from 'react';

import axios from "axios";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Textarea } from "@/components/ui/textarea"



export function Form() {

  const { getMFS100Info, captureFinger, error } = useMFS100();
    const [info, setInfo] = useState(null);
    const [fingerprints, setFingerprints] = useState([image, image, image, image, image]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
      const fetchInfo = async () => {
        try {
          const result = await getMFS100Info();
          console.log("MFS100 Info:", result); // Log the result
          if (result.httpStatus) {
            setInfo(result.data);
          } else {
            console.error("Error fetching MFS100 info:", result.err || "Unknown error");
          }
        } catch (error) {
          console.error("Exception fetching MFS100 info:", error);
        }
      };
  
      const handleCaptureFingerprints = async () => {
        let capturedFingerprints = [...fingerprints]; // Make a copy of the current fingerprints
  
        for (let i = 0; i < 5; i++) {
          try {
            const result = await captureFinger(60, 60); // Capture fingerprint
            console.log(`Capture result for finger ${i + 1}:`, result); // Log the result
            if (result.httpStatus && result.data) {
              // Update captured fingerprints
              capturedFingerprints[i] = result.data.fingerprintImage || image; // Fallback to dummy image if no fingerprint image
              setFingerprints([...capturedFingerprints]); // Update state with new fingerprints
            } else {
              console.error(`Error capturing fingerprint ${i + 1}:`, result.err || "Unknown error");
              break; // Stop capturing if there's an error
            }
          } catch (error) {
            console.error(`Exception capturing fingerprint ${i + 1}:`, error);
            break; // Stop capturing if there's an exception
          }
        }
      };
  
      fetchInfo();
      handleCaptureFingerprints(); // Capture fingerprints when the component mounts
  
    }, [getMFS100Info, captureFinger]); 

  const { register, handleSubmit, watch, formState: { errors } } = useForm(
    {
      defaultValues: {
        name: "",
        fathername: "",
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
    }
  );

  const onSubmit = (data) => {
    console.log(data);
    // Call the API to save the data
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="w-full">
        <CardHeader>
        </CardHeader>

        <CardContent className="grid gap-4">
          <div className="grid grid-cols-3 gap-x-16 gap-y-8">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name*</Label>
              <Input id="name" type="text" placeholder="Full Name"
                {...register('name', { required: 'Please enter the name' })}
              />
              {errors.name && <p className="text-red500">{errors.name.message}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="fathername">Father Name</Label>
              <Input id="fathername" type="text" placeholder="Father Name"
                {...register('fathername')}
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
                    <img src={fingerprint} alt={`fingerprint ${index + 1}`} className="w-36" />
                    <Button className="w-full bg-white border border-black" type="button">Capture {index + 1} Finger</Button>
                  </CardContent>
                </Card>
              ))}
            </div>

        </CardContent>
        <CardFooter className="flex justify-center mt-16">
          <Button className="w-36" type="submit">Submit</Button>
        </CardFooter>
      </Card>
    </form>
  )
}