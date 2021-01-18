import cli from 'commander'

cli.command('add <dir>').action(require('./add').run)

cli.parse(process.argv)
