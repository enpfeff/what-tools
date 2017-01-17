.PHONY: install clean

install:
	(cd package && ./install.sh -b)

clean:
	(cd package && ./clean.sh)