var terminal = document.getElementById("terminal")
var title = document.getElementById("title-bar-text")
var copyright = document.getElementById("copyright-text")

const colors = ["color-1", "color-2", "color-3", "color-4", "color-5", "color-6", "color-7"]

const availiableCommands = {
  "resume": commandResume,
  "projects": commandProjects,
  "contact": commandContact,
  "links": commandLinks,
  "help": commandHelp,
  "clear": commandClear
}

const defaultDescriptions = {
  "resume": "My resume",
  "projects": "All my projects",
  "contact": "Contact me",
  "links": "My Social Links",
  "help": "List all availiable commands",
  "clear": "Clear the terminal",
}

const configObjects = [
  {key: "commands", required: true, default: {}, command: false},
  {key: "title", required: true, default: "Portfolio", command: false},
  {key: "windowtitle", required: true, default: "Terminal", command: false},
  {key: "copyright", required: true, default: "", command: false},
  {key: "path", required: true, default: "user@example.com:~$ ", command: false},
  {key: "startText", required: true, default: [], command: false},
  {key: "descriptions", required: true, default: defaultDescriptions, command: false},
  {key: "contacts", required: true, default: [], command: true},
  {key: "links", required: true, default: [], command: true},
  {key: "projects", required: true, default: [], command: true},
  {key: "resume", required: true, default: [], command: true},
  {key: "colors", required: true, default: {}},
]

var lastInputField;
const commands = {}

if(config == undefined) var config = {};

function app() {

  checkConfig();

  Object.entries(config.commands).forEach(([key, value]) => {
    if(value == true) {
      commands[key] = {text: availiableCommands[key], description: config.descriptions[key]}
    }
  })

  commands["help"] = {text: commandHelp, description: config.descriptions["help"]}

  Object.entries(config.colors).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value);
  })

  title.innerHTML = config.windowtitle
  copyright.innerHTML = config.copyright

  document.title = config.title

  document.body.addEventListener("click", () => {
    lastInputField.focus();
  })

  startText();
}

function checkConfig() {
 
  configObjects.forEach(element => {
    var configObject = config[element.key];

    if(element.required) {
      if(configObject == undefined) {
        config[element.key] = element.default
        console.log(element.key, "not set - used default value:", element.default)
      } else {
        console.log(element.key, "set!")
      }
    }
  })
}

function startText() {
  var result = ""

  config.startText.forEach(element => {
    result += element;
    result += "<break>"
  })

  setText(result)
}

