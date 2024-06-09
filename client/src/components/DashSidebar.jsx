import { useEffect, useState } from "react";
import { Sidebar } from "flowbite-react";
import {
  HiUser,
  HiArrowSmRight,
  HiChartPie,
  HiDocumentText,
} from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const DashSidebar = () => {
  const [tab, setTab] = useState("");
  const location = useLocation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");

    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          {userInfo && userInfo.isAdmin && (
            <Link to="/dashboard?tab=dash">
              <Sidebar.Item
                active={tab === "dash" || !tab}
                icon={HiChartPie}
                as="div"
              >
                Dashboard
              </Sidebar.Item>
            </Link>
          )}
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={userInfo.isAdmin ? "Admin" : "User"}
              labelColor="dark"
              as="div"
            >
              Profile
            </Sidebar.Item>
          </Link>
          {userInfo.isAdmin && (
            <Link to="/dashboard?tab=posts">
              <Sidebar.Item
                active={tab === "posts"}
                icon={HiDocumentText}
                as="div"
              >
                Posts
              </Sidebar.Item>
            </Link>
          )}
          <Sidebar.Item icon={HiArrowSmRight} className="cursor-pointer">
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSidebar;
