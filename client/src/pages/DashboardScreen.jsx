import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashPosts from "../components/DashPosts";

const DashboardScreen = () => {
  const [tab, setTab] = useState("");

  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        <DashSidebar />
      </div>
      {/* profile */}
      {tab === "profile" && <DashProfile as="div" />}
      {/* Posts */}
      {tab === "posts" && <DashPosts as="div" />}
    </div>
  );
};

export default DashboardScreen;
