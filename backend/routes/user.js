<<<<<<< HEAD
const express = require("express");

const router = express.Router();

router.get("/user", (req, res) => {
  res.send("welcome to user home");
});
module.exports = router;
=======
const express = require("express");
const { home } = require("../controllers/user");

const router = express.Router();


router.get("/user", home);

module.exports = router;
>>>>>>> 9375dd28eb8901b4610dbecb769f7768fbd3307b
