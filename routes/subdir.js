/**
 * In order to specify a router!
 */
const express = require('express');
const router = express.Router();

const path = require('path');


router.get('^/$|index(.html)?', (req, res) => {
    // Since we are not in the same directory as the views directory, we have to use ".." to go out of the directory
    res.sendFile(path.join(__dirname,'..', 'views', 'subdir', 'index.html'));
})

router.get('/test(.html)?', (req, res) => {
    // Since we are not in the same directory as the views directory, we have to use ".." to go out of the directory
    res.sendFile(path.join(__dirname,'..', 'views', 'subdir', 'test.html'));
})


module.exports = router;