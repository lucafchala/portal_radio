var modal = document.getElementById('pix-modal');

function openPix()  { modal.style.display = 'flex'; }
function closePix() { modal.style.display = 'none'; }

modal.addEventListener('click', function(e) {
    if (e.target === modal) closePix();
});

function copyPix() {
    navigator.clipboard.writeText('eb754dfc-2463-468c-8187-1a1c6f448937');
    var btn = document.querySelector('.copy-btn');
    btn.textContent = 'Copiado!';
    setTimeout(function() { btn.textContent = 'Copiar chave'; }, 2000);
}
