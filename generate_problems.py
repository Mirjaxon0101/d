import json

authors = ["Asadbek_Olimov", "AlgoNinja_99", "Javohir_Dev", "CyberCoder_UZ", "Shahzod_CP", "Bekzod_Algo", "Nodira_Code", "Sardor_Dev", "RoboContest Admin"]

# List of 250 realistic, distinct competitive programming problem themes/titles
problem_topics = [
    # Math & Elementary
    ("A + B Yig'indisi", "Ikki $A$ va $B$ butun sonlarining yig'indisini hisoblang.", "12 28", "40", ["Math", "Boshlangʻich"], "Oson", 5),
    ("Uchburchak Yuzi", "Berilgan asos $a$ va balandlik $h$ uchun uchburchak yuzini toping.", "10 5", "25", ["Math", "Geometry"], "Oson", 5),
    ("Faktorial Oxiridagi Nollar", "$N!$ (faktorial) ning oxirida nechta nol raqami borligini aniqlang.", "25", "6", ["Math", "Number Theory"], "Oʻrta", 15),
    ("Tub Sonni Aniqlash", "Berilgan $N$ soni tub yoki murakkab ekanligini aniqlang.", "29", "YES", ["Math", "Number Theory"], "Oson", 5),
    ("Juft va Toq Yig'indi", "$N$ ta elementdan iborat massivdagi juft va toq sonlar yig'indisini toping.", "5\n1 2 3 4 5", "6 9", ["Arrays", "Math"], "Oson", 5),
    ("Ikkilik Sanoq Sistemasi", "O'nlik sanoq sistemasidagi $N$ sonini ikkilik sanoq sistemasiga o'tkazing.", "13", "1101", ["Bit Manipulation", "Math"], "Oson", 5),
    ("Palindrom Son", "Berilgan $N$ soni o'ngdan ham, chapdan ham bir xil o'qiladimi?", "12321", "YES", ["Strings", "Math"], "Oson", 5),
    ("N-chi Fibonachchi Soni", "$N$-chi Fibonachchi sonining $10^9+7$ ga bo'lgandagi qoldig'ini toping.", "10", "55", ["Math", "DP"], "Oson", 5),
    ("Eng Katta Umumiy Bo'luvchi (GCD)", "Berilgan $A$ va $B$ sonlarining EKUBini hisoblang.", "48 18", "6", ["Math", "Number Theory"], "Oson", 5),
    ("Eng Kichik Umumiy Karrali (LCM)", "Berilgan $A$ va $B$ sonlarining EKUKini hisoblang.", "12 18", "36", ["Math", "Number Theory"], "Oson", 5),

    # Arrays & Strings
    ("Massiv Max va Min Farqi", "Massivdagi eng katta va eng kichik elementlar farqini toping.", "5\n3 8 1 9 4", "8", ["Arrays"], "Oson", 5),
    ("K-chi Eng Katta Element", "Tartiblanmagan massivdan $K$-chi eng katta elementni toping.", "6 2\n3 2 1 5 6 4", "5", ["Sorting", "Arrays"], "Oʻrta", 15),
    ("Teskari Satr", "Berilgan satrni teskarisiga o'girib chiqaring.", "hello", "olleh", ["Strings"], "Oson", 5),
    ("Anagramma Tekshiruvi", "Ikki $S$ va $T$ satrlar bir-birining anagrammasi ekanligini aniqlang.", "listen silent", "YES", ["Strings", "Sorting"], "Oson", 5),
    ("Unli Harflar Soni", "Satrdagi barcha unli harflar ($a, e, i, o, u$) sonini hisoblang.", "robocontest", "4", ["Strings"], "Oson", 5),
    ("Unikal Elementlar", "Massivdagi faqat 1 marta uchraydigan barcha sonlar yig'indisini toping.", "6\n1 2 2 3 4 4", "4", ["Arrays", "Hash Map"], "Oson", 5),
    ("Massivni O'ngga Surish", "Massiv elementlarini $K$ ta pozitsiyaga o'ngga siklik suring.", "5 2\n1 2 3 4 5", "4 5 1 2 3", ["Arrays"], "Oʻrta", 15),
    ("Eng Uzun So'z", "Matndagi eng uzun so'z va uning uzunligini toping.", "Dasturlash musobaqasida g'olib bo'ling", "musobaqasida 12", ["Strings"], "Oson", 5),
    ("Subarray Eng Katta Summa (Kadane)", "Massivning ketma-ket ost-massivlari orasidan eng katta yig'indiga egasini toping.", "8\n-2 1 -3 4 -1 2 1 -5 4", "6", ["Arrays", "DP"], "Oʻrta", 15),
    ("Aylana Bo'ylab Boshqaruv", "Aylanma yo'ldagi yonilg'i shoxobchalari bo'ylab to'liq aylanish imkonini aniqlang.", "4\n4 6 7 4\n6 5 3 5", "2", ["Greedy", "Arrays"], "Qiyin", 30),

    # Algorithms & Searching
    ("Ikkilik Qidiruv (Binary Search)", "Tartiblangan massivdan $X$ qiymatining indeksini toping.", "5 7\n1 3 5 7 9", "3", ["Binary Search"], "Oson", 5),
    ("Tog' cho'qqisini toping", "Massivdagi local maximum (qo'shnilaridan katta) element indeksini toping.", "6\n1 2 4 6 3 1", "3", ["Binary Search"], "Oʻrta", 15),
    ("Teng Yig'indili Juftlik", "Massivda yig'indisi $Target$ ga teng bo'lgan ikki element bor-yo'qligini aniqlang.", "5 10\n2 4 6 8 11", "YES", ["Two Pointers", "Arrays"], "Oson", 5),
    ("Uchta Son Yig'indisi (3Sum)", "Massivda yig'indisi $0$ bo'lgan barcha unikal 3 ta sonlar guruhini toping.", "6\n-1 0 1 2 -1 -4", "2", ["Two Pointers", "Sorting"], "Qiyin", 30),
    ("Suyuqlik Idishlari (Container With Most Water)", "Eng ko'p suv sig'dira oladigan ikki ustun orasidagi maydonni toping.", "9\n1 8 6 2 5 4 8 3 7", "49", ["Two Pointers", "Greedy"], "Oʻrta", 15),
    ("Yomg'ir Suvi To'planishi (Trapping Rain Water)", "Ustunlar orasida to'planib qoladigan umumiy suv hajmini hisoblang.", "12\n0 1 0 2 1 0 1 3 2 1 2 1", "6", ["Two Pointers", "Stack"], "Qiyin", 30),
    ("Ketma-ket 1 lar Maksimal Soni", "Faqat 0 va 1 lardan iborat massivda eng uzun ketma-ket 1 lar uzunligini toping.", "7\n1 1 0 1 1 1 0", "3", ["Arrays"], "Oson", 5),
    ("Sliding Window Maximum", "Uzunligi $K$ bo'lgan har bir darcha uchun maksimal elementni toping.", "8 3\n1 3 -1 -3 5 3 6 7", "3 3 5 5 6 7", ["Sliding Window", "Monotonic Queue"], "Qiyin", 30),
    ("Subarray Sum Equals K", "Yig'indisi $K$ ga teng bo'lgan ost-massivlar sonini toping.", "3 2\n1 1 1", "2", ["Prefix Sum", "Hash Map"], "Oʻrta", 15),
    ("Tartiblangan Massivlarni Birlashtirish", "Ikki tartiblangan massivni bitta tartiblangan massivga birlashtiring.", "3 3\n1 3 5\n2 4 6", "1 2 3 4 5 6", ["Two Pointers", "Sorting"], "Oson", 5)
]

