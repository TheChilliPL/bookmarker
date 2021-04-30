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

setTimeout(() => {
    let url = decode(query.get("url"));
    if(url)
        document.location.href = url;
}, 0);