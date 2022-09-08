const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'sugerencias',
    alias: ['sugerencia', 'suggestion'],

    run (client, message, args, prefix) {
        message.delete();
        const sugerencia = args.join(' ');
        if (!sugerencia) return;
        message.channel.send({embeds: [new EmbedBuilder()
            .setAuthor({name: `Sugerencia de ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
            .setDescription(sugerencia)
            .setColor(client.color)
            .setFooter({text: `Para enviar una sugerencia usa ${prefix}sugerencia <sugerencia>`})
        ]}).then((msg) => {
            msg.react('✅')
            msg.react('❌')
        });
    }
}