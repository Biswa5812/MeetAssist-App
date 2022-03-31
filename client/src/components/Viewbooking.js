import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    Button,
    Card,
    CardBody,
    CardTitle,
    CardSubtitle
} from 'reactstrap';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

const Viewbooking = () =>
{

    const {uname} = useParams()
    const [booked,setBooked] = useState([])
    const user = sessionStorage.getItem('userid');
    const uid = JSON.parse(user);

    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userid: uid })
        };
        fetch('http://localhost:5000/userbooking', requestOptions)
            .then(response => response.json())
            .then(data => setBooked(data.history));
    }, []);

    const notify = () => {
        toast.error("Deleted, Refresh Page Now")
    }

    const cancelBooking = async(c_date,c_stime,c_etime) => {
        let res = await fetch("http://localhost:5000/cancelrsv", {
            method: "POST",
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                userid: uid,
                date: c_date,
                startTIme: c_stime,
                endTime: c_etime
            })
        });
        let resp = await res.json();
        if(resp.message)
        {
            notify();
        }  
    }

    return(
        <div>
            <hr />
            <h3>This is view booking for {uname}</h3>

            <div>
                {booked.length!==0 ? (
                    booked.map(room => {
                        return(
                            <div key={room.RoomID}>
                                <Card>
                                    <CardBody>
                                        <CardTitle>{room.RoomName}</CardTitle>
                                        <CardSubtitle>Booking Date - {new Date(room.BookDate).toISOString().split('T')[0]}, Timing - {new Date(room.BookStartTime).toISOString().split('T')[1].split('.')[0]} to {new Date(room.BookEndTime).toISOString().split('T')[1].split('.')[0]}</CardSubtitle>
                                        <p>Capacity: {(room.Capacity)-1} - {room.Capacity} | Booking Status - {room.BookStatus}</p>
                                        <Button color="primary" onClick={event => cancelBooking(room.BookDate,room.BookStartTime,room.BookEndTime)}>Cancel Booking</Button>
                                    </CardBody>
                                </Card>
                            </div>
                        )
                    })
                ) : (<p>Sorry, no bookings available, go back to book now!</p>)}
            </div>
        </div>
    )
}

export default Viewbooking;