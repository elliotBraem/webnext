import chalk from 'chalk'
import { config as dotenvConfig } from 'dotenv'
import yargs from 'yargs'
import { hideBin } from "yargs/helpers"

import { checkVersion } from '../cli/check-version.js'
import { printOptions } from '../cli/print-options.js'
import { createDaemonFile } from '../src/createSystemctl.js'
import * as config from '../src/configuration.js'
import * as entry from '../src/index.js'
import * as agent from '../src/agent.js'
import * as rpc from '../src/rpc.js'
import * as triggers from '../src/triggers.js'
import * as util from '../src/util.js'

dotenvConfig()

const AGENT_ACCOUNT_ID = config.AGENT_ACCOUNT_ID

const registerAgentCmd = {
  command: 'register <account_id> [payable_account_id]',
  desc: 'Add your agent to cron known agents',
  builder: (yargs) => yargs
    .option('account_id', {
      desc: 'Account to add',
      type: 'string',
      required: true
    })
    .option('payable_account_id', {
      desc: 'Account that receives reward payouts',
      type: 'string',
      required: false
    }),
  handler: async options => {
    await agent.registerAgent(options.account_id, options.payable_account_id)
  }
}

const updateAgent = {
  command: 'update <account_id> [payable_account_id]',
  desc: 'Update your agent to cron known agents',
  builder: (yargs) => yargs
    .option('account_id', {
      desc: 'Account to add',
      type: 'string',
      required: true,
    })
    .option('payable_account_id', {
      desc: 'Account that receives reward payouts',
      type: 'string',
      required: false
    }),
  handler: async options => {
    await rpc.call('update_agent', options)
  }
}

const unregisterAgent = {
  command: 'unregister <account_id>',
  desc: 'Account to remove from list of active agents.',
  builder: (yargs) => yargs
    .option('account_id', {
      desc: 'Account to remove.',
      type: 'string',
      required: true
    }),
  handler: async options => {
    await rpc.call('unregister_agent', options, false, undefined, '0.000000000000000000000001')
  }
}

const withdrawBalance = {
  command: 'withdraw [account_id]',
  desc: 'Withdraw all rewards earned for this account',
  builder: (yargs) => yargs
    .option('account_id', {
      desc: 'Account that earned rewards.',
      type: 'string',
      required: false
    }),
  handler: async options => {
    if (!options.account_id) options.account_id = config.AGENT_ACCOUNT_ID
    await rpc.call('withdraw_task_balance', options)
  }
}

const status = {
  command: 'status [account_id]',
  desc: 'Check agent status and balance for this account',
  builder: (yargs) => yargs
    .option('account_id', {
      desc: 'Account to check',
      type: 'string',
      required: false
    }),
  handler: async options => {
    if (!options.account_id && config.AGENT_ACCOUNT_ID) options.account_id = config.AGENT_ACCOUNT_ID
    await rpc.call('get_agent', options, true)
  }
}

const tasksCmd = {
  command: 'tasks',
  desc: 'Check how many tasks are currently available',
  builder: (yargs) => yargs,
  handler: async options => {
    // Deprecated in favor of web UI
    // await rpc.call('get_slot_tasks', options, true)
    const manager = await util.getCronManager()
    const { networkId } = manager.account.connection
    console.log(`${chalk.gray('View ' + networkId.toLowerCase() + ' Tasks:')} ${chalk.blueBright('https://cron.cat/tasks?network=' + networkId.toLowerCase())}`)
  }
}

const triggersCmd = {
  command: 'triggers',
  desc: 'Check how many triggers are currently available',
  builder: (yargs) => yargs,
  handler: async options => {
    await triggers.getTriggers()
  }
}

const go = {
  command: 'go',
  desc: 'Run all types of tasks that are available',
  builder: (yargs) => yargs,
  handler: async options => {
    // MAIN AGENT LOOP
    entry.runMainLoop()
  }
}

const daemon = {
  command: 'daemon [near_env]',
  desc: 'Generate a network specific croncat daemon service',
  builder: (yargs) => yargs
    .option('near_env', {
      desc: 'NEAR_ENV',
      type: 'string',
      required: false
    }),
  handler: async options => {
    const env = options.near_env || 'testnet'
    await createDaemonFile(env)
  }
}

const configd = config.getConfig(process.env.NODE_ENV || 'development')
yargs(hideBin(process.argv))
  .strict()
  .scriptName('croncat')
  .middleware(checkVersion)
  .middleware(printOptions)
  .option('verbose', {
    desc: 'Prints out verbose output',
    type: 'boolean',
    alias: 'v',
    default: false
  })
  .option('nodeUrl', {
    desc: 'NEAR node URL',
    type: 'string',
    default: configd.nodeUrl
  })
  .option('networkId', {
    desc: 'NEAR network ID, allows using different keys based on network',
    type: 'string',
    default: configd.networkId
  })
  .option('helperUrl', {
    desc: 'NEAR contract helper URL',
    type: 'string',
  })
  .option('walletUrl', {
    desc: 'Website for NEAR Wallet',
    type: 'string'
  })
  .option('explorerUrl', {
    hidden: true,
    desc: 'Base url for explorer',
    type: 'string',
  })
  .command(registerAgentCmd)
  .command(updateAgent)
  .command(unregisterAgent)
  .command(withdrawBalance)
  .command(status)
  .command(tasksCmd)
  .command(triggersCmd)
  .command(go)
  .command(daemon)
  .config(configd)
  .showHelpOnFail(true)
  .recommendCommands()
  .demandCommand(1, chalk`Pass {bold --help} to see all available commands and options.`)
  .usage(chalk`Usage: {bold $0 <command> [options]}`)
  .epilogue(chalk`More info: {bold https://cron.cat}`)
  .wrap(null)
  .argv
