import { Table, TableBody, TableCell } from '../ui/table'
import { useEffect, useState } from 'react'
import { TableCaption, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const AdminJobTable = () => {

const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  console.log("Redux companies:", companies);
  const {allAdminJobs, searchJobByText} = useSelector((store) => store.job);
  const navigate = useNavigate();
  const [filterJobs, setFilterJobs] = useState([]);

  useEffect(() => {
    const filteredJobs =
      allAdminJobs.length >= 0 &&
      allAdminJobs.filter((job) => {
        if (!searchJobByText) {
          return true;
        }
        return job.title
          ?.toLowerCase()
          .includes(searchJobByText.toLowerCase());
      });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  console.log("COMPANIES", companies);
  if (!companies) {
    return <div>Loading...</div>;
  }

  return (
    <div>
       <Table>
        <TableCaption>Your recent Posted Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
  {filterJobs.length === 0 ? (
    <TableRow>
      <TableCell colSpan={4} className="text-center">
        No Job Added
      </TableCell>
    </TableRow>
  ) : (
    filterJobs?.map((job) => (
      <TableRow key={job._id}>
        <TableCell>
 {job.companyId?.companyname}
</TableCell>
        <TableCell>{job.title}</TableCell>
        <TableCell>{job.createdAt.split("T")[0]}</TableCell>
        <TableCell className="text-right cursor-pointer">
          <Popover>
            <PopoverTrigger>
              <MoreHorizontal />
            </PopoverTrigger>
            <PopoverContent className="w-32">
              <div
                onClick={() => navigate(`/admin/companies/${job._id}`)}
                className="flex items-center gap-2 w-fit cursor-pointer"
              >
                <Edit2 className="w-4" />
                <span>Edit</span>
              </div>
            </PopoverContent>
          </Popover>
        </TableCell>
      </TableRow>
    ))
  )}
</TableBody>
      </Table>
    </div>
  )
}

export default AdminJobTable
