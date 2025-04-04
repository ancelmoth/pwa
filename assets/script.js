let userPoints = localStorage.getItem('userPoints') || 0;
document.getElementById('points').textContent = userPoints;

document.getElementById('watchAd').addEventListener('click', function () {
    showAd().then(() => {
        userPoints = parseInt(userPoints) + 10;
        updatePoints();
    });
});

document.getElementById('invite').addEventListener('click', function () {
    const link = `${window.location.origin}?ref=${generateReferralCode()}`;
    alert(`Indique amigos com este link: ${link}`);
    userPoints = parseInt(userPoints) + 50;
    updatePoints();
});

document.getElementById('redeem').addEventListener('click', function () {
    if (userPoints < 100) {
        alert('Você precisa de pelo menos 100 pontos para resgatar');
        return;
    }

    alert(`Prêmios disponíveis:
- 100 pts: R$1 via Pix
- 500 pts: R$5 via Pix
- 1000 pts: R$10 via Pix

Envie um e-mail para resgate@seudominio.com com seu código de usuário.`);
});

function showAd() {
    return new Promise((resolve) => {
        const adContainer = document.getElementById('adContainer');

        adContainer.innerHTML = `<iframe src="ads/propellerads.html" width="100%" height="250" frameborder="0"></iframe>`;
        
        setTimeout(() => {
            adContainer.innerHTML = '<p>Anúncio concluído! +10 pontos</p>';
            setTimeout(() => {
                adContainer.innerHTML = '';
                resolve();
            }, 2000);
        }, 10000);
    });
}

function generateReferralCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

function updatePoints() {
    document.getElementById('points').textContent = userPoints;
    localStorage.setItem('userPoints', userPoints);
}

const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('ref')) {
    alert(`Você foi indicado por ${urlParams.get('ref')}! Ganhe 20 pontos extras ao se cadastrar.`);
}
