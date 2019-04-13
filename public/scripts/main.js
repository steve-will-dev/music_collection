document.addEventListener('DOMContentLoaded', function () {

    const template = document.getElementById('my_template').innerHTML;
    const templateFn = Handlebars.compile(template);

    var tabs = document.querySelectorAll('.tabs')[0];

    var instance = M.Tabs.init(tabs, {});


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


            const mountNode = document.getElementById('mountNode');
            mountNode.innerHTML = HTML;
        });


    const getform = document.getElementById('getForm');
    getform.addEventListener('submit', function (e) {
        e.preventDefault();


        const artistSearch = document.getElementById('artistsearch');
        const artist = artistSearch.value;

        console.log('artist', artist);


        fetch('/music/' + artist, {
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


                const mountNode2 = document.getElementById('mountNode2');
                mountNode2.innerHTML = HTML;
            });
    });


    const deleteform = document.getElementById('deleteForm');
    deleteform.addEventListener('submit', function (e) {
        e.preventDefault();


        const artistDelete = document.getElementById('artistdelete');
        const deleteArtist = artistDelete.value;

        console.log('artist deleted', deleteArtist);


        fetch('/music/' + deleteArtist, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    // "Content-Type": "application/x-www-form-urlencoded",
                }
            })
            .then(resp => resp.json())
            .then(music => {
                M.toast({
                    html: 'Bands Saved!',
                    classes: 'success'
                });
            })
            .catch(err => {
                console.log(error);
                M.toast({
                    html: `Error: ${err.message}`,
                    classes: 'error'
                });
            });
    });



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
            releaseDate: releaseValue,

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

        fetch('/music', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                    // "Content-Type": "application/x-www-form-urlencoded",
                }
            })
            .then(resp => resp.json())
            .then(music => {
                M.toast({
                    html: 'Bands Saved!',
                    classes: 'success'
                });
            })
            .catch(err => {
                console.log(error);
                M.toast({
                    html: `Error: ${err.message}`,
                    classes: 'error'
                });
            });

    });

});