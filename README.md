## Cinnamon applet skeleton

This repo contains a skeleton for a Cinnamon applet. Cinnamon applets are small JavaScript-based applications that can
display information and perform some actions. If you need to build an applet that displays and updates information on
the Cinnamon panel, just pick one of the following solutions of your choice.

- [class-based](class-based/your-project@username/)
- [prototype-based](prototype-based/your-project@username/)


## Explanations

Because it was relatively hard to find information about how the mainloop and visual update are working with Cinnamon
applets, I created this repository. The repository contains an example of a `counter` applet. Its key feature is that
at some point it stops the execution and clear the `timeout id` in a "correct" way. Unlike most of the other examples,
the `timeout id` is always an `integer` and never a `null` value. This decision avoids unnecessary null checks. The
counter can be restarted by clicking on it or by changing its settings.

This example uses the classic `Mainloop.timeout_add` approach. Some modern applets are based on the `Util.setInverval` approach, which is more concise but less controllable. So, I found it interesting to share my experience with the `mainloop`.


## How to use it

If you want to develop an applet on top of this skeleton, pick a version you prefer. Copy the top level folder `your-project@username` to a new localtion. Rename both `your-project@username` folder and update all the necessary
files, including `info.json`, `screenshot.png`, `metadata.json`, `settings-schema.json`. Don't forget to rename the
`YourProjectApplet` class or function, depending on your choice.

If you want to test the applet locally, pick a version your prefer. Copy the bottom level folder `your-project@username`
to the `~/.local/share/cinnamon/applets` folder. Rename the copied folder and update all the necessary files, including
`info.json`, `metadata.json`, `settings-schema.json`. Then, click on the panel, pick applets and enable the applet. After making any changes into the applet's code, don't forget to restart Cinnamon (`Alt+F2` then `r`).

This repository is not a tutorial. If you need more information about how to create Cinnamon applets, I would recommend
reading these material to get a better grasp on the topic:
- [Writing an applet on Linux Mint Community Wiki](https://mintguide.miraheze.org/wiki/Development:Writing_an_applet)
- [Writing a Cinnamon applet by Nick Durante](https://nickdurante.github.io/development/Writing-a-Cinnamon-Applet/)
- [Cinnamon Applet Development](https://github.com/linuxmint/cinnamon-spices-applets/blob/master/fish%40kriegcc/docs/DEVELOPMENT.md)


## License

The GNU General License v3.0 (GPLv3). Cinnamon applets are primarily licensed under this license.