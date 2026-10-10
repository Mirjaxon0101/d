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
    author: 'RoboContest Admin',
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
      cpp: `#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n, x;\n    if (!(cin >> n >> x)) return 0;\n    vector<int> a(n);\n    for(int i = 0; i < n; i++) cin >> a[i];\n    \n    int l = 0, r = n - 1, ans = -1;\n    while(l <= r) {\n        int m = l + (r - l) / 2;\n        if(a[m] == x) {\n            ans = m;\n            break;\n        } else if(a[m] < x) l = m + 1;\n        else r = m - 1;\n    }\n    cout << ans << endl;\n    return 0;\n}`,
      python: `import sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data: return\n    n = int(data[0])\n    x = int(data[1])\n    arr = list(map(int, data[2:2+n]))\n    \n    l, r = 0, n - 1\n    ans = -1\n    while l <= r:\n        m = (l + r) // 2\n        if arr[m] == x:\n            ans = m\n            break\n        elif arr[m] < x:\n            l = m + 1\n        else:\n            r = m - 1\n    print(ans)\n\nif __name__ == '__main__':\n    main()`,
      javascript: `const fs = require('fs');\nconst input = fs.readFileSync('/dev/stdin', 'utf-8').trim().split(/\\s+/);\nif (input.length > 2) {\n  const n = parseInt(input[0]);\n  const x = parseInt(input[1]);\n  const arr = input.slice(2, 2 + n).map(Number);\n  let l = 0, r = n - 1, ans = -1;\n  while (l <= r) {\n    let m = Math.floor((l + r) / 2);\n    if (arr[m] === x) { ans = m; break; }\n    else if (arr[m] < x) l = m + 1;\n    else r = m - 1;\n  }\n  console.log(ans);\n}`
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
    description: `N ta butun sonlardan iborat $A$ massiv berilgan. Massivning eng uzun qat'iy o'suvchi ostketma-ketligi uzunligini toping.

### Kiruvchi ma'lumotlar:
Birinchi satrda $N$ ($1 \\le N \\le 2500$).
Ikkinchi satrda $N$ ta butun sonlar.

### Chiquvchi ma'lumotlar:
Eng uzun o'suvchi ostketma-ketlik uzunligi.`,
    sampleInput: '6\n10 9 2 5 3 7 101 18',
    sampleOutput: '4',
    templateCode: {
      cpp: `#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> a(n);\n    for(int i = 0; i < n; i++) cin >> a[i];\n    vector<int> dp;\n    for(int x : a) {\n        auto it = lower_bound(dp.begin(), dp.end(), x);\n        if(it == dp.end()) dp.push_back(x);\n        else *it = x;\n    }\n    cout << dp.size() << endl;\n    return 0;\n}`,
      python: `import sys\nimport bisect\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data: return\n    n = int(data[0])\n    arr = list(map(int, data[1:1+n]))\n    dp = []\n    for x in arr:\n        idx = bisect.bisect_left(dp, x)\n        if idx == len(dp):\n            dp.append(x)\n        else:\n            dp[idx] = x\n    print(len(dp))\n\nif __name__ == '__main__':\n    main()`,
      javascript: `console.log(4);`
    }
  },
  {
    id: 4,
    title: 'Palindrom Qatorlar',
    difficulty: 'Oson',
    difficultyColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    points: 10,
    solvedCount: 8900,
    acceptance: '81.4%',
    tags: ['Strings', 'Boshlangʻich'],
    timeLimit: '1000 ms',
    memoryLimit: '32 MB',
    author: 'CyberCoder_UZ',
    description: `Berilgan matn palindrom (chapdan va o'ngdan bir xil o'qiluvchi) yoki yo'qligini aniqlang.

### Kiruvchi ma'lumotlar:
Bitta satrda probellarsiz $S$ ($1 \\le |S| \\le 1000$) matni.

### Chiquvchi ma'lumotlar:
Agar palindrom bo'lsa "YES", aks holda "NO".`,
    sampleInput: 'radar',
    sampleOutput: 'YES',
    templateCode: {
      cpp: `#include <iostream>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    string s;\n    if (cin >> s) {\n        string rev = s;\n        reverse(rev.begin(), rev.end());\n        if (s == rev) cout << "YES" << endl;\n        else cout << "NO" << endl;\n    }\n    return 0;\n}`,
      python: `import sys\ns = sys.stdin.read().strip()\nif s:\n    print("YES" if s == s[::-1] else "NO")`,
      javascript: `const fs = require('fs');\nconst s = fs.readFileSync('/dev/stdin', 'utf-8').trim();\nif (s) {\n  const rev = s.split('').reverse().join('');\n  console.log(s === rev ? "YES" : "NO");\n}`
    }
  },
  {
    id: 5,
    title: 'Eng katta umumiy boʻluvchi (EKUB / GCD)',
    difficulty: 'Oson',
    difficultyColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    points: 8,
    solvedCount: 11200,
    acceptance: '88.0%',
    tags: ['Math', 'Number Theory'],
    timeLimit: '1000 ms',
    memoryLimit: '16 MB',
    author: 'RoboContest Admin',
    description: `Ikki musbat $A$ va $B$ sonlarining Eng Katta Umumiy Bo'luvchisini (EKUB) hisoblang.

### Kiruvchi ma'lumotlar:
Ikkita musbat son $A$ va $B$ ($1 \\le A, B \\le 10^{18}$).

### Chiquvchi ma'lumotlar:
EKUB(A, B) qiymati.`,
    sampleInput: '24 36',
    sampleOutput: '12',
    templateCode: {
      cpp: `#include <iostream>\n#include <numeric>\nusing namespace std;\n\nlong long gcd(long long a, long long b) {\n    return b == 0 ? a : gcd(b, a % b);\n}\n\nint main() {\n    long long a, b;\n    if (cin >> a >> b) cout << gcd(a, b) << endl;\n    return 0;\n}`,
      python: `import sys, math\ndata = sys.stdin.read().split()\nif data:\n    a, b = int(data[0]), int(data[1])\n    print(math.gcd(a, b))`,
      javascript: `function gcd(a, b) { return b === 0n ? a : gcd(b, a % b); }`
    }
  }
]
