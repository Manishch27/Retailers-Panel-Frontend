import { Button } from "@/components/ui/button";
import image from "../../assets/sd.webp";
import { useForm } from "react-hook-form";

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
  return (
    <Card className="w-full">
      <CardHeader>
      </CardHeader>

      <CardContent className="grid gap-4">
        <div className="grid grid-cols-3 gap-x-16 gap-y-8">
        <div className="grid gap-2">
          <Label htmlFor="name">Full Name*</Label>
          <Input id="name"  type="email" placeholder="Full Name" required />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="fathername">Father Name</Label>
          <Input id="fathername" type="Father Name" placeholder="Father Name" required />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="dob">Date Of Birth</Label>
          <Input id="dob" type="Date of birth" placeholder="25/07/2000" required />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="gender">Gender</Label>
          <Input id="gender" type="gender" placeholder="" required />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="Aadhaar">Aadhaar No.*</Label>
          <Input id="Aadhaar" type="gender" placeholder="" required />
        </div>


        <div className="grid gap-2">
          <Label htmlFor="phone">Mobile No.*</Label>
          <Input id="phone" type="gender" placeholder="" required />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="phone">Email Id</Label>
          <Input id="phone" type="gender" placeholder=""/>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="address">Address</Label>
          <Textarea id="address" type="gender" placeholder=""/>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="postoffice">Post Office</Label>
          <Input id="postoffice" type="gender" placeholder=""/>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="district">District</Label>
          <Input id="district" type="gender" placeholder=""/>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="state">State</Label>
          <Input id="state" type="gender" placeholder=""/>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="purpose">purpose</Label>
          <Input id="purpose" type="gender" placeholder=""/>
        </div>

        </div>

        <div className="grid grid-cols-5 gap-4 justify-center items-center">
            <Card>
                <CardContent className="mt-5 flex flex-col justify-center items-center gap-4">
                    <img src={image} alt="fingerprint image" className="w-36"/>
                    <Button className="w-full bg-white border border-black">1st Finger Click</Button>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="mt-5 flex flex-col justify-center items-center gap-4">
                    <img src={image} alt="fingerprint image" className="w-36"/>
                    <Button className="w-full bg-white border border-black">1st Finger Click</Button>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="mt-5 flex flex-col justify-center items-center gap-4">
                    <img src={image} alt="fingerprint image" className="w-36"/>
                    <Button className="w-full bg-white border border-black">1st Finger Click</Button>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="mt-5 flex flex-col justify-center items-center gap-4">
                    <img src={image} alt="fingerprint image" className="w-36"/>
                    <Button className="w-full bg-white border border-black">1st Finger Click</Button>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="mt-5 flex flex-col justify-center items-center gap-4">
                    <img src={image} alt="fingerprint image" className="w-36"/>
                    <Button className="w-full bg-white border border-black">1st Finger Click</Button>
                </CardContent>
            </Card>
        </div>

      </CardContent>
      <CardFooter className="flex justify-center mt-16">
        <Button className="w-36">Submit</Button>
      </CardFooter>
    </Card>
  )
}