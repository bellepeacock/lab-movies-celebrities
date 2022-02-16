const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

const celebrities = require('../routes/celebrities.routes');
const movies = require('../routes/movies.routes');

module.exports = router;
