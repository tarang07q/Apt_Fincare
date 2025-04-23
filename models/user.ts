import mongoose from "mongoose"
import { connectToDatabase } from "../lib/mongodb"

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  preferences: {
    currency: {
      type: String,
      default: "USD",
    },
    theme: {
      type: String,
      enum: ["light", "dark", "system"],
      default: "system",
    },
    notifications: {
      budgetAlerts: {
        type: Boolean,
        default: true,
      },
      weeklyReports: {
        type: Boolean,
        default: true,
      },
      monthlyReports: {
        type: Boolean,
        default: false,
      },
      transactionAlerts: {
        type: Boolean,
        default: true,
      },
      savingsGoalAlerts: {
        type: Boolean,
        default: true,
      },
      accountActivityAlerts: {
        type: Boolean,
        default: true,
      },
    },
  },
  lastLogin: {
    type: Date,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
})

// Add index for faster queries
UserSchema.index({ email: 1 })

// Create a function to get the User model with an established connection
export async function getUserModel() {
  await connectToDatabase()
  return mongoose.models.User || mongoose.model("User", UserSchema)
}

// For backward compatibility, still export the User model directly
// but with a safer initialization
let User: any
try {
  // Try to get the model if it exists
  User = mongoose.models.User || mongoose.model("User", UserSchema)
} catch (error) {
  // If there's an error, we'll need to use the async function instead
  User = {
    findOne: async (...args: any[]) => {
      const model = await getUserModel()
      return model.findOne(...args)
    },
    findById: async (...args: any[]) => {
      const model = await getUserModel()
      return model.findById(...args)
    },
    find: async (...args: any[]) => {
      const model = await getUserModel()
      return model.find(...args)
    },
    create: async (...args: any[]) => {
      const model = await getUserModel()
      return model.create(...args)
    },
    updateOne: async (...args: any[]) => {
      const model = await getUserModel()
      return model.updateOne(...args)
    },
    deleteOne: async (...args: any[]) => {
      const model = await getUserModel()
      return model.deleteOne(...args)
    }
  }
}

export { User }

