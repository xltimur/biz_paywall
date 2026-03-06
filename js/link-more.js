function linkMore(item) {


    const page = 1 * item.getAttribute("page");
    const childType = item.getAttribute("child-type");
    const dataRecipient = item.getAttribute("data-recipient");

    const cb = (data) => {

        item.setAttribute("page", page + 1);

        var content = data ? data.trim() : data;
        if (content && content.length > 0) {

            const containerWrapper = document.createElement("div");
            containerWrapper.innerHTML = content;
            const container = containerWrapper.childNodes[0];

            document.getElementById(dataRecipient).appendChild(container);

            var hasMore = container.getAttribute("hasMore");
            if (hasMore != 'True') {
                item.setAttribute("style", "display: none");
            }
        } else {
            item.setAttribute("style", "display: none");
        }
    }

    const req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            cb(req.responseText);
        }
    }
    req.open("GET", window.location.href + '/' + childType + '?page=' + page);
    req.send();

    return false;
}

