source /webnext/core/runtime/asdf.fish

if status is-interactive
	cd ~
	git submodule init
	git submodule update --recursive
end
