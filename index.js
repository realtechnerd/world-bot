require('dotenv').config()

const Discord = require('discord.js');
const client = new Discord.Client();

const fetch = require('node-fetch');

client.on("ready", () => {
    console.log("Bot is ready!")
})

const prefix = "$";

client.on("message", async msg => {
    if (!msg.content.startsWith(prefix) || msg.author.bot);
    
    const args = msg.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    if (command === "country") {
        if (!args.length) {
            return msg.channel.send(`You're gonna have to be a little more specific there, ${msg.author}.`);
        }
        else if (args[0] === 'r') {
            retrieveRandomCountry(msg);
        }
    }

    // retrieveCountry(msg, args);
})

async function retrieveRandomCountry(msg) {
    let d;

    await fetch("https://restcountries.eu/rest/v2/all")
        .then(res => res.json())
        .then(data => d = data)
    // fetch a random country
    let randomCont = Math.floor(Math.random() * d.length);

    let capital;
    if (d[randomCont].capital === "") {
        capital = ""
    } else {
        capital = `Capital: ${d[randomCont].capital}`
    }

    const embed = new Discord.MessageEmbed()
        .setAuthor(d[randomCont].nativeName)
        .setTitle(d[randomCont].name)
        .setThumbnail(`https://www.countryflags.io/${d[randomCont].alpha2Code}/flat/64.png`)
        .setDescription(capital)
        .addField('Region', d[randomCont].region, true)
        .addField('Population', d[randomCont].population.toLocaleString(), true)
    msg.channel.send(embed)
}

async function retrieveCountry(msg, args) {
    let d;

    await fetch(`https://restcountries.eu/rest/v2/name/${args}`, {
    headers: {
        'User-Agent': 'ANYTHING_WILL_WORK_HERE',
        'Accept':'application/json'
    }}
    )
        .then(res => res.json())
        .then(data => d = data)
    
    for (let i = 0; i < d.length;i++) {
        let obj = d[i];

        msg.channel.send(obj.name);
    }
}

client.login(process.env.BOT_TOKEN)