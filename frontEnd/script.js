
    const form = document.getElementById("submitbox");
    function navigate(page) {
            window.location.href = page;
        }
    form.addEventListener("submit", function(event) {
      event.preventDefault(); 
      navigate("project.html");
    });
async function submitProject() {
  try {
    const response = await fetch("/api/vote/routes/projectSubmission.js", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: "Smart Dustbin",
        description: "Arduino-based project",
        techStack: ["Arduino", "C++"]
      })
    }); 

    const data = await response.json();
    console.log("Project submission response:", data);
  } catch (error) {
    console.error("Error:", error);
  }
}

