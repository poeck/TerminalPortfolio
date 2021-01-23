let config = {
    startText: [
        "<center><big><color-4>Welcome to <color-2>yourname</color-2></big>",
        "<color-grey>Type \"help\" to get a List of all availiable Commands!</color-grey></center>"
    ],
    path: "name@example.com:~$ ",
    commands: [
        {command:"Contact", description: "Contact me", action: contact},
        {command:"Links", description: "All my Links", action: link}
    ],
    text: [
        // Tab-Title
        {key: "title", value: "Your Name"},
        // Copyright-text in footer
        {key: "copyright-text", value: "Copyright 2020 Your Name"},
        // Terminal Title
        {key: "title-bar-title", value: "Your Name"}
    ],
    css: [
        // Radius
        {key: "terminal-border-radius", value: "30px"},
        // Colors
        {key: "background", value: "#282c34"},
        {key: "terminal-background", value: "#171a1f"},
        {key: "terminal-shadow", value: "rgba(0, 0, 0, 0.2)"},
        // Navigation-Dots
        {key: "dot-1", value: "#d95763"},
        {key: "dot-2", value: "#ff9a26"},
        {key: "dot-3", value: "#6abe30"},
        // Accent-Colors
        {key: "accent-color-1", value: "#d95763"}, // Default: Red
        {key: "accent-color-2", value: "#ff9a26"}, // Default: Orange
        {key: "accent-color-3", value: "#6abe30"}, // Default: Green
        {key: "accent-color-4", value: "#639bff"}, // Default: Blue
        {key: "accent-color-5", value: "#d77bba"}, // Default: Pink
    ]
}

function link(arguments) {
    const links = [
        {type: "Instagram", link: {text: "@example", url: "https://instagram.com/example"}},
    ];

    let result = "<break><color-4>Socials: </color-4> <break>"

    links.forEach(element => {
        result += "    -   <color-2>" + element.type + ": </color-2><link " + element.link.url +" " + element.link.text + " /><break>"
    })

    return result;
}


function contact(arguments) {
    const contacts = [
        {type: "Email", link: {text: "youremail@example.com", url: "mailto:youremail@example.com"}},
    ];

    let result = "<break><color-4>Contact: </color-4> <break>"

    contacts.forEach(element => {
        result += "    -   <color-2>" + element.type + ": </color-2><link " + element.link.url +" " + element.link.text + " /><break>"
    })

    return result;
}