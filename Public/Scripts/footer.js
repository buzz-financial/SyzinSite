// Footer javascript and html code, the styling is in basefooter.css

export function loadFooter() {
    const headerHTML = `
        <footer id="BaseFooter">
            <div id="LeftSideFooter">
                +1(823)-829-1982
                <p>
                sales@syzin.co
                </p>
            </div>
            <p>
            <a href="https://syzin.co/terms-and-conditions/"> Terms and Conditions</a> | <a href="https://syzin.co/cookie-and-privacy-policy/">Privacy Policy</a>
            </p>
            <nav id="RightSideFooter">
                <a href="https://www.instagram.com/Syzin/"><img src="../Images/InstagramLogo.png" class="SocialIcon"></a>
                <a href="https://www.facebook.com/syzin/"><img src="../Images/FacebookLogo.png" class="SocialIcon"></a>
                <a href="https://www.linkedin.com/company/Syzin/"><img src="../Images/LinkedinLogo.png" class="SocialIcon"></a>
                <a href="https://x.com/Syzin"> <img src="../Images/XLogo.png" class="SocialIcon"></a>            
            </nav>
        </footer>`
    const root = document.getElementById("footer-root");
    if (root){
        root.innerHTML = headerHTML;
    }
};