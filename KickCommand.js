const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require ('discord.js');

module.exports = class KickCommand extends BaseCommand {
  constructor() {
    super('kick', 'Moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Sorry! You do not have the permissions.");
    if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send('Sorry! I do not have the permission.');
    const mentionedMember = message.mentions.members.first();
    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No valid reason given.";
    const kickEmbed = new Discord.MessageEmbed()
        .setTitle(`You were kicked from ${message.guild.name}`)
        .setDescription(`Reason: ${reason}`)
        .setColor("#00acc1")
        .setTimestamp()
        .setFooter(client.user.tag, client.user.displayAvatarURL());

    // = !kick @user reason
    if (!args[0]) return message.channel.send("You need to state a user in order for this command to function. \`!kick @user reason\`");
    if (!mentionedMember) return message.channel.send("You need to state a valid member within the server in order for this command to function.");
    try {
      await mentionedMember.send(kickEmbed);
    } catch (err){
      console.log(`Sorry, I have failed to message the mentioned member.`);
    }

    try {
      await mentionedMember.kick(reason)
    } catch (err) {
      console.log(err);
      return message.channel.send("Sorry! But I was unable to kick that person from the server.")
    }
  }
}
