import React from 'react'
import Navbar from '../components all/Navbar'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_ENDPOINT } from '../../Utils/data.js'
import { toast } from 'sonner'
import { setLoading } from '../../redux/authslice'
import { useDispatch, useSelector } from 'react-redux'

const Register = () => {


    const [input, setInput] = React.useState({
        fullname: "",
        email: "",
        password: "",
        role: "Student",
        phoneNumber: "",
        file: ""
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { Loading } = useSelector((store) => store.auth)

    const changeEventlistener = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changefilelistener = (e) => {
        setInput({ ...input, [e.target.name]: e.target.files[0] });
    }


    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("password", input.password);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            dispatch(setLoading(true))
            const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
                withCredentials: true
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            const errorMessage = error.response ? error.response.data.message : "An unexpected error occurerd."
            toast.error(errorMessage)
        }
        finally {
            dispatch(setLoading(false))
        }
    }


    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form className='w-1/2 border border-gray-300 rounded-md p-4 my-10' onSubmit={submitHandler} action="">
                    <h1 className="text-2xl font-bold mb-4 text-center text-blue-500">Register Page</h1>
                    <div className="my-4">
                        <Label>Name:</Label>
                        <Input type="text" id="name" value={input.fullname} onChange={changeEventlistener} name="fullname" placeholder="Enter your name" />
                    </div>
                    <div className="my-4">
                        <Label>Email:</Label>
                        <Input type="email" id="email" value={input.email} onChange={changeEventlistener} name="email" placeholder="Enter your email" />
                    </div>
                    <div className="my-4">
                        <Label>Password:</Label>
                        <Input type="password" id="password" value={input.password} onChange={changeEventlistener} name="password" placeholder="Enter your password" />
                    </div>
                    <div className="my-4">
                        <Label>Phone Number:</Label>
                        <Input type="tel" id="phone" value={input.phoneNumber} onChange={changeEventlistener} name="phoneNumber" placeholder="Enter your phone number" />
                    </div>
                    <div className='flex items-center justify-between'>
                        <RadioGroup className='flex items-center space-x-2 gap-4 my-5' defaultValue="Student">
                            <div className="flex items-center space-x-2">
                                <input type="radio" value="Student" className="cursor-pointer" checked={input.role === "Student"} onChange={changeEventlistener} name="role" />
                                <Label htmlFor="option-one">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input type="radio" value="Recruiter" className="cursor-pointer" checked={input.role === "Recruiter"} onChange={changeEventlistener} name="role" />
                                <Label htmlFor="option-two">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Label>Profile Photo</Label>
                        <Input type="file" name="file" onChange={changefilelistener} accept="image/*" className="cursor-pointer items-center" />
                    </div>
                    {
                        Loading ? (
                            <div className='flex items-center justify-center my-10'>
                                <div className='spinner-border text-blue-600' role="status">
                                    <span className='sr-only'> Loading...</span>
                                </div>
                            </div>
                        ) :
                            <button className='bg-black  w-full py-3 my-3 text-white bg-primary hover:bg-primary/90 rounded-md' type="submit">Register</button>
                    }
                    <p className='text-gray-500 text-md my-2'>Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Register
