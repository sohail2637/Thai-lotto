import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import {
  Grid,
  Container,
  TextField,
  Typography,
  Button,
  Box,
  Paper,
} from "@material-ui/core";
import swal from "sweetalert";
import { makeStyles } from "@material-ui/core/styles";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import "./admin.css";
import { timeline, resaults, drawvideo } from "../../redux/time-line-reducers";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  inputLbel: {
    paddingLeft: "0.8rem",
    fontSize: "16px",
    color: "#f9b707",
    // color: "#fff",
  },
  inputfield: {
    backgroundColor: "#fff",
    padding: '0 10px',
    borderRadius:'20px',
  },
  btn: {
    backgroundColor: "#f9b707",
    fontSize: "18px",
    fontWeight: "500",
    width: "100%",
    lineHeight: '30px',
    borderRadius:'20px',
    color: '#fff',
    margin:'2.5rem auto',
    ":hover": {
      backgroundColor: "#1f293d",
      color:'#fff',
    },
  },
  // paper: {
  //   width: "100%",
  // },
}));

let geneatedThumbs = false;
const Admin = (props) => {
  const classes = useStyles();
  let history = useHistory();
  const dispatch = useDispatch();
  let [video, setVideos] = useState({});
  let [draw, setDraw] = useState({});
  let [record, setRecord] = useState([]);
  const timelineData = useSelector((state) => state.timeline.timelinedata);
  const parsedata = JSON.parse(timelineData);

  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );
  const [state, setState] = useState({
    resultstime: null,
    date: null,
    first: null,
    secondA: null,
    secondB: null,
    secondC: null,
  });

  const onVideoChange = (event) => {
    event.preventDefault();
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      console.log(img);
      setVideos(img);
      console.log("state video ", img);
    }
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const submationform = (event) => {
    event.preventDefault();

    console.log(state);
    dispatch(resaults(state));
    const data = state;
    axios
      .post("/signup", data)
      .then((res) => {
        console.log("api respons: ", res);
        history.push("/login");
        console.log({ res });
      })
      .catch((error) => swal(error));
  };
  const config = {
    headers: { "content-type": "multipart/form-data" },
  };
  useEffect(async () => {
    // const resp = await axios.post('/admin', { token: localStorage.getItem('token') }).then((res) => {
    //   console.log(res.data)
    //   // setAdmin(res.data);

    // }).catch((err) => {
    //   console.log(err);
    //   history.push('/');
    // })
    const res = await axios
      .get("/uploadedRecord")
      .then((res) => {
        setRecord(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [video]);
  async function uploadVideos(evt) {
    evt.preventDefault();
    let form = new FormData();

    form.append("file", video);

    // let index = props.uploadReducer.stream.length;
    // debugger;
    const resp = await axios
      .post("/uploadStream", form, config)
      .then((res) => {
        console.log(res.data);

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: "Stream uploaded",
        });
        dispatch(drawvideo(res.data));
        // props.dispatch({
        //   type: "UPLOAD_STREAM",
        //   id: index + 1,
        //   file: res.data,
        // });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const setNotification = () => {
    const data = JSON.stringify(selectedDate);
    console.log(data);
    dispatch(timeline(data));
    axios
      .post("/notification", { selectedDate: data })
      .then((res) => {
        console.log(res);
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
      })
      .catch((err) => console.log(err));
    // .............testig data............
    // history.push("/");
  };
  const handleChange = (event) => {
    setState({
      ...state,
      resultstime: parsedata,
    });
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
    console.log({ [name]: event.target.value });
  };

  async function uploadDraw(evt) {
    evt.preventDefault();
    let sysDate = new Date();
    sysDate = sysDate.toDateString();
    let form = new FormData();
    form.append("date", sysDate);
    form.append("file", draw.files[0]);

    debugger;
    const resp = await axios
      .post("/uploadDraw", form)
      .then((res) => {
        console.log(res.data);
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: "Draw uploaded",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="main-container flexcol">
      <div className="admin-container">
        <div className="videos flexbox">
          <input
            type="file"
            // style={{ color: "#fff" }}
            onChange={(evt) => onVideoChange(evt)}
          />
          <button onClick={uploadVideos}>Upload Video</button>
        </div>

        <div className="draw flexbox">
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
            <div
              style={{
                backgroundColor: "#EBE9EA",
                padding: "10px",
                width: "305px",
                borderRadius: "25px",
              }}
            >
              <KeyboardTimePicker
                // margin="normal"
                variant="outlined"
                id="time-picker"
                label="Time picker"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
            </div>
          </MuiPickersUtilsProvider>
          <div>
            <Button
              onClick={() => setNotification()}
              fullWidth
              variant="contained"
              style={{
                backgroundColor: "#f9b707",
                color: "#fff",
                fontSize: "18px",
                fontWeight: "700",
                width: "305px",
                lineHeight: "3rem",
                borderRadius: "15px",
              }}
            >
              Notification
            </Button>
          </div>
        </div>
      </div>
      <div className="resault-container flexcol">
        <form onSubmit={submationform}>
          {/* <Paper className={classes.paper}> */}
          <Typography
            variant="h6"
            style={{ marginTop: "1rem", textAlign: "left" }}
          >
            {" "}
            <label for="First" className={classes.inputLbel}>
              First
            </label>
          </Typography>
          <TextField
            className={classes.inputfield}
            onChange={handleChange}
            type="number"
            name="first"
            required
            fullWidth
            placeholder="First"
            id="outlined-helperText"
            variant="outlined"
          />
          <Typography
            variant="h6"
            style={{ marginTop: "1rem", textAlign: "left" }}
          >
            {" "}
            <label for="secondA" className={classes.inputLbel}>
              SecondA
            </label>
          </Typography>
          <TextField
            onChange={handleChange}
            className={classes.inputfield}
            name="secondA"
            type="number"
            required
            fullWidth
            placeholder="secondA resault"
            id="outlined-helperText"
            variant="outlined"
          />
          <Typography
            variant="h6"
            style={{ marginTop: "1rem", textAlign: "left" }}
          >
            {" "}
            <label for="secondB" className={classes.inputLbel}>
              SecondB
            </label>
          </Typography>
          <TextField
            onChange={handleChange}
            className={classes.inputfield}
            name="secondB"
            type="number"
            required
            fullWidth
            placeholder="secondB resualt"
            id="outlined-helperText"
            variant="outlined"
          />
          <Typography
            variant="h6"
            style={{ marginTop: "1rem", textAlign: "left" }}
          >
            {" "}
            <label for="secondC" className={classes.inputLbel}>
              SecondC
            </label>
          </Typography>
          <TextField
            onChange={handleChange}
            className={classes.inputfield}
            name="secondC"
            type="number"
            required
            fullWidth
            placeholder="SecondC resault"
            id="outlined-helperText"
            variant="outlined"
          />
          <Button
            className={classes.btn}
            type="submit"
            variant="outlined"
          >
            Submit
          </Button>
          {/* </Paper> */}
        </form>

        <div className="details">
          <Link to="/drawerdetail">
            <p className="details-text">
              View details <AiOutlineArrowRight />
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default connect(function (store) {
  return store;
})(Admin);
