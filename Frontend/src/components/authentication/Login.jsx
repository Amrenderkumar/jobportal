import React from 'react'
import Navbar from '../components all/Navbar'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { RadioGroup } from '../ui/radio-group'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_ENDPOINT } from '../../Utils/data.js'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '../../redux/authslice'
import store from '../../redux/store'

const Login = () => {


const [input, setInput] = React.useState({
    email: "",
    password: "",
    role: "Student",
});

const navigate = useNavigate();
const dispatch = useDispatch();
const {loading} = useSelector((store) =>store.auth)
const changeEventlistener = (e) => {
    setInput({...input, [e.target.name]: e.target.value});
}

const changefilelistener = (e) => {
    setInput({...input, [e.target.name]: e.target.files[0]});
}


const submitHandler = async (e) => {
    e.preventDefault();
   
     try {
        dispatch(setLoading(true))
        const res = await axios.post(`${USER_API_ENDPOINT}/login`, {
                email: input.email,
                password: input.password,
                role: input.role
            }, {
            withCredentials: true
        });
        if(res.data.success){
            dispatch(setUser(res.data.user))
            navigate("/");
            toast.success(res.data.message);
        }
      } catch (error) {
        console.log(error);
        const errorMessage = error.response ? error.response.data.message : "An unexpected error occurerd."
        toast.error(errorMessage)
      }
      finally{
        dispatch(setLoading(false))
      }
}

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form className='w-1/2 border border-gray-300 rounded-md p-4 my-10' onSubmit={submitHandler}>
                    <h1 className="text-2xl font-bold mb-4 text-center text-blue-500">Login Page</h1>
                    <div className="my-4">
                        <Label htmlFor="email">Email:</Label>
                        <Input type="email" id="email" value={input.email} onChange={changeEventlistener} name="email" placeholder="Enter your email" />
                    </div>
                    <div className="my-4">
                        <Label htmlFor="password">Password:</Label>
                        <Input type="password" id="password" value={input.password} onChange={changeEventlistener} name="password" placeholder="Enter your password" />
                    </div>
                    <div className='flex items-center justify-between'>
                        <RadioGroup className='flex items-center space-x-2 gap-4 my-5' defaultValue="Student">
                            <div className="flex items-center space-x-2">
                                <input type="radio" value="Student" className="cursor-pointer" onChange={changeEventlistener} checked = {input.role === "Student"} name="role" />
                                <Label htmlFor="option-one">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input type="radio" value="Recruiter" className="cursor-pointer" onChange={changeEventlistener} checked = {input.role === "Recruiter"} name="role" />
                                <Label htmlFor="option-two">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    {
                        loading? (
                            <div className='flex items-center justify-center my-10'>
                                <div className='spinner-border text-blue-600' role="status">
                                    <span className='sr-only'> Loading...</span>
                                </div>
                            </div>
                        )   :
                        <button className='bg-black  w-full py-3 my-3 text-white bg-primary hover:bg-primary/90 rounded-md' type="submit">Login</button>
                    }
                     <p className='text-gray-500 text-md my-2 text-center'>No account? <Link to="/register" className="text-blue-500 hover:underline">Register</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Login
