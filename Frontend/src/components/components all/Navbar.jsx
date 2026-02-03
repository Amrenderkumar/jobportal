import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from "../ui/popover"

import { Avatar, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { LogOut, User2 } from 'lucide-react'
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_ENDPOINT } from '@/Utils/data'
import { setUser } from '@/redux/authslice'


const Navbar = () => {

  const {user} = useSelector(store => store.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();
   const logoutHandler = async () => {
    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/logout`,{}, {
        withCredentials: true,
      });
      if (res && res.data && res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      } else {
        console.error("Error logging out:", res.data);
      }
    } catch (error) {
      console.error("Axios error:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
      }
      toast.error("Error logging out. Please try again.");
    }
  };

  return (
    <div className='w-full'>
      <div className='flex items-center justify-between mx-auto max-w-7xl p-4'>
        <div className='p-4 text-black flex cursor-pointer font-bold text-2xl'>
          <h1>Job <span className="text-blue-500">froge</span>
          </h1>
        </div>
        <div className='flex items-center gap-6'>
          <ul className='flex font-sm items-center gap-6 text-black'>
             {user && user.role === "Recruiter" ? (
              <>
                <li>
                  <Link to={"/admin/companies"}>Companies</Link>
                </li>
                <li>
                  <Link to={"/admin/jobs"}>Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  {" "}
                  <Link to={"/Home"}>Home</Link>
                </li>
                <li>
                  {" "}
                  <Link to={"/Browse"}>Browse</Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link to={"/Jobs"}>Jobs</Link>
                </li>
              </>
            )}
            
          </ul>
          {
          !user ? (
          <div className='flex gap-4 items-center'>
            <Button variant="outline"><Link to="/login">Login</Link></Button>
            <Button className="bg-black text-white hover:bg-red-600"><Link to="/register">Register</Link></Button>
          </div>
          ) : (
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className='h-12 w-12 shrink-0 cursor-pointer'>
                <AvatarImage src={user?.profile?.profileImage} alt="@shadcn" />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className='w-80 bg-white'>
              <div className='flex space-x-4 p-2 items-center gap-4 bg-white rounded-md shadow-md'>
                <Avatar className='cursor-pointer'>
                  <AvatarImage src={user?.profile?.profileImage} alt="@shadcn" />
                </Avatar>
                <div>
                  <h1 className='font-medium'>{user?.fullname}</h1>
                  <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                </div>
              </div>
              <div className='flex gap-4 flex-col'>
                <div className='flex w-fit items-center gap-2 cursor-pointer'>
                  <User2 ></User2>
                  <Button className='cursor-pointer' variant="link"> <Link to={"/Profile"}>Profile</Link></Button>
                </div>
                <div className='flex w-fit items-center gap-2 cursor-pointer'>
                  <LogOut />
                  <Button className='cursor-pointer' onClick={logoutHandler} variant="link">Logout</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar

