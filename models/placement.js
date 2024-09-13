import mongoose from 'mongoose'

const placementSchema = new mongoose.Schema({
     name:{ 
        type: String,
        required: true 
     },
     startDate:{ 
        type: Date,
        required: true 
    },
    endDate:{ 
        type: Date, 
        required: true 
    }, 
    companies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true 
    }],
    participants:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true 
    }],
    interviews:[{
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Interview' 
  }]
},{
    collection:'Placement',
    versionKey:false
});

const PlacementModel = new mongoose.model('Placement',placementSchema)

export default PlacementModel