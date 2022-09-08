const { GatewayIntentBits, Client, Collection } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});
const config = require(`${process.cwd()}/config.json`);
const PrefixSchema = require(`${process.cwd()}/models/prefixSchema.js`);
const fs = require('fs');
const mongoose = require('mongoose');
require('colors');

client.on('ready', () => {
    console.log('¡Bot encendido!'.green)

    mongoose.connect(config.mongoDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log('Conectado a la base de datos de MongoDB'.blue)
    }).catch((err) => {
        console.log('No se ha podido conectar a la base de datos de MongoDB'.red)
        console.log(err)
    })
})

client.login(config.token)

client.on('messageCreate', async (message) => {
    if(message.author.bot || !message.guild || message.channel.type === 'dm') return;

    var prefix;
    let data = await PrefixSchema.findOne({
      _id: message.guild.id
    })
    if (data === null) {
      prefix = config.prefix
    } else {
      prefix = data.newPrefix
    }

    if(!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    client.color = config.color;

    let cmd = client.commands.find((c) => c.name === command || (c.alias && c.alias.includes(command)));
    if(cmd) {
        cmd.run(client, message, args, prefix);
    }
})

client.commands = new Collection();

fs.readdirSync('./commands').forEach((dir) => {
    const commands = fs.readdirSync(`./commands/${dir}/`).filter((file) => file.endsWith('.js'));
    for (let file of commands) {
        let command = require(`./commands/${dir}/${file}`);
        console.log(`Comandos - ${file} cargado`.yellow)
        client.commands.set(command.name, command);
    }
});