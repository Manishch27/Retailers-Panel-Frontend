import { useParams } from 'react-router-dom';
import { CardWithForm } from "@/components/ui/card-dash";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { application, user } from '../../../apis/api';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const AdminRetailer = () => {

  const [retailers, setRetailers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("pending");


  const { id } = useParams();

  const navigate = useNavigate();

  // fetch applications from this retailer with retailer

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
        res.data.forEach((retailer) => {
          if (retailer._id === id) {
            setRetailers(retailer);
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
    };

    // fetchTotalApplicationsBy an individual retailer

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
        setApplications(res.data);// Assuming res.data is an array of applications
        console.log(res.data);
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

  }, [id])


  //  OnSubmit handler for adding tokens

  const tokenSubmit = async (data) => {
    let { tokens } = data;

    tokens = Number(tokens);

    if (isNaN(tokens)) {
      throw new Error('Invalid token amount');
    }

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

      const res = await axios.put(`${user.updateToken.url}/${id}/add-token`, { tokens }, config); // Replace with your actual API endpoint
      alert("Tokens added successfully");
      console.log(res.data);

    } catch (error) {
      throw new Error(error.response?.data || 'Error adding tokens');
    }
  }

  const handleStatusChange = async (id, status) => {
    console.log(id, status);
    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage
  
      if (!token) {
        alert('No token found, please log in again');
        return; // Exit the function if no token
      }
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token to the request
        },
      };
  
      const res = await axios.put(`${application.updateApplicationStatus.url}/${id}`, { status }, config); // Replace with your actual API endpoint
      console.log(res.data);
      setStatus(res.data.status); // Ensure setStatus is defined and accessible
      alert('Status updated successfully');
  
    } catch (error) {
      console.error('Error updating application status:', error.response?.data || error.message); // Log detailed error
      alert(`Error updating application status: ${error.response?.data?.message || error.message}`); // Display user-friendly error message
    }
  };  

  if (loading) {
    return <p>Loading...</p>;
  }


  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <h1 className="text-xl font-semibold md:text-2xl">Retailer: {retailers.name}</h1>
      <div className="flex flex-col gap-24">
        <div className="flex gap-16">
          <CardWithForm title={"Total Applications"} desc={applications.length} />
          <CardWithForm title={"Total Tokens"} desc={retailers.tokens} />
          <CardWithForm title={"Add Tokens"} tokenSubmit={tokenSubmit} />

        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">sr no.</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead className="text-right">Aadhaar No.</TableHead>
            <TableHead className="text-right">Mobile No.</TableHead>
            <TableHead className="text-right">Fingerprints</TableHead>
            <TableHead className="text-right">Update Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((application, index) => (
            <TableRow key={application._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{application.fullName}</TableCell>
              <TableCell className="text-right">{application.aadhaarNo}</TableCell>
              <TableCell className="text-right">
                {application.mobileNo}
              </TableCell>

              <TableCell className="text-right flex gap-5">
                {application.fingerprints.map((elem, i) => {
                  return <Link key={elem._id} to={`${elem.url}`} className="text-blue-600">Image {i + 1}</Link>
                })}
              </TableCell>

              <TableCell className="text-right">
  <Select value={status} onValueChange={(value) => handleStatusChange(value, application._id)}>
    <SelectTrigger className="w-[180px]">
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="reject">reject</SelectItem>
      <SelectItem value="accept">accept</SelectItem>
      <SelectItem value="pending">pending</SelectItem>
    </SelectContent>
  </Select>
</TableCell>


            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  )
}

export default AdminRetailer;