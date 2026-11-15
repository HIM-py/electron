const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*", methods: ["GET", "POST"] } });

app.use(express.static(path.join(__dirname, 'public')));

// قاعدة بيانات العناصر الـ 118 كاملة
const elements = [
    { z: 1, sym: "H", name: "Hydrogen", nameAr: "هيدروجين", config: [1] },
    { z: 2, sym: "He", name: "Helium", nameAr: "هيليوم", config: [2] },
    { z: 3, sym: "Li", name: "Lithium", nameAr: "ليثيوم", config: [2, 1] },
    { z: 4, sym: "Be", name: "Beryllium", nameAr: "بيريليوم", config: [2, 2] },
    { z: 5, sym: "B", name: "Boron", nameAr: "بورون", config: [2, 3] },
    { z: 6, sym: "C", name: "Carbon", nameAr: "كربون", config: [2, 4] },
    { z: 7, sym: "N", name: "Nitrogen", nameAr: "نيتروجين", config: [2, 5] },
    { z: 8, sym: "O", name: "Oxygen", nameAr: "أكسجين", config: [2, 6] },
    { z: 9, sym: "F", name: "Fluorine", nameAr: "فلور", config: [2, 7] },
    { z: 10, sym: "Ne", name: "Neon", nameAr: "نيون", config: [2, 8] },
    { z: 11, sym: "Na", name: "Sodium", nameAr: "صوديوم", config: [2, 8, 1] },
    { z: 12, sym: "Mg", name: "Magnesium", nameAr: "مغنيسيوم", config: [2, 8, 2] },
    { z: 13, sym: "Al", name: "Aluminium", nameAr: "ألومنيوم", config: [2, 8, 3] },
    { z: 14, sym: "Si", name: "Silicon", nameAr: "سيليكون", config: [2, 8, 4] },
    { z: 15, sym: "P", name: "Phosphorus", nameAr: "فوسفور", config: [2, 8, 5] },
    { z: 16, sym: "S", name: "Sulfur", nameAr: "كبريت", config: [2, 8, 6] },
    { z: 17, sym: "Cl", name: "Chlorine", nameAr: "كلور", config: [2, 8, 7] },
    { z: 18, sym: "Ar", name: "Argon", nameAr: "أرجون", config: [2, 8, 8] },
    { z: 19, sym: "K", name: "Potassium", nameAr: "بوتاسيوم", config: [2, 8, 8, 1] },
    { z: 20, sym: "Ca", name: "Calcium", nameAr: "كالسيوم", config: [2, 8, 8, 2] },
    { z: 21, sym: "Sc", name: "Scandium", nameAr: "سكانديوم", config: [2, 8, 9, 2] },
    { z: 22, sym: "Ti", name: "Titanium", nameAr: "تيتانيوم", config: [2, 8, 10, 2] },
    { z: 23, sym: "V", name: "Vanadium", nameAr: "فاناديوم", config: [2, 8, 11, 2] },
    { z: 24, sym: "Cr", name: "Chromium", nameAr: "كروم", config: [2, 8, 13, 1] },
    { z: 25, sym: "Mn", name: "Manganese", nameAr: "منجنيز", config: [2, 8, 13, 2] },
    { z: 26, sym: "Fe", name: "Iron", nameAr: "حديد", config: [2, 8, 14, 2] },
    { z: 27, sym: "Co", name: "Cobalt", nameAr: "كوبالت", config: [2, 8, 15, 2] },
    { z: 28, sym: "Ni", name: "Nickel", nameAr: "نيكل", config: [2, 8, 16, 2] },
    { z: 29, sym: "Cu", name: "Copper", nameAr: "نحاس", config: [2, 8, 18, 1] },
    { z: 30, sym: "Zn", name: "Zinc", nameAr: "زنك", config: [2, 8, 18, 2] },
    { z: 31, sym: "Ga", name: "Gallium", nameAr: "غاليوم", config: [2, 8, 18, 3] },
    { z: 32, sym: "Ge", name: "Germanium", nameAr: "جرمانيوم", config: [2, 8, 18, 4] },
    { z: 33, sym: "As", name: "Arsenic", nameAr: "زرنيخ", config: [2, 8, 18, 5] },
    { z: 34, sym: "Se", name: "Selenium", nameAr: "سيلينيوم", config: [2, 8, 18, 6] },
    { z: 35, sym: "Br", name: "Bromine", nameAr: "بروم", config: [2, 8, 18, 7] },
    { z: 36, sym: "Kr", name: "Krypton", nameAr: "كريبتون", config: [2, 8, 18, 8] },
    { z: 37, sym: "Rb", name: "Rubidium", nameAr: "روبيديوم", config: [2, 8, 18, 8, 1] },
    { z: 38, sym: "Sr", name: "Strontium", nameAr: "سترونشيوم", config: [2, 8, 18, 8, 2] },
    { z: 39, sym: "Y", name: "Yttrium", nameAr: "إيتريوم", config: [2, 8, 18, 9, 2] },
    { z: 40, sym: "Zr", name: "Zirconium", nameAr: "زركونيوم", config: [2, 8, 18, 10, 2] },
    { z: 41, sym: "Nb", name: "Niobium", nameAr: "نيوبيوم", config: [2, 8, 18, 12, 1] },
    { z: 42, sym: "Mo", name: "Molybdenum", nameAr: "موليبدينوم", config: [2, 8, 18, 13, 1] },
    { z: 43, sym: "Tc", name: "Technetium", nameAr: "تكنيشيوم", config: [2, 8, 18, 13, 2] },
    { z: 44, sym: "Ru", name: "Ruthenium", nameAr: "روثينيوم", config: [2, 8, 18, 15, 1] },
    { z: 45, sym: "Rh", name: "Rhodium", nameAr: "روديوم", config: [2, 8, 18, 16, 1] },
    { z: 46, sym: "Pd", name: "Palladium", nameAr: "بلاديوم", config: [2, 8, 18, 18] },
    { z: 47, sym: "Ag", name: "Silver", nameAr: "فضة", config: [2, 8, 18, 18, 1] },
    { z: 48, sym: "Cd", name: "Cadmium", nameAr: "كادميوم", config: [2, 8, 18, 18, 2] },
    { z: 49, sym: "In", name: "Indium", nameAr: "إنديوم", config: [2, 8, 18, 18, 3] },
    { z: 50, sym: "Sn", name: "Tin", nameAr: "قصدير", config: [2, 8, 18, 18, 4] },
    { z: 51, sym: "Sb", name: "Antimony", nameAr: "أنتيمون", config: [2, 8, 18, 18, 5] },
    { z: 52, sym: "Te", name: "Tellurium", nameAr: "تيلوريوم", config: [2, 8, 18, 18, 6] },
    { z: 53, sym: "I", name: "Iodine", nameAr: "يود", config: [2, 8, 18, 18, 7] },
    { z: 54, sym: "Xe", name: "Xenon", nameAr: "زينون", config: [2, 8, 18, 18, 8] },
    { z: 55, sym: "Cs", name: "Caesium", nameAr: "سيزيوم", config: [2, 8, 18, 18, 8, 1] },
    { z: 56, sym: "Ba", name: "Barium", nameAr: "باريوم", config: [2, 8, 18, 18, 8, 2] },
    { z: 57, sym: "La", name: "Lanthanum", nameAr: "لانثانم", config: [2, 8, 18, 18, 9, 2] },
    { z: 58, sym: "Ce", name: "Cerium", nameAr: "سيريوم", config: [2, 8, 18, 19, 9, 2] },
    { z: 59, sym: "Pr", name: "Praseodymium", nameAr: "براسيوديميوم", config: [2, 8, 18, 21, 8, 2] },
    { z: 60, sym: "Nd", name: "Neodymium", nameAr: "نيوديميوم", config: [2, 8, 18, 22, 8, 2] },
    { z: 61, sym: "Pm", name: "Promethium", nameAr: "بروميثيوم", config: [2, 8, 18, 23, 8, 2] },
    { z: 62, sym: "Sm", name: "Samarium", nameAr: "ساماريوم", config: [2, 8, 18, 24, 8, 2] },
    { z: 63, sym: "Eu", name: "Europium", nameAr: "يوروبيوم", config: [2, 8, 18, 25, 8, 2] },
    { z: 64, sym: "Gd", name: "Gadolinium", nameAr: "جادولينيوم", config: [2, 8, 18, 25, 9, 2] },
    { z: 65, sym: "Tb", name: "Terbium", nameAr: "تيربيوم", config: [2, 8, 18, 27, 8, 2] },
    { z: 66, sym: "Dy", name: "Dysprosium", nameAr: "ديسبروسيوم", config: [2, 8, 18, 28, 8, 2] },
    { z: 67, sym: "Ho", name: "Holmium", nameAr: "هولميوم", config: [2, 8, 18, 29, 8, 2] },
    { z: 68, sym: "Er", name: "Erbium", nameAr: "إربيوم", config: [2, 8, 18, 30, 8, 2] },
    { z: 69, sym: "Tm", name: "Thulium", nameAr: "ثوليوم", config: [2, 8, 18, 31, 8, 2] },
    { z: 70, sym: "Yb", name: "Ytterbium", nameAr: "إيتربيوم", config: [2, 8, 18, 32, 8, 2] },
    { z: 71, sym: "Lu", name: "Lutetium", nameAr: "لوتيشيوم", config: [2, 8, 18, 32, 9, 2] },
    { z: 72, sym: "Hf", name: "Hafnium", nameAr: "هافنيوم", config: [2, 8, 18, 32, 10, 2] },
    { z: 73, sym: "Ta", name: "Tantalum", nameAr: "تانتالوم", config: [2, 8, 18, 32, 11, 2] },
    { z: 74, sym: "W", name: "Tungsten", nameAr: "تنجستن", config: [2, 8, 18, 32, 12, 2] },
    { z: 75, sym: "Re", name: "Rhenium", nameAr: "رينيوم", config: [2, 8, 18, 32, 13, 2] },
    { z: 76, sym: "Os", name: "Osmium", nameAr: "أوزميوم", config: [2, 8, 18, 32, 14, 2] },
    { z: 77, sym: "Ir", name: "Iridium", nameAr: "إيريديوم", config: [2, 8, 18, 32, 15, 2] },
    { z: 78, sym: "Pt", name: "Platinum", nameAr: "بلاتين", config: [2, 8, 18, 32, 17, 1] },
    { z: 79, sym: "Au", name: "Gold", nameAr: "ذهب", config: [2, 8, 18, 32, 18, 1] },
    { z: 80, sym: "Hg", name: "Mercury", nameAr: "زئبق", config: [2, 8, 18, 32, 18, 2] },
    { z: 81, sym: "Tl", name: "Thallium", nameAr: "ثاليوم", config: [2, 8, 18, 32, 18, 3] },
    { z: 82, sym: "Pb", name: "Lead", nameAr: "رصاص", config: [2, 8, 18, 32, 18, 4] },
    { z: 83, sym: "Bi", name: "Bismuth", nameAr: "بزموت", config: [2, 8, 18, 32, 18, 5] },
    { z: 84, sym: "Po", name: "Polonium", nameAr: "بولونيوم", config: [2, 8, 18, 32, 18, 6] },
    { z: 85, sym: "At", name: "Astatine", nameAr: "أستاتين", config: [2, 8, 18, 32, 18, 7] },
    { z: 86, sym: "Rn", name: "Radon", nameAr: "رادون", config: [2, 8, 18, 32, 18, 8] },
    { z: 87, sym: "Fr", name: "Francium", nameAr: "فرانسيوم", config: [2, 8, 18, 32, 18, 8, 1] },
    { z: 88, sym: "Ra", name: "Radium", nameAr: "راديوم", config: [2, 8, 18, 32, 18, 8, 2] },
    { z: 89, sym: "Ac", name: "Actinium", nameAr: "أكتينيوم", config: [2, 8, 18, 32, 18, 9, 2] },
    { z: 90, sym: "Th", name: "Thorium", nameAr: "ثوريوم", config: [2, 8, 18, 32, 18, 10, 2] },
    { z: 91, sym: "Pa", name: "Protactinium", nameAr: "بروتكتينيوم", config: [2, 8, 18, 32, 20, 9, 2] },
    { z: 92, sym: "U", name: "Uranium", nameAr: "يورانيوم", config: [2, 8, 18, 32, 21, 9, 2] },
    { z: 93, sym: "Np", name: "Neptunium", nameAr: "نبتونيوم", config: [2, 8, 18, 32, 22, 9, 2] },
    { z: 94, sym: "Pu", name: "Plutonium", nameAr: "بلوتونيوم", config: [2, 8, 18, 32, 24, 8, 2] },
    { z: 95, sym: "Am", name: "Americium", nameAr: "أمريسيوم", config: [2, 8, 18, 32, 25, 8, 2] },
    { z: 96, sym: "Cm", name: "Curium", nameAr: "كوريوم", config: [2, 8, 18, 32, 25, 9, 2] },
    { z: 97, sym: "Bk", name: "Berkelium", nameAr: "بيركيليوم", config: [2, 8, 18, 32, 27, 8, 2] },
    { z: 98, sym: "Cf", name: "Californium", nameAr: "كاليفورنيوم", config: [2, 8, 18, 32, 28, 8, 2] },
    { z: 99, sym: "Es", name: "Einsteinium", nameAr: "أينشتاينيوم", config: [2, 8, 18, 32, 29, 8, 2] },
    { z: 100, sym: "Fm", name: "Fermium", nameAr: "فيرميوم", config: [2, 8, 18, 32, 30, 8, 2] },
    { z: 101, sym: "Md", name: "Mendelevium", nameAr: "مندليفيوم", config: [2, 8, 18, 32, 31, 8, 2] },
    { z: 102, sym: "No", name: "Nobelium", nameAr: "نوبليوم", config: [2, 8, 18, 32, 32, 8, 2] },
    { z: 103, sym: "Lr", name: "Lawrencium", nameAr: "لورنسيوم", config: [2, 8, 18, 32, 32, 8, 3] },
    { z: 104, sym: "Rf", name: "Rutherfordium", nameAr: "رذرفورديوم", config: [2, 8, 18, 32, 32, 10, 2] },
    { z: 105, sym: "Db", name: "Dubnium", nameAr: "دوبنيوم", config: [2, 8, 18, 32, 32, 11, 2] },
    { z: 106, sym: "Sg", name: "Seaborgium", nameAr: "سيبورجيوم", config: [2, 8, 18, 32, 32, 12, 2] },
    { z: 107, sym: "Bh", name: "Bohrium", nameAr: "بوريوم", config: [2, 8, 18, 32, 32, 13, 2] },
    { z: 108, sym: "Hs", name: "Hassium", nameAr: "هاسيوم", config: [2, 8, 18, 32, 32, 14, 2] },
    { z: 109, sym: "Mt", name: "Meitnerium", nameAr: "مايتنريوم", config: [2, 8, 18, 32, 32, 15, 2] },
    { z: 110, sym: "Ds", name: "Darmstadtium", nameAr: "دارمشتاتيوم", config: [2, 8, 18, 32, 32, 16, 2] },
    { z: 111, sym: "Rg", name: "Roentgenium", nameAr: "رونتجينيوم", config: [2, 8, 18, 32, 32, 17, 2] },
    { z: 112, sym: "Cn", name: "Copernicium", nameAr: "كوبرنيسيوم", config: [2, 8, 18, 32, 32, 18, 2] },
    { z: 113, sym: "Nh", name: "Nihonium", nameAr: "نيهونيوم", config: [2, 8, 18, 32, 32, 18, 3] },
    { z: 114, sym: "Fl", name: "Flerovium", nameAr: "فليروفيوم", config: [2, 8, 18, 32, 32, 18, 4] },
    { z: 115, sym: "Mc", name: "Moscovium", nameAr: "موسكوفيوم", config: [2, 8, 18, 32, 32, 18, 5] },
    { z: 116, sym: "Lv", name: "Livermorium", nameAr: "ليفرموريوم", config: [2, 8, 18, 32, 32, 18, 6] },
    { z: 117, sym: "Ts", name: "Tennessine", nameAr: "تينيسين", config: [2, 8, 18, 32, 32, 18, 7] },
    { z: 118, sym: "Og", name: "Oganesson", nameAr: "أوغانيسون", config: [2, 8, 18, 32, 32, 18, 8] }
];

