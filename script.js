/* ==========================================================
   Afonsa's Pizzas — carrinho e envio de pedido pelo WhatsApp
   ========================================================== */

/* Número da pizzaria: 55 (Brasil) + DDD + número, só dígitos */
const WHATSAPP = "5511948473772";

const TAXA_ENTREGA = 5.00;
const FRETE_GRATIS_ACIMA = 80.00;

let carrinho = [];

/* ---------- elementos ---------- */
const lista = document.getElementById("lista-carrinho");
const elSubtotal = document.getElementById("subtotal");
const elEntrega = document.getElementById("valor-entrega");
const elTotal = document.getElementById("total");
const elContador = document.getElementById("contador");
const elAvisoFrete = document.getElementById("aviso-frete");
const elTipoEntrega = document.getElementById("tipo-entrega");
const elCampoEndereco = document.getElementById("campo-endereco");

/* ---------- utilidades ---------- */

function moeda(valor) {
    return "R$ " + valor.toFixed(2).replace(".", ",");
}

/* ---------- fotos e cardápio ---------- */

/* Coloca a foto dentro de "caixa". Tenta cada extensão em sequência
   (.jpg, .png, .webp, .jpeg). Se nenhuma existir, mostra o emoji. */
function colocarFoto(caixa, nome, alt) {

    if (!nome) {
        caixa.classList.add("sem-foto");
        return;
    }

    const temExtensao = /\.(jpe?g|png|webp|gif|avif)$/i.test(nome);
    const tentativas = temExtensao ? [nome] : EXTENSOES.map(ext => nome + ext);
    let indice = 0;

    const img = document.createElement("img");
    img.alt = alt || "";
    img.loading = "lazy";
    img.decoding = "async";

    img.addEventListener("error", () => {
        indice++;

        if (indice < tentativas.length) {
            img.src = encodeURI(PASTA_IMAGENS + tentativas[indice]);
        } else {
            img.remove();
            caixa.classList.add("sem-foto");
        }
    });

    img.src = encodeURI(PASTA_IMAGENS + tentativas[0]);
    caixa.appendChild(img);
}

function criarCard(item, emojiPadrao, ehBebida) {

    const card = document.createElement("article");
    card.className = "card" + (ehBebida ? " card-bebida" : "");

    const midia = document.createElement("div");
    midia.className = "card-midia";
    midia.dataset.emoji = item.emoji || emojiPadrao;
    colocarFoto(midia, item.foto, item.nome);

    const info = document.createElement("div");
    info.className = "card-info";

    const titulo = document.createElement("h3");
    titulo.textContent = item.nome;

    const descricao = document.createElement("p");
    descricao.textContent = item.desc;

    info.append(titulo, descricao);

    const preco = document.createElement("span");
    preco.className = "preco";
    preco.textContent = moeda(item.preco);

    const botao = document.createElement("button");
    botao.type = "button";
    botao.textContent = "Adicionar";
    botao.addEventListener("click", () => adicionar(item.nome, item.preco));

    card.append(midia, info, preco, botao);
    return card;
}

function montarCardapio() {

    const secoes = [
        { chave: "pizzas",  destino: "lista-pizzas",  emoji: "🍕" },
        { chave: "doces",   destino: "lista-doces",   emoji: "🍫" },
        { chave: "extras",  destino: "lista-extras",  emoji: "🧀" },
        { chave: "bebidas", destino: "lista-bebidas", emoji: "🥤" }
    ];

    secoes.forEach(({ chave, destino, emoji }) => {
        const container = document.getElementById(destino);
        if (!container || !cardapio[chave]) return;

        cardapio[chave].forEach(item => {
            container.appendChild(criarCard(item, emoji, chave === "bebidas"));
        });
    });

    /* fotos fixas do HTML (seção "Nossa história") */
    document.querySelectorAll("[data-foto]").forEach(el => {
        colocarFoto(el, el.dataset.foto, el.dataset.alt);
    });
}

function salvar() {
    try {
        localStorage.setItem("carrinho-afonsa", JSON.stringify(carrinho));
    } catch (e) {
        /* navegador sem localStorage: o carrinho segue funcionando na sessão */
    }
}

function carregar() {
    try {
        const salvo = localStorage.getItem("carrinho-afonsa");
        if (salvo) carrinho = JSON.parse(salvo) || [];
    } catch (e) {
        carrinho = [];
    }
}

/* ---------- ações do carrinho ---------- */

function adicionar(nome, preco) {
    const item = carrinho.find(i => i.nome === nome);

    if (item) {
        item.qtd++;
    } else {
        carrinho.push({ nome, preco, qtd: 1 });
    }

    atualizarCarrinho();
}

function alterarQtd(nome, delta) {
    const item = carrinho.find(i => i.nome === nome);
    if (!item) return;

    item.qtd += delta;

    if (item.qtd <= 0) {
        remover(nome);
        return;
    }

    atualizarCarrinho();
}

function remover(nome) {
    carrinho = carrinho.filter(i => i.nome !== nome);
    atualizarCarrinho();
}

/* ---------- cálculos ---------- */

function calcularSubtotal() {
    return carrinho.reduce((soma, i) => soma + i.preco * i.qtd, 0);
}

function calcularEntrega(subtotal) {
    const retirada = elTipoEntrega && elTipoEntrega.value === "retirada";

    if (retirada || subtotal === 0 || subtotal >= FRETE_GRATIS_ACIMA) return 0;

    return TAXA_ENTREGA;
}

