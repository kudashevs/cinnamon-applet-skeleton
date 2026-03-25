## Cinnamon applet skeleton

This repo contains a skeleton for a Cinnamon applet. Cinnamon applets are small JavaScript-based applications that can
display information and perform some actions. If you need to build an applet that displays and updates information on
the Cinnamon panel, just pick one of the following solutions of your choice.

- [class-based](class-based/your-project@username/)
- [prototype-based](prototype-based/your-project@username/)


## Explanations

Because it was relatively hard to find information about how the mainloop and information update are working with Cinnamon
applets, I created this repository. The repository contains an example of a `counter` app. The key feature of the app is
that at some point it stops its execution and clear the `timeout id` in a "correct" way. Unlike most of the other examples, the `timeout id` is always an `integer` and never a `null` value. This decision avoids unnecessary null checks.

The example uses the classic `mainloop` approach. Some modern applets are based on the `Util.setInverval` approach,
which is more concise but less controllerd. So, I found it interesting to share my experience with the mainloop.


## License

The GNU General License v3.0 (GPLv3). Cinnamon applets are primarily licensed under this license.