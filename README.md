twig.js versus Twing benchmark
==============================

A comparison benchmark of the latest versions of [twig.js](https://github.com/twigjs/twig.js) and [Twing](https://github.com/ericmorand/twing).

## The protocol

This benchmark is based on the Smarty versus TwigPHP benchmark by [dominics](https://github.com/dominics/smarty-twig-benchmark):

* Extending one base template and overriding its blocks
* 3 blocks, with varying default content
* A single for loop, outputting elements of an array within one block

## Usage

`npm install`

`npm start`

## Results

On my machine, with twig.js ^1.12.0 and Twing ^1.2.0, node.js 9.8.0, 100000 iterations, compile time ignored, cache warmed:

Benchmark | Time Taken
--- | ---
twig.js | ~6 seconds
Twing | ~1 second

As a matter of comparison, here are the results I get from Smarty versus TwigPHP benchmark on the same machine with TwigPHP 2.4.7, PHP 7.1.15, 100000 iterations, compile time ignored, cache warmed:

Benchmark | Time Taken
--- | ---
TwigPHP | ~0.8 second