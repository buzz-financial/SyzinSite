// Header javascript and html code, the styling is in baseheader.css

export function loadHeader() {
    const headerHTML = `
        <header id="baseheader">
            <img src="../Images/Icon.png" alt="Logo" class="headericon">
            <nav class="headerlinks">
                <a href="/" data-page="home">Home</a>
            </nav>
            <div class="rightheader">
                <a href="/#/contactus" data-page="contactus"><img src="../Images/Phone.png" alt="Phone Icon" class="rightheaderphone">Contact us</a>
            </div>
            <a href="/#/submission" data-page="submission" class="headergetstarted">Get Started</a>
        </header>`
    const root = document.getElementById("header-root");
    if (root){
        root.innerHTML = headerHTML;
    }
};