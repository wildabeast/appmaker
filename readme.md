NudgePad BETA
=============

Make websites, apps and more in your browser.

Try it
------

Try it now at http://nudgepad.com

When can I use it?
------------------

NudgePad will launch for the general public at some point in late 2013.

If you're a developer, now is a great time to get involved and help
make tools that can help you and the world reach our creative potential.

Examples of things made with NudgePad
-------------------------------------

- Blog: http://breckyunits.com/
- Small Business Site: http://octaviachambliss.com/
- Book Site: http://generationatheistbook.com/
- Personal Homepage: http://benzulauf.com/

How can I help?
---------------

At the center of the NudgePad are Tools like "Design" and "Develop" that
the community can use to create their projects.

If you're a developer, the best way to help is by building a great tool
that allows people to make something in their browsers.

Unlike apps built for consuming content, on NudgePad all tools are built
for making content. You could build a blogging tool, a drawing tool, an
image editing tool, a vector tool, or something completely new.

Once your tool is working and useful, you can submit it to the core
of NudgePad as a pull request. You could go from idea to tool to having
your pull request accepted and deployed to all NudgePad servers in less
than 24 hours. There is no "Tool Store" in NudgePad. The entire NudgePad community
has access to all tools pulled into core at all times. Our goal is
quality Tools, not quantity, and a very fast and consistent experience for
our community. We also want to enable collaboration, and have developers and
designers work together to build better tools for the community.

Creating a Tool
---------------

To go from "Idea" to "wow my tool is in all NudgePad sites", the workflow looks like this:

1. Fork NudgePad & clone to localhost
2. Create the folder and required files for your tool
3. Edit, test and refine your tool.
4. Commit and push to your fork then submit a pull request

Before creating an tool, you may want to have our contact info handy if you run into any problems:

Email: breck@nudgepad.com
Phone: 1-415-937-1984


#### Installing on Localhost

The best way to develop NudgePad is to install a copy on localhost.

NudgePad currently works best on Mac OS X and Ubuntu.

