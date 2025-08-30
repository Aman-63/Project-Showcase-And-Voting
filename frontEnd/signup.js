document.getElementById("btn-primary").addEventListener("click", async function (e) {
    e.preventDefault();
    const userInput = document.getElementById("username").value;
    const schIdInput = document.getElementById("schId").value;
    const emailInput = document.getElementById("email").value;
    const passwordInput = document.getElementById("pswd").value;
    const cnfPasswordInput = document.getElementById("cnfPswd").value;
    if (passwordInput !== cnfPasswordInput) {
      alert("Passwords do not match");
      return;
    }

    try{
    const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: userInput,
            scholarId: schIdInput,
            email: emailInput,
            password: passwordInput,
            confirmPassword: cnfPasswordInput
        }),
    });

    const data = await res.json();
    alert(data.message || data.error || "User registered successfully");
}catch(err){
    console.error(err);
}

})