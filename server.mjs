import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';


let ContactSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Email: { type: String, required: true },
    Message: String,
    Subject: String,
    date: { type: Date, default: Date.now }

});

const contactModel = mongoose.model('Contacts', ContactSchema)

// let contact = []

const app = express()
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.post('/contact', (req, res) => {

    // contact.push(req.body.text);

    contactModel.create({

        Name: req.body.text,
        Email: req.body.text,
        Subject: req.body.text,
        Message: req.body.text
    },
        (err, saved) => {
            if (!err) {
                res.send({

                    Message: "Your Details Is Saved",
                    // data: contact
                })
            } else {
                res.status(500).send({

                    Message: "Server Error!!",
                })
            }
        })


    
})

// 172.16.21.247:3000

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})



/////////////////////////////////////////////////////////////////////////////////////////////////
let dbURI = 'mongodb+srv://username:username@cluster0.640ylgv.mongodb.net/Contact?retryWrites=true&w=majority';
mongoose.connect(dbURI);


////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {//connected
    console.log("Mongoose is connected");
    // process.exit(1);
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////