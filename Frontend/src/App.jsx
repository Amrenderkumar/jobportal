
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import  Home  from "./components/components all/Home"
import Login from "./components/authentication/Login"
import Register from "./components/authentication/Register"
import PrivacyPolicy from "./components/components all/PrivacyPolicy"
import TermsofService from "./components/components all/TermsofService"
import Jobs from "./components/admin/AdminJobs"
import Profile from "./components/components all/Profile"
import Description from "./components/components all/Description"
import Browse from "./components/components all/Browse"
import Companies from "./components/admin/Companies"
import CompanyCreate from "./components/admin/CompanyCreate"
import CompanySetup from "./components/admin/CompanySetup"
import PostJob from "./components/admin/PostJob"
import AdminJobs from "./components/admin/AdminJobs"

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/description/:id",
    element: <Description />
  },
  {
   path: "/Profile",
   element: <Profile />
  },
  {
    path: "/PrivacyPolicy",
    element: <PrivacyPolicy />
  },
  {
    path: "/TermsofService",
    element:<TermsofService />
  },
  {
    path:"/Jobs",
    element: <Jobs />
  },
  {
    path:"/Home",
    element: <Home />
  },
  {
    path: "/Browse",
    element: <Browse />
  },

  {
    path: "/admin/companies",
    element: <Companies />
  },
  {
    path: "/admin/companies/create",
    element: <CompanyCreate />
  },
  {
   path: "/admin/companies/:id",
    element: <CompanySetup />
  },
  {
    path: "/admin/jobs",
    element: <AdminJobs />
  },
  {
    path: "/admin/jobs/create",
    element: <PostJob />
  }
])

function App() {

  return (
    <div className="bg-white">
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
