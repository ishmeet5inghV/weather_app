import express from "express"
import axios from "axios"
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}))

const apiKey = "2ec1dd11493272d6b8c578c6799894d4";


app.use(express.static("public"));

app.get("/", (req, res)=>{
    // console.log(req.body);
    res.render("index.ejs")
})

app.post("/submit", async (req, res)=>{
    try {
        const city = req.body.city
        const countryCode = req.body.countryCode
        const result = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${apiKey}&units=metric`
        );
            const windSpeedMPS = result.data.wind.speed; // Wind speed in meters per second
            const windSpeedKPH = (windSpeedMPS * 3.6).toFixed(2)
            const temperature = result.data.main.temp;
            const humidity = result.data.main.humidity;
            const weatherDescription = result.data.weather[0].description;
        res.render("submit.ejs", {data: result, windSpeed: windSpeedKPH, temp: temperature, humidity: humidity, weatherDes: weatherDescription, city: city, crCode: countryCode});
    } catch (error) {
        res.status(404).send("Error:", error.message);
    }
})
app.listen(port, ()=>{
    console.log(`Listinning to the port ${port}`)
})