# Generate additional topic variations to reach exactly 250 problems
base_categories = [
    ("DP & Optimization", ["Silliq Ketma-ketlik", "Toshlar O'yini DP", "Kompaniya Ishchilari Mukofoti", "Ratsional Qadamlar", "LCS Eng Uzun Umumiy Ketma-ketlik", "Matritsani Ko'paytirish DP", "Buyumlar Xaltasi (0/1 Knapsack)", "Tangalarni Almashtirish (Coin Change)", "Matnni Tahrirlash Masofasi (Edit Distance)", "Subset Sum Masalasi"]),
    ("Graph Theory", ["Grafda BFS Qidiruv", "Grafda DFS Qidiruv", "Deykstra Eng Qisqa Yo'l", "Floyd-Warshall Barcha Juftliklar", "Bellman-Ford Salbiy Qirralar", "Topologik Saralash", "Kruskal Minimal Daraxt (MST)", "Prim Minimal Daraxt (MST)", "Tarjan Kuchli Bog'liqlik (SCC)", "Graf Bo'yash (Graph Coloring)"]),
    ("Data Structures", ["Segmentlar Daraxti (Segment Tree)", "Fenwick Daraxti (BIT)", "DSU Birlashuvchi To'plamlar", "Trie Kalit So'zlar Daraxti", "Stack Bilan Qavslar Tekshiruvi", "Min Heap Prioritetli Navbat", "LFU Kesh Tizimi", "LRU Kesh Tizimi", "Treap Balanslashgan Daraxt", "Monotonik Stack"]),
    ("Math & Geometry", ["Eratosfen G'alviri Tub Sonlar", "Modulli Darajaga Ko'tarish", "Kombinatorika $C(N, K)$ Modulo", "Paskal Uchburchagi", "Eyler Funksiyasi $\\Phi(N)$", "Xitoy Qoldiq Teoremasi (CRT)", "Fast Fourier Transform (FFT)", "Nuqtalar Orasidagi Eng Qisqa Masofa", "Konveks Qobiq (Convex Hull)", "Kesishuvchi Kesmalar"]),
    ("String Algorithms", ["KMP Satr Qidiruvi", "Z-Algoritmi Satrlar", "Rabin-Karp String Hashing", "Suffix Array & LCP", "Aho-Corasick Avtomat", "Manacher Algoritmi Palindrom", "Eng Uzun Palindrom Ost-satr", "Wildcard Pattern Matching", "Muntazam Iroda (Regex) Matching", "Satr Qisqartmasi"])
]

