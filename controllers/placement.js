import PlacementModel from "../models/placement.js";


const createPlacement = async(req,res)=>{
    try {
        const { name, startDate, endDate, companies, participants, interviews } = req.body;
    
        const newDrive = new PlacementModel({
          name,
          startDate,
          endDate,
          companies, 
          participants, 
          interviews, 
        });
    
        await newDrive.save();
        res.status(201).send({
             message: 'Placement drive created successfully', 
             data: newDrive 
            });
      } catch (error) {
        res.status(500).send({
             error: 'Failed to create placement drive', details: error.message
             });
      }
}


const getAllPlacement = async (req, res) => {
  try {
      const drives = await PlacementModel.find()
          .populate('companies','companyName')
          .populate('participants', 'name')
          .populate('interviews') 
          .exec();

      res.status(200).send({
          message: "Data fetch successfully",
          data: drives
      });
  } catch (error) {
      console.error('Error fetching placement drives:', error); 
      res.status(500).send({
          message: 'Failed to fetch placement drives',
          error: error.message 
      });
  }
};

export default{
    createPlacement,
    getAllPlacement
}