const fs = require('fs');

let wordsFromFile = [];
try {
    const rawText = fs.readFileSync('kata.txt', 'utf-8');
    wordsFromFile = rawText.split('\n').map(w => w.trim().toLowerCase()).filter(w => w.length > 0 && !w.includes('-')); // Let's simplify and just get raw words
} catch (e) {
    console.warn("kata.txt not found, falling back to basic list.");
}

let wordsFromRanking = [];
try {
    const rankingText = fs.readFileSync('ranking_kata (1).json', 'utf-8');
    const rankingData = JSON.parse(rankingText);
    wordsFromRanking = rankingData.map(item => item.word.trim().toLowerCase()).filter(w => w.length > 0 && !w.includes('-'));
} catch (e) {
    console.warn("ranking_kata (1).json not found or invalid.");
}

const hewan = [
    "anjing", "ayam", "babi", "badak", "banteng", "bebek", "belalang", "biawak", "buaya", "burung",
    "cacing", "cicak", "cumi", "domba", "elang", "entok", "gagak", "gajah", "gorila", "harimau",
    "hiu", "iguana", "ikan", "itik", "jerapah", "kalajengking", "kalkun", "kambing", "kancil", "katak",
    "kecoa", "kelelawar", "kelinci", "kera", "kerbau", "komodo", "kucing", "kuda", "kupu-kupu", "kura-kura",
    "laba-laba", "lalat", "landak", "laron", "lebah", "lumba-lumba", "macan", "monyet", "musang", "nyamuk",
    "orangutan", "panda", "paus", "pelikan", "penyu", "sapi", "semut", "serigala", "singa", "siput",
    "tapir", "tawon", "tikus", "tupai", "ular", "unta", "ulat", "zebra"
];

const negara = [
    "afghanistan", "afrika selatan", "afrika tengah", "albania", "aljazair", "amerika serikat", "andorra", "angola",
    "antigua dan barbuda", "arab saudi", "argentina", "armenia", "australia", "austria", "azerbaijan", "bahama",
    "bahrain", "bangladesh", "barbados", "belanda", "belarus", "belgia", "belize", "benin", "bhutan", "bolivia",
    "bosnia dan herzegovina", "botswana", "brasil", "britania raya", "brunei", "bulgaria", "burkina faso", "burundi",
    "ceko", "chad", "chili", "denmark", "jerman", "inggris", "indonesia", "malaysia", "singapura", "thailand",
    "filipina", "vietnam", "laos", "kamboja", "myanmar", "jepang", "korea selatan", "korea utara", "tiongkok",
    "taiwan", "mongolia", "india", "pakistan", "sri lanka", "nepal", "maladewa", "prancis", "italia", "spanyol",
    "portugal", "swiss", "rusia", "ukraina", "polandia", "swedia", "norwegia", "finlandia", "mesir", "maroko",
    "tunisia", "libya", "sudan", "kenya", "tanzania", "uganda", "nigeria", "ghana", "kanada", "meksiko", "kuba",
    "jamaika", "haiti", "kolombia", "peru", "venezuela", "ekuador", "paraguay", "uruguay", "selandia baru", "fiji",
    "papua nugini", "samoa", "tonga", "kiribati", "tuvalu", "vanuatu", "solomon", "mikronesia", "palau", "israel",
    "iran", "irak", "yordania", "suriah", "lebanon", "kuwait", "qatar", "uni emirat arab", "oman", "yaman"
];

// combine and deduplicate
const allWords = [...hewan, ...negara, ...wordsFromFile, ...wordsFromRanking].map(w => w.toLowerCase());
const uniqueWords = [...new Set(allWords)];
uniqueWords.sort();

const alphabets = 'abcdefghijklmnopqrstuvwxyz'.split('');
let prefixes = [];

for (let a of alphabets) {
    prefixes.push(a);
    for (let b of alphabets) {
        prefixes.push(a + b);
        for (let c of alphabets) {
            prefixes.push(a + b + c);
        }
    }
}

const data = {};

prefixes.forEach(prefix => {
    // get all words starting with this prefix
    const matched = uniqueWords.filter(w => w.startsWith(prefix));

    if (matched.length > 0) {
        data[prefix] = matched;
    }
});

fs.writeFileSync('data.json', JSON.stringify(data));
// Create js version since we use local file direct inclusion
fs.writeFileSync('data.js', 'const dictionaryData = ' + JSON.stringify(data) + ';');
console.log('Script finished. data.json & data.js created with ' + Object.keys(data).length + ' prefixes. Total unique words: ' + uniqueWords.length);
