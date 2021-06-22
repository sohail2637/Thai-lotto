let express = require("express");
let fs = require("fs");
var ffmpeg = require("fluent-ffmpeg");

ffmpeg.setFfmpegPath("/usr/bin/ffmpeg");

// ffmpeg.ffprobe(path_to_video, function (err, metadata) {
//   console.log("Metadata: ", metadata);
// // });
// ffmpeg.setFfprobePath("/usr/bin/ffprobe");

// ffmpeg("video.mp4")
//   .on("end", function () {
//     console.log("Screenshots taken");
//   })

//   .on("error", function (err) {
//     console.error("this error:");

//     console.error(err);
//   })
//   .screenshots({
//     // Will take screenshots at 20%, 40%, 60% and 80% of the video

//     count: 4,

//     folder: "uploads",
//   });

let bodyparser = require("body-parser");
var multer = require("multer");
let mongoose = require("mongoose");
let path = require("path");
let jwt = require("jsonwebtoken");
let config = require("./config");
// let fs = require("fs");

// const fileStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./server/uploads/stream/");
//   },
// });

const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./server/uploads/stream/");
  },
  filename: function (req, file, cb) {
    // console.log(file)
    cb(null, file.originalname);
  },
});
const uploadStream = multer({ storage: fileStorage });
// const uploadStream = multer({dest:'./server/uploads/stream/'});
mongoose.connect(
  "mongodb+srv://123456sohail:123456sohail@cluster0.chxyr.mongodb.net/Thai?retryWrites=true&w=majority",
  (err, connection) => {
    console.log(err || connection);
  }
);
// mongoose.connect(
//   "mongodb+srv://Admin:admin@cluster0.1sw9x.mongodb.net/thai-tv?retryWrites=true&w=majority",
//   (err, connection) => {
//     console.log(err || connection);
//   }
// );

// mongoose.connect('mongodb://localhost:27017/ThaiTv', (err, connection) => {

//   console.log(err || connection);

// });

let { Files, Timline, Resaluts } = require("./db/models/uploadedData");
// let  = require("./db/models/uploadedData");
let User = require("./db/models/user");
let History = require("./db/models/history");
let TimeLine = require("./db/models/timeline");
let UpdatePass = require('./db/models/updatepassword');
let Verify = require('./db/models/verifyemail');
let SendMessage = require('./db/models/updateemail');
const Ffmpeg = require("fluent-ffmpeg");

let myApp = express();
myApp.use(bodyparser.json());
// .......admin.......
myApp.post(
  "/uploadStream",
  uploadStream.single("file"),
  async function (req, res) {
    // Ffmpeg(req.file.path)
    //   .on("filenames", function (filenames) {
    //     console.log("will generate" + filenames.join(", "));
    //   })
    //   .on("end", function () {
    //     console.log("taken");
    //   })
    //   .on("err", function (err) {
    //     console.error(err);
    //   })
    //   .screenshot({
    //     count: 1,
    //     folder: "./server/uploads/stream/",
    //     size: "320x240",
    //     filename: "./thumbnail-%b.jpg",
    //   });

    await Files.deleteMany();

    let file = new Files();
    file.type = "stream";
    file.name = req.file.originalname;
    file.poster = "thumbnail-" + req.file.originalname.split(".")[0] + ".jpg";
    await file.save();
    Files.find({}, function (err, file) {
      res.send(file);
    });
  }
);
// .......admin......
myApp.post(
  "/uploadDraw",
  uploadStream.single("file"),
  async function (req, res) {
    let file = new Files();
    file.type = "draw";
    file.name = req.file.originalname;
    file.date = req.body.date;
    await file.save();
    res.send("Draw uploaded");
  }
);

myApp.get("/load-results", async (req, res) => {
  try {
    let result = await History.find();

    if (result.length > 1) {
      result = result[result.length - 1];
    } else if (result.length == 1) {
      result = result[0];
    }

    res.json({ success: true, result: result.toJSON() });
  } catch (e) {
    res.status(500).json({
      success: true,
    });
  }
});

