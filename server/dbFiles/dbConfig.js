const config = {
    user: 'ProjectDeloitte',
    password: 'meeting',
    server: 'USCHNBISARAN1',
    database: 'MeetAssist',
    options: {
        trustServerCertificate: true,
        trustedConnection: true,
        enableArithAbort: true,
    },
    port: 1433
}

module.exports = config;