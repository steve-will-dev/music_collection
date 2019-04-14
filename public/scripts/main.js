document.addEventListener('DOMContentLoaded', function () {

    const template = document.getElementById('my_template').innerHTML;
    const templateFn = Handlebars.compile(template);

    var tabs = document.querySelectorAll('.tabs')[0];

    const updateTabTrigger = document.getElementById('updatebands');

    var instance = M.Tabs.init(tabs, {});

    var _music = [];


    function getMusic() {


        fetch('/music/', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    // "Content-Type": "application/x-www-form-urlencoded",
                }
            })
            .then(resp => resp.json())

            .then(music => {

                console.log('the output', music);
                const HTML = templateFn({
                    music
                });
                _music = music
                console.log('_music var', _music);

                const mountNode = document.getElementById('mountNode');
                mountNode.innerHTML = HTML;
            });
    }





    mountNode.addEventListener("click", function (e) {
        // console.log('click', e.target);
        if (e.target) {
            const id = e.target.dataset.id;
            //   console.log("id", id);
            if (e.target.matches("button.update")) {
                // update
                console.log("update");
                updateBand(id);

            } else if (e.target.matches("button.delete")) {
                // delete
                console.log("delete");
                deleteBand(id);
            }
        }
    });



    function updateBand(id) {
        instance.select('updatebands');
        //  var id = id;
        //   console.log("id", id);


        // update FORM
        const updateForm = document.getElementById('updateForm');
        updateForm.addEventListener('submit', function (e) {
            e.preventDefault();

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


            console.log('artist', updatedArtist);
            console.log('formed', updatedFormed);
            console.log('genre', updatedGenre);
            console.log('image', updatedImgURL);
            console.log('album', updatedAlbum);
            console.log('album', updatedRelease);
            console.log('first', updatedFirstName);
            console.log('surname', updatedSurname);
            console.log('age', updateAge);
            console.log('inst', updatedInstrument);


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

            console.log('update data', updateData, id);

            fetch(`/music/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify(updateData),
                    headers: {
                        "Content-Type": "application/json",
                        // "Content-Type": "application/x-www-form-urlencoded",
                    }
                })
                // .then(resp => resp.json())
                .then(music => {
                    this.reset();
                    M.toast({
                        html: "Band Updated!",
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




    }


    function reloadList() {
        getMusic()
        instance.select('bands');
    }

    // const deleteform = document.getElementById('deleteForm');
    // deleteform.addEventListener('submit', function (e) {
    //     e.preventDefault();


    //     const artistDelete = document.getElementById('artistdelete');
    //     const deleteArtist = artistDelete.value;

    //     console.log('artist deleted', deleteArtist);

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


    // Add FORM
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


        console.log('artist', artistValue);
        console.log('formed', formedValue);
        console.log('genre', genreValue);
        console.log('image', imgURLValue);
        console.log('album', albumValue);
        console.log('album', releaseValue);
        console.log('first', firstNameValue);
        console.log('surname', surnameValue);
        console.log('age', ageValue);
        console.log('inst', instrumentValue);


        const data = {
            artist: artistValue,
            formed: formedValue,
            genre: genreValue,

            albums: [{
                title: albumValue,
                imgURL: imgURLValue,
                releaseDate: formedValue,

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
                    // "Content-Type": "application/x-www-form-urlencoded",
                }
            })
            // .then(resp => resp.json())
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

    // function updateBand(id) {
    //     console.log("clickec");
    //     updateTabTrigger.parentNode.classList.remove('disabled');
    //     instance.select('updatebands');
    //     console.log(updateForm, updateForm.querySelectorAll('#id'));
    //     updateForm.querySelectorAll('#id')[0].value = id;
    //     const bandToBeUpdated = _music.find(music => {
    //         return music._id === id;
    //     });
    //     console.log(bandToBeUpdated);
    //     // populateForm(updateForm, bandToBeUpdated);
    // }






    // function populateForm(form, data) {
    //     for (const item in data) {
    //         const el = form.querySelectorAll(`input[artist="${item}"]`);
    //         if (el.length) {
    //             el[0].value = data[item];
    //         }
    //     }
    // }







    getMusic()


});