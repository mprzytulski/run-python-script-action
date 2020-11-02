const core = require('@actions/core');
const exec = require('@actions/exec');
const fs = require('fs');
const tmp = require('tmp');

async function run() {
    tmp.setGracefulCleanup();
    // const script = core.getInput('script');
    const script = "import sys; sys.exit(1)"
    const filename = tmp.tmpNameSync({postfix: '.py'});
    fs.writeFileSync(filename, script);
    await exec.exec('python', [filename])
}


run().catch((e) => {
    if (/failed with exit code (\d+)/.test(e)) {
        let exit_code = /failed with exit code (\d+)/.exec(e)[1];
        process.exit(exit_code)
    }
}).then(() => {
    console.log("Done")
})
