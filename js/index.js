/* ============================================================
   Contact form — EmailJS
   Same service / template / public key as before.
   ============================================================ */

(function () {
    var form = document.getElementById("contactForm");
    if (!form) return;

    var statusEl = document.getElementById("formStatus");
    var sendBtn = document.getElementById("sendBtn");

    var SERVICE_ID = "service_rxg5t9r";
    var TEMPLATE_ID = "template_qnybxx9";

    function setStatus(text, type) {
        statusEl.textContent = text;
        statusEl.className = "form-status" + (type ? " " + type : "");
    }

    function validate() {
        var ok = true;
        ["name", "email", "subject", "message"].forEach(function (id) {
            var field = document.getElementById(id);
            var valid = field.value.trim() !== "";
            if (valid && id === "email") {
                valid = /^\S+@\S+\.\S+$/.test(field.value.trim());
            }
            field.classList.toggle("error", !valid);
            if (!valid) ok = false;
        });
        return ok;
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        setStatus("", "");

        if (!validate()) {
            setStatus("Please fill in all fields with a valid email.", "err");
            return;
        }

        if (typeof emailjs === "undefined") {
            // Offline / CDN blocked — fall back to a plain mail link.
            setStatus("Form service unavailable — please email me directly.", "err");
            return;
        }

        var params = {
            name: document.getElementById("name").value.trim(),
            email: document.getElementById("email").value.trim(),
            subject: document.getElementById("subject").value.trim(),
            message: document.getElementById("message").value.trim()
        };

        sendBtn.disabled = true;
        sendBtn.textContent = "Sending…";

        emailjs.send(SERVICE_ID, TEMPLATE_ID, params)
            .then(function () {
                setStatus("Message sent — thank you! I'll get back to you soon.", "ok");
                form.reset();
            })
            .catch(function (err) {
                console.error(err);
                setStatus("Couldn't send right now — please email banshofficial123@gmail.com.", "err");
            })
            .finally(function () {
                sendBtn.disabled = false;
                sendBtn.textContent = "Send Message";
            });
    });
})();
