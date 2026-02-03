import { Table, TableBody, TableCell } from '../ui/table'
import { useEffect, useState } from 'react'
import { TableCaption, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const CompaniesTable = () => {

const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  console.log("Redux companies:", companies);
  const navigate = useNavigate();
  const [filterCompany, setFilterCompany] = useState(companies);

  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  console.log("COMPANIES", companies);
  if (!companies) {
    return <div>Loading...</div>;
  }

  return (
    <div>
       <Table>
        <TableCaption>Your recent registered Companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
  {filterCompany.length === 0 ? (
    <TableRow>
      <TableCell colSpan={4} className="text-center">
        No Companies Added
      </TableCell>
    </TableRow>
  ) : (
    filterCompany?.map((company) => (
      <TableRow key={company._id}>
        <TableCell>
          <Avatar>
            <AvatarImage
              src={company.logo || "default-logo-url"}
              alt={`${company.companyname} logo`}
            />
          </Avatar>
        </TableCell>
        <TableCell>{company.companyname}</TableCell>
        <TableCell>{company.createdAt.split("T")[0]}</TableCell>
        <TableCell className="text-right cursor-pointer">
          <Popover>
            <PopoverTrigger>
              <MoreHorizontal />
            </PopoverTrigger>
            <PopoverContent className="w-32">
              <div
                onClick={() => navigate(`/admin/companies/${company._id}`)}
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

export default CompaniesTable
