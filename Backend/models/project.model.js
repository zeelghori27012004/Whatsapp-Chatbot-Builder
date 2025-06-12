import mongoose from "mongoose";

const nodeSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },

    type: {
      type: String,

      ],
      required: true,
    },

    position: {
      x: { type: Number, required: true },
      y: { type: Number, required: true },
    },

    data: {
      label: { type: String },
      content: { type: String },
      // quickReplies: [{ type: String }], // For WhatsApp buttons / reply options
      media: {
        url: { type: String },
        type: { type: String, enum: ["image", "video", "audio", "document"] },
      },
      properties: {
        type: mongoose.Schema.Types.Mixed,
        default: {},
      },
    },

    // data: {
    //   label: { type: String },
    //   content: { type: String },
    //   properties: {
    //     type: mongoose.Schema.Types.Mixed,
    //     default: {},
    //   },
    // },
  },
  { _id: false }
);

const edgeSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    source: { type: String, required: true },
    target: { type: String, required: true },
    label: { type: String },
    condition: { type: mongoose.Schema.Types.Mixed },
    animated: { type: Boolean, default: false },
  },
  { _id: false }
);

const fileTreeSchema = new mongoose.Schema(
  {
    nodes: { type: [nodeSchema], default: [] },
    edges: { type: [edgeSchema], default: [] },
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      lowercase: true,
      required: true,
      trim: true,
      unique: [true, "Project name must be unique"],
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true 
      },
    ],
    fileTree: {
      type: fileTreeSchema,
      default: () => ({ nodes: [], edges: [] }),
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    usage: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Project = mongoose.model("project", projectSchema);

export default Project;
