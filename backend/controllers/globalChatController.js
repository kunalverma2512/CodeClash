import Message from "../models/MessageModel.js";


export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find({})
      .populate("sender", "name profilePicture _id")
      .sort({ sentAt: 1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch messages" });
  }
};

export const saveMessage = async (content, senderId) => {
  const newMessage = new Message({
    content,
    sender: senderId,
  });
  return await newMessage.save();
};
