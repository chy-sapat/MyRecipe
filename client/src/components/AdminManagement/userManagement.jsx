import React, { useEffect, useState } from "react";
import axios from "axios";
import "@styles/adminUserManagement.scss";
import TableDisplay from "./table";

const UserManagement = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const COLUMNS = [
    { label: "Name", renderCell: (item) => item.name, select: true },
    { label: "Account Status", renderCell: (item) => item.accountStatus },
    { label: "Action", renderCell: () => <h1>View Details</h1> },
  ];

  useEffect(() => {
    const controller = new AbortController();
    const fetchAllUsers = async () => {
      setIsLoading((prevState) => !prevState);
      try {
        const response = await axios.get(
          "http://localhost:3000/admin/fetch-all-users",
          {
            signal: controller.signal,
          }
        );
        setUserData(response.data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading((prevState) => !prevState);
      }
    };
    fetchAllUsers();
    return () => {
      controller.abort();
    };
  }, []);
  return (
    <section className="management-container">
      <h2 className="heading">User Management</h2>
      {userData && <TableDisplay cols={COLUMNS} data={userData} />}
    </section>
  );
};

export default UserManagement;
