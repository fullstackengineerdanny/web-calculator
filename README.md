# Web Calculator

## Description

This a JavaScript calculator class accessible as a web service.

## Usage

It can be used by sending an equation to localhost:8080/calculator?equation=1%20%2B%201

	OR

curl -X GET http://localhost:8080/calculator?equation=1%20%2B%201

Note that the equation must URI encoded.
The example shown is 1 + 1
A Jest test suite is included for immediate verification.

## Discoveries

The coverage report was nearly 100% across the board when I used one-liners.
That dropped dramatically when splitting it up for readability.
I suspect it simply didn't take into account all the extra curly braces.
