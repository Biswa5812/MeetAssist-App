const config = require('./dbConfig')
const sql = require('mssql');
const Booking = require('./booking');

const getEmployees = async() => {
    try{
        let pool = await sql.connect(config);
        let employees = pool.request().query("select * from EmployeeTable");
        console.log(employees);
        return employees;
    }
    catch(error){
        console.log(error)
    }
}

const createEmployees = async(Employee) => {
    try{
        let pool = await sql.connect(config);
        let employees = pool.request()
        .query(`insert into EmployeeTable values ('${Employee.EmployeeID}', '${Employee.EmployeeName}', '${Employee.EmployeeMail}', '${Employee.Designation}', HASHBYTES('sha2_512','${Employee.EmpPassword}'))`);
        return employees;
    }
    catch(error){
        console.log(error)
    }
}

const authEmployees = async(email,pass) => {
    try{
        let pool = await sql.connect(config);
        let employees = pool.request()
        .query(`select * from EmployeeTable where EmployeeMail='${email}' and EmpPassword=HASHBYTES('sha2_512','${pass}')`);
        console.log(employees);
        return employees;
    }
    catch(error){
        return 0;
    }
}

const getRoomList = async() => {
    try{
        let pool = await sql.connect(config);
        let roomlist = pool.request().query("select * from FloorTable");
        console.log(roomlist);
        return roomlist;
    }
    catch(error)
    {
        return 0;
    }
}

const checkRoom = async(meet_date,startTime,endTime) => {
    try{
        console.log(endTime);
        let pool = await sql.connect(config);
        let checkList = pool.request()
        .query("select * from BookingTable");
        // console.log((await checkList).recordset);
        return checkList;
    }
    catch(error)
    {
        return 1;
    }
}

const makeBooking = async(Booking) => {
    try{
        let pool = await sql.connect(config);
        let bookconfirm = pool.request()
        .query(`insert into BookingTable values ('${Booking.RoomID}', '${Booking.EmployeeID}', '${Booking.BookDate}', '${Booking.BookStartTime}', '${Booking.BookEndTime}', '${Booking.BookStatus}')`)
        return bookconfirm;
    }
    catch(error)
    {
        console.log(error);
    }
}

const userBookings = async(uid) => {
    try{
        let pool = await sql.connect(config);
        let userlisting = pool.request()
        .query(`select b.BookDate,b.BookStartTime,b.BookEndTime,b.BookStatus,f.RoomName,f.Capacity from BookingTable b, FloorTable f where b.EmployeeID='${uid}' and f.RoomID=b.RoomID`)
        return userlisting;
    }
    catch(error)
    {
        console.log(error);
    }
}


const cancelbook = async(id,date,start,end) => {
    try{
        let pool = await sql.connect(config);
        let cancelres = pool.request()
        .query(`delete from BookingTable where EmployeeID='${id}' and BookDate='${date}' and BookStartTime='${start}' and BookEndTime='${end}'`)
        return cancelres;
    }
    catch(error)
    {
        console.log(error);
    }
}

const olddata = async() => {
    try{
        let pool = await sql.connect(config);
        let deleteold = pool.request()
        .query(`delete from BookingTable where BookDate<'${new Date().toISOString()}'`)
        return 1;
    }
    catch(error)
    {
        console.log(error);
    }
}

module.exports = {
    createEmployees,
    getEmployees,
    authEmployees,
    getRoomList,
    checkRoom,
    makeBooking,
    userBookings,
    cancelbook,
    olddata,
}