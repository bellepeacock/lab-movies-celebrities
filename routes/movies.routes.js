const router = require("express").Router();

const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');

router.get('/create', (req, res) => {
    //need to find to the celebs in database & allow user to select multiple .select()
    Celebrity.find()
        .then(allCelebrities => {
            // first argument of render is the page, second is the data to pass
            res.render('movies/create-movie', {celebrities: allCelebrities})
       
        }).catch(error => console.error(error));
});

router.post('/create', (req, res, next) => {
    const { title, genre, plot, cast } = req.body;

    Movie.create({ title, genre, plot, cast }).then(() => {
        res.redirect('/movies');
    }).catch(error => console.error(error))
        // 1. check if the movie already is in the database
        //2. if it is, be like sorry do it again
        //3. if it's not, be like well done m8! Let\s add it (redirect)
        //4. catch another error and print it so we know what it is
    
})

router.get('/', (req, res) => {
    //need to add .populate method, after you've found it
    Movie.find()
    .then(allMovies => {
        res.render('movies/movies', { movies: allMovies });
    }).catch(error => console.error(error))
});

router.get('/:id', (req, res, next) => {
    const { id } = req.params;

    Movie.findById(id)
        .populate('cast')
        .then((movieById) => {
            Celebrity.find()
            .then((celebrity) => {res.render('movies/edit-movie', {movieById, celebrity})
            });
        }).catch(error => console.error(error))
});

router.get('/:id/delete', (req, res, next) => {
    const { id } = req.params;
    Movie.findByIdAndRemove(id)
        .then(() => res.redirect("/movies"))
        .catch(error => console.error(error))
});

router.get('/:id/edit', (req, res, next) => {
    const { id } = req.params;

    Movie.findById(id)
        .populate('cast')
        .then((movieById) => {
           Celebrity.find() 
           .then((celebrity) => {res.render('movies/edit-movie.hbs', { movieById, celebrity })
        });
        }).catch(error => console.error(error))
});

router.post('/:id/edit', (req, res, next) => {
    const { id } = req.params;
    const { title, genre, plot, cast } = req.body;

    Movie.findByIdAndUpdate(
        id,
            { title, genre, plot, cast },
            { new: true }
    )
    .then(updatedMovie => res.redirect(`/movies/${updatedMovie._id}`))
    .catch(error => console.error(error))
});






module.exports = router;