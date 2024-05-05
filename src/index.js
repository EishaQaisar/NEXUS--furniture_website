const express = require("express");
const path = require("path");
const collection = require("./config");
const bcrypt = require('bcrypt');

const app = express();

 app.use(express.json());
// app.use(express.static("public"));
 app.use(express.static(path.join(__dirname, '../public')));

 app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");


app.use('/controller', express.static(path.join(__dirname, '../controller')));
const indexRoutes = require('../routes/indexRoutes');
const accountRoutes=require('../routes/accountRoutes');
const aboutRoutes=require('../routes/aboutRoutes');
const contactRoutes=require('../routes/contactRoutes');
const shopRoutes=require('../routes/shopRoutes');
const userRoutes = require('../routes/userRoutes');
const forgetRoutes=require('../routes/forgetRoutes')



app.use('/', indexRoutes);
app.use('/',accountRoutes)
app.use('/',aboutRoutes)
app.use('/',contactRoutes)
app.use('/',shopRoutes)
app.use(userRoutes); // Mount userRoutes without a prefix
app.use('/',forgetRoutes);



// Handle both signup and login in the same route
// app.post("/signup", async (req, res) => {
//     const data = {
//         name: req.body.username,
//         password: req.body.password
//     }

//     // Check if the username already exists in the database
//     const existingUser = await collection.findOne({ name: data.name });

//     if (existingUser) {
//         res.send('User already exists. Please choose a different username.');
//     } else {
//         const saltRounds = 10;
//         const hashedPassword = await bcrypt.hash(data.password, saltRounds);

//         data.password = hashedPassword;

//         const userdata = await collection.insertMany(data);
//         console.log(userdata);
//         res.send('User registered successfully!'); // Send response back to the client
//     }
// });

// app.post("/login", async (req, res) => {
//     try {
//         const check = await collection.findOne({ name: req.body.username });
//         if (!check) {
//             res.send("User name not found");
//         } else {
//             const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
//             if (!isPasswordMatch) {
//                 res.send("Wrong password");
//             } else {
//                 res.send("Login successful"); // Or redirect to home page or dashboard
//             }
//         }
//     } catch (error) {
//         console.error("Error:", error);
//         res.send("An error occurred. Please try again later.");
//     }
// });

const port = 5000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
