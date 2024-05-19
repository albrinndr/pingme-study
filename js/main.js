function injectHtml(callback) {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain attribute:*/
        file = elmnt.getAttribute("inject-html");
        if (file) {
            /* Make an HTTP request using the attribute value as the file name: */
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        elmnt.innerHTML = this.responseText;
                        if (callback) {
                            callback(); // Invoke the callback after setting innerHTML
                        }
                    }
                    if (this.status == 404) {
                        elmnt.innerHTML = "Page not found.";
                    }
                    /* Remove the attribute, and call this function once more: */
                    elmnt.removeAttribute("inject-html");
                    injectHtml(callback);
                }
            };
            xhttp.open("GET", file, true);
            xhttp.send();
            /* Exit the function: */
            return;
        }
    }
}


document.addEventListener("DOMContentLoaded", function () {
    injectHtml();
});

document.addEventListener('scroll', () => {
    const headerContainer = document.querySelector('.header-container');
    const scroll = window.scrollY;
    if (scroll > 1) {
        headerContainer.classList.add('header-scrolled');
    } else {
        headerContainer.classList.remove('header-scrolled');
    }
});