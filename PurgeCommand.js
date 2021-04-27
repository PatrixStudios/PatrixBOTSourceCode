const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class PurgeCommand extends BaseCommand {
  constructor() {
    super('purge', 'Moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('Sorry! You do not have the permissions.');
    if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send('Sorry! I do not have the permission.');
    if (!args[0]) return message.channel.send("You must state a number of messages to mass delete. \`!purge number\`");
    const amountToDelete = Number(args[0], 10);

    if (isNaN(amountToDelete)) return message.channel.send("Sorry! The number stated is not a valid number.");
    if (!Number.isInteger(amountToDelete)) return message.channel.send("Sorry! The number stated is a integer that is to advanced for me, please use a whole number.");
    if (!amountToDelete || amountToDelete < 1 || amountToDelete > 500) return message.channel.send("Sorry! The number stated is higher then 500. State a number between 1 and 500.");
    const fetched = await message.channel.messages.fetch({
      limit: amountToDelete
    });

    try {
      await message.channel.bulkDelete(fetched)
        .then(messages => message.channel.send(`Hey! I have successfully deleted ${messages.size} messages!`));
    } catch (err) {
      console.log(err);
      message.channel.send(`Sorry! I was unable to the delete the amount stated make sure they are within 14 days of being sent.`);
    }
  }
}
