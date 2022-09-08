const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'embed',
    alias: ['emb', 'e'],

    run (client, message, args, prefix) {
        if (!message.member.permissions.has('Administrator')) return message.channel.send({embeds: [new EmbedBuilder()
            .setTitle('❌ ¡No tienes suficientes permisos para usar este comando!')
            .setDescription('Necesitas los siguientes permisos: \`Administrator\`')
            .setColor(client.color)
        ]});

        const texto = args.join(' ');
        if (!texto) return message.channel.send({embeds: [new EmbedBuilder()
            .setTitle('❌ ¡Debes especificar el contenido del embed!')
            .setDescription(`**Uso:** \`${prefix}embed <título> - <descripción>\``)
            .setColor(client.color)
        ]});

        const opciones = texto.split(' - ');
        message.channel.send({embeds: [new EmbedBuilder()
            .setTitle(opciones[0])
            .setDescription(opciones[1])
            .setColor(client.color)
        ]});
    }
}