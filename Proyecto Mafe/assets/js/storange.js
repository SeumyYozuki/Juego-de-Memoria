// --- OPERACIONES DEL STORAGE PARA EL RANKING ---

function getRankingFromStorage() {
    const ranking = localStorage.getItem('memory_ranking');
    return ranking ? JSON.parse(ranking) : [];
}

function saveRankingToStorage(ranking) {
    localStorage.setItem('memory_ranking', JSON.stringify(ranking));
}

function renderRanking() {
    const rankingBody = document.getElementById('ranking-body'); // Tu tbody del HTML
    if (!rankingBody) return;

    rankingBody.innerHTML = '';
    const ranking = getRankingFromStorage();

    ranking.forEach((player, index) => {
        const tr = document.createElement('tr');
        
        let minutos = Math.floor(player.tiempo / 60).toString().padStart(2, "0");
        let segundos = (player.tiempo % 60).toString().padStart(2, "0");
        
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${player.nombre}</td>
            <td>${minutos}:${segundos}</td>
            <td>${player.nivel}</td>
        `;
        rankingBody.appendChild(tr);
    });
}

function checkAndSaveScore(nombre, tiempoFinal, nivelJugado) {
    let ranking = getRankingFromStorage();

    const newRecord = {
        nombre: nombre,
        tiempo: tiempoFinal,
        nivel: nivelJugado
    };

    ranking.push(newRecord);

    ranking.sort((a, b) => a.tiempo - b.tiempo);

    ranking = ranking.slice(0, 10);

    saveRankingToStorage(ranking);
    renderRanking();
}

document.addEventListener('DOMContentLoaded', renderRanking);