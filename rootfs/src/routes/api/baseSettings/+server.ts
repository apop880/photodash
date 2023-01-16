import prisma from '$lib/prisma'

export async function GET() {
    let body = await prisma.baseSettings.findFirst({where: {param: 'hassBaseUrl'}})
    
    return new Response(body?.value)
  }