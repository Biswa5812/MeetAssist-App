import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

const BookingPage = () => 
{

    const [message,setMessage] = useState("");
    const {rid, mdate, stime, etime, location} = useParams()
    const navigate = useNavigate();

    const user = sessionStorage.getItem('username');
    const username = JSON.parse(user);
    const id = sessionStorage.getItem('userid');
    const userid = JSON.parse(id);


    const handleBook = async(e) => {
        console.log(e);
        let res = await fetch("http://localhost:5000/confirmbook",{
            method: "POST",
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                roomid: rid,
                eid: userid,
                bookdate: mdate,
                bookstart: stime,
                bookend: etime
            })
        });

        let reply = await res.json();
        if(reply.status)
        {
            setMessage("Booking successfully completed");
        }
    }

    return(
        <div>
            <h1>Booking Details for {username}</h1>
            <div>
                <h2>Would you like to confirm your booking with following details</h2>
                <p>Meeting Room: {location}</p>
                <p>Date (yyyy-mm-dd): {mdate} </p>
                <p>Time: {stime} to {etime}</p>
            </div>

            <Button onClick={handleBook} disabled={message!==""?(true):(false)}>Click to confirm</Button>

            <div>
                {message===""?( 
                        <Button color="danger" onClick={event => navigate(-1)}>Cancel Booking</Button>
                ):(
                    <Button color="danger" disabled={true}>Cancel Booking</Button>
                )}
            </div>

            <h2>{message}</h2>
        </div>
    )
}

export default BookingPage;