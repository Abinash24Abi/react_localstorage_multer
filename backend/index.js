const express = require('express');
const cors = require('cors');
const mysql2 = require('mysql2');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');


const multer = require('multer')
const path = require('path');

const app = express();
const port = 8989;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
}));


app.use(express.static('Userimages'));

const sql = mysql2.createConnection({
    
    host:'localhost',
    user:'root',
    password:'dotnetuser',
    database:'react',
    port: 3306
    
});

sql.connect(err => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Database connected successfully");
    }
});

// Middleware to verify JWT token
const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ Status: 'unauthorized' });
    }
    jwt.verify(token, 'our-jsonwebtoken-secret-key', (err, decoded) => {
        if (err) {
            return res.json({ Status: 'unauthorized' });
        }
        req.name = decoded.name;
        next();
    });
};

// Check user authentication
app.get('/', verifyUser, (req, res) => {
    return res.json({ Status: 'success', name: req.name });
});

// Login API
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM user WHERE email = ? AND pw = ?';

    sql.query(query, [email, password], (err, data) => {
        if (err) {
            return res.json({ Message: "Server error" });
        }
        if (data.length > 0) {
            const name = data[0].name;
            const token = jwt.sign({ name }, "our-jsonwebtoken-secret-key", { expiresIn: '1d' });

            res.cookie('token', token, {
                httpOnly: true,
                secure: false,
                sameSite: 'Strict'
            });

            return res.json({ Status: 'success' });
        } else {
            return res.json({ Status: 'failed', Message: "Invalid credentials" });
        }
    });  
});


// const storage = multer.diskStorage({

//     destination:(req,file,cb) => {
//         cb(null ,'public')
//     },
//     filename:(req,file,cb) => {
//         cb(null,file.fieldname + "_" + Date.now() + path.extname(file.originalname));
//     }
// })

// const update = multer({
    
//     storage:storage
    
// })

// app.post('/upload',update.single('image'),(req,res) => {
//     // console.log(req.file);
//     const image = req.file.filename;
//     sql.query("insert into userinfo (img) values(?)",[image],(err,result) => {
//         if(err){
//             return res.json({Message:'error'})
//         }
//         return res.json({Status : "success"})
//     })

// })

// app.get('/getimg',(req,res)=> {
//     sql.query("select * from userinfo",(err,result) => {
//         if(err) return res.json("error")
//             return res.json(result)
//     })
// })









// Logout API
app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: "success" });
});


app.post('/post',(req,res) => {
    const {name,email,password} = req.body
    sql.query("insert into user (name,email,pw) values (?,?,?)",[name,email,password],(err,result) => {
        if(err){
           return  console.log(err)
        }
        else{
            return res.json({Message:"done"})
        }

    })
})



const mystorage = multer.diskStorage({
    destination:(req,file,cb) => {
       cb(null,'./Userimages')
    },
    filename:(req,file,cb) => {
        cb(null,Date.now() + path.extname(file.originalname))
    }
})

const addimg = multer({storage:mystorage})


app.post('/adduser',addimg.single('img'),(req,res) => {

    // const {name,email,phno} = req.boby;
    // console.log(req.body.name)
    // console.log(req.file.filename)

    const name = req.body.name;
    const email = req.body.email;
    const phno = req.body.phno;
    const img = req.file.filename;

    sql.query('insert into users (name,email,phno,img) values(?,?,?,?)',[name,email,phno,img],(err,result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'User added successfully', data: result });
    });
   
   
})


app.get('/getuser',(req,res)=> {
    sql.query("select * from users",(err,result) => {
        if(err) return res.json("error")
            return res.json(result)
    })
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
