const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const dbOperation = require('./dbFiles/dbOperations')
const Employee = require('./dbFiles/employee')
const Booking = require('./dbFiles/booking')
const e = require('express')

const api_port = process.env.PORT || 5000
const app = express()
const router = express.Router()

app.use(express.json())
app.use(express.urlencoded())
app.use(cors())


app.post('/auth',(req,res) => {
    let email = req.body.email;
    let pass = req.body.pass;
    dbOperation.authEmployees(email,pass).then(resp =>{
        let data = resp.recordset[0];
        if(resp.recordset.length)
        {
            console.log(data.Designaion);
            res.send(JSON.stringify({
                "designation": data.Designaion,
                "username": data.EmployeeName,
                "userid":data.EmployeeID
            }))
            // res.redirect(200,'http://localhost:3000/employeemenu');
        }
        else
        {
            console.log("wrong user id or password");
            res.send(JSON.stringify({
                "status": 401
            }))
        }
    })  
})

app.get('/roomlist',(req,res) => {
    dbOperation.getRoomList().then(resp => {
        let data = resp.recordset;
        if(data.length)
        {
            res.send(JSON.stringify({
                "rooms":data
            }))
        }
        else
        {
            res.send(JSON.stringify({
                "rooms":0
            }))
        }
    })
})

app.get('/oldData',(req,res) => {
    dbOperation.olddata().then(resp => {
        res.send(JSON.stringify({
            "message": "deleted"
        }))
    })
})

app.post('/bookingHist',(req,res) => {
    let meet_date = req.body.meet_date;
    let startTime = req.body.startTime;
    let endTime = req.body.endTime;
    dbOperation.checkRoom(meet_date,startTime,endTime).then(resp => {
        let data = resp.recordset;
        let roomids = []
        data.forEach(element => {
            let m_date = element.BookDate.toISOString().split('T')[0]
            let s_time = element.BookStartTime.toISOString().split('T')[1].split('.')[0]
            let e_time = element.BookEndTime.toISOString().split('T')[1].split('.')[0]
            if(meet_date===m_date)
            {
                if(startTime>=s_time && endTime<=e_time)
                {
                    console.log('mid')
                    roomids.push(element.RoomID);
                }
                else if(endTime>s_time && endTime<=e_time)
                {
                    console.log('overlap1')
                    roomids.push(element.RoomID);
                }
                else if(startTime>s_time && startTime<=e_time)
                {
                    console.log('overlap2')
                    roomids.push(element.RoomID);
                }
                else if(s_time>=startTime && e_time<=endTime)
                {
                    console.log('wide')
                    roomids.push(element.RoomID);
                }
            }
        });
        // console.log(roomids);
        res.send(JSON.stringify({
            "roomStatus":roomids
        }))

    })
})


app.post('/confirmbook',(req,res) => {
    let roomid = req.body.roomid;
    let eid = req.body.eid;
    let book_date = req.body.bookdate;
    let book_start_time = req.body.bookstart;
    let book_end_time = req.body.bookend;
    let data = new Booking(roomid,eid,book_date,book_start_time,book_end_time,'NA')

    dbOperation.makeBooking(data).then(resp => {
        console.log(resp);
        res.send(JSON.stringify({
            "status": 200
        }))
    })
})

app.post('/userbooking',(req,res) => {
    let userid = req.body.userid;
    dbOperation.userBookings(userid).then(resp => {
        let data = []
        data = resp.recordset;
        res.send(JSON.stringify({
            "history":data
        }))
    })
})


app.post('/cancelrsv',(req,res) => {
    let id = req.body.userid
    let date = req.body.date
    let start = req.body.startTIme
    let end = req.body.endTime
    dbOperation.cancelbook(id,date,start,end).then(resp => {
        res.send(JSON.stringify({
            "message": "Successfully Deleted"
        }))
    })
})









// let pam = new Employee('24', 'Pam', 'def@gmail.com', 'Manager', 'Meetin')

// console.log(pam);

// dbOperation.createEmployees(pam);

// dbOperation.getRoomList().then(res => {
//     console.log(res)
// })


app.listen(api_port, () => console.log(`listening on port ${api_port}`));

