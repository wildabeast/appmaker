NudgePad
========

NudgePad let's you build websites and apps in your browser.

NudgePad is currently in BETA and still changing rapidly. We welcome you to use it
but the API is still largely undocumented and in flux.

A stable version 1.0 will be released at some point in late 2013.

Try it
======

Try it now at http://nudgepad.com

Who is NudgePad for?
====================

Anyone who wants to make things on the web!

What Can I Make with NudgePad?
===============================

A lot of things! NudgePad gives you a whole operating system of tools for building right
in your browser. Not only do you have full control of the frontend, but each NudgePad site is a Node.js
Express App on the backend, so you can add any server side code you'd like.

Early users are building clickable prototypes, mobile apps, FirefoxOS apps, websites, blogs, CMS sites, single pagers,
personal homepages, forms, surveys, small business sites, mobile sites, presentations, infographics, landing pages, ab tests
mindmaps, memes, ecards, ecommerce stores and more.

Early Examples of NudgePad Powered Sites
========================================

Here are some of the first sites powered by NudgePad. Want to add yours to the list? Email breck@nudgepad.com

- Blog: http://breckyunits.com/
- Small Business Site: http://octaviachambliss.com/
- Book Site: http://generationatheistbook.com/
- Personal Homepage: http://benzulauf.com/

Building a Site with NudgePad
=============================

Documentation for how to build your site using NudgePad is coming soon.

Requirements
============

NudgePad currently works (with some difficulty) on Mac OS X and Ubuntu.

NudgePad requires node v0.8.23 (does NOT currently work reliably with
node v0.10.x due to some proxy/websocket issues).

It also requires mon, which can easily be installed like so:

    cd ~
    git clone https://github.com/visionmedia/mon.git
    cd mon
    sudo make install

Occasionally you'll need to update your environment's PATH variable to make
sure that the node_modules/.bin folder is included. For example, you may need
to add this to your .bash_profile or .bashrc:

    PATH=$PATH:~/node_modules/.bin

NudgePad consists of a control panel Express app running on port 3000, user
sites which run on ports 3001 - 8000, and an http-proxy app which sits in front
of all of those on port 80. You can access the control panel app by going to
http://localhost/, or if it's running on a production server by going to
http://YOURHOSTNAME/. The panel app let's you instantly create more sites
that have a domain name like *.localhost on localhost, or *.YOURHOSTNAME on a
production server. If you are not running on localhost, be sure to update the
hostname of your machine to match the machine's DNS name, and you'll want
to create a CNAME or A Record in your DNS to point *.YOURHOSTNAME to the
machine's IP or DNS.

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
    ./install.sh
    # Now reload your bash_profile to get the npm command
    source ~/.bash_profile
    npd start
    # Go to http://localhost

Uninstalling
============

The following will remove the npm version:

    npm uninstall nudgepad

To remove the development version (and ALL user data) run:

    # Warning: this deletes ALL user data!
    npd uninstall

Contributing
============

Want to get involved? Email breck@nudgepad.com

We encourage you to use NudgePad, create issues for bugs or ideas, contribute templates, and
of course contribute code!

Writing Code for NudgePad
=========================

Our development strategy is to make things as modular as possible.

Ideally, every component is a git repo that we don't maintain.

However, user experience is paramount and so if there isn't something that fits our needs
well enough, we write code.

Oftentimes we write code and then find a package that solves the problem we were writing
code to solve. When that happens, we delete our code as fast as we can and switch to
someone else's module.

If you are developing a component for NudgePad, this approach is usually best:

- Independent repo. Create a new repo with an MIT license (or better)
- NudgePad first. Design your code toward the NudgePad API first. Don't worry about
packaging it as a plugin for other repos. At some point if your code is used in external
products, great, but make it work well for NudgePad first!
- demo.html. Create a demo.html file so you can play with your code outside of NudgePad. If
it's an npm module, create a similar feature so there is some tiny instant way to play
with it outside of NudgePad.
- Unit tests. Add unit tests for your code.
- Continuous integration. Ideally your test suite will be run by Travis or some other system
when you push it.

Overview of the Codebase
========================

