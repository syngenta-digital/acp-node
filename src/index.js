const minimist = require('minimist');
const profiler = require('./profiler');
const defaulter = require('./defaulter');
const validator = require('./validator');

exports.run = async () => {
    console.log('===== AWS CICD PROFILES STARTED =====');
    let args = minimist(process.argv.slice(2));
    defaulter.assign(args);
    const errors = await validator.validate(args);
    if (errors.length) {
        validator.logErrors(errors);
    } else {
        await profiler.create(args);
    }
    console.log('===== AWS CICD PROFILES COMPLETED =====');
    return process.exit(0);
};
