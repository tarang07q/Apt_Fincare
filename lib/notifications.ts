import { User } from "../models/user"

// Types of notifications
export enum NotificationType {
  BUDGET_ALERT = "BUDGET_ALERT",
  TRANSACTION_ALERT = "TRANSACTION_ALERT",
  SAVINGS_GOAL_ALERT = "SAVINGS_GOAL_ALERT",
  ACCOUNT_ACTIVITY_ALERT = "ACCOUNT_ACTIVITY_ALERT",
  WEEKLY_REPORT = "WEEKLY_REPORT",
  MONTHLY_REPORT = "MONTHLY_REPORT",
}

// Interface for notification data
export interface NotificationData {
  title: string
  message: string
  type: NotificationType
  data?: any
}

/**
 * Send a notification to a user if they have the corresponding notification type enabled
 * In a real application, this would send an email, push notification, etc.
 * For this demo, we'll just log to the console
 */
export async function sendNotification(userId: string, notification: NotificationData): Promise<boolean> {
  try {
    // Get user preferences
    const user = await User.findById(userId)
    
    if (!user || !user.preferences || !user.preferences.notifications) {
      console.log(`Cannot send notification to user ${userId}: User not found or no notification preferences`)
      return false
    }
    
    // Check if the user has this notification type enabled
    const { notifications } = user.preferences
    
    let isEnabled = false
    
    switch (notification.type) {
      case NotificationType.BUDGET_ALERT:
        isEnabled = notifications.budgetAlerts
        break
      case NotificationType.TRANSACTION_ALERT:
        isEnabled = notifications.transactionAlerts
        break
      case NotificationType.SAVINGS_GOAL_ALERT:
        isEnabled = notifications.savingsGoalAlerts
        break
      case NotificationType.ACCOUNT_ACTIVITY_ALERT:
        isEnabled = notifications.accountActivityAlerts
        break
      case NotificationType.WEEKLY_REPORT:
        isEnabled = notifications.weeklyReports
        break
      case NotificationType.MONTHLY_REPORT:
        isEnabled = notifications.monthlyReports
        break
      default:
        isEnabled = true
    }
    
    if (!isEnabled) {
      console.log(`Notification of type ${notification.type} is disabled for user ${userId}`)
      return false
    }
    
    // In a real application, this would send an actual notification
    // For now, we'll just log it
    console.log(`Sending notification to user ${userId}:`, {
      title: notification.title,
      message: notification.message,
      type: notification.type,
      timestamp: new Date().toISOString(),
    })
    
    return true
  } catch (error) {
    console.error("Error sending notification:", error)
    return false
  }
}

/**
 * Send a budget alert notification
 */
export async function sendBudgetAlert(userId: string, budgetName: string, currentSpending: number, budgetLimit: number, currency: string): Promise<boolean> {
  const percentUsed = Math.round((currentSpending / budgetLimit) * 100)
  
  return sendNotification(userId, {
    title: "Budget Alert",
    message: `You've used ${percentUsed}% of your ${budgetName} budget (${currency}${currentSpending} of ${currency}${budgetLimit})`,
    type: NotificationType.BUDGET_ALERT,
    data: {
      budgetName,
      currentSpending,
      budgetLimit,
      percentUsed,
      currency,
    },
  })
}

/**
 * Send a transaction alert notification
 */
export async function sendTransactionAlert(userId: string, transactionType: string, amount: number, category: string, currency: string): Promise<boolean> {
  const action = transactionType === "income" ? "received" : "spent"
  
  return sendNotification(userId, {
    title: "Transaction Alert",
    message: `You ${action} ${currency}${amount} in ${category}`,
    type: NotificationType.TRANSACTION_ALERT,
    data: {
      transactionType,
      amount,
      category,
      currency,
    },
  })
}

/**
 * Send an account activity alert notification
 */
export async function sendAccountActivityAlert(userId: string, activity: string, details: string): Promise<boolean> {
  return sendNotification(userId, {
    title: "Account Activity Alert",
    message: `${activity}: ${details}`,
    type: NotificationType.ACCOUNT_ACTIVITY_ALERT,
    data: {
      activity,
      details,
    },
  })
}

/**
 * Send a savings goal alert notification
 */
export async function sendSavingsGoalAlert(userId: string, goalName: string, currentAmount: number, targetAmount: number, currency: string): Promise<boolean> {
  const percentComplete = Math.round((currentAmount / targetAmount) * 100)
  
  return sendNotification(userId, {
    title: "Savings Goal Alert",
    message: `You're ${percentComplete}% of the way to your ${goalName} goal (${currency}${currentAmount} of ${currency}${targetAmount})`,
    type: NotificationType.SAVINGS_GOAL_ALERT,
    data: {
      goalName,
      currentAmount,
      targetAmount,
      percentComplete,
      currency,
    },
  })
}
