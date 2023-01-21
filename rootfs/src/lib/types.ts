import type { Prisma } from "@prisma/client";

export type ExtendedConfiguration = Prisma.ConfigurationGetPayload<{include: {disableSlideShow: true}}>;