NudgePad requires node v0.8.*. NudgePad does NOT currently work reliably with
node v0.10.x due to a proxy/websocket (issue #1).

NudgePad also requires a few programs: git, imagemagick, sendmail, and mon.

To install for development on Mac OS X:

    $ cd ~
    $ git clone https://YOURFORK
    $ # see the tasks in the install folder to install required stuff
    $ npd start
    $ # Go to http://localhost

Occasionally you'll need to update your environment's PATH variable to make
sure that the node_modules/.bin folder is included. For example, you may need
to add this to your .bash_profile or .bashrc:

    PATH=$PATH:~/node_modules/.bin

#### Naming Your Tool

Getting the name right for your tool is very important. The fastest way to
choose a great name for your tool is to choose a bad name for your tool, and
then build your tool in a way that it is easy to find/replace the name later on.

Your tool name should be: unique, alphabet only, and a verb. Tools in NudgePad
are always centered around "Making" and not "Consuming", so the name should
convey what the user is going to be doing with that tool. For example, "Draw"
instead of "Pictures".

It's also important to know that your Tool Name will reserve a single word in the
NudgePad namespace. So if you name your tool "Draw", the variable Draw
will be made a global in the NudgePad client and so it shouldn't interfere with
other words.

We consciously chose to name tools this way, "polluting" the global namespace,
because we value design, increased collaboration, and simplicity over the ugly
module systems presented by other platforms.

We also value updates. We want to ensure our community that tools are constantly
being improved, refined, and tested.

#### Creating Your Tool

Tools in NudgePad are meant to be modular and sandboxed and contained in one
folder.

You can create a new tool at the command line like this:

    $ npd tool draw

This will create a folder ~/nudgepad/client/tools/draw that stores all the
files for your tool.

You'd then want to update the files tool.js and tool.space with the name
you chose.

You could also create a tool manually by replicating the basic skeleton
like this:

```
tool.js var Draw = new Tool('Draw')
 Draw.description = 'Draw and edit illustrations for your project.'
 Draw.color = 'blue'
tool.css 
tool.html 
tool.space name Draw
 html tool.html
 js tool.js
 css tool.css
```

Once your tool is created, visit http://localhost and create a new site
to see it in action.

The Launch tool should allow you to launch your tool.

As you make changes to your tool, refresh your browser to see them.

NudgePad has a build system that takes all the tools and compiles them into
a single page webappfor the user. This keeps NudgePad fast.
While developing, NudgePad will watch the tools folder for changes and will
run the build system each time.


Core Objects
------------

At this point you have created your tool and can open it in your browser. Now
you can start adding functionality to your tool.

NudgePad exposes an API that your tool can use to read and write files to the user's
project. You also have access to the latest jQuery($), and some other libraries.

Currently, the NudgePad API consists of 3 core objects:

1. Project
2. Tool
3. NudgePad

#### Project

The Project object is an instance of Space that stores all the data in the project.

To dump the Project instance from console and see what it contains:

```
Project.toString()
```

To get all the pages in a project:

```
var pages = Project.get('pages')
````

To create a new page:

```
Project.set('pages newPageName', 'h1\n content Hello World')
````

#### Tool

Each Tool is an instance of the Tool Object.

You create your tool like this:

```
var Draw = new Tool('Draw')
```

Your tool should have a few standard properties including:

```
// The background color of your Tool's button on the Launch screen
Draw.color = 'blue'
// The description of your Tool on the Launch screen
Draw.description = 'Draw something'
```

Your tool will have a few methods from the Tool prototype including:

```
// Open/Close your tool
Draw.open()
Draw.close()
Draw.restart()
```

Your tool can implement a number of standard handlers including:

```
Draw.onclose = function () {}
```

```
Draw.onopen = function () {}
```

Your tool can define and fire its own events like this:

```
Draw.on('foobar', doSomething)
Draw.trigger('foobar')
Draw.off('foobar', doSomething)
```

#### NudgePad

The NudgePad object exposes events that you can subscribe to:

```
nudgepad.on('arrive', function (who) {console.log(who + ' arrived')})
````


Other Objects
-------------

#### fs

fs is an experimental idea to provide a Node.js fs like object in the browser,
which then executes the equivalent commands on the server via ajax.

To write to a file:

```
fs.writeFile(filename, data, callback)
```

#### Launcher

Open an app

```
Launcher.open('Design')
```

#### Explorer

A simple and dumb text editor.

```
// Pop the editor
Explorer.edit('public/foobar.html')
// Create a file
Explorer.create('public/foobar.html', callback)
// Rename a file
Explorer.rename('public/foobar.html', 'public/foobar2.html', callback)
// Delete a file
Explorer.remove('public/foobar.html', callback)

```

#### TextPrompt

Like the browser's built in prompt method, but gives the user a bigger textarea for writing.

```
TextPrompt('Some textarea like thing', 'Default value', callback)
```

#### Flasher

Growl like notifications

```
Flasher.success('Your action finished')
Flasher.error('Something went wrong')
```

#### mixpanel

Track aggregate user actions to help improve the tools.

```
mixpanel.track('I did something')

// Add additional info to the stats
mixpanel.track({
  'time' : howLongItTookToCreateThisProject
})

// Note: don't add any user data. We don't want someone to be sending their data,
// just usage data so we can improve the tools.
//
// For now, to see the data, Breck needs to add you to our MixPanel account--
// just send me an email.
```


Server Side Routes
------------------

#### GET

```
// Logged in user
http://domain/nudgepad.whoami
```

```
// The domain
http://domain/nudgepad.domain
```

```
// Status info
http://domain/nudgepad.status
```

```
// Logs
http://domain/nudgepad.logs
```

```
// Restart the site
http://domain/nudgepad.restart
```

```
// Dump all the Project Data encoded as Space
http://domain/nudgepad.export
```

#### POST

(fill this in)


Appendix
========

Core Architecture Concepts
--------------------------

The first core concept in NudgePad is the Project. A user is always working on a single
project. A project is always just a single folder on the computer. There is no
database used, everything is stored on disk. Each project can have unlimited users,
and each user record is simple a file in the workers/ folder.

Projects can be tiny or huge. All projects are stored in /nudgepad/sites/.
Each Project has a name, which is also the domain name and folder name for the project.
Each project is a website, and a node.js Express app as well. Projects can
evolve into anything.

The second core concept in NudgePad is the Tool. Makers work on their project in
the browser by using Tools. Each tool is just HTML, CSS, and Javascript, that interacts
with the user's project files via some core APIs.

The third core concept in NudgePad is the Space language. As much as possible, we rely
on Space to encode and store data. Over the long term this will create a lot of
benefits for collaboration and creation.


Overview of the Codebase
------------------------

Besides the Tool and Client parts of NudgePad, there are two other core components.

server
------

Each NudgePad Project is a website--specifically an Express app running as its own process.

The API here is still being simplified a bit, but the basic pattern is to create a module that
extends the user's site like this:

    function MyModuleName (app) {
      app.get('/helloWorld', function (req, res, next) {
        // do something
      })
    }
    module.exports = MyModuleName

Any file in a Project's packages folder is expected to follow that convention and will
be included when the site starts like this:

    require('./mymodulename.js')(app)

system
------

The code in system is responsible for creating new projects on the machine, load
balancing, proxying requests to sites, and offering tools to sysadmins for
managing a NudgePad server.

It's currently written mostly in BASH, but node scripts are welcome as well.

A fully running NudgePad server consists of:

- A control panel Express app running on port 3000
- user sites which run on ports 3001 - 8000
- An http-proxy app which sits in front of all of those on port 80.

Those ports are also configurable.

Overview of data storage
------------------------

All user data is stored in /nudgepad/

NudgePad does not use a database. Our thoughts are a database is premature optimization for
almost all projects. There are orders of magnitude more tools and ways to work with files
in the file system than on databases. This design decision makes it easy for sites to be
a git repo, to be moved from one server to another, to be modified not only by NudgePad
but by other tools, etc.

We write user data at the root level as opposed to some nested library on your machine because we
believe it greatly simplifies sysadmin and debugging.

The folders in /nudgepad are:

- /nudgepad/active Contains simple text files where filename is the domain and content is the port. As sites start and stop, files are created and removed.
- /nudgepad/backup Contains a backup copy of /nudgepad/sites that eschews some operational data for faster backups.
- /nudgepad/logs Contains log files for the panel server and proxy server (not individual sites!).
- /nudgepad/panel Allows you to skin the NudgePad panel look and feel.
- /nudgepad/ports Contains simple text files where filename is the port and content is the domain. As sites start and stop, files are created and removed.
- /nudgepad/sites Contains all the data for every site.
- /nudgepad/temp Contains temp files for panel and proxy.

The data for a site "foo.com" is stored in /nudgepad/sites/foo.com/ and looks like this:

- packages/ Contains Node.js packages to include onstart. Each package extends the app object. So your package should export one function which takes an express app object as a param and extends it.
- logs/ Contains site log files.
- pages/ Contains the pages that are edited by the Design Tool. Encoded in Space/Scraps
- posts/ Contains blog posts for blog module. Encoded in Space.
- public/ Serves any assets. Can add any html/images/css/js etc. Normal public web folder.
- settings/ Stores site settings. Each setting is either a Space object or a one liner text file. API in flux.
- surveys/ Stores form posts encoded in Space.
- temp/ Stores temporary site data.
- timelines/ Stores diffs of pages generated by Design tool. Encoded in Space.
- workers/ Stores user records. Each user is a file encoded in Space.


Target Users
------------

Long term NudgePad is targeted at creative people who like making things. That's
5% of the general population.

Short term NudgePad is targeted at web savvy, early adopters who have a lot
of project idea and want faster and better ways to make them real. That's
5% of the creatives.

The things creatives want to make are:
- Clickable websites 20%
- Single page sites 20%
- Mobile apps 20%
- Blogs 5%

The features these people need are:
- Instant project creation 100%
- Tools in the browser 100%
- Instant live website for each project 100%
- Import media tool 100%
- Easy export 100%
- Easy import 100%
- Reliability and backups 100%
- Easy updating of content 100%
- Multiple users per project 50%
- Fast changing of domains 40%
- Custom domains 40%
- Real time multi user env 10%
- Visual design tools 20%
- Blog post writing tool 5%
- Mobile app packaging tool 5%
- Image editing tool 5%
- Drawing tool 5%
- Code editing tool 2%
- Self hosted NudgePad 1%

Our goal is to deliver all of this in a product with a simple and cohesive conceptual model.


Team
----

#### Leadership
- Architect: Breck Yunits github.com/breck7 breck@nudgepad.com
- Senior Engineer: Ben Zulauf github.com/bczulauf ben@nudgepad.com

#### Toolmakers
(add)



Build Status
------------

[![Build Status](https://travis-ci.org/nudgepad/nudgepad.png?branch=master)](https://travis-ci.org/nudgepad/nudgepad)
