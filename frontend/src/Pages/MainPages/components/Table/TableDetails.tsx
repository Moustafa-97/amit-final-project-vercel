import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import TableBooking from "./TableBooking";

export default function TableDetails() {
  const id = useParams();
  const user: string = useSelector(
    (state: any) => state.Login.user.user?.account
  );
  const [singleItem, setSingleItem] = useState({});
  useEffect(() => {
    if (user !== undefined) {
      axios
        .post(`${process.env.REACT_APP_SERVER_DOMAIN}/${user}/getTable`, {
          id: id.id,
        })
        .then((res) => setSingleItem(res.data.data))
        .catch((err) => console.log(err));
    }
  }, [id.id, user]);

  return (
    <>
      {singleItem && <TableBooking item={singleItem} />}
      
    </>
  );
}
