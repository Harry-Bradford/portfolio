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

function scrollHandler() {
  var element = document.getElementById('dialogue');

  var distanceToTop = window.pageYOffset - 450 + element.getBoundingClientRect().top;
  var elementHeight = element.offsetHeight;
	var scrollTop = document.documentElement.scrollTop;
	
	var opacity = 1;
	
	if (scrollTop > distanceToTop) {
		opacity = 1 - (scrollTop - distanceToTop) / elementHeight;
	}
	
	if (opacity >= 0) {
		element.style.opacity = opacity;
	}}

window.addEventListener('scroll', scrollHandler);


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



// Portfolio filter functionality
class PortfolioFilter {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.portfolioItems = document.querySelectorAll('.portfolio-item');
        this.init();
    }

    init() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => this.handleFilter(e));
        });
    }

    handleFilter(e) {
        const targetButton = e.currentTarget;
        const filterValue = targetButton.dataset.filter;

        // Update active button state
        this.updateActiveButton(targetButton);

        // Filter portfolio items
        this.filterItems(filterValue);
    }

    updateActiveButton(activeButton) {
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        activeButton.classList.add('active');
    }

    filterItems(category) {
        this.portfolioItems.forEach(item => {
            const itemCategories = item.dataset.category.split(' ');
            
            if (category === 'all' || itemCategories.includes(category)) {
                this.showItem(item);
            } else {
                this.hideItem(item);
            }
        });
    }

    showItem(item) {
        item.classList.remove('hide');
        // Force reflow for smooth animation
        void item.offsetWidth;
    }

    hideItem(item) {
        item.classList.add('hide');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioFilter();
});



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
        text: 'Hi there, welcome to my portfolio!',
        options: [
            {
                text: 'Hello...',
                nextText: 4
            },
            {
                text: 'Who are you?',
                nextText: 4
            },
            {
                text: 'I just want to browse.',
                nextText: 2
            },
        ]
    },
    {
        id: 2,
        text: 'No problem! I\'ll just be up here if you want to ask me anything.',
        options: [
            {
                text: 'Okay I\'d like to ask you something.',
                setState: {browsing: true, recruiter: false},
                nextText: 3
            }
        ]
    },
    {
        id: 3,
        text: 'Of course, shoot!',
        options: [
            {
                text: 'Who are you?',
                nextText: 4
            }
        ]
    },
    {
        id: 4,
        text: 'My name is Harry! I\'m a QA Tester at Dovetail Games and a hobbyist game dev.',
        options: [
            {
                text: 'QA?',
                nextText: 5
            },
            {
                text: 'Game Dev?',
                nextText: 18
            },
            {
                text: 'Tell me more about yourself.',
                nextText: 24
            },
        ]
    },
    {
        id: 5,
        text: 'I\'ve been in QA for over 5 years, working across games, websites, and mobile apps in the games and e-commerce industries.',
        options: [
            {
                text: 'Is there anything special you bring to QA?',
                nextText: 6
            },
            {
                text: 'What are you currently doing?',
                nextText: 12
            },
            {
                text: 'Why QA?',
                nextText: 15
            },
            {
                text: 'Let\'s talk about something else.',
                nextText: 4
            },
        ]
    },
    {
        id: 6,
        text: 'Well, I am skilled in both manual and automated testing, I have plenty of technical knowledge, and a great understanding of the entire development pipeline of the software.',
        options: [
            {
                text: 'What automated testing experience do you have?',
                nextText: 7
            },
            {
                text: 'Tell me about your technical knowledge.',
                nextText: 8
            },
            {
                text: 'The pipeline?',
                nextText: 10
            },
            {
                text: 'Let\'s discuss other QA topics.',
                nextText: 5
            }
        ]
    },
    {
        id: 7,
        text: 'Maintaining and debugging our automated testing engine at thinkTRIBE, and creating scripts to simulate users navigating websites and mobile apps.',
        options: [
            {
                text: 'Tell me again about your QA specializations.',
                nextText: 6
            },
        ]
    },
    {
        id: 8,
        text: 'With experience as an engineer, I know how a lot of systems work in the back-end. Along with my development in technical art - knowing 3D software and engines, I have a deeper understanding of the underlying problems behind many bugs.',
        options: [
            {
                text: 'How else does that help in QA?',
                nextText: 9
            },
        ]
    },
    {
        id: 9,
        text: 'I have experience not only in finding bugs, but also fixing those bugs myself. I know exactly what is helpful for devs when discussing and troubleshooting bugs.',
        options: [
            {
                text: 'Tell me again about your QA specializations.',
                nextText: 6
            },
        ]
    },
    {
        id: 10,
        text: 'I have a detailed understanding of how different teams operate to create software from shadowing developers, artists, technical artists, and designers. This is reinforced further by my projects outside of work, having a hand in QA, design, code, and art.',
        options: [
            {
                text: 'Have you created anything that is player-facing at Dovetail?',
                nextText: 11
            },
        ]
    },
    {
        id: 11,
        text: 'I have! I\'ve created data assets and PCG graphs for procedural building generation, accurately based on New York City, as well as environment shaders, both for Metro Rivals.',
        options: [
            {
                text: 'Tell me again about your QA specializations.',
                nextText: 6
            },
        ]
    },
    {
        id: 12,
        text: 'I am currently leading small tight-knit teams, testing various DLCs for our games, Train Sim World and other projects.',
        options: [
            {
                text: 'What tools do you use?',
                nextText: 13
            },
            {
                text: 'Any additional responsibilities?',
                nextText: 14
            },
            {
                text: 'Let\'s discuss other QA topics.',
                nextText: 5
            },
        ]
    },
    {
        id: 13,
        text: 'Outside of the games, most of my time is spent in Jira, Confluence, and Excel. I also regularly use Jenkins, Perforce and Unreal Engine when embedded testing.',
        options: [
            {
                text: 'What are you doing again?',
                nextText: 14
            },
        ]
    },
    {
        id: 14,
        text: 'Many! I create documentation hubs, develop tools, manage external test vendors, and even provide feedback on design and art.',
        options: [
            {
                text: 'What are you doing again?',
                nextText: 14
            }
        ]
    },
    {
        id: 15,
        text: 'Working for a game studio has always been a dream of mine and having such a crucial role in improving the quality of the game and making the experience better for the players is incredibly rewarding!',
        options: [
            {
                text: 'What do you enjoy most about QA?',
                nextText: 16
            },
            {
                text: 'What makes you a good QA tester?',
                nextText: 17
            },
            {
                text: 'Let\'s discuss other QA topics.',
                nextText: 5
            }
        ]
    },
    {
        id: 16,
        text: 'Oh, easily the investigation stage after finding a bug! I love figuring out why something is happening and how to reproduce it. Otherwise, it\'s finding ways to improve the team\'s morale and efficiency with finding new workflows or creating tools.',
        options: [
            {
                text: 'Let\'s go back.',
                nextText: 15
            },
        ]
    },
    {
        id: 17,
        text: 'I am thorough and meticulous in understanding how features work and finding edge-cases, ways you wouldn\'t expect it to behave, and I\'m a great communicator so the current quality of games are truly understood by other departments.',
        options: [
            {
                text: 'Let\'s go back.',
                nextText: 15
            },
        ]
    },
    {
        id: 18,
        text: 'Yes! I am currently part of a small team with multiple ongoing projects, having fun while also developing my skills and trying to succeed as an indie developer.',
        options: [
            {
                text: 'What role do you have in your team?',
                nextText: 19
            },
            {
                text: 'What are the games that inspire you most?',
                nextText: 23
            },
            {
                text: 'Let\'s talk about something else.',
                nextText: 4
            },
        ]
    },
    {
        id: 19,
        text: 'Technical Artist, but I tend to take on many technical tasks. I enjoy working across disciplines and helping find solutions when something sits between art, design and programming.',
        options: [
            {
                text: 'Why Technical Art?',
                nextText: 20
            },
            {
                text: 'What do you specialize in?',
                nextText: 21
            },
            {
                text: 'What game engines do you have experience in?',
                nextText: 22
            },
            {
                text: 'You were saying about your game dev side-projects?',
                nextText: 18
            },
        ]
    },
    {
        id: 20,
        text: 'I have always loved art as a hobby, so combining it with my other passion in programming is the dream! Having such an impact on the quality of a game\'s art is something that really drives me.',
        options: [
            {
                text: 'Tell me about your role in the team.',
                nextText: 19
            },
        ]
    },
    {
        id: 21,
        text: 'Shaders and VFX are my specialties. Any excuse to make something beautiful with code!',
        options: [
            {
                text: 'Tell me about your role in the team.',
                nextText: 19
            },
        ]
    },
    {
        id: 22,
        text: 'Mostly Unreal Engine for my daily work, but I use Godot for projects outside of work. I also have experience with proprietary engines from developing mods for different games.',
        options: [
            {
                text: 'Tell me about your role in the team.',
                nextText: 19
            },
        ]
    },
    {
        id: 23,
        text: 'My favourite games are those that have a strong identity, are truly innovative, and aren\'t afraid to push their genre in a new direction.',
        options: [
            {
                text: 'You were saying about your game dev side-projects?',
                nextText: 18
            },
        ]
    },
    {
        id: 24,
        text: 'You know, I am motivated most by learning new things. In fact, I\'ve never stopped learning, from teaching myself how to code at uni, to now learning game development. I most likely never will stop, there is always room to grow!',
        options: [
            {
                text: 'What role are you looking for?',
                nextText: 25
            },
            {
                text: 'What do you look for in a team?',
                nextText: 26
            },
            {
                text: 'Where do you see yourself in the next 5 years?',
                nextText: 25
            },
            {
                text: 'Let\'s talk about something else.',
                nextText: 4
            },
        ]
    },
    {
        id: 25,
        text: 'I am searching for a role that is more than just traditional testing. I want to work closely with developers and help improve quality not only in the product but across the company as a whole.',
        options: [
            {
                text: 'Tell me about yourself again.',
                nextText: 24
            },
        ]
    },
    {
        id: 26,
        text: 'Are the team members set up for success, with good communication, collaboration, and a positive environment? If not, is the team open minded to change the practices? This is crucial to us as employees, and the company as a whole, to create the best game possible for the players.',
        options: [
            {
                text: 'Tell me about yourself again.',
                nextText: 24
            },
        ]
    },
    {
        id: 27,
        text: 'No matter what role I am in, I see myself in a position where I\'m leading projects, and becoming a mentor, ideally helping those less experienced.',
        options: [
            {
                text: 'What is your long term career goal?',
                nextText: 28
            }
        ]
    },
    {
        id: 28,
        text: 'I would like to be a games industry veteran and spend many many years doing what I love! But, also to release my own indie game that has its own following and community, like the ones I include myself in now.',
        options: [
            {
                text: 'Tell me about yourself again.',
                nextText: 24
            },
        ]
    }    
]

startGame()

// Example of dialogue script:
// const textnodes = [
//     {
//         id: 1,
//         text: 'Hi there, welcome to my portfolio site!',
//         options: [
//             {
//                 text: 'Hello...',
//                 nextText: 2
//             },
//             {
//                 text: 'Tell me about yourself.',
//                 setState: {engToGame: true},
//                 nextText: 20
//             },
//             {
//                 text: 'So you\'ve gone from engineering to gaming?',
//                 requiredState: (CurrentState) => CurrentState.engToGame,
//                 nextText: 25
//             },
//         ]
//     },
// ]