fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=cats")
    .then(res => res.json())
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.regular})`
        document.getElementById("author").textContent = `By: ${data.user.name}`
    })
    .catch(err => {
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDE2NzA&ixlib=rb-1.2.1&q=80&w=1080)`
    })


    fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
    .then(res => {
        if (!res.ok) {
            throw Error("Something went wrong")
        }
        return res.json()
    })
    .then(data => {
        document.getElementById('crypto-top').innerHTML = `
        <img src=${data.image.small} />
        <span>${data.name}</span>
        `
        document.getElementById('crypto').innerHTML += `
        <p>🎯: €${data.market_data.current_price.eur}</p>
        <p>👆: €${data.market_data.high_24h.eur}</p>
        <p>👇: €${data.market_data.low_24h.eur}</p>
        `
    })
    .catch(err => {
        document.getElementById('crypto').innerText = "Something went wrong"
    })

    function getCurrentTime(){
    let current = new Date()
    document.getElementById('time').innerHTML = `
    ${current.toLocaleTimeString("en-uk", {timeStyle: "short"})}
    `
    }
    setInterval(getCurrentTime, 1000);

    navigator.geolocation.getCurrentPosition((position) => {
        fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
        .then(res => {
            if (!res.ok) {
                throw Error ("Weather data not avaible")
            }
            return res.json()
        })
        .then(data => {
        document.getElementById('weather-top').innerHTML = `
        <img src='https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png'>
        <p>${Math.round(data.main.temp)}°C</p>
        `
        document.getElementById('weather').innerHTML += `
        <p id="place">${data.name}</p>`
        })
        .catch(err => console.error(err))
      })