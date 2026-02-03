import React, { useEffect, useState } from 'react'
import Navbar from '../components all/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import AdminJobTable from './AdminJobTable'
import useGetAllAdminJobs from '../../hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '../../redux/jobSlice'

const AdminJobs = () => {
const navigate = useNavigate();

  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <div>
      <Navbar />
      <div className=" max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-fit"
            placeholder="Filter by Name & Jobs"
            onChange={(e) => setInput(e.target.value)}
          ></Input>
          <Button onClick={() => navigate("/admin/jobs/create")}>
            Post new Job
          </Button>
        </div>
        <div>
          <AdminJobTable />
        </div>
      </div>
    </div>
  )
}

export default AdminJobs;

