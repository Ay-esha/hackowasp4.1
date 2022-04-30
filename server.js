const Discord = require('discord.js')
const axios =require("axios")
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const randomMovieNames = require('random-movie-names');

require('dotenv').config()


client.on("ready",()=>{

    console.log(`logged in as ${client.user.tag}`)
})


client.on("messageCreate", async(msg)=>{        
        
    if(msg.content == "1" || msg.content ==='movie'){
        // msg.reply('Enter movie in format movie-"moviename"')
        // const searchMovieName = msg.content.split('-')[1];
        
        const movieName = randomMovieNames()
        
        let uri = `http://www.omdbapi.com/?s=${movieName}&apikey=36869c0c`
        const {data} = await axios.get(uri)
        const {Search} = data;
        console.log(Search)
        if(Search){
            msg.reply(`Try watching ${Search[0].Title}`)
            return
        }
        msg.reply(`Try watching ${movieName}`)
        // return;
    }
    //jokes api
    else if(msg.content === "2" || msg.content==="joke"){

        try {
            
            params = {
                method:"GET",
                headers:{
                    'X-RapidAPI-Host': 'jokeapi-v2.p.rapidapi.com',
                    'X-RapidAPI-Key': 'c275f492cfmsh1481aba9c0522d8p121ae8jsn4d073f1ee41b'
                }
            }
            const {data} = await axios.get("https://jokeapi-v2.p.rapidapi.com/joke/Any",params)
            console.log(data)

            if(data.type==="twopart"){
                let s = data.setup +" "+ data.delivery
                msg.reply(data.setup +" "+ data.delivery)
                return;
            }
            msg.reply(data.joke)
        } catch (error) {
            console.log(error.messsage)
        }
    }
    //movie api
    else if(msg.content.startsWith("movie-")){
        const searchMovieName = msg.content.split('-')[1];
        let uri = `http://www.omdbapi.com/?s=${searchMovieName}&apikey=36869c0c`
        const {data} = await axios.get(uri)
        const {Search} = data;
        // console.log( Search)

        // if(!(movies.data.length > 0 ) ){
        //     msg.reply("Movie not found!!")
        //     return;
        // }
        // movies = JSON.stringify(movies);
       const arr =  Search.filter(movie=>{
            return movie.Title+movie.imdbId
        })
        msg.reply(toString(arr))
    }
    //movie/jokes choice
    else if(msg.content == "!distract"){
        msg.reply(`1.Movies 2.Jokes`)
    }
    //quotes api
     else if(msg.content == '!inspire'){

       let res = await axios.get("https://zenquotes.io/api/random")
       msg.reply(`Heres an inspiring quote for you :- ${res.data[0].q}`)
       
    }
    //affirmation api
    else if(msg.content && !msg.author.bot){
        try {
            
            
            let {data} = await axios.get('https://www.affirmations.dev/');
            
            msg.reply(data.affirmation)
        } catch (error) {
            console.log(error.messsage)
        }
        }
    
})



client.login(process.env.botToken)
