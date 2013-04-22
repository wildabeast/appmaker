all: min.css nudgepad.min.js

css: min.css

js: nudgepad.min.js

STYLESHEETS=$(shell cat build/css.make)
SCRIPTS=$(shell cat build/src.make)
LIBS=$(shell cat build/lib.make)

gen:
	cd build/; node gen.js

min.css: $(STYLESHEETS)
	cat $(STYLESHEETS) > min.css

nudgepad.min.js: nudgepad.js
	java -jar ~/compiler.jar --js=nudgepad.js --js_output_file=nudgepad.min.js --language_in=ECMASCRIPT5
	# Google Closure compiler breaks our eval so we need to append it after.
	cat lib/compiler_workaround.js >> nudgepad.min.js

nudgepad.js: $(SCRIPTS) $(LIBS)
	cat $(LIBS) > nudgepad.js
	echo ";" >> nudgepad.js
	cat $(SCRIPTS) >> nudgepad.js

events.js:
	cp ~/events/events.js lib/events.js
	cp ~/events/events.min.js lib/events.min.js

space:
	cp ~/space/space.js lib/space.js
	cp ~/space/space.min.js lib/space.min.js

scraps:
	cp ~/scraps/scraps.js lib/scraps.js
	cp ~/scraps/scraps.min.js lib/scraps.min.js
	cp ~/scraps/compiler_workaround.js lib/compiler_workaround.js

sides:
	cp ~/sides/sides.js lib/sides.js


test:
	open http://$(USER)/nudgepad/tests/main.dev.html

.PHONY: test sides gen