all_problems = []
p_id = 1

# Add explicitly listed ones first
for title, desc, s_in, s_out, tags, diff, pts in problem_topics:
    diff_color = "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" if diff=="Oson" else "text-amber-500 bg-amber-500/10 border-amber-500/20" if diff=="Oʻrta" else "text-red-500 bg-red-500/10 border-red-500/20"
    all_problems.append({
        "id": p_id,
        "title": title,
        "difficulty": diff,
        "difficultyColor": diff_color,
        "points": pts,
        "solvedCount": max(100, 15000 - p_id * 50),
        "acceptance": f"{max(25, 95 - p_id * 0.3):.1f}%",
        "tags": tags,
        "timeLimit": f"{1000 + (p_id % 4) * 500} ms",
        "memoryLimit": f"{32 + (p_id % 5) * 32} MB",
        "author": authors[p_id % len(authors)],
        "description": f"### Masala #{p_id}: {title}\n\n{desc}\n\n### Kiruvchi ma'lumotlar:\nSinov ma'lumotlari kiritiladi.\n\n### Chiquvchi ma'lumotlar:\nMasalaga mos to'g'ri natijani chiqaring.",
        "sampleInput": s_in,
        "sampleOutput": s_out,
        "templateCode": { "cpp": "", "python": "", "javascript": "" }
    })
    p_id += 1

# Generate remaining up to 250 problems
import random
random.seed(42)

sub_types = [
    "Optimizatsiya", "Sanoq Tizimi", "Maximal Maydon", "Minimal Yo'l", "Qisqa Ketma-ketlik",
    "O'yin Strate giyasi", "Soni Va Yig'indisi", "Massiv Bo'linishi", "Matritsa Qidiruvi", "Siklik Transformatsiya"
]

diff_choices = [
    ("Oson", 5, "text-emerald-500 bg-emerald-500/10 border-emerald-500/20"),
    ("Oʻrta", 15, "text-amber-500 bg-amber-500/10 border-amber-500/20"),
    ("Qiyin", 30, "text-red-500 bg-red-500/10 border-red-500/20"),
    ("O'ta Qiyin", 50, "text-purple-500 bg-purple-500/10 border-purple-500/20")
]

while p_id <= 250:
    cat_name, topics = base_categories[(p_id - 1) % len(base_categories)]
    topic_base = topics[(p_id - 1) % len(topics)]
    sub = sub_types[(p_id * 7) % len(sub_types)]

    title = f"{topic_base}: {sub} #{p_id}"
    diff, pts, diff_color = diff_choices[p_id % len(diff_choices)]

    val1 = (p_id * 13) % 97 + 1
    val2 = (p_id * 29) % 83 + 2
    s_in = f"{val1} {val2}\n" + " ".join(str((i * p_id) % 50 + 1) for i in range(1, 6))
    s_out = str((val1 * val2 + p_id) % 1000)

    desc = f"Sizga $N = {val1}$ va $M = {val2}$ parametrlari berilgan. Ushbu {cat_name} turiga oid masalani minimal vaqt va xotira ishlatib yeching."

    all_problems.append({
        "id": p_id,
        "title": title,
        "difficulty": diff,
        "difficultyColor": diff_color,
        "points": pts,
        "solvedCount": max(50, 12000 - p_id * 45),
        "acceptance": f"{max(15, 90 - p_id * 0.28):.1f}%",
        "tags": [cat_name.split()[0], "Algorithms"],
        "timeLimit": f"{1000 + (p_id % 3) * 500} ms",
        "memoryLimit": f"{64 + (p_id % 4) * 32} MB",
        "author": authors[p_id % len(authors)],
        "description": f"### Masala #{p_id}: {title}\n\n{desc}\n\n### Kiruvchi ma'lumotlar:\nBirinchi satrda kiruvchi argumentlar va massiv elementlari.\n\n### Chiquvchi ma'lumotlar:\nHisoblangan to'g mezoniy natija.",
        "sampleInput": s_in,
        "sampleOutput": s_out,
        "templateCode": { "cpp": "", "python": "", "javascript": "" }
    })
    p_id += 1

js_content = f"export const initialProblems = {json.dumps(all_problems, indent=2, ensure_ascii=False)};\n"

with open("src/data/problemsData.js", "w", encoding="utf-8") as f:
    f.write(js_content)

print(f"Successfully generated {len(all_problems)} unique problems in src/data/problemsData.js!")
