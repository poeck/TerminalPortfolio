var config = {
    title: "Your Name", // 
    windowtitle: "yourname.com", // Terminal Title
    copyright: "Copyright Year Name", //
    path: "user@yourname.com:~$ ",
    startText: [
        "<center><big><color-5>Welcome to <color-3>yourname</color-5></big>",
        "<color-7>Type \"help\" to get a List of all availiable Commands!</white></center>"
    ],
    commands: {
        "resume": true,
        "projects": true,
        "contact": true,
        "links": true,
        "clear": true,
    },
    descriptions: {
        "resume": "My resume",
        "projects": "All my projects",
        "contact": "Contact me",
        "links": "My Social Links",
        "help": "List all availiable commands",
        "clear": "Clear the terminal",
    },
    contacts: [
        {type: "Email", link: {text: "youremail@example.com", url: "mailto:youremail@example.com"}},
    ],
    links: [  
        {platform: "Github", link: {text: "github.com/username", url: "https://github.com/username"}},
    ],
    projects: [
        {
            title: "Category 1",
            values: [
                {
                    title: "Project1", 
                    type: "App", 
                    languages: "Javascript",
                    description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam", 
                    link: "http://example.com"
                }
            ]
        },
        {
            title: "Category 2",
            values: [
                {
                    title: "Project2", 
                    type: "App", 
                    languages: "Javascript",
                    description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam", 
                    link: "http://example.com"
                }
            ]
        }
    ],
    resume: [
        "<color-3><center><big>Resume</big></center></color-3>",
        "<color-5><center>My Resume</center></color-5>",
    ],
    colors: {
        "--background": "#282c34",
        "--terminal-background": "#171a1f",
        "--terminal-shadow": "rgba(0, 0, 0, 0.2)",

        "--accent-color-1": "#fff",
        "--accent-color-2": "#d95763",
        "--accent-color-3": "#ff9a26",
        "--accent-color-4": "#6abe30",
        "--accent-color-5": "#639bff",
        "--accent-color-6": "#d77bba",
        "--accent-color-7": "rgb(194, 194, 194)",

        "--path": "rgb(221, 221, 221)",
        "--title-bar-text": "rgba(255, 255, 255, 0.7)",
        "--footer": "rgba(255, 255, 255, 0.5)",
    }
}