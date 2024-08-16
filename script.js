        // Show the cookie consent popup on page load
        window.onload = function() {
            const cookiesAccepted = getCookie('cookiesAccepted');
            if (!cookiesAccepted) {
                showPopup();
            } else if (cookiesAccepted === 'true') {
                applySavedColors();
            }
        };

        // Function to show the popup and blur the background
        function showPopup() {
            document.getElementById('popupBackground').style.display = 'flex';
            document.body.classList.add('blurred');
        }

        // Function to hide the popup and remove the blur
        function hidePopup() {
            document.getElementById('popupBackground').style.display = 'none';
            document.body.classList.remove('blurred');
        }

        // Function to change color and save it in a cookie if cookies are accepted
        function changeColor(variable, value) {
            document.documentElement.style.setProperty(variable, value);
            if (getCookie('cookiesAccepted') === 'true') {
                setCookie(variable, value, 365); // Save the color in a cookie for 365 days
            }
        }

        // Function to set a cookie
        function setCookie(name, value, days) {
            const d = new Date();
            d.setTime(d.getTime() + (days*24*60*60*1000));
            const expires = "expires=" + d.toUTCString();
            document.cookie = name + "=" + value + ";" + expires + ";path=/";
        }

        // Function to get a cookie value
        function getCookie(name) {
            const nameEQ = name + "=";
            const ca = document.cookie.split(';');
            for(let i=0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        }

        // Function to delete a cookie
        function deleteCookie(name) {
            document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }

        // Function to reset colors to default and remove cookies
        function resetToDefault() {
            document.documentElement.style.setProperty('--main-bg-color', '#007bff');
            deleteCookie('--main-bg-color');
            deleteCookie('--text-color');
            document.getElementById('bgColorPicker').value = '#007bff';
        }

        // Function to apply saved colors from cookies
        function applySavedColors() {
            const bgColor = getCookie('--main-bg-color');
            const textColor = getCookie('--text-color');
            if(bgColor) {
                document.documentElement.style.setProperty('--main-bg-color', bgColor);
                document.getElementById('bgColorPicker').value = bgColor;
            }
            if(textColor) {
                document.documentElement.style.setProperty('--text-color', textColor);
                document.getElementById('textColorPicker').value = textColor;
            }
        }

        // Function to handle cookie acceptance
        function acceptCookies() {
            setCookie('cookiesAccepted', 'true', 365);
            applySavedColors();
            hidePopup();
        }

        // Function to handle cookie denial
        function denyCookies() {
            // No cookies will be set, so we don't save anything
            hidePopup();
        }

        // Function to show the info message in the popup
        function showInfo() {
            const infoDiv = document.getElementById('expandedInfo');
            infoDiv.style.display = infoDiv.style.display === 'block' ? 'none' : 'block';
        }

        // Function to delete all cookies and reset everything
        function deleteAllCookies() {
            // Delete all relevant cookies
            deleteCookie('cookiesAccepted');
            deleteCookie('--main-bg-color');
            deleteCookie('--text-color');
            
            // Reset to default colors
            resetToDefault();
            
            // Show the cookie consent popup again
            showPopup();
        }