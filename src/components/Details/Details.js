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
    backgroundColor: "#000",
    color: theme.palette.common.white,
    fontSize: "20px",
  },
  body: {
    fontSize: 16,
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
            className="datepiker"
            style={{
              
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
            <TableHead>
              <TableRow>
                <StyledTableCell className="tablehead" lassName="tablehead">
                  Time
                </StyledTableCell>
                <StyledTableCell className="tablehead" align="center">
                  1st
                </StyledTableCell>
                <StyledTableCell className="tablehead" align="center">
                  2nd
                </StyledTableCell>
                <StyledTableCell className="tablehead" align="center">
                  2nd
                </StyledTableCell>
                <StyledTableCell className="tablehead" align="center">
                  2nd
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody className={classes.tablebody}>
              {/* {sellerdata.map((item, index) => {
           etur     rn ( */}
              <StyledTableRow>
                <StyledTableCell className="tablebody" align="center">
                  08:04 PM
                </StyledTableCell>
                <StyledTableCell className="tablebody" align="center">
                  420234
                </StyledTableCell>
                <StyledTableCell className="tablebody" align="center">
                  310234
                </StyledTableCell>
                <StyledTableCell className="tablebody" align="center">
                  290525
                </StyledTableCell>
                <StyledTableCell className="tablebody" align="center">
                  285344
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
