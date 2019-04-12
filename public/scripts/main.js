document.addEventListener('DOMContentLoaded', function () {

    const template = document.getElementById('my_template').innerHTML;
    const templateFn = Handlebars.compile(template);

    var tabs = document.querySelectorAll('.tabs')[0];

    var instance = M.Tabs.init(tabs, {});


    fetch('/music', {
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


            // for (i = 0; i < music.length; i++) {
            //     var albums = music[i].albums;
            //     //console.log(music[i].albums);
            //     //console.log(music.length);
            //     var artist = music[i].artist;
            //     // console.log(artist);
            //     var el = document.getElementById('output');
            //     elChild = document.createElement('div');
            //     elChild.innerHTML = "<h2>" + artist + "</h2><p>Genre: " + music[i].genre + "</p> <p>Formed: " + music[i].formed + "</p>";
            //     el.appendChild(elChild);

            //     for (j = 0; j < albums.length; j++) {
            //         // console.log(albums[j].title);
            //         // console.log(albums[j].imgURL);
            //         var albumsTitle = albums[j].title;
            //         var imgURL = albums[j].imgURL;
            //         var el = document.getElementById('output');
            //         elChild = document.createElement('ul');
            //         elChild.innerHTML = "<li class=\"list-group-item\">" + albumsTitle + "<br /><img src=" + imgURL + ">" + "</li>";
            //         el.appendChild(elChild);
            //     }
            // }
            const mountNode = document.getElementById('mountNode');
            mountNode.innerHTML = HTML;
        });


    // cosnt form = document.getElementById('addForm');
    // form.addEventListener('submit', function (e) {
    //     e.preventDefault();
    // })



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

        console.log('artist', artistValue);
        console.log('formed', formedValue);
        console.log('genre', genreValue);
        console.log('image', imgURLValue);
        console.log('album', albumValue);
        console.log('album', releaseValue);


        const data = {
            artist: artistValue,
            formed: formedValue,
            genre: genreValue,
            releaseDate: releaseValue,

            albums: [{
                title: albumValue,
                imgURL: imgURLValue,
                releaseDate: formedValue,

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