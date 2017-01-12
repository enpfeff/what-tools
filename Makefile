.PHONY: install

base:
	(cd package && ./install.sh -b)

install:
	(cd package && ./install.sh)

clean:
	(cd package && ./clean.sh)