import { useEffect, useState } from 'react';
import axios from 'axios';
import { user, application } from '../../../apis/api';
import { useNavigate } from 'react-router-dom';

import { CardWithForm } from "@/components/ui/card-dash";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


const AdminDashboard = () => {
  const [retailers, setRetailers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  //  fetchRetailers from the endpoint 
  useEffect(() => {
    
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
        setRetailers(res.data);// Assuming res.data is an array of retailers
        console.log("retailers", res.data)
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setError('Unauthorized access. Please log in again.');
          navigate('/'); // Redirect to login page if unauthorized
        } else {
          setError(err.response?.data || 'Error fetching retailers');
        }
        setLoading(false);
      }
    };

    // fetchTotalApplications
    const fetchTotalApplications = async () => {
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

        const res = await axios.get(application.getAllApplications.url, config); // Replace with your actual API endpoint
        setApplications(res.data); // Assuming res.data is an array of applications
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
    fetchTotalApplications();
  }, [navigate]);

  if (loading) {
    return(
      <div role="status" className='flex justify-center items-center h-full'>
    <svg aria-hidden="true" class="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-[#000]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
</div>
    )
  }

  if (error) {
    return <div role="alert" className="text-red-500">{error}</div>;
  }

  const handleView = (id) => () => {
    navigate(`/dashboard/retailer/${
      id
    }`);
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <h1 className="text-xl font-semibold md:text-2xl">Dashbord CSC Update</h1>
      <div className="flex flex-col gap-24">
        <div className="flex gap-16">
          <CardWithForm title={"Total Retailers"} desc={retailers.length}/>
          <CardWithForm title={"Total Applications"} desc={applications.length} />
        </div>
      </div>
      <h1 className="text-xl font-semibold md:text-2xl mt-10">All Retailers</h1>
      <Table>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">sr no.</TableHead>
      <TableHead>Name</TableHead>
      <TableHead className="text-right">Tokens</TableHead>
      <TableHead className="text-right"></TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {retailers.map((retailer, index) => (
      <TableRow key={retailer._id}>
        <TableCell>{index + 1}</TableCell>
        <TableCell>{retailer.name}</TableCell>
        <TableCell className="text-right">{retailer.tokens}</TableCell>
        <TableCell className="text-right">
          <button className="text-blue-600" onClick={handleView(retailer._id)}>View</button>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>

    </main>
  );
};

export default AdminDashboard;