import mongoose from "mongoose"
import { connectToDatabase } from "../lib/mongodb"

const TransactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  amount: {
    type: Number,
    required: [true, "Amount is required"],
    min: [0.01, "Amount must be greater than 0"],
  },
  type: {
    type: String,
    enum: ["expense", "income", "transfer"],
    required: [true, "Transaction type is required"],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Category is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true,
    maxlength: [200, "Description cannot exceed 200 characters"],
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ["cash", "credit_card", "debit_card", "bank_transfer", "mobile_payment", "other"],
    default: "other",
  },
  tags: [
    {
      type: String,
      trim: true,
    },
  ],
  recurring: {
    isRecurring: {
      type: Boolean,
      default: false,
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly", "none"],
      default: "none",
    },
    endDate: {
      type: Date,
    },
  },
  location: {
    type: String,
    trim: true,
  },
  originalCurrency: {
    type: String,
    default: "USD",
  },
  originalAmount: {
    type: Number,
  },
  attachments: [
    {
      name: String,
      url: String,
      type: String,
    },
  ],
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
TransactionSchema.index({ userId: 1, date: -1 })
TransactionSchema.index({ userId: 1, category: 1 })
TransactionSchema.index({ userId: 1, type: 1 })

// Add pre-save hook to update the updatedAt field
TransactionSchema.pre("save", function (next) {
  this.updatedAt = new Date()
  next()
})

// Create a function to get the Transaction model with an established connection
export async function getTransactionModel() {
  await connectToDatabase()
  return mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema)
}

// For backward compatibility, still export the Transaction model directly
// but with a safer initialization
let Transaction: any
try {
  // Try to get the model if it exists
  Transaction = mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema)
} catch (error) {
  // If there's an error, we'll need to use the async function instead
  Transaction = {
    findOne: async (...args: any[]) => {
      const model = await getTransactionModel()
      return model.findOne(...args)
    },
    findById: async (...args: any[]) => {
      const model = await getTransactionModel()
      return model.findById(...args)
    },
    find: async (...args: any[]) => {
      const model = await getTransactionModel()
      return model.find(...args)
    },
    create: async (...args: any[]) => {
      const model = await getTransactionModel()
      return model.create(...args)
    },
    updateOne: async (...args: any[]) => {
      const model = await getTransactionModel()
      return model.updateOne(...args)
    },
    deleteOne: async (...args: any[]) => {
      const model = await getTransactionModel()
      return model.deleteOne(...args)
    },
    findByIdAndUpdate: async (...args: any[]) => {
      const model = await getTransactionModel()
      return model.findByIdAndUpdate(...args)
    },
    aggregate: async (...args: any[]) => {
      const model = await getTransactionModel()
      return model.aggregate(...args)
    }
  }
}

export { Transaction }

