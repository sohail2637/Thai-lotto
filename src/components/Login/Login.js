import React from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import Swal from 'sweetalert2';
import './login.css';
import {connect} from 'react-redux';
import store from '../../store/store';
import { Link } from 'react-router-dom';


function Login(props) {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = async (data) =>{ 
       
        let resp = await axios.post('/login', data)

        if(resp.data.success === true){
            localStorage.setItem('token', resp.data.token);
            localStorage.setItem('userId',resp.data._id);
            store.dispatch({
                type : "LOGIN_OK",
                payload:resp.data
            });
           
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: 'success',
                title: 'Login successfully'
              })
            props.history.push('/home');
        }else if(resp.data.success === false){
            props.history.push("/home");
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 4000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            // ............open route.........
            
              
              Toast.fire({
                icon: 'error',
                title: 'Please Type valid information'
              })
        }
    };

    return <div >
        <div >
                <center>
                    <div className="container-login flexcol">
                        <div className="z-depth-1 grey lighten-4 row" style={{ display: 'inline-block', padding: '32px 48px 0px 48px', border: '1px solid #EEE' }}>

                            <form id='loginForm' onSubmit={handleSubmit(onSubmit)} className="col s12" method="post">
                                <div className='row'>
                                    <div className='col s12'>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='input-field col s12'>
                                        <input className='validate' type='text' name='name' id='name'  {...register('name')} />
                                        <label for='name'>Enter Name</label>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='input-field col s12'>
                                        <input className='validate' type='password' name='password' id='password' {...register('password')} />
                                        <label for='password'>Enter Password</label>
                                    </div>
                                    
                                </div>

                                <br />
                                <center>
                                    <div className='row'>
                                        <button type='submit' name='btn_login' className='col s12 btn btn-large waves-effect indigo'>Login</button>
                                    </div>
                            </center>
                            <center>
                                <h6>
                                    you't have account<Link to='/signup'>SignUp</Link>
                                </h6>
                        </center>
                            </form>
                        </div>
                    </div>

                </center>
        </div>

    </div>
}
export default connect((myStore)=>{
    return myStore;
})(Login);






// ....................

// import React from "react";
// // import AuthNavbar from "../Header";
// import { makeStyles } from "@material-ui/core/styles";
// import { Grid, Container, Typography, Button, Box } from "@material-ui/core";
// import Hidden from "@material-ui/core/Hidden";
// import TextField from "@material-ui/core/TextField";
// import { Link } from "react-router-dom";

// import { useForm } from "react-hook-form";
// import axios from "axios";
// import Swal from "sweetalert2";
// import "./login.css";
// import { connect } from "react-redux";
// import store from "../../store/store";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     // height: "120vh",
//   },
//   paper: {
//     padding: theme.spacing(2),

//     color: theme.palette.text.secondary,
//   },
//   navBarContainer: {
//     width: "100%",

//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     background:
//       "linear-gradient(0deg, rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.0)), url(/assets/images/registerimg.png)",
//   },
//   formContainer: {
//     marginTop: "4rem",
//     marginBottom: "3rem",
//     paddingLeft: "10rem",
//     [theme.breakpoints.down("md")]: {
//       paddingLeft: "0rem",
//       paddingRight: "0rem",
//     },

//     paddingRight: "10rem",
//   },
//   inputLbel: {
//     paddingLeft: "1rem",
//     fontSize: "12px",
//   },

//   seeBtn: {
//     backgroundColor: theme.palette.primary.main,
//     width: "100%",
//     textTransform: "capitalize",
//     borderRadius: 100,
//     paddingTop: 10,
//     paddingBottom: 10,
//     marginTop: 35,
//     textAlign: "center",
//     // marginLeft: "0.5rem",
//     "&:hover": {
//       backgroundColor: theme.palette.primary.main,
//     },
//   },
//   firstLine: {
//     backgroundColor: "red",
//     width: "117px",
//     height: "0px",
//     // marginTop: "3rem",
//     border: "0.5px solid #555555",
//   },

//   RegisterContent: {
//     textAlign: "center",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     flexDirection: "column",
//     paddingTop: 70,
//     paddingBottom: 100,
//   },

//   security: {
//     fontSize: "64px",
//     fontFamily: "Spartan",
//     color: "#FE9C00",
//     lineHeight: 1,
//     fontWeight: "700",
//     [theme.breakpoints.down("md")]: {
//       fontSize: "40px",
//       fontWeight: "500",
//     },
//   },
//   boxContainer: {
//     width: "auto",
//     height: "auto",
//     border: "1px solid #FE9C00",
//     marginTop: "1rem",
//     padding: "1rem",
//     [theme.breakpoints.down("md")]: {
//       padding: "0.5rem",
//     },
//     [theme.breakpoints.down("sm")]: {
//       padding: "0.4rem",
//     },
//   },
//   orContainer: {
//     color: theme.lightGray,
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     paddingTop: 40,
//     paddingBottom: 7,
//   },
// }));

