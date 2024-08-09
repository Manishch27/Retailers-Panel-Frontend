import { useEffect, useState } from 'react';
import axios from 'axios';
import { user, application } from '../../../apis/api';
import { useNavigate } from 'react-router-dom';

import { CardWithForm } from "@/components/ui/card-dash";

import { useParams } from 'react-router-dom';

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

  useEffect(() => {
    //  fetchRetailers
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
    return <div>Loading retailers...</div>;
  }

  if (error) {
    return <div>Error loading retailers: {error}</div>;
  }

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
      <TableRow key={retailer.id}>
        <TableCell>{index + 1}</TableCell>
        <TableCell>{retailer.name}</TableCell>
        <TableCell className="text-right">{retailer.tokens}</TableCell>
        <TableCell className="text-right">
          <button className="text-blue-600">View</button>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>

    </main>
  );
};

export default AdminDashboard;