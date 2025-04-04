// Pontos do usuário
let userPoints = localStorage.getItem('userPoints') || 0;
document.getElementById('points').textContent = userPoints;

// Assistir anúncio
document.getElementById('watchAd').addEventListener('click', function() {
    showAd().then(() => {
        userPoints = parseInt(userPoints) + 10;
        updatePoints();
    });
});

// Indicar amigo
document.getElementById('invite').addEventListener('click', function() {
    const link = `${window.location.origin}?ref=${generateReferralCode()}`;
    alert(`Indique amigos com este link: ${link}`);
    userPoints = parseInt(userPoints) + 50;
    updatePoints();
});

// Resgatar prêmios
document.getElementById('redeem').addEventListener('click', function() {
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

// Mostrar anúncio (simulado - você integraria uma rede de anúncios real aqui)
function showAd() {
    return new Promise((resolve) => {
        if (!window.startApp) { // Checa se o Start.io carregou
            alert("Recarregue a página para ver anúncios.");
            return resolve();
        }
        
        const sdk = window.startApp.set({
            appId: '203808249' // COLOCA TEU APP ID AQUI
        });
        
        sdk.loadAd(window.startApp.AdMode.REWARDED, {
            success: function(ad) {
                ad.show();
                ad.onClose = function() {
                    userPoints += 10; // Dá os pontos quando o ad fecha
                    updatePoints();
                    resolve();
                };
            },
            error: function() {
                alert("Sem anúncios agora. Tente mais tarde.");
                resolve();
            }
        });
    });
}

// Gerar código de indicação
function generateReferralCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// Atualizar pontos
function updatePoints() {
    document.getElementById('points').textContent = userPoints;
    localStorage.setItem('userPoints', userPoints);
}

// Verificar parâmetro de referência na URL
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('ref')) {
    alert(`Você foi indicado por ${urlParams.get('ref')}! Ganhe 20 pontos extras ao se cadastrar.`);
}

// Registra o Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('ServiceWorker registrado com sucesso!');
        })
        .catch(err => {
          console.log('Falha ao registrar ServiceWorker:', err);
        });
    });
  }