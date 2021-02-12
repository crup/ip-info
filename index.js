const geoip = require('geoip-lite');
const fastify = require('fastify')({
    logger: process.env.NODE_ENV !== "production"
});

fastify.get('/:ip', function (request, reply) {
    const ipInfo = geoip.lookup(request.params.ip);

    reply
        .code(ipInfo ? 200 : 400)
        .send(
            geoip.lookup(request.params.ip)
        );
})

fastify.listen(8088, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    fastify.log.info(`server listening on ${address}`)
})