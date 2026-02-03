import React, { useEffect, useState } from 'react'
import Navbar from '../components all/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CompaniesTable from './CompaniesTable'
import { setSearchCompanyByText } from '../../redux/companyslice'
import usegetAllCompanies from '../../hooks/usegetAllCompanies'

const Companies = () => {
const navigate = useNavigate();

 usegetAllCompanies();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);

  return (
    <div>
      <Navbar />
      <div className=" max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-fit"
            placeholder="Filter by Name"
            onChange={(e) => setInput(e.target.value)}
          ></Input>
          <Button onClick={() => navigate("/admin/companies/create")}>
            Add Company
          </Button>
        </div>
        <div>
          <CompaniesTable />
        </div>
      </div>
    </div>
  )
}

export default Companies
