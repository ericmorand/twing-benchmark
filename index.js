let Twig = require('twig');
let Twing = require('twing');

let fs = require('fs-extra');

let setup = function(type) {
    let template;

    switch (type) {
        case 'Twig': {
            Twig.cache(true);

            template = Twig.twig({
                path: 'templates/index.html.twig',
                async: false,
                autoescape: true
            });

            break
        }
        case 'Twing': {
            let loader = new Twing.TwingLoaderFilesystem('./templates');

            let twing = new Twing.TwingEnvironment(loader, {
                autoescape: 'html',
                cache: 'cache'
            });

            template = twing.loadTemplate('index.html.twig');

            break;
        }
    }

    return template;
};

let benchmarkOnce = function(type, template, data) {
    return template.render(data);
};

let benchmark = function(type, iterations = 100000) {
    console.warn(`=== Benchmarking ${type} ===`);

    let template = setup(type);
    let data = {
        'data': [
            'some', 'bits', 'to', 'iterate', 'over'
        ]
    };

    // Prime the cache
    benchmarkOnce(type, template, data);

    console.warn('>>> Cache warmed up');

    let start = process.hrtime();

    for (let i = 0; i < iterations; i++) {
        benchmarkOnce(type, template, data);
    }

    let diff = process.hrtime(start);

    let hrDiff = diff[0] * 1e9 + diff[1]; // nanoseconds

    console.warn(`Time taken: ${hrDiff / 1000000000}s`);
    console.warn(`Time taken per iteration: ${hrDiff / 1000000000 / iterations}s`);
};

fs.removeSync('./cache');

benchmark('Twig');
benchmark('Twing');