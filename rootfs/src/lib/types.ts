import type { Prisma } from "@prisma/client";

export type ExtendedConfiguration = Prisma.ConfigurationGetPayload<{include: {disableSlideShow: true, views: {include: {tiles: true}}}}>;
export type ExtendedView = Prisma.ViewGetPayload<{include: {tiles: true}}>;

export type ServiceCardConfig = {
    serviceType: string;
    target: string;
    serviceData?: object;
    icon?: string;
    text: string;
    secondaryText?: string;
}