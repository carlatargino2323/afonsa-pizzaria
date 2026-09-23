/* ==========================================================
   Afonsa's Pizzas — CARDÁPIO

   Este é o único arquivo que você precisa mexer para trocar
   fotos, preços, nomes e descrições. O site monta os cards sozinho.

   COMO COLOCAR UMA FOTO
   1. Coloque a imagem dentro da pasta "imagens".
   2. Escreva o nome do arquivo no campo  foto  do item,
      SEM a extensão. O site procura sozinho por .jpg, .png,
      .webp ou .jpeg.
        Exemplo: arquivo  imagens/calabreza.jpg  ->  foto: "calabreza"
   3. Se o arquivo tiver outra extensão (ex.: .JPG), escreva com ela:
        foto: "calabreza.JPG"

   Se a foto não existir, aparece o emoji no lugar, sem quebrar nada.

   DICA: use nomes só com letras minúsculas, sem espaço e sem acento
   (ex.: "carne-seca"). Em hospedagens online, "Bacon.jpg" e "bacon.jpg"
   são arquivos diferentes.

   COMO ADICIONAR UM ITEM
   Copie uma linha inteira, cole abaixo e mude os dados.
   Não esqueça a vírgula no final da linha.
   ========================================================== */

/* pasta onde ficam as fotos (com a barra no final) */
const PASTA_IMAGENS = "imagens/";

/* extensões que o site tenta, nesta ordem, quando você não escreve a extensão */
const EXTENSOES = [".jpg", ".png", ".webp", ".jpeg"];

