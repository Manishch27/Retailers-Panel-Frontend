import { useParams } from 'react-router-dom';
import { CardWithForm } from "@/components/ui/card-dash";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { application, user } from '../../../apis/api';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Button } from '@/components/ui/button';

// shadcn imports
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useToast } from '@/components/ui/use-toast';

const AdminRetailer = () => {
  const [retailers, setRetailers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusMap, setStatusMap] = useState({}); // Manage status for each application

  const { toast } = useToast();

  const { id } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    const fetchRetailers = async () => {
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

        const res = await axios.get(user.getAllRetailers.url, config);
        res.data.forEach((retailer) => {
          if (retailer._id === id) {
            setRetailers(retailer);
          }
        });
        setLoading(false);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setError('Unauthorized access. Please log in again.');
          navigate('/');
        } else {
          setError(err.response?.data || 'Error fetching retailers');
        }
        setLoading(false);
      }
    };

    const fetchApplications = async () => {
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

        const res = await axios.get(`${application.getRetailersAppliactions.url}/${id}`, config);
        setApplications(res.data);
        const statusMap = {};
        res.data.forEach(app => {
          statusMap[app._id] = app.status; // Initialize statusMap with the fetched status
        });
        setStatusMap(statusMap);
        setLoading(false);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setError('Unauthorized access. Please log in again.');
          navigate('/');
        } else {
          setError(err.response?.data || 'Error fetching applications');
        }
        setLoading(false);
      }
    };

    fetchRetailers();
    fetchApplications();
  }, [id]);

  // Function to add tokens to the retailer's account
  const tokenSubmit = async (data) => {
    let { tokens } = data;
    tokens = Number(tokens);

    if (isNaN(tokens)) {
      throw new Error('Invalid token amount');
    }

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

      const res = await axios.put(`${user.updateToken.url}/${id}/add-token`, { tokens }, config);
      alert("Tokens added successfully");
      console.log(res.data);

    } catch (error) {
      throw new Error(error.response?.data || 'Error adding tokens');
    }
  };

  // Function to update the status of an application

  const handleStatusChange = async (appId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('No token found, please log in again');
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await axios.put(`${application.updateApplicationStatus.url}/${appId}`, { status: newStatus }, config);
      setStatusMap(prev => ({ ...prev, [appId]: newStatus }));
      toast({
        description: 'Application status updated successfully',
      });

    } catch (error) {
      console.error('Error updating application status:', error.response?.data || error.message);
      alert(`Error updating application status: ${error.response?.data?.message || error.message}`);
    }
  };

  // Function to export retalailers application data in the excel file

  const exportData = async () => {
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
  
      const res = await axios.get(`${application.getRetailersAppliactions.url}/${id}`, config);
      const data = res.data.map((app) => {
        // Prepare an object with a fixed number of fingerprint columns
        const fingerprints = {};
        app.fingerprints.forEach((fingerprint, index) => {
          fingerprints[`Fingerprint ${index + 1}`] = {
            text: `Image ${index + 1}`,
            hyperlink: fingerprint.url,
          };
        });
  
        return {
          'Full Name': app.fullName,
          'Father Name': app.fatherName,
          'Aadhaar No.': app.aadhaarNo,
          'Mobile No.': app.mobileNo,
          'Status': app.status,
          ...fingerprints,
        };
      });
  
      // Convert data to worksheet
      const ws = XLSX.utils.json_to_sheet(data, {
        header: [
          'Full Name', 'Father Name', 'Aadhaar No.', 'Mobile No.', 'Status',
          'Fingerprint 1', 'Fingerprint 2', 'Fingerprint 3', 'Fingerprint 4', 'Fingerprint 5'
        ],
      });
  
      // Add hyperlinks to the worksheet
      data.forEach((row, rowIndex) => {
        Object.keys(row).forEach((key, colIndex) => {
          if (row[key].hyperlink) {
            const cellAddress = XLSX.utils.encode_cell({ r: rowIndex + 1, c: colIndex });
            ws[cellAddress] = {
              t: 's',
              v: row[key].text, // Display text
              l: { Target: row[key].hyperlink, Tooltip: row[key].text }, // Hyperlink and Tooltip
            };
          }
        });
      });
  
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
  
      const s2ab = (s) => {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
        return buf;
      };
  
      saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), 'retailer-applications.xlsx');
    } catch (error) {
      console.error('Error exporting data:', error.response?.data || error.message);
      alert(`Error exporting data: ${error.response?.data?.message || error.message}`);
    }
  };


  if (loading) {
    return (
      <div role="status" className='flex justify-center items-center h-full'>
        <svg aria-hidden="true" className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-[#000]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
      </div>
    );
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

      <div className="flex justify-end mt-24">
        <Button onClick={exportData} className="btn btn-primary">Export Data</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">sr no.</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead className="text-right">Aadhaar No.</TableHead>
            <TableHead className="text-right">Mobile No.</TableHead>
            <TableHead className="text-right">Fingerprints</TableHead>
            <TableHead className="text-right"></TableHead>
            <TableHead className="text-right">Update Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((app, index) => (
            <TableRow key={app._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{app.fullName}</TableCell>
              <TableCell className="text-right">{app.aadhaarNo}</TableCell>
              <TableCell className="text-right">{app.mobileNo}</TableCell>
              <TableCell className="text-right flex gap-5">
                {app.fingerprints.map((elem, i) => (
                  <Link key={elem._id} to={`${elem.url}`} className="text-blue-600">Image {i + 1}</Link>
                ))}
              </TableCell>

              <TableCell className="text-right">
                <Link to={`/dashboard/download-images/${app._id}`} className="text-blue-600">GetImages</Link>
                </TableCell>


              <TableCell className="text-right">
                <Select value={statusMap[app._id] || 'pending'} onValueChange={(value) => handleStatusChange(app._id, value)}>
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
  );
}

export default AdminRetailer;