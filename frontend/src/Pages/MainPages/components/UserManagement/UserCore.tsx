import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function UserCore() {
  const usertype = useSelector(
    (state: any) => state.Login?.user?.user?.account
  );
  const userid = useSelector((state: any) => state.Login?.user?.user?._id);

  const [users, setUsers] = useState(Array);
  useEffect(() => {
    if (usertype === "admin") {
      axios
        .get(`${process.env.REACT_APP_SERVER_DOMAIN}/admin/getUsers`)
        .then((res) => setUsers(res?.data?.data))
        .catch((err) => console.log(err));
    } else if (usertype === "user") {
      axios
        .post(`${process.env.REACT_APP_SERVER_DOMAIN}/user/userusers`, {
          id: userid,
        })
        .then((res) => setUsers(res.data.data))
        .catch((err) => console.log(err));
    } else {
      window.location.href = "/";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usertype, users]);

  const handleAccept = (e: any) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_DOMAIN}/admin/acceptusers`, {
        id: e,
      })
      .then((res) => setUsers(res?.data?.data))
      .catch((err) => console.log(err));
  };
  const handleRefuse = (e: any) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_DOMAIN}/admin/refuseusers`, {
        id: e,
      })
      .then((res) => setUsers(res.data.data))
      .catch((err) => console.log(err));
  };
  const handleServe = (e: any) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_DOMAIN}/admin/serveusers`, {
        id: e,
      })
      .then((res) => setUsers(res.data.data))
      .catch((err) => console.log(err));
  };
  return (
    <>
        <div className="flex justify-center items-center">
          <div>
            <div className="flex justify-center items-center flex-col">
              {users?.length ? (
                users.map((user: string | any) => (
                  <div
                    key={user._id}
                    className="bg-white shadow-md rounded-lg p-6 max-w-md w-full"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-700">
                          user ID: {user._id}
                        </span>
                        <span className="font-semibold text-gray-700">
                          User: {user.firstName} {user.lastName}
                        </span>
                        <span className="text-gray-400">
                          Email: {user.email}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No usered users.</p>
              )}
            </div>
          </div>
        </div>
    </>
  );
}