const cardapio = {

    pizzas: [
        { nome: "Calabresa",               desc: "Calabresa, cebola e mussarela.",                  preco: 45.90, foto: "calabreza" },
        { nome: "Mussarela",               desc: "Mussarela e orégano.",                            preco: 42.90, foto: "queijo" },
        { nome: "Portuguesa",              desc: "Presunto, ovos, cebola e ervilha.",               preco: 49.90, foto: "portu" },
        { nome: "Frango com catupiry",     desc: "Frango desfiado com catupiry.",                   preco: 51.90, foto: "frango" },
        { nome: "Marguerita",              desc: "Tomate, queijo e manjericão.",                    preco: 47.90, foto: "marmar" },
        { nome: "Quatro queijos",          desc: "Mussarela, parmesão, provolone e catupiry.",      preco: 54.90, foto: "4 queijo" },
        { nome: "Pepperoni",               desc: "Pepperoni e queijo.",                             preco: 58.90, foto: "pepe" },
        { nome: "Bacon especial",          desc: "Bacon crocante e cheddar.",                       preco: 56.90, foto: "Bacon" },
        { nome: "Moda da casa",            desc: "Calabresa, bacon, milho e catupiry.",             preco: 62.90, foto: "casa" },
        { nome: "Napolitana",              desc: "Tomate, parmesão, pasta verde e manjericão.",     preco: 46.90, foto: "Napo" },
        { nome: "Lombo com catupiry",      desc: "Lombo canadense, catupiry e mussarela.",          preco: 53.90, foto: "lombo" },
        { nome: "Toscana",                 desc: "Linguiça toscana, cebola e mussarela.",           preco: 49.90, foto: "Toscana" },
        { nome: "Atum",                    desc: "Atum, cebola e mussarela.",                       preco: 50.90, foto: "Atum" },
        { nome: "Alho e óleo",             desc: "Mussarela, alho dourado e azeite.",               preco: 46.90, foto: "Alho e Oleo" },
        { nome: "Brócolis com bacon",      desc: "Brócolis, bacon e mussarela.",                    preco: 52.90, foto: "Brocolis" },
        { nome: "Strogonoff de frango",    desc: "Strogonoff de frango e batata palha.",            preco: 55.90, foto: "strogonoff" },
        { nome: "Vegetariana",             desc: "Palmito, tomate, pimentão e champignon.",         preco: 51.90, foto: "Vegetariana" },
        { nome: "Carne seca com catupiry", desc: "Carne seca desfiada e catupiry.",                 preco: 59.90, foto: "carne seca" }
    ],

    doces: [
        { nome: "Chocolate",                desc: "Chocolate cremoso e granulado.",       preco: 45.90, foto: "Choco" },
        { nome: "Chocolate com morango",    desc: "Chocolate cremoso e morangos.",        preco: 49.90, foto: "Morango" },
        { nome: "Chocolate branco",         desc: "Chocolate branco cremoso.",            preco: 47.90, foto: "Branco" },
        { nome: "Prestígio",                desc: "Chocolate e coco ralado.",             preco: 48.90, foto: "Prestigio" },
        { nome: "Banana com canela",        desc: "Banana, açúcar e canela.",             preco: 43.90, foto: "Banana" },
        { nome: "Romeu e Julieta",          desc: "Queijo e goiabada.",                   preco: 45.90, foto: "Romeu" },
        { nome: "Nutella com morango",      desc: "Creme de avelã e morangos.",           preco: 52.90, foto: "Nutella" },
        { nome: "Doce de leite com banana", desc: "Doce de leite e banana.",              preco: 47.90, foto: "Leite" },
        { nome: "Brigadeiro",               desc: "Brigadeiro cremoso com granulado.",    preco: 46.90, foto: "Briga" },
        { nome: "Beijinho",                 desc: "Leite condensado e coco ralado.",      preco: 46.90, foto: "Beijo" },
        { nome: "Abacaxi com canela",       desc: "Abacaxi caramelizado e canela.",       preco: 44.90, foto: "Abaca" }
    ],

    extras: [
        { nome: "Borda de catupiry", desc: "Adicione borda recheada à sua pizza.",  preco: 8.00,  foto: "Borda 1", emoji: "🧀" },
        { nome: "Borda de cheddar",  desc: "Adicione borda recheada à sua pizza.",  preco: 8.00,  foto: "Borda 2",  emoji: "🧀" },
        { nome: "Pão de alho",       desc: "6 unidades com queijo gratinado.",      preco: 18.00, foto: "Pao",       emoji: "🥖" },
        { nome: "Batata frita",      desc: "Porção crocante para dividir.",         preco: 22.00, foto: "batata",         emoji: "🍟" }
    ],

    bebidas: [
        { nome: "Coca-Cola 2L",         desc: "Refrigerante gelado.",              preco: 14.00, foto: "coca",           emoji: "🥤" },
        { nome: "Coca-Cola Zero 2L",    desc: "Refrigerante gelado.",              preco: 14.00, foto: "Coca 2",      emoji: "🥤" },
        { nome: "Guaraná 2L",           desc: "Refrigerante gelado.",              preco: 12.00, foto: "Guagua",        emoji: "🥤" },
        { nome: "Fanta Laranja 2L",     desc: "Refrigerante gelado.",              preco: 12.00, foto: "fanta",          emoji: "🍊" },
        { nome: "Sprite 2L",            desc: "Refrigerante gelado.",              preco: 12.00, foto: "sprite",         emoji: "🍋" },
        { nome: "Coca-Cola lata 350ml", desc: "Refrigerante gelado.",              preco: 6.00,  foto: "Coca lata",      emoji: "🥫" },
        { nome: "Guaraná lata 350ml",   desc: "Refrigerante gelado.",              preco: 6.00,  foto: "lata guarana",   emoji: "🥫" },
        { nome: "Suco de laranja 500ml", desc: "Natural, feito na hora.",          preco: 9.00,  foto: "Suco de laranja",   emoji: "🍊" },
        { nome: "Suco de uva 500ml",    desc: "Suco integral gelado.",             preco: 9.00,  foto: "Suco de uva",       emoji: "🍇" },
        { nome: "Cerveja long neck",    desc: "Consulte as marcas disponíveis.",   preco: 9.00,  foto: "cerveja",        emoji: "🍺" },
        { nome: "Água mineral 500ml",   desc: "Com ou sem gás.",                   preco: 4.00,  foto: "agua",           emoji: "💧" }
    ]

};
