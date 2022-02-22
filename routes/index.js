const router = require("express").Router();
const celebrities = require('../routes/celebrities.routes');
const movies = require('../routes/movies.routes');

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});


module.exports = router;