myApp.get("/get_notification", async (req, res) => {
  try {
    let notification = await TimeLine.findOne();
    res.json(notification.toJSON());
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
});

// ......admin notification.....
myApp.post("/notification", async (req, res) => {
  console.log(req.body);
  await TimeLine.deleteMany();
  let timeline = new TimeLine();
  let dt = new Date(req.body.selectedDate);
  timeline.date = dt.toLocaleDateString();
  timeline.time = dt.toLocaleTimeString();
  timeline.selectedDate = req.body.selectedDate;
  await timeline.save();
  res.send(timeline);
  // TimeLine.find({}, function (err, timedate) {
  // });
  // let timelinedate = new Timline();
  // timelinedate.date = req.selectedDate;
  // await timelinedate.save();
  // // debugger;
  // res.send("successfully save");
});

// .......admin resaults.......
myApp.post("/resualts", async (req, res) => {
  console.log(req.body);
  try {
    let history = new History();
    (history.date = req.body.date),
      (history.time = req.body.time),
      (history.first = req.body.first),
      (history.secondA = req.body.secondA),
      (history.secondB = req.body.secondB),
      (history.secondC = req.body.secondC);
    await history.save();
    res.json({
      msg: "Hostory Saved...!",
    });
  } catch (e) {
    console.log("**************");
  }
  // let resaults = new Resaluts();
  // resaults.first = res;
  // resaults.secondA = res;
  // resaults.secondB = res;
  // resaults.secondC = res;
  // await resaults.save();
  // res.send("Resaltus save");
});
// ........playlist
myApp.get("/streamDisplay", async function (req, res) {
  try {
    let file = await Files.find({ type: "stream" });
    res.json(file);
  } catch (e) {
    res.send(500, { error: "some error occurred" });
  }
});
// ......main ........
myApp.get("/drawDisplay", async function (req, res) {
  try {
    let file = await Files.find({ type: "draw" });
    res.json(file);
  } catch (e) {
    res.send(500, { error: "SOme error occurred" });
  }
});
//......... detailes.........
myApp.post("/drawDetails", async function (req, res) {
  await History.find({ date: req.body.date }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      res.send(docs);
    }
  });
});
myApp.post("/sendemail", async function (req, res) {
  const sendmsg = new SendMessage();
  try {
    sendmsg.email = req.email;
    sendmsg.pin = req.pin;
    res.send('Send Msg on email');
  } catch (e) {
    res.send(e);
    
  }
});

myApp.get('/vaifypin', (req, res) => {
  const verify = new Verify();
  verify.pin = req.pin;
})
myApp.post("/updatepassword", async function (req, res) {
  let updatepas = new UpdatePass();
  updatepas.password=req.password;

});
myApp.post("/admin", async function (req, res) {
  try {
    let resp = await jwt.verify(req.body.token, config.secret);
    res.send("valid");
  } catch (e) {
    res.send(500, { error: "Some error occurred" });
  }
});

// ......admin api .....
myApp.get("/uploadedRecord", async function (req, res) {
  await Files.find({ type: "stream" }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      res.send(docs);
    }
  });
});

myApp.get("/delete", async function (req, res) {
  console.log(req.query);
  let file = await Files.findById(req.query._id);
  fs.unlink(
    path.resolve(__dirname + "/uploads/straem/" + file.name),
    (err) => {}
  );

  Files.findByIdAndRemove(req.query, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log("Removed User : ", docs);
    }
  });
});

myApp.post("/delete-video", async function (req, res) {
  try {
    await fs.unlink("./uploads/stream/" + req.body.videoID, () => {});
    await fs.unlink("./server/uploads/stream/" + req.body.videoID, () => {});
    res.status(200).json({
      message: "OK",
    });
  } catch (e) {
    res.status(500).json({
      message: "some error",
    });
  }
});

myApp.post("/signup", async function (req, res) {
  let user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;

  await user.save();
  console.log(req.body);
  res.send("signup successfully");
});

myApp.post("/login", async function (req, res) {
  let user = await User.findOne({
    name: req.body.name,
    password: req.body.password,
  });

  if (user) {
    let userID = { id: user.id };
    jwt.sign(userID, config.secret, { expiresIn: "3d" }, (errr, token) => {
      res.json({
        token,
        success: true,
        userID,
      });
    });
  } else {
    res.json({
      success: false,
    });
  }
});

myApp.use(function (err, req, res, next) {
  console.log(err);
});
myApp.use(express.static("./uploads/stream"));
myApp.use(express.static("./server/uploads/stream"));
// myApp.use(express.static('./server/uploads/stream'));

myApp.use(express.static("./build"));
myApp.use(express.static("./server/build"));
// myApp.use(express.static('./server/build'));

myApp.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./build", "index.html"));
});

myApp.listen(process.env.PORT || 6060, function () {
  console.log("server connection working!");
});
