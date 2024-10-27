// JavaScript for toggling sections and starting the game
function startGame() {
    showSection('clues');
}

function nextClue() {
    // Placeholder logic for moving to the next clue
    const clueElement = document.getElementById('current-clue');
    clueElement.innerHTML = 'Find the next clue at: <span>Science Building</span>';
}

function createTeam() {
    alert('Team created! Invite friends to join.');
}

function joinTeam() {
    alert('Joined a team! Start exploring with your teammates.');
}

// Helper function to show sections
function showSection(sectionId) {
    const sections = ['home', 'clues', 'leaderboard', 'teams'];
    sections.forEach(id => {
        document.getElementById(id).style.display = (id === sectionId) ? 'block' : 'none';
    });
}
