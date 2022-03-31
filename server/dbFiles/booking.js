class Booking{
    constructor(RoomID, EmployeeID, BookDate, BookStartTime, BookEndTime, BookStatus){
        this.RoomID = RoomID;
        this.EmployeeID = EmployeeID;
        this.BookDate = BookDate;
        this.BookStartTime = BookStartTime;
        this.BookEndTime = BookEndTime
        this.BookStatus = BookStatus
    }
}

module.exports = Booking;