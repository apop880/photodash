---
sidebar_position: 1
---

# Light Tile

A light tile turns a light on or off.

## Notes

Pressing the tile will toggle the configured entity. The tile will display the friendly name of the entity, and the state. If the entity is on and it is a light that supports brightness, it will show the current brightness percentage in place of the state.

While this is called a light tile, it can technically be used for any toggleable entity (switch, input_boolean).

## Screenshot
![Light Tile](/img/light_tile.png)

## Parameters
|Name|Required|Default|Description|
|---|---|---|---|
|Icon|Yes||An icon from the [Iconify library](https://icon-sets.iconify.design/), for example `material-symbols:lightbulb-rounded`|
|Icon Height|No|65|The desired height of the icon, in pixels by default if no unit specified. Examples: `24`, `24px`, `1.5em`|
|Entity|Yes||Entity ID this tile will control, for example `light.kitchen_table`|