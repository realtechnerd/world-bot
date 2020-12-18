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

    if (msg.content === "randomCountry") {
        retrieveRandomCountry(msg)
    }
})

async function retrieveRandomCountry(msg) {
    let d;

    await fetch("https://restcountries.eu/rest/v2/all")
        .then(res => res.json())
        .then(data => d = data)
    // fetch a random country
    let randomCont = Math.floor(Math.random() * d.length);

    const embed = new Discord.MessageEmbed()
        .then

    console.log(d.length)

    msg.channel.send(d[randomCont].name)
}

client.login(process.env.BOT_TOKEN)