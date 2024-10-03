const eventController = require('../controllers/eventController');
const express = require('express');
const verifytoken = require('../middleware/verifytoken');

const router =express.Router();

router.post('/add-event', verifytoken, eventController.addEvent);

router.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.headersSent('Content-Type','image/jpeg');
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName));

});

router.delete('/:eventId', eventController.deleteEventById);

module.exports = router;