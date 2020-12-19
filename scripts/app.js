const terminal = document.getElementById("terminal")

const colors = ["color-1", "color-2", "color-3", "color-4", "color-5", "color-white", "color-grey"]
const defaultCommands = {
  "help": {description:"Show All Commands", action: help},
  "clear": {description:"Clear Terminal", action: clear}
}

function app() {
  addEventListener("load", function() {
    var viewport = document.querySelector("meta[name=viewport]");
    viewport.setAttribute("content", viewport.content + ", height=" + window.innerHeight);
  })

  config.text.forEach(element => {
    let text = document.getElementById(element.key)
    if(text !== null) text.innerHTML = element.value
  })

  config.css.forEach(element => {
    document.documentElement.style.setProperty("--" + element.key, element.value);
  })

  document.body.addEventListener("click", () => {
    lastInputField.focus();
    terminal.scrollLeft = 0;
  })

  print(config.startText)
}

function print(text) {

  if(Array.isArray(text)) {
    var result = ""
  
    text.forEach(element => {
      result += element;
      result += "<break>"
    })
  
    text = result;
  } 

  let tags = [];
  let currentColor = "";
  let lastDiv;
  let centered = false;
  let big = false;

  let div = document.createElement("div")
  div.className = "line"
  terminal.appendChild(div)

  lastDiv = div;

  if(text !== undefined) tags = splitByTags(text)

  tags.forEach((word, index) => {
    if(word[0] == "<") { // Check if tag
      if(word[1] !== "/") { // If open tag
        let tag = word.substring(1, word.length -1)
        let arguments = tag.split(" ")

        if(colors.includes(arguments[0])){ // Color tag
          currentColor = arguments[0];
        } else if (arguments[0] == "break") {
          let div = document.createElement("div")
          div.classList.add("line")

          if(centered) div.classList.add("center-text")
          if(big) div.classList.add("big-box")

          terminal.appendChild(div)
          lastDiv = div;
        } else if (arguments[0] == "link") {
          let link = arguments[1];
          let text = arguments[2]

          let span = document.createElement("span")
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
          
          let div = document.createElement("div")
          div.className = "line"
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
        let tag = word.substring(2, word.length -1)
        let arguments = tag.split(" ")

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
          let span = document.createElement("span")
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

  let line = document.createElement("div")
  line.className = "line"
  terminal.appendChild(line)
  lastDiv = line

  // Add Path
  let path = document.createElement("span")
  path.innerHTML = config.path;
  path.className = "path"
  lastDiv.appendChild(path)

  // Add Input
  var input = document.createElement("input")
  input.type = "text"
  input.autofocus = "true";
  input.className = "terminal-input"
  lastInputField = input
  lastDiv.appendChild(input)
  lastInputField.focus();

  // Listen Input
  input.addEventListener("keyup", function(event) {
    if (event.keyCode == 13) {
      event.preventDefault();
      submit();
    } else {
      return true;
    }
  });

  terminal.scrollLeft = 0;
}

function submit() {
  let string = lastInputField.value.toLowerCase();
  let arguments = string.split(" ")
  let command = arguments[0];

  if(defaultCommands[command] !== undefined) {
    print(defaultCommands[command].action(arguments))
  } else {
    let found = false;
    
    config.commands.forEach(element => {
      if(element.command.toLowerCase() == command) {
        found = true;
        print(element.action(arguments))
      }
    })

    if(!found) notFound(command);
  }

  terminal.scrollLeft = 0;
}

function clear() {
  terminal.innerHTML = [];
}

function help() {
  var result = "<break><color-4>Commands:</color-4><break>"
  Object.entries(defaultCommands).forEach(([key, value]) => {
    result += "    -   <color-2>" + key + "  <color-grey> " + value.description + " </color-grey><break>"
  })

  config.commands.forEach(element => {
    result += "    -   <color-2>" + element.command + "  <color-grey> " + element.description + " </color-grey><break>"
  })

  return result;
}

function notFound(command) {
  print("<break>Command <color-2>" + String(command) + "</color-2>not found!<break>Type \"help\" to get a list of all commands.<break>")
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

app();