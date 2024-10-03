const Event = require('../models/Event');
const Vendor = require('../models/Vendor');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Destination folder where the uploaded images will be stored
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Generating a unique filename
    }
});

const upload = multer({ storage: storage });

const addEvent = async(req, res) => {
    try {
        const { EventType, company,price, Description} = req.body;

        const image = req.file ? req.file.filename : undefined;

        const vendor = await Vendor.findById(req.vendorId);
       
        if (!vendor) {
            res.status(404).json({ message: "Vendor not found" })
        }

        if (vendor.event.length > 0) {
            return res.status(400).json({ message: "vendor can have only one event" });
        }

        const event= new Event({
            EventType, 
            company,
            price,
         Description,
            image,
            vendor: vendor._id
        })

        const savedEvent = await event.save();
        vendor.event.push(savedEvent)
        await vendor.save()
         return res.status(200).json({message:"event added successfully!!!"})
        
    
    } catch (error) {
        console.error(error)
        res.status(500).json("intenal server error")
    }
}



const deleteEventById = async(req, res) => {
    try {
        const eventId = req.params.eventId;

        const deletedEvent = await Event.findByIdAndDelete(eventId);

        if (!deletedEvent) {
            return res.status(404).json({ error: "No event found" })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" })
    }
}
        

module.exports = { addEvent: [upload.single('image'), addEvent], deleteEventById}
    