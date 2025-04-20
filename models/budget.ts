import mongoose from "mongoose"
import { connectToDatabase } from "../lib/mongodb"

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

// Create a function to get the Budget model with an established connection
export async function getBudgetModel() {
  await connectToDatabase()
  return mongoose.models.Budget || mongoose.model("Budget", BudgetSchema)
}

// For backward compatibility, still export the Budget model directly
// but with a safer initialization
let Budget: any
try {
  // Try to get the model if it exists
  Budget = mongoose.models.Budget || mongoose.model("Budget", BudgetSchema)
} catch (error) {
  // If there's an error, we'll need to use the async function instead
  Budget = {
    findOne: async (...args: any[]) => {
      const model = await getBudgetModel()
      return model.findOne(...args)
    },
    findById: async (...args: any[]) => {
      const model = await getBudgetModel()
      return model.findById(...args)
    },
    find: async (...args: any[]) => {
      const model = await getBudgetModel()
      return model.find(...args)
    },
    create: async (...args: any[]) => {
      const model = await getBudgetModel()
      return model.create(...args)
    },
    updateOne: async (...args: any[]) => {
      const model = await getBudgetModel()
      return model.updateOne(...args)
    },
    deleteOne: async (...args: any[]) => {
      const model = await getBudgetModel()
      return model.deleteOne(...args)
    },
    findByIdAndUpdate: async (...args: any[]) => {
      const model = await getBudgetModel()
      return model.findByIdAndUpdate(...args)
    },
    aggregate: async (...args: any[]) => {
      const model = await getBudgetModel()
      return model.aggregate(...args)
    }
  }
}

export { Budget }

