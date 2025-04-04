import Navbar from "../components/common/navbar.common";
import Sidebar from "../components/common/sidebar.common";


type DashLayoutProps = {
    children: React.ReactNode;
  } ;
export default function LayoutDashboard({children}:DashLayoutProps){


    return<>
     <Navbar/>
     <div className="lg:block hidden">
     <Sidebar/>
     </div>
    {children}
    
    </>
}