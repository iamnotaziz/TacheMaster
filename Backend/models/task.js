import mongoose from "mongoose"

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  state: { 
    type: String, 
    enum: ['ToDo', 'In Progress', 'Done', 'Canceled'], 
    default: 'ToDo' 
  },
  commercialId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }, 
  clientIds: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }], 
  feedbacks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'feedback'
  }],
  releaseDate: { 
    type: Date, 
    default: Date.now 
  },
  achievementDate: { 
    type: Date, 
    default: null 
  } 
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
