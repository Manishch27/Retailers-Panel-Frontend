import { CardWithForm } from "@/components/ui/card-dash";
import axios from "axios";
import { useEffect, useState } from "react";
import { user, application } from "../../../apis/api";
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

const RetailerDashboard = () => {

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

        const res = await axios.get(user.getAllRetailers.url, config);
        res.data.forEach((retailer) => {
          if (retailer._id === id) {
            console.log("retialer", retailer)
            setRetailer(retailer);
          }
        })
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
        console.log(app);

        const rejectedCount = app.filter(app => app.status === 'reject').length;
        const acceptedCount = app.filter(app => app.status === 'accept').length;
        const pendingCount = app.filter(app => app.status === 'pending').length;

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

  if (loading) {
    return (
      <div role="status" className='flex justify-center items-center h-full'>
        <svg aria-hidden="true" class="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-[#000]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
      </div>
    )
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <h1 className="text-xl font-semibold md:text-2xl">Dashbord CSC Update</h1>
      <div className="flex flex-col gap-24">
        <div className="flex gap-16">
          <CardWithForm title={"Balance"} desc={retailer.tokens} />
          <CardWithForm title={"Total Applications"} desc={Applications.length} />
        </div>

        <div className="flex gap-16">
          <CardWithForm title={"Rejected Applications"} desc={rejectedApplications} className={'text-sm text-red-500'} />
          <CardWithForm title={"Accepted Applications"} desc={acceptedApplications} className={'text-sm text-green-500'} />
          <CardWithForm title={"Pending Applications"} desc={pendingApplications} className={'text-sm text-yellow-500'} />
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

        <TableBody>
          {Applications.map((application, index) => (
            <TableRow key={application._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{application.fullName}</TableCell>
              <TableCell className="text-right">{application.aadhaarNo}</TableCell>

              <TableCell className="text-right">{application.mobileNo}</TableCell>
              <TableCell className="text-right flex gap-5">
                {application.fingerprints.map((elem, i) => {
                  return <Link key={elem._id} to={`${elem.url}`} className="text-blue-600">Image {i + 1}</Link>
                })}
              </TableCell>
              <TableCell className="text-right">{application.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  )
}

export default RetailerDashboard;