const container = document.createElement("div");
const textarea = document.createElement("textarea");
const keyID = [
    ["Backquote", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Minus", "Equal", "Backspace"],
    ["Tab", "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight", "Backslash"],
    ["CapsLock", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote", "Enter"],
    ["ShiftLeft", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash", "ArrowUp", "Language"],
    ["ControlLeft", "MetaLeft", "AltLeft", "Space", "AltRight", "ControlRight", "Delete", "ArrowLeft", "ArrowDown", "ArrowRight"],

];

const keysEn = [
    "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace",
    "Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\",
    "CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter",
    "Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "&#9650;", "Рус",
    "Ctrl", "Win", "Alt", " ", "Alt", "Ctrl", "Del", "&#9668;", "&#9660;", "&#9658;",
];

const keysEnShift = [
    "~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "Backspace",
    "Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "{", "}", "|",
    "CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ":", "\"", "Enter",
    "Shift", "z", "x", "c", "v", "b", "n", "m", "<", ">", "?", "&#9650;", "Рус",
    "Ctrl", "Win", "Alt", " ", "Alt", "Ctrl", "Del", "&#9668;", "&#9660;", "&#9658;",
];
const keysRu = [
    "ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace",
    "Tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "\\",
    "CapsLock", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "Enter",
    "Shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "&#9650;", "En",
    "Ctrl", "Win", "Alt", " ", "Alt", "Ctrl", "Del", "&#9668;", "&#9660;", "&#9658;",
];
const keysRuShift = [
    "Ё", "!", "\"", "№", ";", "%", ":", "?", "*", "(", ")", "_", "+", "Backspace",
    "Tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "|",
    "CapsLock", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "Enter",
    "Shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ",", "&#9650;", "En",
    "Ctrl", "Win", "Alt", " ", "Alt", "Ctrl", "Del", "&#9668;", "&#9660;", "&#9658;",
];

let capslock = false;
let shift = false;
let lang = keysEn;
if (localStorage.getItem("lang") === "Ru") {
    lang = keysRu;
} else {
    lang = keysEn;
}


function createTextarea() {
    container.className = "container";
    document.body.append(container);
    textarea.className = "textarea";
    textarea.placeholder = "made in windows";
    container.append(textarea);
}

// отрисовка символов на кнопках
function addKeysValue() {
    const keyArr = document.querySelectorAll(".keyboard__key");
    for (let i = 0; i < keyArr.length; i += 1) {
        if (lang[i].length === 1 && (capslock === true || shift === true)) {
            keyArr[i].innerHTML = lang[i].toUpperCase();
        } else {
            keyArr[i].innerHTML = lang[i];
        }
    }
}
// подсветка кнопок при нажатии на клавиатуре
function btnHighlight() {
    document.addEventListener("keydown", (event) => {
        if (document.querySelector(`#${event.code}`) && event.code !== "CapsLock") {
            document.querySelector(`#${event.code}`).classList.add("active");
        }
        textarea.focus();
    });
    document.addEventListener("keyup", (event) => {
        if (document.querySelector(`#${event.code}`) && event.code !== "CapsLock") {
            document.querySelector(`#${event.code}`).classList.remove("active");
        }
        textarea.focus();
    });
}


// события клик на спецсимовлах
function backspaceHandler() {
    if (textarea.value) {
        textarea.setRangeText("", textarea.selectionStart - 1, textarea.selectionEnd, "end");
    }
    textarea.focus();
}

function tabHandler() {
    textarea.setRangeText("    ", textarea.selectionStart, textarea.selectionEnd, "end");
    textarea.focus();
}

function capslockHandler() {
    switch (capslock) {
        case false:
            capslock = true;
            addKeysValue(lang);
            document.querySelector("#CapsLock").classList.add("active");
            break;
        case true:
            capslock = false;
            addKeysValue(lang);
            document.querySelector("#CapsLock").classList.remove("active");
            break;
        default:
            break;
    }
}

function shiftHandler(event) {
    switch (lang) {
        case keysEn:
            shift = true;
            lang = keysEnShift;
            addKeysValue(lang);
            event.target.classList.add("active");
            break;
        case keysEnShift:
            shift = false;
            lang = keysEn;
            addKeysValue(lang);
            event.target.classList.remove("active");
            break;
        case keysRu:
            shift = true;
            lang = keysRuShift;
            addKeysValue(lang);
            event.target.classList.add("active");
            break;
        case keysRuShift:
            shift = false;
            lang = keysRu;
            addKeysValue(lang);
            event.target.classList.remove("active");
            break;
        default:
            break;
    }
}

function deleteHandler() {
    textarea.focus();
    textarea.setRangeText("", textarea.selectionStart, textarea.selectionEnd + 1, "end");
}

function arrowHandler(event) {
    let v = event.target.id;
    if (event.code) {
        v = event.code;
    }
    switch (v) {
        case "ArrowUp":
            textarea.focus();
            textarea.setSelectionRange(0, 0);
            break;
        case "ArrowDown":
            textarea.focus();
            textarea.setSelectionRange(textarea.value.length, textarea.value.length);
            break;
        case "ArrowLeft":
            if (textarea.selectionStart > 0) {
                textarea.focus();
                textarea.setSelectionRange(textarea.selectionStart, textarea.selectionEnd -= 1);
            }
            break;
        case "ArrowRight":
            if (textarea.selectionStart <= textarea.value.length) {
                textarea.focus();
                textarea.setSelectionRange(textarea.selectionStart += 1, textarea.selectionEnd);
            }
            break;
        default:
            break;
    }
}

function languageHandler() {
    if (lang === keysEn || lang === keysEnShift) {
        lang = keysRu;
        addKeysValue(lang);
        localStorage.setItem("lang", "Ru");
    } else
    if (lang === keysRu || lang === keysRuShift) {
        lang = keysEn;
        addKeysValue(lang);
        localStorage.setItem("lang", "En");
    }
}
// события клик на печать символов
document.onclick = (event) => {
    if (event.target.innerHTML.length === 1 && event.target.id !== "ArrowLeft" && event.target.id !== "ArrowRight" && event.target.id !== "ArrowUp" && event.target.id !== "ArrowDown") {
        textarea.setRangeText(event.target.innerHTML, textarea.selectionStart, textarea.selectionEnd, "end");
        textarea.focus();
    }
    if (event.target.id === "Enter") {
        textarea.setRangeText("\n", textarea.selectionStart, textarea.selectionEnd, "end");
        textarea.focus();
    }
};

// события клавиатуры для всех
document.addEventListener("keydown", (event) => {
    event.preventDefault();
    if (event.code === "ShiftLeft") {
        event.preventDefault();
        document.querySelector("#ShiftLeft").click();
    }
});

document.addEventListener("keyup", (event) => {
    event.preventDefault();
    if (event.key.length === 1) {
        document.querySelector(`#${event.code}`).click();
    }
    if (event.code === "Enter" ||event.code === "ShiftLeft" || event.code === "Backspace" || event.code === "CapsLock" || event.code === "Tab" || event.code === "Delete" || event.code === "ArrowLeft" || event.code === "ArrowRight" || event.code === "ArrowUp" || event.code === "ArrowDown") {
        document.querySelector(`#${event.code}`).click();
    }
});

function createKeyboard() {
    const keyboard = document.createElement("div");
    keyboard.className = "keyboard";
    container.append(keyboard);
    for (let i = 0; i < keyID.length; i += 1) {
        const keyRow = document.createElement("div");
        keyRow.className = "keyrow";
        keyboard.append(keyRow);
        for (let j = 0; j < keyID[i].length; j += 1) {
            const key = document.createElement("button");
            key.id = keyID[i][j];
            key.className = "keyboard__key";
            switch (keyID[i][j]) {
                case "Space":
                    key.classList.add("keyboard__key_extrawide");
                    break;
                case "Backspace":
                    key.classList.add("keyboard__key_wide");
                    key.addEventListener("click", backspaceHandler, false);
                    break;
                case "Tab":
                    key.classList.add("keyboard__key_wide");
                    key.addEventListener("click", tabHandler, false);
                    break;
                case "CapsLock":
                    key.classList.add("keyboard__key_wide");
                    key.addEventListener("click", capslockHandler, false);
                    break;
                case "Enter":
                    key.classList.add("keyboard__key_wide");
                    break;
                case "ShiftLeft":
                    key.addEventListener("click", shiftHandler, false);
                    key.classList.add("keyboard__key_wide");
                    break;
                case "Delete":
                    key.addEventListener("click", deleteHandler, false);
                    break;
                case "ArrowUp":
                case "ArrowDown":
                case "ArrowRight":
                case "ArrowLeft":
                    key.addEventListener("click", arrowHandler, false);
                    break;
                case "Language":
                    key.addEventListener("click", languageHandler, false);
                    break;
                default:
                    break;
            }
            keyRow.append(key);
        }
    }
}

createTextarea();
createKeyboard();
btnHighlight();
addKeysValue(lang);