// const Login = (props) => {
//   const classes = useStyles();
//   const { register, handleSubmit, watch, errors } = useForm();
//   const onSubmit = async (data) => {
//     let resp = await axios.post("/login", data);

//     if (resp.data.success === true) {
//       localStorage.setItem("token", resp.data.token);
//       localStorage.setItem("userId", resp.data._id);
//       store.dispatch({
//         type: "LOGIN_OK",
//         payload: resp.data,
//       });

//       const Toast = Swal.mixin({
//         toast: true,
//         position: "top-end",
//         showConfirmButton: false,
//         timer: 3000,
//         timerProgressBar: true,
//         didOpen: (toast) => {
//           toast.addEventListener("mouseenter", Swal.stopTimer);
//           toast.addEventListener("mouseleave", Swal.resumeTimer);
//         },
//       });

//       Toast.fire({
//         icon: "success",
//         title: "Login successfully",
//       });
//       props.history.push("/home");
//     } else if (resp.data.success === false) {
//       props.history.push("/home");
//       const Toast = Swal.mixin({
//         toast: true,
//         position: "top-end",
//         showConfirmButton: false,
//         timer: 4000,
//         timerProgressBar: true,
//         didOpen: (toast) => {
//           toast.addEventListener("mouseenter", Swal.stopTimer);
//           toast.addEventListener("mouseleave", Swal.resumeTimer);
//         },
//       });
//       // ............open route.........

//       Toast.fire({
//         icon: "error",
//         title: "Please Type valid information",
//       });
//     }
//   };

//   return (
//     <div>
//       <div className={classes.root}>
//         <Grid container>
//           <Grid item xs={12}>
//             {/* <AuthNavbar position="static" auth /> */}
//           </Grid>
//           <Grid item xs={12} lg={6} className={classes.formContainer}>
//             <form
//               id="loginForm"
//               onSubmit={handleSubmit(onSubmit)}
//               className="col s12"
//               method="post"
//             >
//               <Container maxWidth="md">
//                 <Typography style={{ marginTop: "1rem" }}>
//                   {" "}
//                   <label for="fname" className={classes.inputLbel}>
//                     Email
//                   </label>
//                 </Typography>

//                 <TextField
//                   name="name"
//                   {...register("name")}
//                   fullWidth
//                   id="outlined-helperText"
//                   defaultValue="Default Value"
//                   variant="outlined"
//                 />
//                 <Typography style={{ marginTop: "1rem" }}>
//                   {" "}
//                   <label for="fname" className={classes.inputLbel}>
//                     Password
//                   </label>
//                 </Typography>

//                 <TextField
//                   name="password"
//                   id="password"
//                   {...register("password")}
//                   fullWidth
//                   id="outlined-helperText"
//                   defaultValue="Default Value"
//                   variant="outlined"
//                 />

//                 <Button
//                   type="submit"
//                   fullWidth={true}
//                   className={classes.seeBtn}
//                   fullWidth
//                 >
//                   Submit
//                 </Button>
//                 {/* </form> */}

//                 <Box className={classes.orContainer}>
//                   <div className={classes.firstLine} />
//                   <span style={{ paddingRight: 20, paddingLeft: 20 }}>OR</span>
//                   <div className={classes.firstLine} />
//                 </Box>

//                 <Box
//                   style={{
//                     display: "flex",
//                     justifyContent: "center",
//                     marginTop: "2rem",
//                   }}
//                 >
//                   <Typography>
//                     Don't have account? <Link to="/register">Register</Link>
//                   </Typography>
//                 </Box>
//                 {/* </div> */}
//               </Container>
//             </form>
//           </Grid>

//           <Hidden xsDown>
//             <Grid item xs={12} lg={6} className={classes.navBarContainer}>
//               <div className={classes.RegisterContent}>
//                 <Box>
//                   <img src="/assets/images/RegLogo.svg" />
//                 </Box>
//                 <Box className={classes.boxContainer}>
//                   <Typography
//                     style={{
//                       fontSize: "36px",
//                       fontFamily: "Spartan",
//                       color: "white",
//                     }}
//                   >
//                     Our Priority is your
//                   </Typography>
//                   <Typography className={classes.security}>SECURITY</Typography>
//                 </Box>
//                 <Box>
//                   <Typography
//                     style={{
//                       color: "white",
//                       fontSize: "18px",
//                       lineHeight: "40px",
//                     }}
//                   >
//                     Keep your investment safe with Thai Lotto.
//                   </Typography>
//                 </Box>
//               </div>
//             </Grid>
//           </Hidden>
//         </Grid>
//       </div>
//     </div>
//   );
// };
// export default connect((myStore) => {
//   return myStore;
// })(Login);

