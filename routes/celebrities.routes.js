const router = require("express").Router();

const Celebrity = require('../models/Celebrity.model')

// create would be the url here? rendering the filename new celeb
router.get('/create', (req, res) => {
    // we want the response to this request to render the file at location 'celebrities/new-celebrity'
    res.render('celebrities/create-celebrity')
});

router.post('/create', (req, res, next) => {
    // const name = req.body.name;
    // const occupation = req.body.occupation;
    // const catchphrase = req.body.catchphrase
        const {name, occupation, catchphrase} = req.body;
        Celebrity.findOne({ name })
            .then(celebrity => {
                // need to add if another error? Rather than the celeb already exists
                    if(celebrity) {
                        res.render('celebrities/create-celebrity', {
                            errorMessage: "Celebrity already exists, try again"
                        })
                    } else {
                        Celebrity.create({ name, occupation, catchphrase }).then(() => {
                            res.redirect('/celebrities');
                        })
                    }
            }).catch(error => {
                console.log("error in creating celebrity, try again", error);
            })
});

router.get('/', (req, res) => {
    Celebrity.find().then(allCelebrities => {
        console.log(allCelebrities)
        res.render('celebrities/celebrities', { celebrities: allCelebrities });
    }).catch(error => console.error(error))
});





module.exports = router;