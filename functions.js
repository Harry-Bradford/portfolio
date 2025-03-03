const navbar = document.getElementById('navbar')
const openButton = document.getElementById('open-menu-button')

const media = window.matchMedia("(width < 900px)")

media.addEventListener('change', (e) => updateNavbar(e))

function updateNavbar(e) {
    const isMobile = e.matches
    console.log(isMobile)
    if(isMobile) {
        navbar.setAttribute('inert', '')
    }
    else {
        navbar.removeAttribute('inert')
    }
}

function openMenu() {
    navbar.classList.add('show')
    openButton.setAttribute('aria-expanded', 'true')
    navbar.removeAttribute('inert')
}

function closeMenu() {
    navbar.classList.remove('show')
    openButton.setAttribute('aria-expanded', 'false')
    navbar.setAttribute('inert', '')
}

updateNavbar(media)

function activeLink() {
    
}

// script for scrolling animations

// const observer = new IntersectionObserver((entries) => {
//     entries.forEach((entry) => {
//         console.log(entry)
//         if (entry.isIntersecting) {
//             entry.target.add('.show');
//         }
//         else {
//             entry.target.classList.remove('.show');
//         }
//     });
// });

// const hiddenElements = document.querySelectorAll('.hidden');
// hiddenElements.forEach((el) => observer.observe(el));



// script for the dialogue system

const textElement = document.getElementById('dialogue-text')

const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text

    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id: 1,
        text: 'Hi there!',
        options: [
            {
                text: 'Hello',
                nextText: 2
            },
            {
                text: 'Go away',
                setState: { disappear: true },
                nextText: 3
            },
        ]
    },
    {
        id: 2,
        text: 'blah blah blah',
        options: [
            {
                text: 'blahdy blahdy blah',
                requiredState: (CurrentState) => CurrentState.blueGoo,
                setState: {blueGoo: false, sword: true},
                nextText: 3
            },
            {
                text: 'blahdy blahdy blah pt.2',
                requiredState: (CurrentState) => CurrentState.blueGoo,
                setState: {blueGoo: false, shield: true},
                nextText: 3
            },
            {
                text: 'blahdy blahdy',
                nextText: 3
            }
        ]
    },
    {
        id: 3,
        text: 'Okay, sure... Yeah... no hard feelings...',
    },
    {
        id: 4,
        text: 'Wow... tough question! I would have to say Outer wilds is my favourite',
        options: [
            {
                text: 'blahdy blahdy blah',
                requiredState: (CurrentState) => CurrentState.blueGoo,
                setState: {blueGoo: false, sword: true},
                nextText: 3
            },
            {
                text: 'blahdy blahdy blah pt.2',
                requiredState: (CurrentState) => CurrentState.blueGoo,
                setState: {blueGoo: false, shield: true},
                nextText: 3
            },
            {
                text: 'blahdy blahdy',
                nextText: 3
            }
        ]
    },
]

startGame()


// I used to be what some call a "casual gamer" so FIFA and Call of Duty were my favourites when I was younger. Then Skyrim followed by Fallout 4