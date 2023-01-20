import type { BaseSettings } from '@prisma/client';
import prisma from '$lib/prisma';
import type { RequestHandler } from './$types';

let accessToken: string | null;
let expireDateTime = new Date();
let settings: BaseSettings | null;

export const GET = (async () => {
    if (!settings) {
      settings = await prisma.baseSettings.findFirst();
    }
    if (expireDateTime > new Date()) {
      return new Response(accessToken);
    }
    const res = await fetch("https://www.googleapis.com/oauth2/v4/token",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "client_id": settings!.googleClientId,
                "client_secret": settings!.googleClientSecret,
                "refresh_token": settings!.googleRefreshToken,
                "grant_type": "refresh_token"
            })
        })
      const data = await res.json();
      accessToken = data["access_token"];
      expireDateTime.setSeconds(new Date().getSeconds() + ((data["expires_in"] - 180) * 1000));
      return new Response(accessToken);
  }) satisfies RequestHandler