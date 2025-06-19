import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  sentAt: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model("Message", messageSchema);
export default Message;
