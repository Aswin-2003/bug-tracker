document.getElementById('bugForm').addEventListener('submit', addBug);

function addBug(e) {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const desc = document.getElementById('desc').value;

  const bug = {
    id: Date.now(),
    title: title,
    description: desc,
    resolved: false
  };

  let bugs = JSON.parse(localStorage.getItem('bugs')) || [];
  bugs.push(bug);
  localStorage.setItem('bugs', JSON.stringify(bugs));

  document.getElementById('bugForm').reset();
  displayBugs();
}

function displayBugs() {
  const bugList = document.getElementById('bugList');
  bugList.innerHTML = '';

  const bugs = JSON.parse(localStorage.getItem('bugs')) || [];

  bugs.forEach(bug => {
    const bugDiv = document.createElement('div');
    bugDiv.className = 'bug' + (bug.resolved ? ' resolved' : '');
    bugDiv.innerHTML = `
      <strong>${bug.title}</strong>
      <p>${bug.description}</p>
      ${!bug.resolved ? `<button class="btn-resolve" onclick="resolveBug(${bug.id})">Mark as Resolved</button>` : '<em>Resolved</em>'}
    `;
    bugList.appendChild(bugDiv);
  });
}

function resolveBug(id) {
  let bugs = JSON.parse(localStorage.getItem('bugs')) || [];
  bugs = bugs.map(bug => bug.id === id ? {...bug, resolved: true} : bug);
  localStorage.setItem('bugs', JSON.stringify(bugs));
  displayBugs();
}

window.onload = displayBugs;
