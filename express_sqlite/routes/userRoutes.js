const { Router } = require("express");
const jwt = require('jsonwebtoken');
const router = Router();
var config =  {
  "secret": "THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET"
};
var users = [{
  id: 1,
  username: 'Meenakshi',
  password: '12345'
}];

function createIdToken(user) {
  return  jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
}

function createAccessToken() {
  return jwt.sign({
    iss: 'Meenakshi',
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    scope: 'full_access',
    sub: "abcdefgh",
    jti: genJti(), // unique identifier for the token
    alg: 'HS256'
  }, config.secret);
}
// Generate Unique Identifier for the access token
function genJti() {
  let jti = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 16; i++) {
      jti += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  
  return jti;
}
const {
  getAllUsers,
  deleteAUser,
  updateAUser,
} = require("../controllers/userControllers");


router.post('/authenticate', function(req, res) {
  
  var user = users.find(u => u.username === req.body.username && u.password === req.body.password);
  
  if (!user) {
    return res.status(401).send("The username or password don't match");
  }

  if (user.password !== req.body.password) {
    return res.status(401).send("The username or password don't match");
  }

  res.status(201).send({
    id_token: createIdToken(user),
    access_token: createAccessToken()
  });
});

router.get("/users",  getAllUsers);
router.put("/user/:id",  updateAUser);
router.delete("/user/:id", deleteAUser);

module.exports = router;
