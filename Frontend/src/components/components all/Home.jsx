import React, { useEffect } from 'react'
import Navbar from './Navbar'
import Header from './Header'
import Categories from './Categories'
import LatestJobs from './LatestJobs'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from './Footer'
import useGetAllJobs from '../../hooks/useGetAllJobs'
import Botchat from './Botchat'

const Home = () => {
    const { loading, error } = useGetAllJobs(); // Trigger data fetch
  const jobs = useSelector((state) => state.job.allJobs); // Access Redux state

  console.log("Jobs in Component:", { loading, error, jobs }); // Log to check state
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "Recruiter") {
      navigate("/admin/companies");
    }
  }, []);
  return (
    <div>
      <Navbar />
      <Header />
      <Botchat />
      <Categories />
      {loading && <p>Loading jobs...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && <LatestJobs jobs={jobs} />}
      <Footer />
    </div>
  )
}

export default Home