const rooms = {};
function makeCode() { return Math.random().toString(36).substring(2, 6).toUpperCase(); }

io.on('connection', (socket) => {
    socket.on('createRoom', ({ mode }, cb) => {
        const code = makeCode();
        rooms[code] = {
            hostSocket: socket.id, mode: mode || 'team', 
            players: [], scores: {}, round: 0, phase: 'waiting',
            currentElement: null, answers: {}
        };
        socket.join(code); socket.roomCode = code;
        cb({ code, mode: rooms[code].mode });
    });

    socket.on('joinRoom', ({ code, name }, cb) => {
        code = (code || '').toUpperCase(); const room = rooms[code];
        if (!room) return cb({ error: 'الغرفة غير موجودة' });
        const playerId = 'P' + Date.now();
        room.players.push({ id: playerId, name: name, socketId: socket.id });
        room.scores[playerId] = 0;
        socket.join(code); socket.roomCode = code; socket.playerId = playerId;
        io.to(room.hostSocket).emit('roomUpdate', publicRoom(room));
        cb({ ok: true, playerId, name, mode: room.mode });
    });

    socket.on('startRound', () => {
        const room = rooms[socket.roomCode];
        if (!room || room.players.length === 0) return;
        room.phase = 'question';
        room.answers = {};
        room.currentElement = elements[Math.floor(Math.random() * elements.length)];
        
        io.to(room.hostSocket).emit('roundStartedHost', { round: room.round + 1, data: room.currentElement });
        room.players.forEach(p => {
            io.to(p.socketId).emit('roundStarted', { round: room.round + 1, data: room.currentElement });
        });
        room.round++;
    });

    socket.on('submitAnswer', ({ config }) => {
        const room = rooms[socket.roomCode];
        if (!room || room.phase !== 'question') return;
        
        const isCorrect = JSON.stringify(config) === JSON.stringify(room.currentElement.config);
        const pts = isCorrect ? 10 : 0;
        
        room.scores[socket.playerId] += pts;
        room.answers[socket.playerId] = { config, isCorrect, pts };
        
        socket.emit('answerResult', { isCorrect, pts, correctConfig: room.currentElement.config });
        
        if (Object.keys(room.answers).length === room.players.length) {
            room.phase = 'reveal';
            const leaderboard = room.players.map(p => ({
                name: p.name, score: room.scores[p.id]
            })).sort((a,b) => b.score - a.score);
            
            io.to(room.hostSocket).emit('revealHost', { leaderboard, correctConfig: room.currentElement.config });
            room.players.forEach(p => {
                io.to(p.socketId).emit('revealPlayer', { 
                    leaderboard, correctConfig: room.currentElement.config,
                    mine: room.answers[p.id]
                });
            });
        }
    });

    socket.on('nextRound', () => {
        const room = rooms[socket.roomCode];
        if (!room) return;
        room.phase = 'waiting';
        io.to(socket.roomCode).emit('prepareNext');
    });
});

function publicRoom(room) {
    return { mode: room.mode, players: room.players.map(p => ({ id: p.id, name: p.name })) };
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`🚀 السيرفر يعمل على المنفذ ${PORT}`));