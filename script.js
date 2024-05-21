
    // Please don't use this for your own projects. It's just a simple scraper! Use for private stuff is fine, that's why CORS is set to *! <3
    // Just don't crash my servers lololol

const percentPlayersInMenus = 10; // Contact me if you have a better formula to do this :>

const shareLink = document.querySelector('#shareButton')
const deepStats = document.querySelector('#deepStats')
const numberBox = document.querySelector('.numbers')

const NumFormat = Intl.NumberFormat('en-GB', { style: 'decimal' })

const backgrounds = [
    'yeti',
    'intel',
    'doublecross',
]

async function refreshData() {
    const res = await fetch('https://dev.ixnoah.live/backend/tf2-bots/').catch(() => {
        document.write('Oh no! Looks like we couldn\'t fetch the data from the server. This\'ll hopefully be fixed this ASAP! T_T')
    })
    const data = await res.json()
    
    deepStats.innerHTML = `There are ${NumFormat.format(data.steamPlayers)} steam players and ${NumFormat.format(data.teamworkPlayers)} players in real servers.<br>Last updated ${Math.floor((Date.now() - data.lastUpdated) / 1000)} second(s) ago!`
    shareLink.setAttribute('href', 'https://x.com/intent/post?url=https%3A%2F%2Fixnoah.live%2Ftf2&text=' + encodeURI(`There's about ${NumFormat.format(data.estimatedBots)} bots playing Team Fortress 2! VALVe, pls fix!`))

    numberBox.textContent = '' // clear the inside of the number box
    data.estimatedBots.toString().split('').forEach(num => {
        numberBox.innerHTML += `<img src="./assets/counter/${num}.png" alt="The number ${num}, helping to form ${data.estimatedBots}." height="100">`
    })

    document.body.removeAttribute('style')
    document.body.style.backgroundImage = `url('./assets/bg/` + backgrounds[Math.floor(Math.random() * backgrounds.length)] + `.png' )`

}

// apparently webshare api isnt fully supported... oops?
// if (navigator?.canShare()) {
//     shareLink.textContent = 'Click to share this!'
//     shareLink.setAttribute('href', '#')
//     shareLink.registerListener('click', () => {
//         navigator.share()
//     })
// }

refreshData()