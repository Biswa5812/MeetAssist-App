import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardText,
    CardLink
} from 'reactstrap';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import TimePicker from '@mui/lab/TimePicker';
import Grid from '@mui/material/Grid';

// import Project from "../../../server/dbFiles/booking";

const EmployeeMenu = () => 
{
    const [projects,setProjects] = useState([])
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [locPreference, setLocPreference] = useState("")
    const [date, setDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [room_Status, setRoomStatus] = useState([]);

    const user = sessionStorage.getItem('username');
    const username = JSON.parse(user);

    useEffect(() =>{
        fetch("http://localhost:5000/projectlist")
            .then(res => res.json())
            .then(json => setProjects(json.projects))
    },[])


    const toggle = () => setDropdownOpen(prevState => !prevState);

    const handleLocation = (e) => {
        const value = e.target.innerHTML
        setLocPreference(value);
    }

    // const checkingStatus = async() => {
    //     let res = await fetch("http://localhost:5000/bookingHist", {
    //         method: "POST",
    //         headers: {
    //             'Accept':'application/json',
    //             'Content-Type':'application/json'
    //         },
    //         body: JSON.stringify({
    //             meet_date: date.toISOString().split('T')[0],
    //             startTime: startTime.toLocaleTimeString('it-IT'),
    //             endTime: endTime.toLocaleTimeString('it-IT'),
    //         })
    //     });

    //     let reply = await res.json();;
    //     let da = reply.roomStatus;
    //     setRoomStatus(da);
    // }


    return(
        <div>
            <h1>Hello, {username}!</h1>
            <h2>Welcome to DHUB</h2>

             <div style={{display:'flex'}}>
                {
                    projects.map(project => {
                        return(
                            <div key={project.ProjID} style={{marginRight:'10px'}}>
                                <Card style={{
                                    width: '20rem',
                                    height: '15rem'
                                 }} >
                                    <CardBody>
                                        <CardTitle tag="h5">
                                        {project.ProjName}
                                        </CardTitle>
                                        <CardSubtitle
                                        className="mb-2 text-muted"
                                        tag="h6"
                                        >
                                        {project.ProjTechStack}
                                        </CardSubtitle>
                                    </CardBody>

                                    <CardBody>
                                        <CardText>
                                        {(project.ProjDescription)}
                                        </CardText>
                                        <CardLink href="#">
                                        Staging Env
                                        </CardLink>
                                        <CardLink href="#">
                                         Production
                                        </CardLink>
                                    </CardBody>
                                </Card>
        
                        </div>
                           
                            )}
                        )
                
                
                }
            </div> 
  {/*  
            <Grid container>
                <LocalizationProvider dateAdapter={AdapterDateFns} >
                    <DatePicker
                        disablePast
                        label="Select Date"
                        value={date}
                        onChange={(newValue) => {
                        setDate(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />

                    <TimePicker
                        label="Start Time"
                        ampm={false}
                        value={startTime}
                        onChange={(newValue) => {
                        setStartTime(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />

                    <TimePicker
                        label="End Time"
                        ampm={false}
                        value={endTime}
                        onChange={(newValue) => {
                        setEndTime(newValue);
                        checkingStatus();
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </Grid>
            <div>
                {date!==null && ((startTime!==null && endTime!==null) && (startTime.toLocaleTimeString('it-IT')<endTime.toLocaleTimeString('it-IT'))) ? 
                (<p>*Showing results for {date.toISOString().split('T')[0]} from {startTime.toLocaleTimeString('it-IT')} to {endTime.toLocaleTimeString('it-IT')} </p>)
                :(<p>*Select date and time to filter and book (Ensure start time is before end time)</p>)}
            </div>
            <div>
                {locPreference==="" || locPreference==="View All"? (room_Status.length===0 ? (
                    rooms.map(room => {
                        return(
                            <div key={room.RoomID}>
                                <Card>
                                    <CardBody>
                                        <CardTitle>{room.RoomName}</CardTitle>
                                        <CardSubtitle>Floor Number - {room.FloorNumber}, {room.RoomLocation}</CardSubtitle>
                                        <p>Capacity: {(room.Capacity)-1} - {room.Capacity}</p>
                                         <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText> 
                                        <Button onClick={event =>  window.location.href=`/booking/data=${room.RoomID}/${date.toISOString().split('T')[0]}/time=${startTime.toLocaleTimeString('it-IT')}/end=${endTime.toLocaleTimeString('it-IT')}/room=${room.RoomName}`}>Book</Button>
                                    </CardBody>
                                </Card>
                            </div>
                        )
                    })
                ):(
                    rooms.filter(data => !room_Status.includes(data.RoomID)).map(room => {
                        return(
                            <div key={room.RoomID}>
                                <Card>
                                    <CardBody>
                                        <CardTitle>{room.RoomName}</CardTitle>
                                        <CardSubtitle>Floor Number - {room.FloorNumber}, {room.RoomLocation}</CardSubtitle>
                                        <p>Capacity: {(room.Capacity)-1} - {room.Capacity}</p>
                                         <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText> 
                                        <Button onClick={event =>  window.location.href=`/booking/data=${room.RoomID}/${date.toISOString().split('T')[0]}/time=${startTime.toLocaleTimeString('it-IT')}/end=${endTime.toLocaleTimeString('it-IT')}/room=${room.RoomName}`}>Book</Button>
                                    </CardBody>
                                </Card>
                            </div>
                        ) 
                    })
                ) ) :(room_Status.length===0 ? (rooms.filter(loc => loc.RoomLocation===locPreference).map(room => {
                    return(
                        <div key={room.RoomID}>
                            <Card>
                                <CardBody>
                                    <CardTitle>{room.RoomName}</CardTitle>
                                    <CardSubtitle>Floor Number - {room.FloorNumber}, {room.RoomLocation}</CardSubtitle>
                                    <p>Capacity: {(room.Capacity)-1} - {room.Capacity}</p>
                                    <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText> 
                                    <Button onClick={event =>  window.location.href=`/booking/data=${room.RoomID}/${date.toISOString().split('T')[0]}/time=${startTime.toLocaleTimeString('it-IT')}/end=${endTime.toLocaleTimeString('it-IT')}/room=${room.RoomName}`}>Book</Button>
                                </CardBody>
                            </Card>
                        </div>
                    )
                })) : (
                    rooms.filter(loc => loc.RoomLocation===locPreference && (!room_Status.includes(loc.RoomID))).map(room => {
                        return(
                            <div key={room.RoomID}>
                                <Card>
                                    <CardBody>
                                        <CardTitle>{room.RoomName}</CardTitle>
                                        <CardSubtitle>Floor Number - {room.FloorNumber}, {room.RoomLocation}</CardSubtitle>
                                        <p>Capacity: {(room.Capacity)-1} - {room.Capacity}</p>
                                         <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText> 
                                        <Button onClick={event =>  window.location.href=`/booking/data=${room.RoomID}/${date.toISOString().split('T')[0]}/time=${startTime.toLocaleTimeString('it-IT')}/end=${endTime.toLocaleTimeString('it-IT')}/room=${room.RoomName}`}>Book</Button>
                                    </CardBody>
                                </Card>
                            </div>
                        )
                    })
                ) )}
            </div>
            */}
        </div>
    )
}

export default EmployeeMenu;