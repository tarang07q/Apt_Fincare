import mongoose from "mongoose"

const BudgetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Category is required"],
  },
  amount: {
    type: Number,
    required: [true, "Budget amount is required"],
    min: [0.01, "Budget amount must be greater than 0"],
  },
  period: {
    type: String,
    enum: ["daily", "weekly", "monthly", "quarterly", "yearly"],
    default: "monthly",
    required: [true, "Budget period is required"],
  },
  startDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  endDate: {
    type: Date,
  },
  rollover: {
    enabled: {
      type: Boolean,
      default: false,
    },
    amount: {
      type: Number,
      default: 0,
    },
  },
  alerts: {
    enabled: {
      type: Boolean,
      default: true,
    },
    threshold: {
      type: Number,
      default: 80, // percentage
      min: [1, "Threshold must be at least 1%"],
      max: [100, "Threshold cannot exceed 100%"],
    },
    notificationMethod: {
      type: String,
      enum: ["email", "push", "both", "none"],
      default: "both",
    },
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [500, "Notes cannot exceed 500 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
})

// Add compound index for faster queries
BudgetSchema.index({ userId: 1, category: 1, period: 1 })
BudgetSchema.index({ userId: 1, startDate: -1 })

// Add pre-save hook to update the updatedAt field
BudgetSchema.pre("save", function (next) {
  this.updatedAt = new Date()
  next()
})

export const Budget = mongoose.models.Budget || mongoose.model("Budget", BudgetSchema)

