## Development
* Fork this repo: https://github.com/jessykate/modernomad/fork
* Download & install the latest version of [VirtualBox](https://www.virtualbox.org/wiki/Downloads) for your platform.
* Download & install the latest version of [Vagrant](http://downloads.vagrantup.com/) for your platform.
* Clone your form of the repo ```git clone git@github.com:YOUR_GIT_HUB_USERNAME/modernomad.git```
* ```cd modernomad```
* vagrant up
* wait a minute
* open http://localhost:31337

## OS X requirements

These are only necessary for OS X devs. You will need Xcode, Xcode command line
tools, and brew.

For some completely unfathomable reason, OS X does not ship with the GCC
compiler installed. And for further unfathomable reasons, it is bundled with
XCode, which is over a GB in size and not installed by default. The upshot is,
to get [brew](http://mxcl.github.io/homebrew/) to work, you need both Xcode and
[Xcode command line
tools](http://stackoverflow.com/questions/9329243/xcode-4-4-command-line-tools)
installed. Start the Xcode download early, it can take an hour or more
depending on your connection!

Next, install [brew](http://mxcl.github.io/homebrew/)!

Install the `wget` tool, which is not installed on OS X by default: 

- `brew install wget`

## Pip and Virtualenv. 

Pip is Python's package manager, and virtualenv is a tool that lets you create
self-contained environments for sets of python libraries. 

Each virtualenv contains its own install of pip, but you need pip to be
installed globally in order to install virtualenv and virtualenvwrapper (or, at
least, this is the easiest way to get those dependencies). 

optionally remove old/crusty versions:
- `sudo apt-get purge python-pip`

then get current version (url from http://www.pip-installer.org/en/latest/installing.html)
- `cd /tmp`
- `wget https://raw.github.com/pypa/pip/master/contrib/get-pip.py`
- `sudo python get-pip.py`

optionally verify your install
- `pip --version`

install virtualenv and (if you want to stay sane) virtualenvwrapper:
- `sudo pip install virtualenv` (harmless if virtualenv is already installed)
- `sudo pip install virtualenvwrapper`

add these to your ~/.bashrc (~/.bash_profile if one OS X) (create this file if it doesn't exist):
- `export WORKON_HOME="~/envs"` (or whatever you want to name the directory)
- `source /usr/local/bin/virtualenvwrapper.sh` (the path should match the path printed by the pip installer for virtualenvwrapper). 

don't forget to source the bashrc file now:
- `source ~/.bashrc` (or `source ~/.bash_profile` if that's the file you used)

## Dependencies

PIL is a requirement, but in order for it to compile with JPG support, you must have a system-wide library called libjpeg62-dev. 

**On OS X**

Install the missing libjpeg library. You will need X Code installed with the
extra "command line tools" component as described above. 

* `cd /tmp`
* Download the package at [http://www.ijg.org/files/jpegsrc.v8c.tar.gz](http://www.ijg.org/files/jpegsrc.v8c.tar.gz) to the /tmp directory. 
* Unpack this package (`tar -xzvf jpegsrc.v8c.tar.gz`) and cd into the unpacked folder `cd jpeg-8c`
* Compile and install it: 
	* `./configure`
	* `make`
	* `sudo make install`
 

**On Linux**

- `sudo apt-get install libjpeg62-dev`

you also need the python dev package:

- `sudo apt-get install python-dev`

you may need to symlink these libraries for PIL to find them during the install:

`sudo ln -s /usr/lib/x86_64-linux-gnu/libfreetype.so /usr/lib/`
`sudo ln -s /usr/lib/x86_64-linux-gnu/libz.so /usr/lib/`
`sudo ln -s /usr/lib/x86_64-linux-gnu/libjpeg.so /usr/lib/`


then either install PIL using `brew`, or from the dmg's available on the PIL website. for example, see the process outlined [here](http://stackoverflow.com/questions/9070074/how-to-install-pil-on-mac-os-x-10-7-2-lion)

# RabbitMQ
celery depends on rabbit-mq, which can be installed using brew on OS X or
apt-get on debian/ubuntu (and other ways on other systems). 

- os x: `brew update; brew install rabbitmq`
- debian/ubuntu: `sudo apt-get install rabbitmq-server`


## Hooray!

Now you can follow the directions in [how-to-run](how-to-run.md)