/* ---------- renderização ---------- */

function atualizarCarrinho() {

    lista.innerHTML = "";

    if (carrinho.length === 0) {
        lista.innerHTML = `<li class="vazio">Seu carrinho está vazio. Escolha uma pizza no cardápio para começar.</li>`;
    }

    carrinho.forEach(item => {
        const li = document.createElement("li");
        li.className = "item-carrinho";

        li.innerHTML = `
            <div class="item-nome">
                <strong>${item.nome}</strong>
                <small>${moeda(item.preco)} cada · ${moeda(item.preco * item.qtd)}</small>
            </div>

            <div class="qtd">
                <button type="button" aria-label="Diminuir quantidade de ${item.nome}">−</button>
                <span>${item.qtd}</span>
                <button type="button" aria-label="Aumentar quantidade de ${item.nome}">+</button>
            </div>

            <button class="remover" type="button" aria-label="Remover ${item.nome}">✕</button>
        `;

        const botoes = li.querySelectorAll("button");
        botoes[0].addEventListener("click", () => alterarQtd(item.nome, -1));
        botoes[1].addEventListener("click", () => alterarQtd(item.nome, 1));
        botoes[2].addEventListener("click", () => remover(item.nome));

        lista.appendChild(li);
    });

    const subtotal = calcularSubtotal();
    const entrega = calcularEntrega(subtotal);

    elSubtotal.textContent = moeda(subtotal);
    elEntrega.textContent = entrega === 0 ? "Grátis" : moeda(entrega);
    elTotal.textContent = moeda(subtotal + entrega);

    const qtdTotal = carrinho.reduce((soma, i) => soma + i.qtd, 0);
    elContador.textContent = qtdTotal;

    /* aviso de frete */
    if (elTipoEntrega.value === "retirada") {
        elAvisoFrete.textContent = "Retirada no balcão, sem taxa.";
    } else if (subtotal >= FRETE_GRATIS_ACIMA) {
        elAvisoFrete.textContent = "Você ganhou entrega grátis.";
    } else {
        const falta = FRETE_GRATIS_ACIMA - subtotal;
        elAvisoFrete.textContent = `Faltam ${moeda(falta)} para a entrega sair de graça.`;
    }

    /* endereço só aparece na entrega */
    elCampoEndereco.style.display = elTipoEntrega.value === "retirada" ? "none" : "block";

    salvar();
}

function mostrarTroco() {
    const pagamento = document.getElementById("pagamento").value;
    document.getElementById("campo-troco").classList.toggle("oculto", pagamento !== "Dinheiro");
}

/* ---------- montagem da mensagem do WhatsApp ---------- */

function montarMensagem() {

    const nome = document.getElementById("nome").value.trim();
    const tipo = elTipoEntrega.value;
    const endereco = document.getElementById("endereco").value.trim();
    const pagamento = document.getElementById("pagamento").value;
    const troco = document.getElementById("troco").value.trim();
    const obs = document.getElementById("observacoes").value.trim();

    const subtotal = calcularSubtotal();
    const entrega = calcularEntrega(subtotal);

    let texto = "*NOVO PEDIDO — Afonsa's Pizzas* 🍕\n\n";
    texto += `*Cliente:* ${nome}\n\n`;
    texto += "*Itens:*\n";

    carrinho.forEach(item => {
        texto += `• ${item.qtd}x ${item.nome} — ${moeda(item.preco * item.qtd)}\n`;
    });

    texto += `\n*Subtotal:* ${moeda(subtotal)}\n`;
    texto += `*Entrega:* ${entrega === 0 ? "Grátis" : moeda(entrega)}\n`;
    texto += `*Total:* ${moeda(subtotal + entrega)}\n\n`;

    if (tipo === "retirada") {
        texto += "*Retirada na pizzaria*\n";
    } else {
        texto += `*Entrega em:* ${endereco}\n`;
    }

    texto += `*Pagamento:* ${pagamento}`;
    if (pagamento === "Dinheiro" && troco) texto += ` (troco para ${troco})`;
    texto += "\n";

    if (obs) texto += `*Observações:* ${obs}\n`;

    return texto;
}

function destacarErro(elemento) {
    elemento.classList.add("campo-erro");
    elemento.focus();
    elemento.addEventListener("input", () => elemento.classList.remove("campo-erro"), { once: true });
}

/* ---------- botões finais ---------- */

document.getElementById("finalizar").addEventListener("click", () => {

    if (carrinho.length === 0) {
        alert("Adicione pelo menos um item antes de enviar o pedido.");
        return;
    }

    const campoNome = document.getElementById("nome");
    if (campoNome.value.trim() === "") {
        alert("Informe seu nome para o pedido.");
        destacarErro(campoNome);
        return;
    }

    const campoEndereco = document.getElementById("endereco");
    if (elTipoEntrega.value === "entrega" && campoEndereco.value.trim() === "") {
        alert("Informe o endereço de entrega.");
        destacarErro(campoEndereco);
        return;
    }

    /* API oficial de clique do WhatsApp */
    const link = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(montarMensagem())}`;
    window.open(link, "_blank");
});

document.getElementById("limpar").addEventListener("click", () => {
    if (carrinho.length === 0) return;

    if (confirm("Esvaziar o carrinho?")) {
        carrinho = [];
        atualizarCarrinho();
    }
});

/* ---------- início ---------- */

montarCardapio();
carregar();
atualizarCarrinho();
mostrarTroco();