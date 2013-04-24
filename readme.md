NudgePad
========

NudgePad is a tool for prototyping. We are actively developing NudgePad
and are breaking things a little too much. For that we apologize, but
we want to get it right for version 1.0. A release date for version 1.0
has not yet been finalized, but will be sometime in 2013.

Try it
======

Try it now at http://nudgepad.com

Requirements
============

Nudgepad currently works (occasionally) on Mac OS X and Ubuntu.

NudgePad requires node v0.8.23 (does NOT currently work reliably with
node v0.10.x due to some proxy/websocket issues).

It also requires mon, which can easily be installed like so:

    cd ~
    git clone https://github.com/visionmedia/mon.git
    cd mon
    sudo make install

Installing
==========

If you'd like to host Nudgepad on your owner server or development machine,
follow the steps below.

    npm install nudgepad
    np start
    # Go to http://YOUR_MACHINE_HOSTNAME

All the code for Nudgepad will be stored in the node_modules/nudgepad folder.
All user, temp, and log data will be written to /nudgepad/.

Installing Development Version
==============================

If you'd like to contribute to NudgePad development, follow these steps:

    cd ~
    git clone git@github.com:nudgepad/nudgepad.git
    cd nudgepad
    make install
    np start
    # Go to http://localhost

Uninstalling
============

The following will remove the npm version:

    npm uninstall nudgepad

To remove the development version (and ALL user data) run:

    np uninstall


