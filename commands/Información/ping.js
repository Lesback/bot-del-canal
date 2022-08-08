const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: 'ping',
    alias: ['latencia'],

run (client, message, args, prefix) {
        const embed = new EmbedBuilder()
            .setTitle('🏓 ¡PONG! 🏓')
            .setDescription(`✅ ¡El ping del bot es de \`${client.ws.ping}ms\`!`)
            .setColor(client.color)
        message.channel.send({embeds: [embed]})
    }
}