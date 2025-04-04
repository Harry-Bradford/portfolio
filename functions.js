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
                setState: {teamQuestion: true, ourTeam: false},
                nextText: 2
            },
            {
                text: 'Erm... Hello?',
                setState: {teamQuestion: true, ourTeam: false},
                nextText: 15
            },
        ]
    },
    {
        id: 2,
        text: 'Hope you don\'t mind me asking - are you looking to recruit someone (me?), or just having a look?',
        options: [
            {
                text: 'Just browsing',
                setState: {browsing: true, recruiter: false},
                nextText: 3
            },
            {
                text: 'I need someone!',
                setState: {browsing: false, recruiter: true},
                nextText: 19
            }
        ]
    },
    {
        id: 3,
        text: 'Fair enough! Well feel free to browse some more, or we can try and see how engaging our conversations could be with me being an NPC?',
        options: [
            {
                text: 'Like I said, I am just browsing',
                nextText: 4
            },
            {
                text: 'Sure, I guess',
                nextText: 6
            },
        ]
    },
    {
        id: 4,
        text: 'Okay that\'s fine! Well I\'ll be here if you want to ask me anything',
        options: [
            {
                text: 'Okay I am actually a recruiter',
                nextText: 19
            },
            {
                text: 'I guess we could talk',
                nextText: 6
            },
            {
                text: 'Can we start over?',
                nextText: 5
            },
        ]
    },
    {
        id: 5,
        text: 'Good idea!',
        options: [
            {
                text: 'Thank you',
                nextText: 1
            },
        ]
    },
    {
        id: 6,
        text: 'That\'s the spirit! So... How\'s the weather wherever you are?',
        options: [
            {
                text: 'Pretty good, suns out',
                nextText: 8
            },
            {
                text: 'Horrible outside',
                nextText: 7
            },
            {
                text: 'Really? The weather?',
                nextText: 40
            }
        ]
    },
    {
        id: 40,
        text: 'Well I\'m sorry just trying to make conversation! What do YOU want to talk about?',
        options: [
            {
                text: 'It\'s fine, carry on',
                nextText: 8
            },
            {
                text: 'Nothing',
                nextText: 4
            },
            {
                text: 'Why don\'t I ask you something?',
                nextText: 19
            }
        ]
    },
    {
        id: 7,
        text: 'Well that\'s annoying! Hope that isn\'t getting you too down.',
        options: [
            {
                text: 'I\'m fine.',
                nextText: 8
            },
            {
                text: 'I am miserable. I want to stop talking.',
                nextText: 4
            },
        ]
    },
    {
        id: 8,
        text: 'Nice, nice... So... what\'s your favourite game?',
        options: [
            {
                text: 'Skyrim',
                nextText: 9
            },
            {
                text: 'Outer Wilds',
                nextText: 9
            },
            {
                text: 'Hollow Knight',
                nextText: 9
            },
            {
                text: 'Stardew Valley',
                nextText: 9
            },
        ]
    },
    {
        id: 9,
        text: 'Amazing! That\'s my favourite game too! How weird is that we both have the same favourite game...',
        options: [
            {
                text: 'Wow, really weird!',
                nextText: 10
            },
            {
                text: 'Well you didn\'t give me much choice',
                nextText: 14
            }
        ]
    },
    {
        id: 10,
        text: 'What else is the same? Hmmmm favourite music artist?',
        options: [
            {
                text: 'Radiohead',
                nextText: 11
            },
            {
                text: 'Pink Floyd',
                nextText: 11
            },
            {
                text: 'Neil Young',
                nextText: 11
            },
            {
                text: 'Metallica',
                nextText: 11
            },
        ]
    },
    {
        id: 11,
        text: 'No way! We both have the same favourite game, and favourite music artist, what are the odds?',
        options: [
            {
                text: 'Very impossible...',
                nextText: 12
            },
            {
                text: 'Okay I\'m stopping this now',
                nextText: 14
            },
        ]
    },
    {
        id: 12,
        text: 'Oooh I know! Favourite movie??',
        options: [
            {
                text: 'Spirited Away',
                nextText: 13
            },
            {
                text: 'Interstellar',
                nextText: 13
            },
            {
                text: 'Kill Bill',
                nextText: 13
            },
            {
                text: 'Kung Fu Panda',
                nextText: 13
            },
        ]
    },
    {
        id: 13,
        text: 'NO WAY! Are you cheating?',
        options: [
            {
                text: 'Please stop',
                nextText: 14
            },
            {
                text: 'Okay that\'s enough now',
                nextText: 14
            },
        ]
    },
    {
        id: 14,
        text: 'Okay you got me, I\'ll stop now... So what else can we talk about?',
        options: [
            {
                text: 'I am not speaking to you',
                nextText: 4
            },
            {
                text: 'Why don\'t I ask you something?',
                nextText: 19
            },
        ]
    },
    {
        id: 15,
        text: 'What\'s the matter? Never seen an NPC style dialogue system in a portfolio website before?',
        options: [
            {
                text: 'Yeah all the time actually',
                nextText: 16
            },
            {
                text: 'I guess not',
                nextText: 18
            },
            {
                text: 'This is pretty weird',
                nextText: 17
            }
        ]
    },
    {
        id: 16,
        text: 'Oh really? That\'s embarrassing... Well could you just ignore that, I SWEAR I came up with this on my own.',
        options: [
            {
                text: 'Fine I will ignore it',
                nextText: 18
            },
            {
                text: 'Can we just move this along?',
                nextText: 18
            }
        ]
    },
    {
        id: 17,
        text: 'You don\'t like it? I thought it would add a personal touch, you can get to know me! Or we can have a conversation about anything?',
        options: [
            {
                text: 'Okay fine, tell me about yourself then',
                nextText: 20
            },
            {
                text: 'I guess we can have a conversation',
                nextText: 6
            },
            {
                text: 'No I don\'t, leave me alone',
                nextText: 4
            }
        ]
    },
    {
        id: 18,
        text: 'Nice! So is there anything you want to ask me?',
        options: [
            {
                text: 'Can you tell me a little about yourself?',
                nextText: 20
            },
            {
                text: 'No I don\'t, leave me alone',
                nextText: 4
            }
        ]
    },
    {
        id: 19,
        text: 'Great! Feel free to ask me some questions and hopefully you like what you see and hear.',
        options: [
            {
                text: 'Tell me about yourself',
                nextText: 20
            },
            {
                text: 'So you\'ve gone from engineering to gaming?',
                nextText: 25
            },
            {
                text: 'What can you bring to our team that\'s different?',
                nextText: 31
            },
            {
                text: 'What do you look for in a team?',
                nextText: 32
            },
        ]
    },
    {
        id: 20,
        text: 'I am an incredibly dedicated QA tester with a background in programming and engineering, having over 4 years of professional experience. My strong work ethic and passion for creation, paired with my diverse background, I hope makes me a great addition to any team.',
        options: [
            {
                text: 'What motivates you?',
                nextText: 21
            },
            {
                text: 'What do you like to do in your down time?',
                nextText: 22
            },
            {
                text: 'Where do you see yourself in the next 5 years?',
                nextText: 24
            },
            {
                text: 'I would like to ask you something else',
                nextText: 19
            },
        ]
    },
    {
        id: 21,
        text: 'I am a lifelong learner, my biggest motivation is gaining new knowledge and being able to achieve what I previously could not. Finding a way to apply my learning is what excites me, whether in programming, or art, the ability to create something new is my passion.',
        options: [
            {
                text: 'What do you like to do in your down time?',
                nextText: 22
            },
            {
                text: 'Where do you see yourself in the next 5 years?',
                nextText: 24
            },
            {
                text: 'I would like to ask you something else',
                nextText: 19
            },
        ]
    },
    {
        id: 22,
        text: 'Whenever you are reading this, chances are I\'m probably trying to create some kind of game, or I\'m playing one! If not, then I relax by watching a movie, or playing board games with my wife and family.',
        options: [
            {
                text: 'Any other hobbies or activities?',
                nextText: 23
            },
        ]
    },
    {
        id: 23,
        text: 'Yes, I love to swim! I compete in galas throughout the year and try to train every morning. A big motivation for me is that there is always room for growth, I can always improve my race times, and hopefully pick up some medals on the way.',
        options: [
            {
                text: 'What motivates you?',
                nextText: 21
            },
            {
                text: 'Where do you see yourself in the next 5 years?',
                nextText: 24
            },
            {
                text: 'I would like to ask you something else',
                nextText: 19
            },
        ]
    },
    {
        id: 24,
        text: 'I\'m someone who always has to be developing and improving, whether that\'s technical skills, or soft skills, there\'s always an opportunity to grow. That said, I see myself in the position where I\'m leading projects, and ideally helping those less experienced.',
        options: [
            {
                text: 'What is your long term career goal?',
                nextText: 33
            }
        ]
    },
    {
        id: 25,
        text: 'I enjoyed Engineering, especially the maths and lab work. But, after using C to program our robots, I fell in love with programming. I landed a job at thinkTribe the week before starting a masters in Computer Science. The games industry always felt like one of those "dream jobs" beyond me, but I took the leap and a big paycut to do something I was really passionate about.',
        options: [
            {
                text: 'What is a game that has inspired you?',
                nextText: 26
            },
        ]
    },
    {
        id: 26,
        text: 'Wow there are so many, I refuse to pick just one! I will have to go with Stardew Valley, Outer Wilds, The Witness, and Disco Elysium.',
        options: [
            {
                text: 'Stardew Valley?',
                nextText: 27
            },
            {
                text: 'Outer Wilds?',
                nextText: 28
            },
            {
                text: 'The Witness?',
                nextText: 29
            },
            {
                text: 'Disco Elysum?',
                nextText: 30
            },
        ]
    },
    {
        id: 27,
        text: 'The game that I have put an embarrassingly huge amount of life into. This is what made me so passionate about games, what motivated me to play different games outside of the biggest AAA titles, and the fact it was made by one person, made me seriously think about the games industry as a career.',
        options: [
            {
                text: 'Outer Wilds?',
                nextText: 28
            },
            {
                text: 'The Witness?',
                nextText: 29
            },
            {
                text: 'Disco Elysum?',
                nextText: 30
            },
            {
                text: 'I would like to ask you something else',
                nextText: 20
            },
        ]
    },
    {
        id: 28,
        text: 'I think Outer Wilds is the single greatest gameplay experience I have ever had, becoming truely lost in the game, actually feeling like an astronaut/archaeologist! The way you discover and solve problems throughout the game by sheer exploration has really made me think about the possibilities and impact that games can have.',
        options: [
            {
                text: 'Stardew Valley?',
                nextText: 28
            },
            {
                text: 'The Witness?',
                nextText: 29
            },
            {
                text: 'Disco Elysum?',
                nextText: 30
            },
        ]
    },
    {
        id: 29,
        text: 'This is one of the most unique games I have ever played, it\'s absolutely beautiful and the puzzles are actually part of the environment, amazing! But my favourite part about the game is how it teaches mechanics to the player, without hardly any tutorials. Getting the puzzles correct makes you feel like you have 250 IQ',
        options: [
            {
                text: 'Stardew Valley?',
                nextText: 28
            },
            {
                text: 'Outer Wilds?',
                nextText: 29
            },
            {
                text: 'Disco Elysum?',
                nextText: 30
            },
        ]
    },
    {
        id: 30,
        text: 'An incredible game, not just narratively, but this is the title that inspired me just from how beautiful it is. It made me really think about artstyle in games and nudged me towards looking at technical art. This along with games like Return of the Obra Dinn, Journey, and Inscryption, has motivated me to one day make games that wow you from the visuals.',
        options: [
            {
                text: 'Stardew Valley?',
                nextText: 28
            },
            {
                text: 'Outer Wilds?',
                nextText: 29
            },
            {
                text: 'The Witness?',
                nextText: 30
            },
        ]
    },
    {
        id: 31,
        text: 'Being a passionate gamer, in addition to coming from QA, I feel that I have a very strong ability to put myself in the players mind. That paired with my programming and engineering experience, makes me a decent problem solver who often consistently thinks outside of the box for solutions.',
        options: [
            {
                text: 'I would like to ask you something else',
                nextText: 19
            },
        ]
    },
    {
        id: 32,
        text: 'Are the team members set up for success, where there is there good communication, collaboration, and it is a positive environment? If not, is the team open minded to change the practices? These are crucial factors for us as employees, and the company as a whole, in order to create the best game possible for the players.',
        options: [
            {
                text: 'I would like to ask you something else',
                nextText: 19
            },
        ]
    },
    {
        id: 33,
        text: 'I would like to be one of the games industry veterans and spend many many years doing what I love! But, my BIGGEST dream would be to release my own indie game that has its own following and community, like the ones I include myself in now.',
        options: [
            {
                text: 'I would like to ask you something else',
                nextText: 19
            },
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