function setText(text) {
  var words = [];
  var currentColor = "";
  var lastDiv;
  var cleared = false;
  var centered = false;
  var big = false;

  var div = document.createElement("div")
  div.className = "break-box"
  terminal.appendChild(div)
  lastDiv = div;

  if(text !== undefined) words = splitByTags(text)

  words.forEach((word, index) => {
    if(word[0] == "<") { // Check if tag
      if(word[1] !== "/") { // If open tag
        var tag = word.substring(1, word.length -1)
        var arguments = tag.split(" ")

        if(colors.includes(arguments[0])){ // Color tag
          currentColor = arguments[0];
        } else if (arguments[0] == "break") {
          var div = document.createElement("div")
          div.classList.add("break-box")

          if(centered) div.classList.add("center-text")
          if(big) div.classList.add("big-box")

          terminal.appendChild(div)
          lastDiv = div;
        } else if (arguments[0] == "link") {
          var link = arguments[1];
          var text = arguments[2]

          var span = document.createElement("span")
          span.innerHTML = text + " ";
          span.classList.add("link")
          if(currentColor !== "") span.classList.add(currentColor)
          span.addEventListener("click", () => { if(link !== "#") window.open(link) })
          lastDiv.appendChild(span)
        } else if (arguments[0] == "clear") {
          cleared = true;

          terminal.children = [];
          terminal.innerHTML = [];
        
          words = [];
          currentColor = "";
          lastDiv;
          
          var div = document.createElement("div")
          div.className = "break-box"
          terminal.appendChild(div)
          lastDiv = div;
        } else if (arguments[0] == "center") {
          lastDiv.classList.add("center-text")
          centered = true;
        } else if (arguments[0] == "big") {
          lastDiv.classList.add("big-box")
          big = true;
        }

      } else {
        var tag = word.substring(2, word.length -1)
        var arguments = tag.split(" ")

        if(colors.includes(arguments[0])){ // Color tag
          currentColor = "";
        } else if (arguments[0] == "center") {
          centered = false;
        } else if (arguments[0] == "big") {
          big = false;
        }
      }
    } else {
      if(word !== " ") {
        if(currentColor == "") {
          var span = document.createElement("span")
          span.innerHTML = word + " ";
          if(big) span.classList.add("big")

          lastDiv.appendChild(span)
        } else {
          var span = document.createElement("span")
          span.innerHTML = word + " ";

          span.classList.add(currentColor)
          if(big) span.classList.add("big")

          lastDiv.appendChild(span)
        }
      }
    }
  });

  if(!cleared) {
    var div = document.createElement("div")
    div.className = "break-box"
    terminal.appendChild(div)
    lastDiv = div
  }

  var span = document.createElement("span")
  span.innerHTML = config.path;
  span.className = "path"
  lastDiv.appendChild(span)

  var input = document.createElement("input")
  input.type = "text"
  input.autofocus = "true";
  input.className = "terminal-input"
  lastInputField = input
  lastDiv.appendChild(input)
  lastInputField.focus();

  input.addEventListener("keyup", function(event) {
    if (event.keyCode == 13) {
      event.preventDefault();
      submit();
    } else {
      return true;
    }
  });
}

function submit() {
  var fullCommand = lastInputField.value.toLowerCase();
  var command = fullCommand.split(" ")[0]

  if(commands[command] !== undefined) {
    setText(commands[command].text(fullCommand))
  } else {
    notFound(command);
  }
}

function splitByTags(str){
  let htmlSplit = str.split(">")
  let array= []

  htmlSplit.forEach(element => {
    if(element.includes("<")) {
      if(element[0] !== "<") {
        var children = element.split("<")
        children.forEach((element, index) => {
          if(index == 0) array.push(element)
          else array.push("<" + element + ">")
        })
      } else {
        array.push(element + ">")
      }
    } else {
      array.push(element)
    }
  })

  return array
}

function notFound(command) {
  setText("<break>Command <color-2>" + String(command) + "</color-2>not found!<break>Type \"help\" to get a list of all commands.<break>")
}

function commandHelp() {
  var result = "<break><color-3>Commands:</color-3><break>"
  Object.entries(commands).forEach(([key, value]) => {
    result += "    -   <color-5>" + key + "  <color-7> " + value.description + " </color-7><break>"
  })

  return result;
}

function commandContact() {
  var result = "<break><color-3>Contact: </color-3> <break>"

  config.contacts.forEach(element => {
    result += "    -   <color-5>" + element.type + ": </color-5><link " + element.link.url +" " + element.link.text + " /><break>"
  })

  return result;
}

function commandLinks() {
  var result = "<break><color-3>Links: </color-3> <break>"

  config.links.forEach(element => {
    result += "    -   <color-5> " + element.platform + ":  </color-5><link " + element.link.url +" " + element.link.text + " /><break>"
  })
  return result;
}

function commandClear() {
  var result = "<clear>"
  return result;
}

function commandProjects(command) {
  var result = "<break><color-3>Projects: </color-3><break><break>"
  config.projects.forEach(category => {
    result += "  " + category.title + "<break>"

    category.values.forEach(project => {
      result += "    -   <color-5><link " + project.link + " " + project.title + "><color-2>    " + project.type + "  <color-6> " + project.languages + " <color-4> " + project.description + "  </color-4><break>" 
    })
  })

  return result;
}

function commandResume(command) {
  var result = ""

  config.resume.forEach(element => {
    result += element;
    result += "<break>"
  })

  return result;
}

app();