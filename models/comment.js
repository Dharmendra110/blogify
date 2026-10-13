import mongoose, { Schema } from "mongoose";

const commentSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },

    blogId: {
      type: Schema.Types.ObjectId,
      ref: "blog",
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true },
);

const commentModel = mongoose.model("comment", commentSchema);

export default commentModel;
