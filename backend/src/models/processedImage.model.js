import mongoose from "mongoose";

const processedImageSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    upload: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Upload",
      required: true,
      index: true,
    },
    backgroundColour: {
      type: String,
      enum: ["white", "light_blue", "grey", "custom"],
      default: "white",
    },
    photoSizePreset: {
      type: String,
      enum: ["35x45", "51x51", "33x48", "40x60", "2x2in"],
      required: true,
    },
    outputUrl: {
      type: String,
      required: true,
      trim: true,
    },
    widthPx: {
      type: Number,
      min: 1,
    },
    heightPx: {
      type: Number,
      min: 1,
    },
    dpi: {
      type: Number,
      min: 1,
    },
    status: {
      type: String,
      enum: ["queued", "processing", "completed", "failed"],
      default: "queued",
      index: true,
    },
    processingTimeMs: {
      type: Number,
      min: 0,
    },
    errorMessage: {
      type: String,
      default: null,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

processedImageSchema.index({ user: 1, upload: 1, createdAt: -1 });

const ProcessedImage = mongoose.model("ProcessedImage", processedImageSchema);

export default ProcessedImage;
