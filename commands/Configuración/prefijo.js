const { EmbedBuilder } = require('discord.js');
const PrefixSchema = require(`${process.cwd()}/models/prefixSchema`);

module.exports = {
    name: 'prefijo',
    alias: ['prefix', 'setprefix', 'cambiarprefijo'],

    run: async (client, message, args, prefix) => {
        if (!message.content.startsWith(prefix)) return;
        if (!message.member.permissions.has('Administrator')) return message.channel.send({embeds: [new EmbedBuilder()
            .setDescription('❌ ¡No tienes suficientes permisos para usar este comando!')
            .setColor(client.color)
        ]});
        const newprefix = args[0]
        if (!newprefix) return message.channel.send({embeds: [new EmbedBuilder()
            .setDescription('❌ ¡No has especificado el nuevo prefijo!')    
            .setColor(client.color)
        ]});
        if (newprefix.length > 5) return message.channel.send({embeds: [new EmbedBuilder()
            .setDescription('❌ ¡El prefijo no puede tener mas de 5 caracteres!')
            .setColor(client.color)
        ]}); 

        let data;
        try {
            data = await PrefixSchema.findOne({
                _id: message.guild.id
            })
            if (!data) {
                let newdata = await PrefixSchema.create({
                    _id: message.guild.id,
                    newPrefix: newprefix
                });
                newdata.save()
            } else {
                await PrefixSchema.findOneAndUpdate({
                    _id: message.guild.id,
                    newPrefix: newprefix,
                });
            }
            message.channel.send({embeds: [new EmbedBuilder()
                .setDescription(`✅ ¡El prefijo ha sido cambiado de \`${prefix}\` a \`${newprefix}\`!`)
                .setColor(client.color)
            ]})
        } catch (err) {
            console.log(err)
        }
    }
}