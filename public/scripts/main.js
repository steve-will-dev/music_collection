document.addEventListener('DOMContentLoaded', function () {

    const tabs = document.querySelectorAll('.tabs')[0];
    const instance = M.Tabs.init(tabs, {});

    const updateTabTrigger = document.getElementById('updatebandstab');

    const listNode = document.getElementById('mountNode');

    const template = document.getElementById('my_template').innerHTML; // handlebars template at the bottom of index.html
    const templateFn = Handlebars.compile(template); // compile the template


    let _music = []; // loaded when update artists is clicked. To be used to populate the form fields. Not working yet.



    // intital function to load all the data into the list get method. loaded into handlebars template
    function getMusic() {

        _music = [];
        console.log(_music);
        fetch("/music", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(resp => resp.json())
            .then(music => {
                console.log('the output', music);

                _music = music
                console.log('_music var', _music);

                const HTML = templateFn({
                    music
                });

                console.log(_music);
                listNode.innerHTML = HTML;
            });
    }


    // click for update and delete buttons    
    listNode.addEventListener("click", function (e) {
        // console.log('click', e.target);
        if (e.target) {
            const id = e.target.dataset.id;
            //   console.log("id", id);
            if (e.target.matches("button.update")) {
                // update
                console.log("update", id);
                updateBand(id);

            } else if (e.target.matches("button.delete")) {
                // delete
                //   console.log("delete");
                deleteBand(id);
            }
        }
    });


    // update bands functions. This needs lots of improvement. look at the serialize to array


    var updateId = id;
    console.log(updateId);

    const updateForm = document.getElementById('updateForm');
    updateForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const idUpdate = document.getElementById('id');
        const updatedId = idUpdate.value;

        const artistUpdate = document.getElementById('artistUpdate');
        const updatedArtist = artistUpdate.value;

        const formedUpdate = document.getElementById('formedUpdate');
        const updatedFormed = formedUpdate.value;

        const genreUpdate = document.getElementById('genreUpdate');
        const updatedGenre = genreUpdate.value;

        const imgURLUpdate = document.getElementById('imgURLUpdate');
        const updatedImgURL = imgURLUpdate.value;

        const albumUpdate = document.getElementById('albumsUpdate');
        const updatedAlbum = albumUpdate.value;

        const releaseDateUpdate = document.getElementById('releaseDateUpdate');
        const updatedRelease = releaseDateUpdate.value;

        const firstNameUpdate = document.getElementById('firstNameUpdate');
        const updatedFirstName = firstNameUpdate.value;

        const surnameUpdate = document.getElementById('surnameUpdate');
        const updatedSurname = surnameUpdate.value;

        const ageUpdate = document.getElementById('ageUpdate');
        const updateAge = ageUpdate.value;

        const instrumentUpdate = document.getElementById('instrumentUpdate');
        const updatedInstrument = instrumentUpdate.value;

        console.log('ID', updatedId);
        // console.log('artist', updatedArtist);
        // console.log('formed', updatedFormed);
        // console.log('genre', updatedGenre);
        // console.log('image', updatedImgURL);
        // console.log('album', updatedAlbum);
        // console.log('album', updatedRelease);
        // console.log('first', updatedFirstName);
        // console.log('surname', updatedSurname);
        // console.log('age', updateAge);
        // console.log('inst', updatedInstrument);


        const updateData = {
            artist: updatedArtist,
            formed: updatedFormed,
            genre: updatedGenre,

            albums: [{
                title: updatedAlbum,
                imgURL: updatedImgURL,
                releaseDate: updatedRelease,

            }],
            bandMembers: [{
                firstName: updatedFirstName,
                surname: updatedSurname,
                age: updateAge,
                instrument: updatedInstrument

            }]


        };

        console.log('update data', updateData, id.value);

        // the PUT method of the updated data from above ^^^^^^

        fetch(`/music/${updatedId}`, {
                method: 'PUT',
                body: JSON.stringify(updateData),
                headers: {
                    "Content-Type": "application/json",
                }
            })

            .then(music => {
                this.reset();
                M.toast({
                    html: "Band Updated!",
                    classes: "success"
                });
                reloadList();
                updateTabTrigger.parentNode.classList.add('disabled');
            })
            .catch(err => {
                console.log(error);
                M.toast({
                    html: `Error: ${err.message}`,
                    classes: 'error'
                });

            });


    });


    // remove class to open update tab and switch to the tab and musicToBeCopied contains existing data to be modified.
    function updateBand(id) {
        updateTabTrigger.parentNode.classList.remove('disabled');
        // console.log("id", id);
        instance.select('updatebands');
        console.log(updateForm, updateForm.querySelectorAll('#id'));
        updateForm.querySelectorAll('#id')[0].value = id;
        const musicToBeUpdated = _music.find(music => {
            return music._id === id;
        });
        //var id = id;
        // console.log(musicToBeUpdated);
        populateForm(musicToBeUpdated);
    }

    // Add the data into the form. This needs lots of improvement

    function populateForm(data) {
        var data = data;

        document.forms['updateForm'].elements['artist'].value = data.artist;
        document.forms['updateForm'].elements['formed'].value = data.formed;
        document.forms['updateForm'].elements['genre'].value = data.genre;
        document.forms['updateForm'].elements['firstNameUpdate'].value = data.bandMembers[0].firstName;
        document.forms['updateForm'].elements['surnameUpdate'].value = data.bandMembers[0].surname;
        document.forms['updateForm'].elements['ageUpdate'].value = data.bandMembers[0].age;
        document.forms['updateForm'].elements['instrumentUpdate'].value = data.bandMembers[0].instrument;
        document.forms['updateForm'].elements['albumsUpdate'].value = data.albums[0].title;
        document.forms['updateForm'].elements['releaseDateUpdate'].value = data.albums[0].releaseDate;
        document.forms['updateForm'].elements['imgURLUpdate'].value = data.albums[0].imgURL;

    }

    // reload lists called at end of form submissions to view new data.
    function reloadList() {
        getMusic()
        instance.select('bands');
    }


    // delete a band. 

    function deleteBand(id) {
        fetch(`/music/${id}`, {
                method: 'DELETE'
            })
            .then(resp => {
                console.log('resp', resp);
                M.toast({
                    html: "Band Deleted!",
                    classes: "success"
                });
                getMusic();
            })
            .catch(err => {
                console.log('err', err);
                M.toast({
                    html: `Error: ${err.message}`,
                    classes: "error"
                });
            });
    }


    //add a band get serialize to array working so dont need all this code working.
    const form = document.getElementById('addForm');
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const artistInput = document.getElementById('artist');
        const artistValue = artistInput.value;

        const formedInput = document.getElementById('formed');
        const formedValue = formedInput.value;

        const genreInput = document.getElementById('genre');
        const genreValue = genreInput.value;

        const imgURLInput = document.getElementById('imgURL');
        const imgURLValue = imgURLInput.value;

        const albumInput = document.getElementById('albums');
        const albumValue = albumInput.value;

        const releaseDateInput = document.getElementById('releaseDate');
        const releaseValue = releaseDateInput.value;


        const firstNameInput = document.getElementById('firstName');
        const firstNameValue = firstNameInput.value;

        const surnameInput = document.getElementById('surname');
        const surnameValue = surnameInput.value;

        const ageInput = document.getElementById('age');
        const ageValue = ageInput.value;

        const instrumentInput = document.getElementById('instrument');
        const instrumentValue = instrumentInput.value;


        // console.log('artist', artistValue);
        // console.log('formed', formedValue);
        // console.log('genre', genreValue);
        // console.log('image', imgURLValue);
        // console.log('album', albumValue);
        // console.log('album', releaseValue);
        // console.log('first', firstNameValue);
        // console.log('surname', surnameValue);
        // console.log('age', ageValue);
        // console.log('inst', instrumentValue);


        const data = {
            artist: artistValue,
            formed: formedValue,
            genre: genreValue,

            albums: [{
                title: albumValue,
                imgURL: imgURLValue,
                releaseDate: releaseValue,

            }],
            bandMembers: [{
                firstName: firstNameValue,
                surname: surnameValue,
                age: ageValue,
                instrument: instrumentValue

            }]


        };

        console.log('data', data);

        fetch('/music', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",

                }
            })

            .then(music => {
                this.reset();
                M.toast({
                    html: "Band Saved!",
                    classes: "success"
                });
                reloadList();
            })
            .catch(err => {
                console.log(error);
                M.toast({
                    html: `Error: ${err.message}`,
                    classes: 'error'
                });
            });

    });

    getMusic();


});