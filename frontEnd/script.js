function navigate(page) {
  window.location.href = page;
}




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
  const res = await fetch("/api/project/submit", {
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
    alert("You need to login first");
    return;
  }
  const res = await fetch(`/api/vote/castVote/${projectId}`, {
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
    const res = await fetch("/api/project/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const projects = await res.json();

const projectsContainer = document.querySelector(".projects-container");
if (!projectsContainer) return;

projects.forEach(proj => {
  const div = document.createElement("div");
  div.classList.add("project-card");

  // image
  const imgWrap = document.createElement("div");
  imgWrap.className = "project-img";
  const img = document.createElement("img");
  img.src = "image/WhatsApp Image 2025-08-31 at 13.51.35_63081aa6.jpg"
  img.alt = proj.title || "project thumbnail";
  imgWrap.appendChild(img);

  const h3 = document.createElement("h3");
  h3.textContent = proj.title;

  const tagsDiv = document.createElement("div");
  tagsDiv.className = "tags";
  (Array.isArray(proj.techStack) ? proj.techStack : []).forEach(t => {
    const span = document.createElement("span");
    span.textContent = t;
    tagsDiv.appendChild(span);
  });

  const voteDiv = document.createElement("div");
  voteDiv.id = "vote";
  const btn = document.createElement("button");
  btn.className = "vote-btn";
  btn.textContent = "Vote";
  btn.addEventListener("click", (e) => voteProject(proj._id, e));
  voteDiv.appendChild(btn);

  div.appendChild(imgWrap);
  div.appendChild(h3);
  div.appendChild(tagsDiv);
  div.appendChild(voteDiv);

  div.addEventListener("click", () => {
    if (proj.liveLink) window.open(proj.liveLink, "_blank");
  });

  projectsContainer.appendChild(div);
});



  } catch (err) {
    alert("Error loading projects....")
  }
}
async function loadLeaderboard(){
  const res = await fetch("/api/vote/leaderboard",{
    method:"GET",
    headers:{"Content-Type":"application/json"}
  });
  const projects = await res.json();
  projects.sort((a,b)=>b.votes - a.votes);
const topcards = document.querySelectorAll(".top-cards .card");
projects.slice(0,3).forEach((project, index) => {
  const card = topcards[index];
  card.querySelector("h3").innerText = project.title;
  card.querySelector(".points").innerText = `${project.votes} Votes`;
});


  const tbody = document.querySelector("table tbody");


  tbody.innerHTML = "";
  projects.slice(3).forEach((proj, idx) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${idx + 4}</td>
      <td>${proj.title}</td>
      <td>${proj.votes}</td>
    `;
    tbody.appendChild(tr);
  });
}



document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("main")) {
    loadProject();
  }
});

