---
sidebar_position: 2
description: Basic settings for your dashboards
---

# Configuration Management

A configuration defines a group of basic settings for Photodash. You can create as many configurations as you would like, and you can reuse a single configuration on as many devices as you would like. To begin, click on Create New. You'll be presented with the following screen:

![New Configuration Screenshot](/img/config.png)

## Configuration Options
### Configuration Name
Give your configuration a unique name. *(Required)*
### Clock Format
If you want to display a clock and the current date in the upper left corner of the dashboard, select either a 12-hour or 24-hour format clock here.
### Weather Entity
This dropdown will populate with any weather entities you have configured in Home Assistant. If you would like the current weather conditions and upcoming forecast to show in this Photodash configuration, select the entity from the dropdown.
### Background Music Entity
This dropdown will populate with any input boolean entities you have configured in Home Assistant. If you would like to enable the background music player, select an input boolean that Photodash will monitor to control turning the music on and off.
### Background Music File
URL for the music file you would like to play. When the input boolean is turned on, the file will start playing from the beginning. When the input boolean is turned off, the music will stop. The input boolean will also automatically reset to off when the end of the file is reached.
### Google Photo Album
If you have configured the Google Photos integration during onboarding, your Google albums should be listed in the dropdown here. Select one to use as the source of slideshow photos for this configuration. Photodash will play a slideshow of photos from this album on a continuous, randomized loop, and will automatically process any additions or removals of photos from the album.  
:::tip

Choose an album that only contains photos. Photodash will currently try to load video clips that are in a Google album, but they will just display in the background slideshow as the clip preview with an unclickable play button overlaid.

:::
### Use Local Photos
If you are using the Home Assistant add-on and don't want to use the Google Photos integration, you can check this box. Any photos you place in `/share/photodash/configurationName` will be used as the slideshow source. Photodash will play a slideshow of photos from this folder on a continuous, randomized loop, and will automatically process any additions or removals of photos from the folder.  
:::tip

Only place photos in the folder. Photodash does not currently do any file type filtering for the local photos integration. You can use any image file format supported by a web browser, but if you put a file of another format into the folder, Photodash will not know what to do with it (in all likelhood, the slideshow will just be blank when it comes across that file).

:::

### Disable Slideshow on Entity States
If you would like to disable the slideshow in certain cases, such as when nobody is home, rooms are unoccupied, or people are sleeping, you can add those conditions here. If any of the listed conditions match, the slideshow will be disabled for this configuration.

## Editing Existing Configurations
On the main Photodash administration screen, you can click the Edit button to modify any of the above settings for an existing configuration. In future versions, you'll also be able to clone an existing configuration or delete a configuration you know longer need.