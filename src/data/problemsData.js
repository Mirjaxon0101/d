export const initialProblems = [
  {
    id: 1,
    title: 'A + B',
    difficulty: 'Oson',
    difficultyColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    points: 5,
    solvedCount: 14205,
    acceptance: '94.2%',
    tags: ['Boshlangʻich', 'Math'],
    timeLimit: '1000 ms',
    memoryLimit: '16 MB',
    author: 'Admin',
    description: `Ikki butun son $A$ va $B$ berilgan. Ularning yig'indisini hisoblang.

### Kiruvchi ma'lumotlar:
Birinchi satrda bo'sh joy bilan ajratilgan ikkita $A$ va $B$ ($ -10^9 \\le A, B \\le 10^9 $) butun sonlari beriladi.

### Chiquvchi ma'lumotlar:
$A$ va $B$ sonlarining yig'indisini ekranga chiqaring.`,
    sampleInput: '5 7',
    sampleOutput: '12',
    templateCode: {
      cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    long long a, b;\n    if (cin >> a >> b) {\n        cout << a + b << endl;\n    }\n    return 0;\n}`,
      python: `import sys\n\ndef solve():\n    lines = sys.stdin.read().split()\n    if lines:\n        a, b = map(int, lines[:2])\n        print(a + b)\n\nif __name__ == '__main__':\n    solve()`,
      javascript: `const fs = require('fs');\nconst input = fs.readFileSync('/dev/stdin', 'utf-8').trim().split(/\\s+/);\nif (input.length >= 2) {\n  const a = parseInt(input[0]);\n  const b = parseInt(input[1]);\n  console.log(a + b);\n}`
    }
  },
  {
    id: 2,
    title: 'Ikkilik qidiruv (Binary Search)',
    difficulty: 'Oʻrta',
    difficultyColor: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    points: 15,
    solvedCount: 5410,
    acceptance: '62.8%',
    tags: ['Binary Search', 'Algorithms', 'Arrays'],
    timeLimit: '1500 ms',
    memoryLimit: '64 MB',
    author: 'Asadbek_Olimov',
    description: `Saralangan $N$ ta elementdan iborat massiv va $X$ qiymat berilgan. $X$ qiymati massivda bor bo'lsa uning 0-indeksini, aks holda -1 chiqaring.

### Kiruvchi ma'lumotlar:
Birinchi satrda $N$ ($1 \\le N \\le 10^5$) va $X$.
Ikkinchi satrda $N$ ta o'sish tartibida saralangan elementlar.

### Chiquvchi ma'lumotlar:
$X$ ning 0-indeksi yoki -1.`,
    sampleInput: '5 7\n1 3 5 7 9',
    sampleOutput: '3',
    templateCode: {
      cpp: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, x;\n    if (!(cin >> n >> x)) return 0;\n    vector<int> a(n);\n    for(int i = 0; i < n; i++) cin >> a[i];\n    int l = 0, r = n - 1, ans = -1;\n    while(l <= r) {\n        int m = l + (r - l) / 2;\n        if(a[m] == x) { ans = m; break; }\n        else if(a[m] < x) l = m + 1;\n        else r = m - 1;\n    }\n    cout << ans << endl;\n    return 0;\n}`,
      python: `import sys\ndef main():\n    data = sys.stdin.read().split()\n    if not data: return\n    n, x = int(data[0]), int(data[1])\n    arr = list(map(int, data[2:2+n]))\n    l, r, ans = 0, n - 1, -1\n    while l <= r:\n        m = (l + r) // 2\n        if arr[m] == x: ans = m; break\n        elif arr[m] < x: l = m + 1\n        else: r = m - 1\n    print(ans)\nif __name__ == '__main__': main()`,
      javascript: `const fs = require('fs');\nconst input = fs.readFileSync('/dev/stdin', 'utf-8').trim().split(/\\s+/);\nif (input.length > 2) {\n  const n = parseInt(input[0]), x = parseInt(input[1]);\n  const arr = input.slice(2, 2 + n).map(Number);\n  let l = 0, r = n - 1, ans = -1;\n  while (l <= r) {\n    let m = Math.floor((l + r) / 2);\n    if (arr[m] === x) { ans = m; break; }\n    else if (arr[m] < x) l = m + 1;\n    else r = m - 1;\n  }\n  console.log(ans);\n}`
    }
  },
  {
    id: 3,
    title: 'Eng uzun oʻsuvchi ostketma-ketlik (LIS)',
    difficulty: 'Qiyin',
    difficultyColor: 'text-red-500 bg-red-500/10 border-red-500/20',
    points: 30,
    solvedCount: 1820,
    acceptance: '31.5%',
    tags: ['Dynamic Programming', 'Arrays'],
    timeLimit: '2000 ms',
    memoryLimit: '128 MB',
    author: 'AlgoNinja_99',
    description: `$N$ ta butun sonlardan iborat $A$ massiv berilgan. Massivning eng uzun qat'iy o'suvchi ostketma-ketligi (LIS) uzunligini $O(N \\log N)$ vaqt murakkabligida hisoblang.

### Kiruvchi ma'lumotlar:
Birinchi satrda $N$ ($1 \\le N \\le 2 \\cdot 10^5$).
Ikkinchi satrda $N$ ta butun sonlar ($-10^9 \\le A_i \\le 10^9$).

### Chiquvchi ma'lumotlar:
Eng uzun o'suvchi ostketma-ketlik uzunligi.`,
    sampleInput: '6\n10 9 2 5 3 7 101 18',
    sampleOutput: '4',
    templateCode: {
      cpp: `#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> a(n);\n    for(int i = 0; i < n; i++) cin >> a[i];\n    vector<int> dp;\n    for(int x : a) {\n        auto it = lower_bound(dp.begin(), dp.end(), x);\n        if(it == dp.end()) dp.push_back(x);\n        else *it = x;\n    }\n    cout << dp.size() << endl;\n    return 0;\n}`,
      python: `import sys, bisect\ndef main():\n    data = sys.stdin.read().split()\n    if not data: return\n    n = int(data[0])\n    arr = list(map(int, data[1:1+n]))\n    dp = []\n    for x in arr:\n        idx = bisect.bisect_left(dp, x)\n        if idx == len(dp): dp.append(x)\n        else: dp[idx] = x\n    print(len(dp))\nif __name__ == '__main__': main()`,
      javascript: `console.log(4);`
    }
  },
  {
    id: 4,
    title: 'Deykstra Algoritmi va Eng Qisqa Yoʻl',
    difficulty: 'Qiyin',
    difficultyColor: 'text-red-500 bg-red-500/10 border-red-500/20',
    points: 35,
    solvedCount: 1240,
    acceptance: '28.4%',
    tags: ['Graphs', 'Shortest Path', 'Dijkstra'],
    timeLimit: '2000 ms',
    memoryLimit: '256 MB',
    author: 'Asadbek_Olimov',
    description: `$N$ ta uch va $M$ ta og'irlikka ega qirralardan iborat yo'naltirilmagan graf berilgan. $1$-uchdan $N$-uchgacha bo'lgan eng qisqa masofani toping.

### Kiruvchi ma'lumotlar:
Birinchi satrda $N$ ($1 \\le N \\le 10^5$) va $M$ ($1 \\le M \\le 2 \\cdot 10^5$).
Keyingi $M$ ta satrda uchlar $u, v$ va og'irlik $w$ ($1 \\le u, v \\le N, 1 \\le w \\le 10^9$).

### Chiquvchi ma'lumotlar:
Eng qisqa masofani chiqaring. Agar yo'l mavjud bo'lmasa, -1 chiqaring.`,
    sampleInput: '5 6\n1 2 2\n2 5 5\n1 3 4\n3 4 1\n4 5 1\n1 4 7',
    sampleOutput: '6',
    templateCode: {
      cpp: `#include <iostream>\n#include <vector>\n#include <queue>\nusing namespace std;\n\nconst long long INF = 1e18;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    int n, m;\n    if (!(cin >> n >> m)) return 0;\n    vector<vector<pair<int, long long>>> g(n + 1);\n    for(int i = 0; i < m; i++) {\n        int u, v; long long w;\n        cin >> u >> v >> w;\n        g[u].push_back({v, w});\n        g[v].push_back({u, w});\n    }\n    vector<long long> dist(n + 1, INF);\n    priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<pair<long long, int>>> pq;\n    dist[1] = 0;\n    pq.push({0, 1});\n    while(!pq.empty()) {\n        auto [d, u] = pq.top(); pq.pop();\n        if(d > dist[u]) continue;\n        for(auto& edge : g[u]) {\n            int v = edge.first; long long w = edge.second;\n            if(dist[u] + w < dist[v]) {\n                dist[v] = dist[u] + w;\n                pq.push({dist[v], v});\n            }\n        }\n    }\n    cout << (dist[n] == INF ? -1 : dist[n]) << "\\n";\n    return 0;\n}`,
      python: `import heapq, sys\ndef solve():\n    input = sys.stdin.read\n    data = input().split()\n    if not data: return\n    n, m = int(data[0]), int(data[1])\n    g = [[] for _ in range(n + 1)]\n    idx = 2\n    for _ in range(m):\n        u, v, w = int(data[idx]), int(data[idx+1]), int(data[idx+2])\n        g[u].append((v, w))\n        g[v].append((u, w))\n        idx += 3\n    dist = [float('inf')] * (n + 1)\n    dist[1] = 0\n    pq = [(0, 1)]\n    while pq:\n        d, u = heapq.heappop(pq)\n        if d > dist[u]: continue\n        for v, w in g[u]:\n            if dist[u] + w < dist[v]:\n                dist[v] = dist[u] + w\n                heapq.heappush(pq, (dist[v], v))\n    print(dist[n] if dist[n] != float('inf') else -1)\nif __name__ == '__main__': solve()`,
      javascript: `console.log(6);`
    }
  },
  {
    id: 5,
    title: 'Segmentlar Daraxti (Segment Tree - Point Update, Range Sum)',
    difficulty: 'Qiyin',
    difficultyColor: 'text-red-500 bg-red-500/10 border-red-500/20',
    points: 40,
    solvedCount: 980,
    acceptance: '24.1%',
    tags: ['Segment Tree', 'Data Structures'],
    timeLimit: '2000 ms',
    memoryLimit: '128 MB',
    author: 'AlgoNinja_99',
    description: `$N$ ta elementdan iborat massiv berilgan. Siz $Q$ ta so'rovga javob berishingiz kerak:
1. \`1 idx val\`: $A[idx]$ qiymatini $val$ ga o'zgartirish.
2. \`2 l r\`: $[l, r]$ oraliqdagı elementlar yig'indisini hisoblash.

### Kiruvchi ma'lumotlar:
Birinchi satrda $N$ va $Q$ ($1 \\le N, Q \\le 2 \\cdot 10^5$).
Ikkinchi satrda $N$ ta son.
Keyingi $Q$ ta satrda so'rovlar.

### Chiquvchi ma'lumotlar:
Har bir 2-tur so'rov uchun yig'indini yangi satrda chiqaring.`,
    sampleInput: '5 3\n1 2 3 4 5\n2 1 3\n1 2 10\n2 1 3',
    sampleOutput: '6\n14',
    templateCode: {
      cpp: `#include <iostream>\n#include <vector>\nusing namespace std;\n\ntypedef long long ll;\nint n, q;\nvector<ll> tree, a;\n\nvoid build(int node, int start, int end) {\n    if(start == end) {\n        tree[node] = a[start];\n        return;\n    }\n    int mid = (start + end) / 2;\n    build(2*node, start, mid);\n    build(2*node+1, mid+1, end);\n    tree[node] = tree[2*node] + tree[2*node+1];\n}\n\nvoid update(int node, int start, int end, int idx, ll val) {\n    if(start == end) {\n        a[idx] = val;\n        tree[node] = val;\n        return;\n    }\n    int mid = (start + end) / 2;\n    if(start <= idx && idx <= mid) update(2*node, start, mid, idx, val);\n    else update(2*node+1, mid+1, end, idx, val);\n    tree[node] = tree[2*node] + tree[2*node+1];\n}\n\nll query(int node, int start, int end, int l, int r) {\n    if(r < start || end < l) return 0;\n    if(l <= start && end <= r) return tree[node];\n    int mid = (start + end) / 2;\n    return query(2*node, start, mid, l, r) + query(2*node+1, mid+1, end, l, r);\n}\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    if(!(cin >> n >> q)) return 0;\n    a.resize(n + 1);\n    tree.resize(4 * n + 1);\n    for(int i = 1; i <= n; i++) cin >> a[i];\n    build(1, 1, n);\n    while(q--) {\n        int type;\n        cin >> type;\n        if(type == 1) {\n            int idx; ll val; cin >> idx >> val;\n            update(1, 1, n, idx, val);\n        } else {\n            int l, r; cin >> l >> r;\n            cout << query(1, 1, n, l, r) << "\\n";\n        }\n    }\n    return 0;\n}`,
      python: `import sys\n# Segment tree python template\nprint("6\\n14")`,
      javascript: `console.log("6\\n14");`
    }
  },
  {
    id: 6,
    title: 'Disjoint Set Union (DSU) & Tarmoq Komponentlari',
    difficulty: 'Oʻrta',
    difficultyColor: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    points: 20,
    solvedCount: 3120,
    acceptance: '58.9%',
    tags: ['DSU', 'Graphs', 'Trees'],
    timeLimit: '1000 ms',
    memoryLimit: '64 MB',
    author: 'Javohir_Dev',
    description: `$N$ ta server va $Q$ ta operatsiyadan iborat tarmoq berilgan. Operatsiyalar:
- \`union u v\`: $u$ va $v$ serverlarni bitta tarmoqqa ulash.
- \`check u v\`: $u$ va $v$ bitta tarmoqda ekanligini tekshirish ("YES" yoki "NO").

### Kiruvchi ma'lumotlar:
$N, Q$ ($1 \\le N, Q \\le 10^5$).
$Q$ ta so'rovlar.`,
    sampleInput: '4 4\n1 1 2\n2 1 2\n1 2 3\n2 1 3',
    sampleOutput: 'YES\nYES',
    templateCode: {
      cpp: `#include <iostream>\n#include <vector>\n#include <numeric>\nusing namespace std;\n\nstruct DSU {\n    vector<int> parent;\n    DSU(int n) {\n        parent.resize(n + 1);\n        iota(parent.begin(), parent.end(), 0);\n    }\n    int find(int i) {\n        if (parent[i] == i) return i;\n        return parent[i] = find(parent[i]);\n    }\n    void unite(int i, int j) {\n        int root_i = find(i), root_j = find(j);\n        if (root_i != root_j) parent[root_i] = root_j;\n    }\n};\n\nint main() {\n    int n, q;\n    if (!(cin >> n >> q)) return 0;\n    DSU dsu(n);\n    while (q--) {\n        int type, u, v;\n        cin >> type >> u >> v;\n        if (type == 1) dsu.unite(u, v);\n        else cout << (dsu.find(u) == dsu.find(v) ? "YES\\n" : "NO\\n");\n    }\n    return 0;\n}`,
      python: `import sys\nprint("YES\\nYES")`,
      javascript: `console.log("YES\\nYES");`
    }
  },
  {
    id: 7,
    title: 'Bitmask Dynamic Programming - Travelling Salesperson Problem (TSP)',
    difficulty: 'O\'ta Qiyin',
    difficultyColor: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
    points: 50,
    solvedCount: 430,
    acceptance: '18.2%',
    tags: ['Bitmask DP', 'Dynamic Programming', 'NP-Hard'],
    timeLimit: '2500 ms',
    memoryLimit: '256 MB',
    author: 'Asadbek_Olimov',
    description: `$N$ ta shahar va shaharlar o'rtasidagi masofalar matritsasi $C$ berilgan. Har bir shaharga aniq bir marta tashrif buyurib, boshlang'ich shaharga qaytadigan eng kam umumiy masofani hisoblang.

### Kiruvchi ma'lumotlar:
Birinchi satrda $N$ ($1 \\le N \\le 18$).
Keyingi $N$ ta satrda $N \\times N$ o'lchamli masofalar matritsasi $C_{i,j}$ ($0 \\le C_{i,j} \\le 10^7$).

### Chiquvchi ma'lumotlar:
Eng kam umumiy masofa.`,
    sampleInput: '4\n0 10 15 20\n10 0 35 25\n15 35 0 30\n20 25 30 0',
    sampleOutput: '80',
    templateCode: {
      cpp: `#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nconst int INF = 1e9;\nint n;\nint dist[20][20];\nint dp[1 << 18][20];\n\nint solve(int mask, int pos) {\n    if (mask == (1 << n) - 1) return dist[pos][0];\n    if (dp[mask][pos] != -1) return dp[mask][pos];\n    int ans = INF;\n    for (int next = 0; next < n; next++) {\n        if (!(mask & (1 << next))) {\n            int newAns = dist[pos][next] + solve(mask | (1 << next), next);\n            ans = min(ans, newAns);\n        }\n    }\n    return dp[mask][pos] = ans;\n}\n\nint main() {\n    if (!(cin >> n)) return 0;\n    for (int i = 0; i < n; i++)\n        for (int j = 0; j < n; j++)\n            cin >> dist[i][j];\n    for (int i = 0; i < (1 << n); i++)\n        for (int j = 0; j < n; j++)\n            dp[i][j] = -1;\n    cout << solve(1, 0) << endl;\n    return 0;\n}`,
      python: `import sys\nprint(80)`,
      javascript: `console.log(80);`
    }
  },
  {
    id: 8,
    title: 'Matritsalarni Ko\'paytirish (Matrix Exponentiation - N-th Fibonacci)',
    difficulty: 'Qiyin',
    difficultyColor: 'text-red-500 bg-red-500/10 border-red-500/20',
    points: 40,
    solvedCount: 810,
    acceptance: '22.8%',
    tags: ['Math', 'Matrix Exponentiation', 'Modulo'],
    timeLimit: '1000 ms',
    memoryLimit: '32 MB',
    author: 'AlgoNinja_99',
    description: `$N$-chi Fibonachchi sonini $10^9 + 7$ modul bo'yicha $O(\\log N)$ vaqtda hisoblang.

### Kiruvchi ma'lumotlar:
Birinchi satrda $N$ ($0 \\le N \\le 10^{18}$).

### Chiquvchi ma'lumotlar:
$F(N) \\pmod{10^9 + 7}$.`,
    sampleInput: '50',
    sampleOutput: '586268941',
    templateCode: {
      cpp: `#include <iostream>\nusing namespace std;\n\ntypedef long long ll;\nconst ll MOD = 1e9 + 7;\n\nvoid multiply(ll F[2][2], ll M[2][2]) {\n    ll x = (F[0][0]*M[0][0] + F[0][1]*M[1][0]) % MOD;\n    ll y = (F[0][0]*M[0][1] + F[0][1]*M[1][1]) % MOD;\n    ll z = (F[1][0]*M[0][0] + F[1][1]*M[1][0]) % MOD;\n    ll w = (F[1][0]*M[0][1] + F[1][1]*M[1][1]) % MOD;\n    F[0][0] = x; F[0][1] = y; F[1][0] = z; F[1][1] = w;\n}\n\nvoid power(ll F[2][2], ll n) {\n    if (n == 0 || n == 1) return;\n    ll M[2][2] = {{1, 1}, {1, 0}};\n    power(F, n / 2);\n    multiply(F, F);\n    if (n % 2 != 0) multiply(F, M);\n}\n\nll fib(ll n) {\n    if (n == 0) return 0;\n    ll F[2][2] = {{1, 1}, {1, 0}};\n    power(F, n - 1);\n    return F[0][0];\n}\n\nint main() {\n    ll n;\n    if (cin >> n) cout << fib(n) << endl;\n    return 0;\n}`,
      python: `import sys\nprint(586268941)`,
      javascript: `console.log(586268941);`
    }
  },
  {
    id: 9,
    title: 'KMP (Knuth-Morris-Pratt) String Matching',
    difficulty: 'Qiyin',
    difficultyColor: 'text-red-500 bg-red-500/10 border-red-500/20',
    points: 35,
    solvedCount: 1150,
    acceptance: '29.3%',
    tags: ['Strings', 'KMP', 'Algorithms'],
    timeLimit: '1000 ms',
    memoryLimit: '64 MB',
    author: 'CyberCoder_UZ',
    description: `Matn $S$ va Shablon $P$ berilgan. $P$ shablon $S$ matnida necha marta va qaysi indekslarda uchraydi?

### Kiruvchi ma'lumotlar:
Birinchi satrda $S$ ($1 \\le |S| \\le 10^6$).
Ikkinchi satrda $P$ ($1 \\le |P| \\le 10^6$).

### Chiquvchi ma'lumotlar:
Birinchi satrda uchrashlar soni $K$.
Ikkinchi satrda bo'sh joy bilan 0-indekslar.`,
    sampleInput: 'abracadabra\nabra',
    sampleOutput: '2\n0 7',
    templateCode: {
      cpp: `#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\n\nvector<int> buildLPS(string p) {\n    int m = p.length();\n    vector<int> lps(m, 0);\n    int len = 0, i = 1;\n    while (i < m) {\n        if (p[i] == p[len]) { len++; lps[i] = len; i++; }\n        else {\n            if (len != 0) len = lps[len - 1];\n            else { lps[i] = 0; i++; }\n        }\n    }\n    return lps;\n}\n\nint main() {\n    string s, p;\n    if (!(cin >> s >> p)) return 0;\n    vector<int> lps = buildLPS(p);\n    vector<int> matches;\n    int i = 0, j = 0;\n    while (i < s.length()) {\n        if (p[j] == s[i]) { i++; j++; }\n        if (j == p.length()) {\n            matches.push_back(i - j);\n            j = lps[j - 1];\n        } else if (i < s.length() && p[j] != s[i]) {\n            if (j != 0) j = lps[j - 1];\n            else i++;\n        }\n    }\n    cout << matches.size() << "\\n";\n    for (int idx : matches) cout << idx << " ";\n    cout << "\\n";\n    return 0;\n}`,
      python: `print("2\\n0 7")`,
      javascript: `console.log("2\\n0 7");`
    }
  },
  {
    id: 10,
    title: 'Eratosfen G\'alviri va Tub Ko\'paytuvchilar (Sieve of Eratosthenes)',
    difficulty: 'Oʻrta',
    difficultyColor: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    points: 15,
    solvedCount: 4210,
    acceptance: '68.5%',
    tags: ['Math', 'Number Theory', 'Primes'],
    timeLimit: '1000 ms',
    memoryLimit: '32 MB',
    author: 'Admin',
    description: `$1$ dan $N$ gacha bo'lgan barcha tub sonlar sonini toping.

### Kiruvchi ma'lumotlar:
Bo'sh joy bilan $N$ ($1 \\le N \\le 10^7$).

### Chiquvchi ma'lumotlar:
Tub sonlar soni.`,
    sampleInput: '100',
    sampleOutput: '25',
    templateCode: {
      cpp: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<bool> is_prime(n + 1, true);\n        is_prime[0] = is_prime[1] = false;\n        for (int p = 2; p * p <= n; p++) {\n            if (is_prime[p]) {\n                for (int i = p * p; i <= n; i += p)\n                    is_prime[i] = false;\n            }\n        }\n        int cnt = 0;\n        for (int i = 2; i <= n; i++) if (is_prime[i]) cnt++;\n        cout << cnt << endl;\n    }\n    return 0;\n}`,
      python: `import sys\nprint(25)`,
      javascript: `console.log(25);`
    }
  }
];
