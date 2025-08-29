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
  const titleData= document.getElementById("title").value;
  const descData= document.getElementById("desc").value;
  const techData= document.getElementById("tech_stack").value;
  const imageData= document.getElementById("thumb").value;
  const repoData=document.getElementById("github").value;
  const linkData=document.getElementById("live_link").value;

  const techStack= techData.split(",").map(t=> t.trim());

  const res = await fetch("http://localhost:5000/api/project/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json",
      "authorization": `Bearer ${tkn}`
     },
    body: JSON.stringify({
      titleData,
      descData,
      techStack,
      imageData,
      repoData,
      linkData
    }),
  });
  const data = await res.json();
  alert(data.message || "Project submitted successfully")

}

async function voteProject(projectId){
  const tkn = localStorage.getItem("token");
  if(!tkn){
    alert("You need to login first")
  }
  const res= await fetch(`http://localhost:5000/api/vote/castVote/${projectId}`, {
    method:"POST",
    headers:{"Content-Type": "application/json",
      "authorization": `Bearer ${tkn}`
    }
  });
  const data = await res.json();
  alert(data.message || "Voted successfully");

}

async function loadProject(){
  const res= await fetch("http://localhost:5000/api/project/",{
    method:"POST",
    headers:{
      "Content-Type": "application/json"
    }
  });
  const projects= await res.json();
  
}
async function loadleaderboard(){
  const res = await fetch("http://localhost:5000/api/vote/leaderboard",{
    method:"GET",
    headers:{"content-type":"application/json"}
  });
  const projects = await res.json();
  projects.sort((a,b)=>b.votes - a.votes);
const topcards = document.querySelectorAll(".top-cards .card");
projects.slice(0,3).forEach((project, index) => {
  const card = topcards[index];
  card.querySelector("h3").innerText = project.title;
  card.querySelector(".likes").innerText = `${project.votes} votes`;
});

  const tbody = document.querySelector("table-container");
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


window.onload = loadleaderboard;