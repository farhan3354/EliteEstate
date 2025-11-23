import TestModel from "./../models/testModel.js";

export const postForm = (req, res) => {
  try {
    const { name, message } = req.body;
    if (!name || !message) {
      return res.status(409).json("All the feilds are required");
    }
    const test = TestModel.create({
      name,
      message,
    });
    return res.status(201).json("Record is created successfully");
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const getRecord = (req, res) => {
  try {
    const record = TestModel.find();
    return res.status(200).json(record);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const getIdRecord = (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json("Id is required to serach the id record");
    }
    const record = TestModel.findById(
      id,
      {
        name,
        message,
      },
      { new: true }
    );
    if (!record) {
      return res.status(404).json("No record in the database");
    }
    return res.status(200).json(record);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const deleteRecord = (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json("Id is required to serach the id record");
    }
    const record = TestModel.findByIdAnddelete(id);
    return res.status(201).json({ message: "Record deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
