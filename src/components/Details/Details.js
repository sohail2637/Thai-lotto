import React, { useState } from "react";
import axios from "axios";
import { FcCalendar } from "react-icons/fc";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Details.css";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Typography,
} from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import { useSelector } from "react-redux";
// import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: "90%",
    margin: "4% auto",
  },
  paper: {
    padding: theme.spacing(2),
    height: "150px",
    textAlign: "center",
    color: theme.palette.text.secondary,
    backgroundColor: "#EEEEEE",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
}));
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#f9b707",
    color: theme.palette.common.white,
    fontSize:'16px'
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const Details = () => {
  const classes = useStyles();
  let [record, setRecord] = useState([]);
  const [value, setValue] = useState(new Date());
  let [state, setState] = useState(false);
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleChange = () => {
    setState(false);
  };
  const handleDateChange = (evt) => {
    console.log("selected data", evt);
    setSelectedDate(evt);
    drawData();
  };

  async function drawData() {
    let date = value.toDateString();
    const resp = await axios
      .post("/drawDetails", { date: selectedDate })
      .then((res) => {
        console.log(res.data);
        setRecord(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(record);
  }

  //   setTimeout(() => {
  //     console.log(selectedDate);
  //   }, 4000);
  return (
    <div className="drawDetails flexcol">
      <div className="draw-dates">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <div
            style={{
              backgroundColor: "#EBE9EA",
              padding: "10px",
              width: "305px",
              borderRadius: "25px",
            }}
          >
            <KeyboardDatePicker
              disableToolbar
              variant="outlied"
              format="MM/dd/yyyy"
              // margin="normal"
              variant="outlined"
              id="date-picker-inline"
              label="Date picker inline"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </div>
        </MuiPickersUtilsProvider>
        {/* <div><p>{value.toDateString()}</p></div> */}
        {/* <div ><FcCalendar onClick={() => { setState(true) }} className='calendar' /></div>
            <div onClick={handleChange} className={state == true ? 'calendarView' : 'changeView'}>
                <Calendar onChange={setValue} value={value} />
            </div> */}
      </div>
      <div className="draw-table">
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead >
              <TableRow>
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell align="center">First</StyledTableCell>
                <StyledTableCell align="center">SecondA</StyledTableCell>
                <StyledTableCell align="center">SecondB</StyledTableCell>
                <StyledTableCell align="center">SecondC</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody className={classes.tablebody}>
              {/* {sellerdata.map((item, index) => {
                return ( */}
              <StyledTableRow>
                <StyledTableCell
                  align="center"
                  component="th"
                  scope="row"
                  style={{backgroundColor:'#EEE'}}
                >
                  12-13-2021
                </StyledTableCell>
                <StyledTableCell align="center" >
                  420
                </StyledTableCell>
                <StyledTableCell align="center" >
                  310
                </StyledTableCell>
                <StyledTableCell align="center" >
                  290
                </StyledTableCell>
                <StyledTableCell align="center" >
                  285
                </StyledTableCell>
              </StyledTableRow>
              {/* ); })} */}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};
export default Details;
