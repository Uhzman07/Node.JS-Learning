const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname,'..', 'views', 'index.html'));

})

// In order to specify upon the request to get a particular page
router.get('/new-page(.html)?', (req, res) => {
    // This is used to send the new page as visited
    res.sendFile(path.join(__dirname,'..', 'views', 'new-page.html'));
})


// In order to specify a redirect on request to access an old page
router.get('/old-page(.html)?', (req, res) => {
    // Note that since it is a redirect, we do not necessarily have to specify an actual file path
    // This is used to redirect to the new page.
    res.redirect(301,'new-page.html'); // This sends a 302 by default - This is because a "302" doesn't necessarily get the search engine to change to a permanent redirect
    // What we have to do is to specify it as a 301
})

// Then to export the router
module.exports = router;