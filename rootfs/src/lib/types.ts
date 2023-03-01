import type { Prisma } from "@prisma/client";

export type ExtendedConfiguration = Prisma.ConfigurationGetPayload<{include: {disableSlideShow: true, views: {include: {tiles: true}}}}>;
export type ExtendedView = Prisma.ViewGetPayload<{include: {tiles: true}}>;

export type ServiceTileConfig = {
    serviceType: string;
    target: string;
    serviceData?: object;
    icon?: string;
    iconHeight?: number;
    text: string;
    secondaryText?: string;
}

export type LightTileConfig = {
    entity: string;
    icon: string;
    iconHeight?: number;
}

export type SensorTileConfig = {
    entity: string;
}