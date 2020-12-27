module.exports = {
    router: {
        middleware: 'auth'
    },
    mode: 'spa',
    srcDir: 'src/',
    build: {
        babel: {

        }
    },
    css: [
    ],
    build: {
    },
    plugins: [
        '~/plugins/main.js',
    ],
    server: {
        // port: 8080,
        // host: '192.168.10.70',
        // default: 80
        // default: localhost
    },
}   