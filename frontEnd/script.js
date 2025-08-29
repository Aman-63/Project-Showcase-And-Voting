function navigate(page) {
  window.location.href = page;
}


const form = document.getElementById("submitbox");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  navigate("project.html");
});

async function submitProject() {
  const tkn = localStorage.getItem("token");
  if (!tkn) {
    return alert("You must login first");
  }
  const title = document.getElementById("title").value;
  const description = document.getElementById("desc").value;
  const techData = document.getElementById("tech_stack").value;
  const imageUrl = document.getElementById("thumb").value;
  const repoLink = document.getElementById("github").value;
  const liveLink = document.getElementById("live_link").value;

 const techStack = techData
    ? techData.split(",").map(t => t.trim()).filter(Boolean)
    : [];
  const res = await fetch("http://localhost:5000/api/project/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${tkn}`
    },
    body: JSON.stringify({
      title,
      description,
      techStack,
      imageUrl,
      repoLink,
      liveLink
    }),
  });
  const data = await res.json();
  alert(data.message || "Project submitted successfully")

}

async function voteProject(projectId, e) {
  if(e) e.stopPropagation();
  const tkn = localStorage.getItem("token");
  if (!tkn) {
    alert("You need to login first")
  }
  const res = await fetch(`http://localhost:5000/api/vote/castVote/${projectId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${tkn}`
    }
  });
  const data = await res.json();
  alert(data.message || "Voted successfully");

}

async function loadProject() {
  try {
    const res = await fetch("http://localhost:5000/api/project/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const projects = await res.json();
    const ls = document.getElementById("main");
    projects.forEach(proj => {
      const div = document.createElement("div");
      div.classList.add("project-card");
      div.addEventListener("click",)
      div.innerHTML = `
    <div class="project-img"></div>
    <div class="tags">
       ${(Array.isArray(proj.techStack) ? proj.techStack : []).map(t => `<span>${t}</span>`).join(" ")}
    </div>
    <div id="vote">
    <button class="vote-btn">Vote</button></div>

    `;
      div.addEventListener("click", () => {
        if (proj.liveLink) window.open(proj.liveLink, "_blank");
      });

      const btn=div.querySelector(".vote-btn");
      btn.addEventListener("click", (e)=> voteProject(proj._id, e));

      ls.appendChild(div);

    });

  } catch (err) {
    alert("Error loading projects....")
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("main")) {
    loadProject();
  }
});

