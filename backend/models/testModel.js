import mongoose from "mongoose";

const testSchema = new mongoose.Schema(
  {
    name: { String },
    message: { String },
  },
  { timestamps: true }
);

const TestModel = new mongoose.model("testmodel", testSchema);
export default TestModel;
