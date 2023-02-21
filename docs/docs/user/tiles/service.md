---
sidebar_position: 2
---

# Service Tile

A service tile is a generic tile that can call any Home Assistant service.

## Notes

This tile is stateless. It will only show the configured icon and text, and call the configured service when tapped. The Home Assistant Websocket API does not have a return value for service calls, so there is no way to indicate anything happening on the tile after it has been tapped.

## Screenshot
![Service Tile](/img/service_tile.png)

## Parameters
|Name|Required|Default|Description|
|---|---|---|---|
|Icon|No||An icon from the [Iconify library](https://icon-sets.iconify.design/), for example `material-symbols:lightbulb-rounded`|
|Icon Height|No|65|The desired height of the icon, in pixels by default if no unit specified. Examples: `24`, `24px`, `1.5em`|
|Service Type|Yes||Service that will be called when the tile is tapped, for example `light.toggle`|
|Target|Yes||Service target, for example `light.kitchen_table`|
|Tile Text|Yes||Text to display on the tile|
|Secondary Text|No||Additional text to display beneath the primary tile text|