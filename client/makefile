build:
	node core/bash/build.js

min:
	java -jar ~/compiler.jar --js=public/nudgepad.dev.js --js_output_file=public/nudgepad.min.js --language_in=ECMASCRIPT5
	# Google Closure compiler breaks our eval so we need to append it after.
	cat public/js/compiler_workaround.js >> public/nudgepad.min.js

events.js:
	cp ~/events/events.js public/js/events.js
	cp ~/events/events.min.js public/js/events.min.js

space:
	cp ~/space/space.js public/js/space.js
	cp ~/space/space.min.js public/js/space.min.js

scraps:
	cp ~/scraps/scraps.js public/js/scraps.js
	cp ~/scraps/scraps.min.js public/js/scraps.min.js
	cp ~/scraps/compiler_workaround.js public/js/compiler_workaround.js


.PHONY: build
