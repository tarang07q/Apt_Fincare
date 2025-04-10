import mongoose from "mongoose"

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Category name is required"],
    trim: true,
    maxlength: [50, "Category name cannot exceed 50 characters"],
  },
  icon: {
    type: String,
    default: "tag",
    trim: true,
  },
  color: {
    type: String,
    default: "#6366f1",
    match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Please enter a valid hex color code"],
  },
  type: {
    type: String,
    enum: ["expense", "income", "both"],
    required: [true, "Category type is required"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    default: null,
  },
  description: {
    type: String,
    trim: true,
    maxlength: [200, "Description cannot exceed 200 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

// Add compound index for faster queries
CategorySchema.index({ userId: 1, type: 1 })
CategorySchema.index({ userId: 1, name: 1 }, { unique: true })

// Add pre-save hook to update the updatedAt field
CategorySchema.pre("save", function (next) {
  this.updatedAt = new Date()
  next()
})

export const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema)