NudgePad makes extensive use of the Space language (https://github.com/nudgepad/space) and
the Scraps HTML language built on top of Space (https://github.com/nudgepad/scraps).

NudgePad also makes extensive use of Node.js, jQuery, and the Express ecosystems.

Beyond that, there are three main parts of NudgePad to familiarize yourself with.

client
------

The frontend to NudgePad. This code does pretty much one thing: creates the /nudgepad single
page app which contains the whole user interface of NudgePad.

(Note: We have a lot of cleanup to do here!)

We use libraries here such as jQuery, underscore, scraps, and Space, and a whole lot of
specific packages for UI and other components. If you think we could benefit from using
an open source package you wrote or know of, please let us know so we can add it (and
even better delete something from our codebase!).

To create something new for client from scratch, your code should:

- Be its own standalone repo
- Be usable outside of NudgePad
- Have a live website (a NudgePad site works great) where someone can play with it
- Have unit tests
- Be 1 JS file
- Be CamelCased
- Be Concise
- Be MIT licensed or better
- Expose 1 global object that begins with a Capital Letter.

server
------

Each NudgePad site is a Node.js process powered by Express.

The API here is still being simplified a bit, but the basic pattern is to create a module that
extends the user's app like this:

    function MyModuleName (app, nudgepad) {
      app.get('/helloWorld', function (req, res, next) {
        // do something
      })
    }
    module.exports = MyModuleName

And then require that in the app.js file like this:

    require('./mymodulename.js')(app, nudgepad)

We'll probably ditch that second param, and probably move most of these server side modules
to user land.

To create something new for server from scratch, your code should:

- Be its own standalone repo
- Have a live website (a NudgePad site works great) where someone can play with it
- Have unit tests
- Be 1 JS file
- Be CamelCased
- Be Concise
- Be MIT licensed or better
- Extend the NudgePad site in a conventional way

system
------

The code in system is responsible for creating new sites on the machine, load
balancing, proxying requests to sites, and offering tools to sysadmins for
managing a NudgePad server.

It's currently written mostly in BASH, but node scripts are welcome as well.

Overview of data storage
========================

All user data is stored in /nudgepad/

NudgePad does NOT use a database. Our thoughts are a database is premature optimization for
almost all sites. There are orders of magnitude more tools and ways to work with files
in the file system than on databases. This design decision makes it easy for sites to be
a git repo, to be moved from one server to another, to be modified not only by NudgePad
but by other tools, etc.

We write user data at the root level as opposed to some nested library on your machine because c'mon, NudgePad is awesome and deserves to be up top!

The folders in /nudgepad are:

/nudgepad/active - Contains simple text files where filename is the domain and content is the port. As sites start and stop, files are created and removed.
/nudgepad/backup - Contains a backup copy of /nudgepad/sites that eschews some operational data for faster backups.
/nudgepad/logs - Contains log files for the panel server and proxy server (not individual sites!).
/nudgepad/panel - Allows you to skin the NudgePad panel look and feel.
/nudgepad/ports - Contains simple text files where filename is the port and content is the domain. As sites start and stop, files are created and removed.
/nudgepad/sites - Contains all the data for every site.
/nudgepad/temp - Contains temp files for panel and proxy.

The data for a site "foo.com" is stored in /nudgepad/sites/foo.com/ and looks like this:

includes/ - Contains Node.js code to include onstart. Currently done via eval, but we'll probably change this to a module system.
logs/ - Contains site log files.
pages/ - Contains the pages that are edited by the pages app. Encoded in Space/Scraps
posts/ - Contains blog posts for blog module. Encoded in Space.
public/ - Serves any assets. Can add any html/images/css/js etc. Normal public web folder.
settings/ - Stores site settings. Each setting is either a Space object or a one liner text file. API in flux.
surveys/ - Stores form posts encoded in Space.
temp/ - Stores temporary site data.
timelines/ - Stores diffs of pages generated by Pages app. Encoded in Space.
workers/ - Stores user records. Each user is a file encoded in Space.


Build Status
============

[![Build Status](https://travis-ci.org/nudgepad/nudgepad.png?branch=master)](https://travis-ci.org/nudgepad/nudgepad)
