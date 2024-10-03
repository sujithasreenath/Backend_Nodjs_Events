const mongoose =require('mongoose');

const eventSchema = new mongoose.Schema({
   EventType: {
        type:[
            {
                type:String,
                enum: ['Conferences','Birthday-Parties','Festivals','Product-launches','Sports-Events']
            }
        ]
    },
    company: {
        type:String,
        required:true
    },
    image :{
        type:String
    },
    price:{
        type:Number,
        required:true
    },
    Description :{
        type:String
    },
    vendor: [
        {
            type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor'
    }
]
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;

