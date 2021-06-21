import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import video1 from "../videos/video.mp4";
import video2 from "../videos/Dummy Video.mp4";
import { connect } from "react-redux";
import axios from "axios";
import "./PlayList.css";
import { useHistory, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { AiOutlineArrowRight } from "react-icons/ai";
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
  Divider,
} from "@material-ui/core";

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
    fontSize: "16px",
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

const PlayList = (props) => {
  const classes = useStyles();

  let [index, setIndex] = useState(1);
  let history = useHistory();
  const [timeline, setTimeLine] = useState();
  let [stream, setStream] = useState([]);
  const timelineData = useSelector((state) => state.timeline.timelinedata);
  const resault = useSelector((state) => state.timeline.resault);
  const video = useSelector((state) => state.timeline.video);
  const { date, setData } = new Date();
  const parsedata = JSON.parse(timelineData);
  console.log("selector resualts", resault);

  useEffect(async () => {
    setTimeLine(parsedata);

    if (!stream.length) {
      const resp = await axios
        .get("/streamDisplay")
        .then((res) => {
          setStream(res.data);
        })
        .catch((err) => {
          console.log(err);
          history.push("/");
        });
    } else {
      document.querySelectorAll("ReactPlayer").forEach((video, index) => {
        video.poster = stream[index].poster;
      });
    }
  }, [stream]);

  return (
    <div className="play-list">
      <div className="title flexbox">
        {/* {timeline ? ( */}
        <div className="time-line flexcol">
          {/* <div className="timeline-inner "> */}
            <div className="time-Line-inner flexcol">
              <h5
                style={{
                  textAlign: "center",
                  color: "#000",
                fontWeight: "900",
                  lineHeight:"10px",
                }}
                class="animate__animated animate__bounce animate__delay-2s "
              >
                Upcomming Draw
              </h5>
              <h5
                style={{
                  margin: "auto",
                  textAlign: "center",
                fontFamily: "ROBOTO",
                  color:'#000'
                }}
              >
                {timeline}12-13-2021 06:50 PM
              </h5>
            </div>
          {/* </div> */}
        </div>
        {/* ) : null} */}
      </div>
      <div className="Tv-container">
        <div
          className="tv-screen flexbox"
          style={{
            width: "100%",
            height: "80vh",
          }}
        >
          <ReactPlayer
            id="videolink"
            style={{ width: "100%", height: "80vh" }}
            playing="true"
            loop="true"
            url="https://www.youtube.com/watch?v=J-5-BAkVrNo"
          />
          {/* <video
            // width='100%'
            // height='100vh'
            className="video-container video-container-overlay"
            autoPlay="true"
            loop
            muted="none"
          >
            <source
              src="https://www.youtube.com/watch?v=J-5-BAkVrNo"
              type="video/mp4"
            />
          </video> */}
        </div>
        {resault ? (
          <div className="draw-table">
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Date</StyledTableCell>
                    <StyledTableCell align="center">1st</StyledTableCell>
                    <StyledTableCell align="center">2nd</StyledTableCell>
                    <StyledTableCell align="center">2nd</StyledTableCell>
                    <StyledTableCell align="center">2nd</StyledTableCell>
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
                      style={{ backgroundColor: "#EEE" }}
                    >
                      12-13-2021
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {resault.first} 410
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {resault.first}310
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {" "}
                      {resault.secondA}290
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {resault.secondB}285
                    </StyledTableCell>
                  </StyledTableRow>
                  {/* ); })}  */}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ) : null}

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
})(PlayList);
