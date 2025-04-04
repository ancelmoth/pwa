// Variáveis do usuário
let userPoints = parseInt(localStorage.getItem('userPoints')) || 0;
document.getElementById('points').textContent = userPoints;

// Inicializa Start.io (VERIFICA SE CARREGOU)
function initStartApp() {
    if (!window.startApp) {
        console.error("Start.io não carregou! Recarregue a página.");
        return false;
    }
    return window.startApp.set({ appId: '203808249' }); // << SUBSTITUA SEU APP ID
}

// Assistir anúncio (REAL)
document.getElementById('watchAd').addEventListener('click', function() {
    const sdk = initStartApp();
    if (!sdk) {
        alert("Erro ao carregar anúncios. Recarregue o app.");
        return;
    }

    sdk.loadAd(window.startApp.AdMode.REWARDED, {
        success: function(ad) {
            ad.show();
            ad.onClose = function() {
                userPoints += 10;
                updatePoints();
            };
        },
        error: function() {
            alert("Nenhum anúncio disponível agora. Tente mais tarde.");
        }
    });
});

// Indicar amigo (simulação)
document.getElementById('invite').addEventListener('click', function() {
    const link = `${window.location.origin}?ref=${generateReferralCode()}`;
    alert(`Indique amigos: ${link}`);
    userPoints += 50;
    updatePoints();
});

// Resgatar prêmios
document.getElementById('redeem').addEventListener('click', function() {
    alert(`Resgate via PIX:\n100pts = R$1\n500pts = R$5\nEnvie e-mail para resgate@seudominio.com`);
});

// Funções auxiliares
function generateReferralCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

function updatePoints() {
    document.getElementById('points').textContent = userPoints;
    localStorage.setItem('userPoints', userPoints);
}

// Verifica referência na URL
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('ref')) {
    alert(`Você foi indicado por ${urlParams.get('ref')}! Ganhe 20pts extras ao se cadastrar.`);
}