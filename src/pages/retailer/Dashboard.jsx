import { CardWithForm } from "@/components/ui/card-dash";
import axios from "axios";
import { useEffect, useState } from "react";
import {user, application} from "../../../apis/api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

// shadcn imports

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const RetailerDashboard = () =>{

  // const [balance, setBalance] = useState(0);
  const [Applications, setApplications] = useState([]);
  const [rejectedApplications, setRejectedApplications] = useState(0);
  const [acceptedApplications, setAcceptedApplications] = useState(0);
  const [pendingApplications, setPendingApplications] = useState(0);
  const [retailer, setRetailer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const id = localStorage.getItem('id');
  useEffect(() => {

    
    //  fetch the retailer details
    const fetchRetailers = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from localStorage

        if (!token) {
          throw new Error('No token found, please log in again');
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token to the request
          },
        };

        const res = await axios.get(user.getAllRetailers.url, config); // Replace with your actual API endpoint
        res.data.forEach((retailer) => {
          if (retailer._id === id) {
            console.log("retialer", retailer)
            setRetailer(retailer);
            
          }
        })
        setLoading(false);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setError('Unauthorized access. Please log in again.');
          navigate('/'); // Redirect to login page if unauthorized
        } else {
          setError(err.response?.data || 'Error fetching retailers');
        }
        setLoading(false);
      }
    }

    // fetch the total applications by the retailer

    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from localStorage

        if (!token) {
          throw new Error('No token found, please log in again');
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token to the request
          },
        };

        const res = await axios.get(`${application.getRetailersAppliactions.url}/${id}`, config); // Replace with your actual API endpoint
        const app = res.data
        setApplications(app);// Assuming res.data is an array of applications

        const rejectedCount = app.filter(app => app.status === 'rejected').length;
        const acceptedCount = app.filter(app => app.status === 'accepted').length;
        const pendingCount =  app.filter(app => app.status === 'pending').length;

        setRejectedApplications(rejectedCount);
        setAcceptedApplications(acceptedCount);
        setPendingApplications(pendingCount);
        setLoading(false);

      } catch (err) {
        if (err.response && err.response.status === 401) {
          setError('Unauthorized access. Please log in again.');
          navigate('/'); // Redirect to login page if unauthorized
        } else {
          setError(err.response?.data || 'Error fetching applications');
        }
        setLoading(false);
      }
    };

    fetchRetailers();
    fetchApplications();

  }, [id]);

    return(
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <h1 className="text-xl font-semibold md:text-2xl">Dashbord CSC Update</h1>
        <div className="flex flex-col gap-24">
          <div className="flex gap-16">
            <CardWithForm title = {"Balance"} desc = {retailer.tokens}/>
            <CardWithForm title = {"Total Applications"} desc = {Applications.length} />
            </div>

            <div className="flex gap-16">
            <CardWithForm title = {"Rejected Applications"} desc = {rejectedApplications} className={'text-sm text-red-500'} />
            <CardWithForm title = {"Accepted Applications"} desc = {acceptedApplications} className={'text-sm text-green-500'}/>
            <CardWithForm title = {"Pending Applications"} desc = {pendingApplications} className={'text-sm text-yellow-500'}/>
            </div>
        </div>

        <h1 className="text-xl font-semibold md:text-2xl mt-8">Applications</h1>
        <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">sr no.</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead className="text-right">Aadhaar No.</TableHead>
            <TableHead className="text-right">Mobile No.</TableHead>
            <TableHead className="text-right">Fingerprints</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>

      </Table>
      </main>
    )
}

export default RetailerDashboard;