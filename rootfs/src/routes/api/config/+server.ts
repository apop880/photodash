import { json } from "@sveltejs/kit";
import prisma from '$lib/prisma'

export async function GET() {
    let body = await prisma.configuration.findMany();
    
    return json(body)
  }