import clientPromise from "@/lib/mongodb";
import { formatMongoConnectionError } from "@/lib/mongoConnectionError";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // 1. Attempt to connect using the singleton utility we created
    const client = await clientPromise;
    
    // 2. Access a test database (it doesn't need to exist yet)
    const db = client.db("admin");
    
    // 3. Run a "ping" command - the most basic way to check connectivity
    const result = await db.command({ ping: 1 });
    
    return NextResponse.json({
      success: true,
      status: "Titan Online",
      message: "Successfully authenticated with MongoDB Atlas.",
      payload: result
    });
  } catch (error: unknown) {
    console.error("Database connection error:", error);
    return NextResponse.json({
      success: false,
      status: "Connection Failed",
      error: formatMongoConnectionError(error),
    }, { status: 500 });
  }
}