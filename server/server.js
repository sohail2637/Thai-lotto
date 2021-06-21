let express = require("express");
var ffmpeg = require("fluent-ffmpeg");

ffmpeg.setFfmpegPath("/usr/bin/ffmpeg");

// ffmpeg.ffprobe(path_to_video, function (err, metadata) {
//   console.log("Metadata: ", metadata);
// });
ffmpeg.setFfprobePath("/usr/bin/ffprobe");

ffmpeg("video.mp4")
  .on("end", function () {
    console.log("Screenshots taken");
  })

  .on("error", function (err) {
    console.error("this error:");

    console.error(err);
  })
  .screenshots({
    // Will take screenshots at 20%, 40%, 60% and 80% of the video

    count: 4,

    folder: "uploads",
  });

let bodyparser = require("body-parser");
var multer = require("multer");
let mongoose = require("mongoose");
let path = require("path");
let jwt = require("jsonwebtoken");
let config = require("./config");
let fs = require("fs");

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
  "mongodb+srv://Admin:admin@cluster0.1sw9x.mongodb.net/thai-tv?retryWrites=true&w=majority",
  (err, connection) => {
    console.log(err || connection);
  }
);

// mongoose.connect('mongodb://localhost:27017/ThaiTv', (err, connection) => {

//     console.log(err || connection);

// })

let { Files, Timline, Resaluts } = require("./db/models/uploadedData");
// let  = require("./db/models/uploadedData");
let User = require("./db/models/user");
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
    let file = new Files();
    file.type = "stream";
    file.name = req.file.originalname;
    file.poster = "thumbnail-" + req.file.originalname.split(".")[0] + ".jpg";
    await file.save();
    res.send("Stream uploaded");
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
// ......admin notification.....
myApp.post("/notification", async (req, res) => {
  let timelinedate = new Timline();
  timelinedate.date = req.selectedDate;
  await timelinedate.save();
  // debugger;
  res.send("successfully save");
});
// .......admin resaults.......
myApp.post("/resaultes", async (req, res) => {
  let resaults = new Resaluts();
  resaults.first = res;
  resaults.secondA = res;
  resaults.secondB = res;
  resaults.secondC = res;
  await resaults.save();
  res.send("Resaltus save");
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
  await Files.find({ date: req.body.date }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      res.send(docs);
    }
  });
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
// myApp.use(express.static('./server/uploads/stream'));

myApp.use(express.static("./build"));
// myApp.use(express.static('./server/build'));

myApp.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./build", "index.html"));
});

myApp.listen(process.env.PORT || 6060, function () {
  console.log("server connection working!");
});
