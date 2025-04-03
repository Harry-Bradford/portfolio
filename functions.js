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
        text: 'Hi there, welcome to my portfolio site!',
        options: [
            {
                text: 'Hi!',
                nextText: 2
            },
            {
                text: 'Erm... Hello?',
                nextText: ////////////
            },
        ]
    },
    {
        id: 2,
        text: 'Hope you don\'t mind me asking - are you looking to recruit someone (me?), or just having a look?',
        options: [
            {
                text: 'Just browsing',
                setState: {browsing: false, recruiter: true},
                nextText: 3
            },
            {
                text: 'I need someone!',
                setState: {browsing: true, recruiter: false},
                nextText: 5
            },
            {
                text: 'I\'d rather not say',
                setState: {secretive: true},
                nextText: 3
            }
        ]
    },
    {
        id: 3,
        text: 'Fair enough! Well feel free to browse some more, or we can try and see how engaging our conversations could be with me being an NPC!',
        options: [
            {
                text: 'Like I said, I am just browsing',
                requiredState: (CurrentState) => CurrentState.browsing,
                setState: {noTalk: true},
                nextText: 4
            },
            {
                text: 'Thanks but no thanks',
                requiredState: (CurrentState) => CurrentState.secretive,
                setState: {noTalk: true},
                nextText: 4
            },
            {
                text: 'Sure, I guess',
                nextText: 5
            },
        ]
    },
    {
        id: 4,
        text: 'Okay that\'s fine! Well I\'m still here if you want to ask me anything',
        options: [
            {
                text: 'Okay I am actually a recruiter',
                requiredState: (CurrentState) => CurrentState.secretive,
                setState: {secretive: false, recruiter: true},
                nextText: ////////
            },
            {
                text: 'I guess we could talk',
                nextText: 5
            },
            {
                text: 'Could you tell me about yourself?',
                nextText: ////////
            },
            {
                text: 'I still don\'t want to talk',
                requiredState: (CurrentState) => CurrentState.noTalk,
                setState: {noTalk: false},
                nextText: 4
            },
        ]
    },
    {
        id: 5,
        text: 'That\'s the spirit! So... How\'s the weather wherever you are?',
        options: [
            {
                text: 'Pretty good, suns out',
                nextText: 6
            },
            {
                text: 'Horrible outside',
                nextText: 5
            },
            {
                text: 'Really? The weather?',
                nextText: 3
            }
        ]
    },
    {
        id: 6,
        text: 'Nice... nice... So what\'s your favourite game?',
        options: [
            {
                text: 'Skyrim',
                nextText: 7
            },
            {
                text: 'Outer Wilds',
                nextText: 7
            },
            {
                text: 'Hollow Knight',
                nextText: 7
            },
            {
                text: 'Hades',
                nextText: 7
            },
        ]
    },
    {
        id: 7,
        text: 'Amazing! That\'s my favourite game too! How weird is that we both have the same favourite game...',
        options: [
            {
                text: 'Wow, really weird!',
                nextText: 8
            },
            {
                text: 'Well you didn\'t give me much choice',
                nextText: 9
            }
        ]
    },
    {
        id: 8,
        text: 'What else is the same? Hmmmm favourite music artist?',
        options: [
            {
                text: 'Radiohead',
                nextText: 10
            },
            {
                text: 'Pink Floyd',
                nextText: 10
            },
            {
                text: 'Neil Young',
                nextText: 10
            },
            {
                text: 'Metallica',
                nextText: 10
            },
        ]
    },
    {
        id: 10,
        text: 'No way! We both have the same favourite game, and favourite music artist, what are the odds?...',
        options: [
            {
                text: 'Radiohead',
                nextText: 10
            },
            {
                text: 'Pink Floyd',
                nextText: 10
            },
            {
                text: 'Neil Young',
                nextText: 10
            },
            {
                text: 'Metallica',
                nextText: 10
            },
        ]
    },
    {
        id: 3,
        text: 'What\'s the matter? Never seen an NPC style dialogue system in a portfolio website before?',
        options: [
            {
                text: 'Yeah all the time actually',
                nextText: 5
            },
            {
                text: 'What do you do in your spare time to relax?',
                nextText: 3
            },
            {
                text: 'blahdy blahdy',
                nextText: 3
            }
        ]
    },
    {
        id: 4,
        text: 'I\'m Harry Bradford, a QA tester at Dovetail Games.',
        options: [
            {
                text: 'Tell me a little more about yourself',
                nextText: 3
            },
            {
                text: 'What do you do in your spare time to relax?',
                nextText: 3
            },
            {
                text: 'blahdy blahdy',
                nextText: 3
            }
        ]
    },
    {
        id: 5,
        text: 'Oh really? That\'s embarrassing... Well could you just ignore that, I swear I came up with this on my own.',
        options: [
            {
                text: 'Tell me a little more about yourself',
                nextText: 3
            },
            {
                text: 'What do you do in your spare time to relax?',
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

// what do you look for in a role - Are the employees set up for success? 

// dream - my 15 year old self would say I'm already living the dream in QA, but now I would have to say my dream (like many in this industry) would be to launch my own successful indie game

// requiredState: (CurrentState) => CurrentState.blueGoo,

// setState: {blueGoo: false, sword: true},

// textElement.style.display = hidden;