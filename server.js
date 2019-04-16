// node modules
require('dotenv').config(); // setting port num in .env
const express = require('express');
const mongoose = require('mongoose');
const parser = require('body-parser');

// set app to express and set port
const app = express();
const port = process.env.PORT || 6666; // port number or fallback to 6666 if no .env

const {
    MONGODB_URL
} = process.env;

// app useage setup entry dir and parser 
app.use(parser.json());
app.use(parser.urlencoded({
    extended: false
}));
app.use(express.static('public'));



// connect the database
mongoose.Promise = global.Promise;
const dbConnect = mongoose.connect(MONGODB_URL || 'mongodb://localhost/music', {
    useNewUrlParser: true
});

dbConnect.then((db) => {
    console.log('Database Connected');
}).catch((err) => {
    console.log('Error database not connected', err);
});

// db Schema model
const schema = mongoose.Schema;
const musicCollection = new schema({
    artist: {
        type: String,
        required: true
    },
    albums: [{
        title: {
            type: String,
            required: true
        },
        releaseDate: {
            type: Date,
            required: false
        },
        imgURL: {
            type: String,
            required: true
        }
    }],
    formed: {
        type: Date,
        required: false
    },
    genre: {
        type: String,
        required: false
    },
    bandMembers: [{
        firstName: {
            type: String,
            required: false
        },
        surname: {
            type: String,
            required: false
        },
        age: {
            type: Number,
            required: false
        },
        instrument: {
            type: String,
            required: false
        }
    }]
});

// set schema model to music for use in the routes
const music = mongoose.model('music', musicCollection);


//set the routes for api
// post create some data to start
app.post('/music', (req, res, next) => {
    const postBody = req.body;
    //   console.log('The Data:', postBody); // whoo whoo working now send to database
    const newMusic = new music(postBody); // body of req to musiccollection schema

    // now save it **Note to self type music correctly LOL :{
    newMusic.save((err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).json(result);
    });
});

//get the data back \m/ ROCK!!! lol

app.get('/music', (req, res, next) => {
    music.find({

        })
        .exec((err, result) => {
            if (err) return res.status(500).send(err);
            res.status(200).json(result);
            var data = result;

            //console.log(data[1].albums[2].title); //test going getting album title from the returned JSON
        })
});

// find all data on the artist with the id
// app.get('/music/:id?', (req, res, next) => {
//     const findArtist = req.params.id;
//     music.find({
//             _id: findArtist,
//         })
//         .exec((err, result) => {
//             if (err) return res.status(500).send(err);
//             res.status(200).json(result);
//         })
// });

// get a bands albums by artist name fix string to capital at 0 and remaining lowercase
app.get('/album/:artist', (req, res, next) => {
    const artistInput = req.params.artist;
    var findAlbums = artistInput.charAt(0).toUpperCase() + artistInput.slice(1).toLowerCase();
    console.log(findAlbums);
    music.find({
            artist: findAlbums,
        }).select({
            albums: 1
        })
        .exec((err, result) => {
            if (err) return res.status(500).send(err);
            res.status(200).json(result);
        })
});


// update the artist via the ID
app.put('/music/:artistid', (req, res, next) => {
    const updateArtist = req.params.artistid;
    console.log(updateArtist);
    music.update({
        _id: updateArtist,
    }, req.body, function (err, resp) {
        if (err) return res.status(500).send(err);
        res.sendStatus(200);
    })
});

app.delete('/music/:artistid', (req, res, next) => {
    const deleteArtist = req.params.artistid;
    console.log(deleteArtist);
    music.deleteOne({
        _id: deleteArtist
    }, (err, resp) => {
        if (err) return res.status(500).send(err);
        res.sendStatus(204);
    })
});

// app listen keep at bottom of script.
app.listen(port, () => {
    console.log(`App Communicating on port: ${port}`)
});