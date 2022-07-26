const { GatewayIntentBits, Client, EmbedBuilder } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});
const config = require(`${process.cwd()}/config.json`);
require('colors');

client.on('ready', () => {
    console.log('¡Bot encendido!'.blue)
})

client.login(config.token)

client.on('messageCreate', async (message) => {
    if(message.author.bot || !message.guild || message.channel.type === 'dm') return;

    var prefix = config.prefix;

    if(!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    client.color = config.color;

    if(command === 'ping'){
        let embed = new EmbedBuilder()
            .setTitle('🏓 PONG')
            .setDescription(`✅ ¡El ping del bot es de \`${client.ws.ping}ms\`!`)
            .setColor(client.color)
        message.channel.send({embeds: [embed]})
    }
})