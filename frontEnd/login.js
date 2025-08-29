document.getElementById("btn-primary").addEventListener("click", async function (e) {
    e.preventDefault(); 

    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const message = document.getElementById("message");

    if (!usernameInput.value && !passwordInput.value) {
        alert("Please enter username and password");
        return;
    } else if (!usernameInput.value) {
        alert("Please enter username");
        return;
    } else if (!passwordInput.value) {
        alert("Please enter password");
        return;
    }

    try {
        const res = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: usernameInput.value,
                password: passwordInput.value,
            }),
        });

        const data = await res.json();

        if(data.token){
            localStorage.setItem("token", data.token);
            alert("Login successful....");
        }
        else{
            this.lang
            alert(data.error || "Login failed...");
        }
    } catch (error) {
        console.error(error);
        message.style.color = "red";
        message.textContent = "Login failed...";
    }
});