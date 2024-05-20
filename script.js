
    // Please don't use this for your own projects. It's just a simple scraper! Use for private stuff is fine, that's why CORS is set to *! <3
    // Just don't crash my servers lololol

const percentPlayersInMenus = 10; // Contact me if you have a better formula to do this :>

const shareLink = document.querySelector('#shareButton')
const deepStats = document.querySelector('#deepStats')
const numberBox = document.querySelector('.numbers')

const NumberFormatter = Intl.NumberFormat('en-GB', { style: 'decimal' })

async function refreshData() {
    const res = await fetch('https://dev.ixnoah.live/backend/tf2-bots/')
    const data = await res.json()

    const estimatedBots = Math.floor((data.steamPlayers - data.teamworkPlayers) * (( 100 - percentPlayersInMenus ) / 100))
    
    deepStats.textContent = `(${data.steamPlayers} on steam - ${data.teamworkPlayers} in games) * 0.9 = ${estimatedBots} estimated bots`
    shareLink.setAttribute('href', 'https://x.com/intent/post?url=https%3A%2F%2Fixnoah.live%2Ftf2&text=' + encodeURI(`There's about ${NumberFormatter.format(estimatedBots)} bots playing Team Fortress 2!`))

    numberBox.textContent = '' // clear the inside of the number box
    estimatedBots.toString().split('').forEach(num => {
        numberBox.innerHTML += `<img src="./assets/counter/${num}.png" height="100">`
    })
}

if (navigator.canShare()) {
    shareLink.textContent = 'Click to share this!'
    shareLink.setAttribute('href', '#')
    shareLink.registerListener('click', () => {
        navigator.share()
    })
}

refreshData()