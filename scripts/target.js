function decode(str) {
    if(str) return decodeURIComponent(str);
    else return null;
}

const query = new URLSearchParams(window.location.search);
const bgColor = decode(query.get("bg"));

if(bgColor)
    document.documentElement.style.backgroundColor = "#"+bgColor;

let faviconElement = document.createElement("link");
faviconElement.rel = "icon";
faviconElement.href = decode(query.get("icon"));
document.head.appendChild(faviconElement);

function redirect() {
    localStorage.setItem(window.location.href + " auto", 1);

    let url = decode(query.get("url"));
    if(url)
        document.location.href = url;

    return false;
}

function shouldAutoRedirect() {
    let queryAuto = decode(query.get("auto"));

    if(queryAuto && queryAuto !== "1") return false;

    if(localStorage) {
        let auto = localStorage.getItem(window.location.href + " auto");

        if(auto && auto === "1") return true;
    }

    return false;
}

if(shouldAutoRedirect())
    setTimeout(redirect, 3000);