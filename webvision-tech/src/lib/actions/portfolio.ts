"use server";

import clientPromise from "@/lib/mongodb";
import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";


export async function addProject(data: any) {
  try {
    const client = await clientPromise;
    const db = client.db("webvision_db");
    
    await db.collection("projects").insertOne({
      ...data,
      createdAt: new Date(),
    });

    revalidatePath("/portfolio"); // Refresh the portfolio page data
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to add project" };
  }
}

export async function getProjects() {
  try {
    const client = await clientPromise;
    const db = client.db("webvision_db");
    const projects = await db.collection("projects").find({}).sort({ createdAt: -1 }).toArray();
    return JSON.parse(JSON.stringify(projects));
  } catch (error) {
    return [];
  }
}

export async function updateProject(id: string, data: any) {
  try {
    const client = await clientPromise;
    const db = client.db("webvision_db");
    
    await db.collection("projects").updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...data, updatedAt: new Date() } }
    );

    revalidatePath("/portfolio");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Update failed" };
  }
}

export async function deleteProject(id: string) {
  try {
    const client = await clientPromise;
    const db = client.db("webvision_db");
    
    await db.collection("projects").deleteOne({ _id: new ObjectId(id) });

    revalidatePath("/portfolio");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Delete failed" };
  }
}