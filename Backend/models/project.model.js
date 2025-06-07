import mongoose from "mongoose";

const nodeSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },

    type: {
      type: String,
      required: true,
      enum: ['text', 'question', 'apiCall', 'decision', 'input'],
    },

  
    subtype: {
      type: String,
      required: false,
      enum: [
        'greeting',          // for type: text
        'farewell',          // for type: text
        'multiple-choice',   // for type: question
        'yes-no',            // for type: question
        'http',              // for type: apiCall
        'db-query',          // for type: apiCall
        'if-else',           // for type: decision
        'user-input',        // for type: input
        'date-picker',       // etc...
        'custom',            // fallback
      ],
    },

    position: {
      x: { type: Number, required: true },
      y: { type: Number, required: true },
    },

    data: {
      label: { type: String },
      content: { type: String },
      properties: {
        type: mongoose.Schema.Types.Mixed,
        default: {},
      },
    },
  },
  { _id: false }
);


const edgeSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    source: { type: String, required: true },
    target: { type: String, required: true },
    label: { type: String },
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
      },
    ],
    fileTree: {
      type: fileTreeSchema,
      default: () => ({ nodes: [], edges: [] }),
    },
    usage: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Project = mongoose.model("project", projectSchema);

export default Project;
