import prisma from '$lib/prisma'
import { json } from '@sveltejs/kit'

export async function GET() {
    let hassBaseUrl = await prisma.baseSettings.findFirst({where: {param: 'hassBaseUrl'}})
    let token = await prisma.baseSettings.findFirst({where: {param: 'token', value: {not: ''}}})
    
    return json({hassBaseUrl: hassBaseUrl?.value, token: token?.value ?? null})
  }