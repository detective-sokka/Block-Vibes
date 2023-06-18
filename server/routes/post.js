const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const Post = mongoose.model("Post");
const User = mongoose.model("User");

router.get("/allpost", requireLogin, (req, res) => {
  Post.find({ belongsTo: "Global" })
    .populate("postedBy", "_id name")
    .populate("comments.postedBy", "_id name")
    .sort("-createdAt")
    .then((posts) => {      
      res.json({ posts });      
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/getsubpost", requireLogin, (req, res) => {

  Post.find({ postedBy: { $in: req.user.following } })
    .populate("postedBy", "_id name")
    .populate("comments.postedBy", "_id name")
    .sort("-createdAt")
    .then((posts) => {
      
      res.json({ posts });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.post("/createpost", requireLogin, (req, res) => {
  const { title, body, pic, belong } = req.body;
  console.log(title, body, pic, belong);
  if (!title || !body || !pic) {
    return res.status(422).json({ error: "pls add all fields" });
  }
  req.user.password = undefined;
  //delete password
  const post = new Post({
    title: title,
    body: body,
    photo: pic,
    postedBy: req.user,
    belongsTo: belong,
  });

  post
    .save()
    .then((result) => {
      res.json({ post: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/mypost", requireLogin, (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name")
    .then((mypost) => {
      res.json({ mypost });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/like", requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { likes: req.user._id },
    },
    {
      new: true,
    }
  )
    .populate("postedBy")
    .populate("comments.postedBy")
    .exec((err, result) => {
      console.log(result);
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

router.put("/comment", requireLogin, (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id,
  };
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { comments: comment },
    },
    {
      new: true,
    }
  )
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name")

    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

router.put("/unlike", requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { likes: req.user._id },
    },
    {
      new: true,
    }
  )
    .populate("postedBy")
    .populate("comments.postedBy")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

router.delete("/deletepost/:postID", requireLogin, (req, res) => {
  Post.findOne({ _id: req.params.postID })
    .populate("postedBy", "_id")
    .exec((err, post) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
      if (post.postedBy._id.toString() === req.user._id.toString()) {
        post
          .remove()
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
});
//!!!!!!!!!!!!!!!!!!!!!!!!!changedbelow!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

router.post("/addSubscription", (req, res) => {
  const { email, subscription } = req.body;
  console.log("addc email:" + email + subscription);
  User.find({ email: email })
    .then((user) => {

      console.log("before" + user[0]);

      if (!user[0].subscriptions.includes(subscription)) {

        user[0].subscriptions.push(subscription);
      }

      console.log("after" + user[0]);
      User.findByIdAndUpdate(user[0]._id, user[0]).exec();
    })
    .then((r) => res.json({ r }))
    .catch((err) => {
      console.log(err);
    });
});
router.post("/removeSubscription", (req, res) => {
  const { email, subscription } = req.body;
  console.log("removec email:" + email + subscription);
  User.find({ email: email })
    .then((user) => {
      console.log("before" + user[0]);
      const newCS = user[0].subscriptions.filter(function (value, index, arr) {
        return value != subscription;
      });
      user[0].subscriptions = newCS;
      console.log("after" + user[0]);
      User.findByIdAndUpdate(user[0]._id, user[0]).exec();
    })
    .then((r) => res.json({ r }))
    .catch((err) => {
      console.log(err);
    });
});

router.get("/getSubscription", (req, res) => {
  const obj = {};
  if (req.query.email) {
    obj.email = req.query.email;
  }
  //const {email} = req.body.email;
  User.find({ email: obj.email }).then((user) => {
    res.json({ subscriptions: user[0].subscriptions });
  });
});

router.get("/getCpost", (req, res) => {
  const obj = {};
  if (req.query.subscription) {
    obj.subscription = req.query.subscription;
  }
  Post.find({ belongsTo: obj.subscription })
    .populate("postedBy", "_id name")
    .then((posts) => {      
      res.json({ posts });      
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
