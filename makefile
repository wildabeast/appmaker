REPORTER ?= dot

test: test-server

test-server:
	@mocha \
		--reporter $(REPORTER) \
		server/tests


#test-client:
#	open client/tests/main.dev.html

#test-client-min:
#	open client/tests/main.html

test-system:
	@node system/tests/test.js

.PHONY: test-server test-system