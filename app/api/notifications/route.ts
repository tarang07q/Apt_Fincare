import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../lib/mongodb";
import { Notification } from "../../../models/notification";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route"; // Adjust path if needed

export async function GET(request: Request) {
  await connectToDatabase();
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ notifications: [] }, { status: 401 });
  }

  const notifications = await Notification.find({ userId: session.user.id })
    .sort({ date: -1 })
    .lean();

  return NextResponse.json({ notifications }, { status: 200 });
}
