//jshint esversion:6

require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');

// Custom Modules
const User = require('./Models/user');
const Post = require('./Models/post');

const app = express();

app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use('/uploads', express.static(__dirname + "/uploads"));


const dbUrl = process.env.DB_URL;
const secret = process.env.SECRET_KEY;
const saltRounds = Number(process.env.SALT_ROUNDS);

mongoose.connect(dbUrl);


app.get('/', async function (req, res) {

  try {
    const post = await Post.find()
      .populate('author', ['username'])
      .sort({ createdAt: -1 })
      .limit(6);
    res.json(post);

  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

});

// app.get('/contact', function (req, res) {
//   // res.render('contact', { contact_Content: contactContent });
// });

// app.get('/about', function (req, res) {
//   // res.render('about', { about_Content: aboutContent });
// });

app.get('/compose', async function (req, res) {

  try {
    const post = await Post.find()
      .populate('author', ['username'])
      .sort({ createdAt: -1 });
    res.json(post);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }

});

app.post('/compose', upload.single('image'), async function (req, res) {

  try {
    const { originalname, path } = req.file;
    const splitName = originalname.split('.');
    const extension = splitName[splitName.length - 1];
    const newPath = path + '.' + extension;
    fs.renameSync(path, newPath);

    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, data) => {
      if (!err) {
        const { title, summary, details } = req.body;
        const postDoc = await Post.create({
          title: title,
          summary: summary,
          details: details,
          cover: newPath,
          author: data.id
        });
        res.json(postDoc);
      } else {
        throw new Error('Failed to verify token');
      }
    })
  } catch (error) {
    console.error('Error creating new post:', error);
    res.status(500).json({ error: 'Failed to create new post' });
  }

});

app.get('/post/:postID', async function (req, res) {

  try {
    const { postID } = req.params;
    const postDoc = await Post.findById(postID).populate('author', ['username']);
    // console.log(postDoc);
    if (!postDoc) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(postDoc);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'Failed to fetch post' });
  }

});

app.post('/login', async function (req, res) {

  try {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email: email });
    // console.log(userDoc);
    if (!userDoc) {
      return res.status(400).json("User not found");
    }
    const checkPass = await bcrypt.compare(password, userDoc.password);
    if (checkPass) {
      jwt.sign({ email, id: userDoc._id }, secret, {}, (err, token) => {
        if (err) throw err;

        res.cookie('token', token).json({
          id: userDoc._id,
          email: userDoc.email,
          username: userDoc.username
        });
      });
    } else {
      res.status(400).json("Wrong Credentials")
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

});

app.post('/signup', async function (req, res) {

  try {
    const { username, email, password } = req.body;

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists. Please choose a different one.' });
    }

    // Validate username
    if (username.length < 3) {
      return res.status(400).json({ error: 'Username must be at least 3 characters long.' });
    }

    // Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email address.' });
    }

    // Validate password strength
    if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-={}[\]:;"'<>,.?/]).{8,}/.test(password)) {
      return res.status(400).json({ error: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.' });
    }

    // Hashing and Creating User in DB
    const salt = bcrypt.genSaltSync(saltRounds);
    const userDoc = await User.create({
      username,
      email,
      password: bcrypt.hashSync(password, salt)
    });

    res.json({ data: { username, email, password } });

  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Failed to sign up. Please try again later.' });
  }

});

app.get('/profile', function (req, res) {

  try {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, (err, data) => {
      if (!err) {
        res.json(data);
      }
    });
  } catch (error) {
    console.error('Error retrieving profile:', error);
    res.status(500).json({ error: 'Failed to retrieve profile data' });
  }

});

app.post('/logout', function (req, res) {
  res.cookie('token', '').json("Logout Successfully")

});

app.listen(4000, function () {
  console.log("Server started on port 4000");
});
