function $(selector) { return document.querySelector(selector); }

let dropzone = null;

function dragEnter() {
    dropzone.classList.add("dropping");
}

function dragOver(e) {
    e.preventDefault();
    let dt = e.dataTransfer;
    dt.dropEffect = "copy";
}

function dragLeave() {
    dropzone.classList.remove("dropping");
}

function drop(e) {
    e.preventDefault();
    let dt = e.dataTransfer;

    dragLeave(e);

    let bookmark = dt.getData("text/uri-list");

    if(bookmark) {
        let bookmarkParsed = bookmark.split("\n")
            .map(it => it.trim())
            .find(it => !it.startsWith("#"));

        if(!bookmarkParsed) return;
    } else {
        bookmark = dt.getData("text/plain");

        if(bookmark) bookmark = bookmark.trim()
    }
    // noinspection JSUnusedLocalSymbols
    let [bookmarkUrl, ...bookmarkQueryArray] = bookmark.split("?");
    let bookmarkQuery = bookmarkQueryArray.join("?");

    const query = new URLSearchParams(bookmarkQuery);

    let url = decode(query.get("url"));
    let icon = decode(query.get("icon"));
    let bg = decode(query.get("bg"));

    $("#url").value = url || "";
    $("#icon").value = icon || "";
    $("#bg").value = bg || "";
}

function decode(str) {
    if(str) return decodeURIComponent(str);
    else return null;
}

function encode(str) {
    if(str) return encodeURIComponent(str);
    else return null;
}

function generate() {
    let url = encode($("#url").value);
    let icon = encode($("#icon").value);
    let bg = encode($("#bg").value);

    let output = (new URL("target.html", document.baseURI)).href;

    let queryString = "";
    if(url) queryString += "url=" + url + "&";
    if(icon) queryString += "icon=" + icon + "&";
    if(bg) queryString += "bg=" + bg + "&";

    if(queryString) {
        output += "?" + queryString.slice(0, -1);
    }

    $("#output").textContent = output;
}

window.addEventListener("load", () => {
    dropzone = $("main");
    dropzone.addEventListener("dragenter", dragEnter);
    dropzone.addEventListener("dragover", dragOver);
    dropzone.addEventListener("dragleave", dragLeave);
    dropzone.addEventListener("drop", drop);
    let genButton = $("#generate");
    genButton.addEventListener("click", generate);
})