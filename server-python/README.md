# Python Server
> Everything is expected to be done within the `server-python` directory!

## install deps
The server uses [poetry](https://python-poetry.org/docs/master/) for dependency management.

> quick install poetry: 
`curl -sSL https://install.python-poetry.org | python3 -`
and then add poetry to your path by updating your .bashrc or .zshrc with `export PATH="$HOME/.local/bin:$PATH"`

To install the python dependencies and create a virtualenv automatically, run 

```bash
poetry install
```

## run the server

to run the `strawberry` dev server (the graphql library used in the demo):
```bash
poetry run strawberry server main
```

> you can add `-p 4040` to change the port that strawberry serves on to swap it out for the node server