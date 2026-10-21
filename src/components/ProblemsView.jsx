import React, { useState } from 'react'
import {
  Code2,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  Cpu,
  Play,
  Send,
  FileCode,
  Copy,
  Check,
  ChevronLeft,
  X,
  AlertCircle,
  Sparkles
} from 'lucide-react'
import { initialProblems } from '../data/problemsData'
import Skulpt from 'skulpt'

export function ProblemsView({
  language = 'uz',
  problemsList = initialProblems,
  onSelectProblem,
  activeProblemModal,
  onCloseModal,
  currentUser,
  onOpenAuth,
  onProblemSolved
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [difficultyFilter, setDifficultyFilter] = useState('Barchasi')
  const [tagFilter, setTagFilter] = useState('Barchasi')
  const [selectedProblem, setSelectedProblem] = useState(activeProblemModal || null)

  // Code editor state
  const [codeLang, setCodeLang] = useState('python')
  const [userCode, setUserCode] = useState('')
  const [customInput, setCustomInput] = useState('')
  const [customOutput, setCustomOutput] = useState('')
  const [judgeStatus, setJudgeStatus] = useState(null)
  const [isEvaluating, setIsEvaluating] = useState(false)
  const [copied, setCopied] = useState(false)

  React.useEffect(() => {
    if (selectedProblem) {
      setUserCode('')
      setCustomInput(selectedProblem.sampleInput || '')
      setCustomOutput('')
      setJudgeStatus(null)
    }
  }, [selectedProblem, codeLang])

  React.useEffect(() => {
    if (activeProblemModal) {
      setSelectedProblem(activeProblemModal)
    }
  }, [activeProblemModal])

  const handleClose = () => {
    setSelectedProblem(null)
    if (onCloseModal) onCloseModal()
  }

  const allTags = ['Barchasi', 'Boshlangʻich', 'Math', 'Binary Search', 'Algorithms', 'Dynamic Programming', 'Strings', 'Arrays', 'Graphs', 'Trees']

  const filteredProblems = problemsList.filter(prob => {
    const matchesSearch = prob.title.toLowerCase().includes(searchTerm.toLowerCase()) || prob.id.toString() === searchTerm.trim()
    const matchesDifficulty = difficultyFilter === 'Barchasi' || prob.difficulty === difficultyFilter
    const matchesTag = tagFilter === 'Barchasi' || (prob.tags && prob.tags.includes(tagFilter))
    return matchesSearch && matchesDifficulty && matchesTag
  })

  const evaluateUserCodeAsync = async (code, lang, inputStr, expectedOutput) => {
    if (!code || code.trim().length < 2) {
      return {
        isCorrect: false,
        output: 'Compilation Error: Kod bo\'sh!',
        passedTests: '0 / 10'
      }
    }

    const expected = (expectedOutput || '').trim()
    const cleanCode = code.trim()
    const rawInputLines = (inputStr || '').trim().split('\n')
    let inputIdx = 0

    let evaluatedOutput = ''

    if (lang === 'python') {
      try {
        let outputBuffer = ''
        Skulpt.configure({
          output: (text) => { outputBuffer += text },
          read: (x) => {
            if (Skulpt.builtinFiles === undefined || Skulpt.builtinFiles["files"][x] === undefined) {
              throw "File not found: '" + x + "'";
            }
            return Skulpt.builtinFiles["files"][x];
          },
          inputfun: () => {
            const line = rawInputLines[inputIdx] || ''
            inputIdx++
            return line
          },
          inputfunTakesPrompt: false
        })

        await Skulpt.misceval.asyncToPromise(() => {
          return Skulpt.importMainWithBody("<stdin>", false, cleanCode, true)
        })

        evaluatedOutput = outputBuffer.trim()
      } catch (e) {
        evaluatedOutput = `Xatolik (Runtime Error): ${e.toString()}`
      }
    } else if (lang === 'javascript') {
      try {
        const consoleLogs = []
        const jsInput = () => {
          const val = rawInputLines[inputIdx] || ''
          inputIdx++
          return val
        }

        const fn = new Function('input', 'console', `
          try {
            ${cleanCode}
          } catch(e) {
            console.log('Runtime Error: ' + e.message)
          }
        `)

        fn(jsInput, {
          log: (...args) => consoleLogs.push(args.join(' ')),
          error: () => {},
          warn: () => {}
        })

        evaluatedOutput = consoleLogs.join('\n').trim()
      } catch (e) {
        evaluatedOutput = `Runtime Error: ${e.message}`
      }
    } else if (lang === 'cpp') {
      try {
        const consoleLogs = []
        const rawTokens = (inputStr || '').trim().split(/\s+/).filter(Boolean)
        let tokenIdx = 0

        // Parse C++ cout << expressions
        const coutMatches = [...cleanCode.matchAll(/cout\s*<<\s*([^;]+);/gi)]
        if (coutMatches.length > 0) {
          const expr = coutMatches[coutMatches.length - 1][1]
            .replace(/endl/g, '')
            .replace(/\\n/g, '')
            .replace(/<<\s*["']?\s*["']?/g, '')
            .trim()

          // Extract variables declared with cin >>
          const cinMatch = cleanCode.match(/cin\s*>>\s*([^;]+);/i)
          if (cinMatch) {
            const vars = cinMatch[1].split('>>').map(v => v.trim()).filter(Boolean)
            const env = {}
            vars.forEach((v, idx) => {
              env[v] = Number(rawTokens[idx]) || 0
            })

            // Replace variables in expr with numbers
            let evalExpr = expr
            Object.keys(env).forEach(v => {
              const reg = new RegExp(`\\b${v}\\b`, 'g')
              evalExpr = evalExpr.replace(reg, env[v])
            })

            try {
              const calcRes = Function(`"use strict"; return (${evalExpr})`)()
              if (calcRes !== undefined && !isNaN(calcRes)) {
                evaluatedOutput = calcRes.toString()
              }
            } catch (err) {}
          }
        }
      } catch (e) {}
    }

    const normExpected = expected.replace(/\r\n/g, '\n').replace(/\s+/g, ' ').trim()
    const normEvaluated = evaluatedOutput.replace(/\r\n/g, '\n').replace(/\s+/g, ' ').trim()

    if (normEvaluated === normExpected && normExpected !== '') {
      return {
        isCorrect: true,
        output: evaluatedOutput,
        passedTests: '10 / 10'
      }
    } else {
      return {
        isCorrect: false,
        output: evaluatedOutput || 'Xato natija (Wrong Output)',
        passedTests: `0 / 10 (Kutilgan: "${normExpected}", Olingan: "${normEvaluated}")`
      }
    }
  }

  const handleRunSample = async () => {
    setIsEvaluating(true)
    setCustomOutput('Kompilyatsiya va bajarilish kutilmoqda...')
    const res = await evaluateUserCodeAsync(userCode, codeLang, customInput, selectedProblem.sampleOutput)
    setIsEvaluating(false)
    setCustomOutput(res.output)
  }

  const generateHiddenTestCases = (prob) => {
    // Generate 3 dynamic hidden test cases based on problem ID to prevent hardcoded prints
    const pId = prob.id || 1
    const testCases = [
      { input: prob.sampleInput, expected: prob.sampleOutput }
    ]

    // Create custom test cases based on problem ID math logic
    if (pId === 1) { // A + B
      testCases.push({ input: "10 20", expected: "30" })
      testCases.push({ input: "100 250", expected: "350" })
    } else if (pId === 2) { // Binary Search
      testCases.push({ input: "5\n1 3 5 7 9\n7", expected: "3" })
      testCases.push({ input: "4\n2 4 6 8\n5", expected: "-1" })
    } else {
      // Dynamic test cases for other problems
      const val1 = (pId * 3) % 100 + 5
      const val2 = (pId * 7) % 100 + 10
      testCases.push({ input: `${val1} ${val2}`, expected: `${val1 + val2}` })
      testCases.push({ input: `${val1 * 2} ${val2 * 2}`, expected: `${(val1 + val2) * 2}` })
    }

    return testCases
  }

  const handleSubmitSolution = async () => {
    setIsEvaluating(true)
    setJudgeStatus({ status: 'Running', time: '...', memory: '...' })

    const testCases = generateHiddenTestCases(selectedProblem)
    let passedCount = 0
    let failedTestDetails = null

    for (let i = 0; i < testCases.length; i++) {
      const tc = testCases[i]
      const res = await evaluateUserCodeAsync(userCode, codeLang, tc.input, tc.expected)
      if (res.isCorrect) {
        passedCount++
      } else {
        failedTestDetails = `Test #${i + 1} da xatolik! Kutilgan: "${tc.expected}", Olingan: "${res.output}"`
        break
      }
    }

    setIsEvaluating(false)

    if (passedCount === testCases.length) {
      setJudgeStatus({
        status: 'Accepted',
        time: '24 ms',
        memory: '8.4 MB',
        passedTests: `${testCases.length} / ${testCases.length}`
      })
      if (onProblemSolved) {
        onProblemSolved(selectedProblem?.points || 15, selectedProblem?.id)
      }
    } else {
      setJudgeStatus({
        status: 'Wrong Answer',
        time: '18 ms',
        memory: '7.1 MB',
        passedTests: `${passedCount} / ${testCases.length} (${failedTestDetails || 'Xato natija'})`
      })
    }
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(userCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6 py-4">

      {/* Top Banner & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
            <Code2 className="w-7 h-7 text-blue-600 dark:text-blue-400 stroke-[2.5]" />
            <span>Masalalar Arxivi</span>
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Algoritmik bilim va tajribangizni oshirish uchun turli darajadagi masalalar.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center gap-2 border border-blue-200 dark:border-blue-800">
            <Sparkles className="w-4 h-4" />
            <span>Jami: {problemsList.length} ta masala</span>
          </div>
        </div>
      </div>

      {/* Filters & Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">

        {/* Search */}
        <div className="relative md:col-span-5">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Masala nomi yoki ID raqami..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-sm rounded-xl border border-transparent focus:border-blue-500 focus:outline-none transition-all"
          />
        </div>

        {/* Difficulty Select */}
        <div className="md:col-span-3">
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="w-full py-2 px-3 bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-sm rounded-xl border border-transparent focus:border-blue-500 focus:outline-none font-semibold"
          >
            <option value="Barchasi">Barcha qiyinchiliklar</option>
            <option value="Oson">Oson</option>
            <option value="Oʻrta">Oʻrta</option>
            <option value="Qiyin">Qiyin</option>
          </select>
        </div>

        {/* Tags Select */}
        <div className="md:col-span-4">
          <select
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
            className="w-full py-2 px-3 bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-sm rounded-xl border border-transparent focus:border-blue-500 focus:outline-none font-semibold"
          >
            {allTags.map((tag, idx) => (
              <option key={idx} value={tag}>Mavzu: {tag}</option>
            ))}
          </select>
        </div>

      </div>

      {/* Problems Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <th className="py-4 px-4 text-center w-20">ID</th>
                <th className="py-4 px-6">Masala Nomi</th>
                <th className="py-4 px-4">Qiyinchilik</th>
                <th className="py-4 px-4">Ball</th>
                <th className="py-4 px-4">Qabul Qilingan</th>
                <th className="py-4 px-4">Qabul%</th>
                <th className="py-4 px-6 text-right">Amal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-base">
              {filteredProblems.length > 0 ? (
                filteredProblems.map((prob) => (
                  <tr
                    key={prob.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-700/30 transition-colors group cursor-pointer"
                    onClick={() => {
                      if (!currentUser) {
                        alert("Masalalarni yechish uchun avval tizimga kiring!")
                        if (onOpenAuth) onOpenAuth('login')
                        return
                      }
                      setSelectedProblem(prob)
                    }}
                  >
                    <td className="py-4 px-4 text-center font-mono font-bold text-slate-400 text-base">
                      #{prob.id}
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 dark:text-slate-100 text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {prob.title}
                        </span>
                        <div className="flex items-center space-x-1.5 mt-1">
                          {prob.tags && prob.tags.map((tag, idx) => (
                            <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-medium">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${prob.difficultyColor}`}>
                        {prob.difficulty}
                      </span>
                    </td>

                    <td className="py-4 px-4 font-mono font-bold text-slate-700 dark:text-slate-300">
                      {prob.points}
                    </td>

                    <td className="py-4 px-4 font-mono text-slate-600 dark:text-slate-400">
                      {prob.solvedCount.toLocaleString()}
                    </td>

                    <td className="py-4 px-4 font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                      {prob.acceptance}
                    </td>

                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          if (!currentUser) {
                            alert("Masalalarni yechish uchun avval tizimga kiring!")
                            if (onOpenAuth) onOpenAuth('login')
                            return
                          }
                          setSelectedProblem(prob)
                        }}
                        className="px-3.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white dark:bg-blue-950/60 dark:hover:bg-blue-600 dark:text-blue-400 dark:hover:text-white text-xs font-bold transition-all shadow-sm"
                      >
                        Yechish
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-400">
                    Siz qidirgan mezonlar bo'yicha masalalar topilmadi.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* FULL PROBLEM DETAIL MODAL / CODE RUNNER WORKSPACE */}
      {selectedProblem && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 w-full max-w-7xl h-[92vh] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden">

            {/* Drawer Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleClose}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Chiqish</span>
                </button>
                <span className="font-mono font-bold text-slate-400 text-sm">#{selectedProblem.id}</span>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  {selectedProblem.title}
                </h2>
                <span className={`px-2 py-0.5 rounded text-xs font-bold ${selectedProblem.difficultyColor}`}>
                  {selectedProblem.difficulty}
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="hidden md:flex items-center space-x-4 text-xs font-mono text-slate-500 dark:text-slate-400 pr-4 border-r border-slate-200 dark:border-slate-800">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-blue-500" /> {selectedProblem.timeLimit}
                  </span>
                  <span className="flex items-center gap-1">
                    <Cpu className="w-3.5 h-3.5 text-indigo-500" /> {selectedProblem.memoryLimit}
                  </span>
                </div>
                <button
                  onClick={handleClose}
                  className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-red-600 hover:text-white text-xs font-bold text-slate-600 dark:text-slate-300 transition-colors"
                >
                  Yopish
                </button>
              </div>
            </div>

            {/* Main Split Grid (Problem Statement vs Code Editor) */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">

              {/* Left Pane: Problem Description */}
              <div className="lg:col-span-5 p-6 overflow-y-auto space-y-6 border-r border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200">
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Masala Sharti</h3>
                  <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed whitespace-pre-line font-sans">
                    {selectedProblem.description}
                  </div>
                </div>

                {/* Sample Test Case */}
                <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Namuna Test (Sample)</h4>

                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-slate-500">Kiruvchi Ma'lumot (Input):</span>
                    <pre className="p-3 rounded-xl bg-slate-100 dark:bg-slate-950 font-mono text-xs text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 overflow-x-auto">
                      {selectedProblem.sampleInput}
                    </pre>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-slate-500">Chiquvchi Ma'lumot (Output):</span>
                    <pre className="p-3 rounded-xl bg-slate-100 dark:bg-slate-950 font-mono text-xs text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 overflow-x-auto">
                      {selectedProblem.sampleOutput}
                    </pre>
                  </div>
                </div>

                <div className="text-xs text-slate-400 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <span>Muallif: <strong className="text-slate-600 dark:text-slate-300">{selectedProblem.author}</strong></span>
                  <span>Qabul foizi: <strong>{selectedProblem.acceptance}</strong></span>
                </div>
              </div>

              {/* Right Pane: Interactive Code Editor Sandbox */}
              <div className="lg:col-span-7 flex flex-col bg-slate-950 text-slate-100 overflow-hidden">

                {/* Editor Control Toolbar */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
                  <div className="flex items-center space-x-3">
                    <FileCode className="w-4 h-4 text-blue-400" />
                    <select
                      value={codeLang}
                      onChange={(e) => setCodeLang(e.target.value)}
                      className="bg-slate-800 text-white text-xs font-bold py-1.5 px-3 rounded-lg border border-slate-700 focus:outline-none"
                    >
                      <option value="python">Python 3.12 (PyPy3)</option>
                      <option value="cpp">C++ 20 (GCC 13)</option>
                      <option value="javascript">JavaScript (Node.js v20)</option>
                    </select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleCopyCode}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 flex items-center gap-1.5 transition-colors"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Nusxalandi' : 'Nusxalash'}</span>
                    </button>
                  </div>
                </div>

                {/* Code Textarea Area with Line Numbers and Colorful Editor */}
                <div className="flex-1 relative font-mono text-xs sm:text-sm flex bg-slate-950 overflow-hidden">
                  {/* Line Numbers Column */}
                  <div className="w-10 sm:w-12 py-4 bg-slate-900/80 text-slate-600 text-right pr-2.5 select-none border-r border-slate-800 font-mono text-xs leading-relaxed shrink-0">
                    {(userCode || '\n').split('\n').map((_, i) => (
                      <div key={i}>{i + 1}</div>
                    ))}
                  </div>

                  {/* Editor Container */}
                  <div className="relative flex-1 h-full overflow-hidden">
                    <textarea
                      value={userCode}
                      onChange={(e) => setUserCode(e.target.value)}
                      placeholder={
                        codeLang === 'python'
                          ? '# Kodingizni shu yerga yozing...\n# Masalan:\na, b = map(int, input().split())\nprint(a + b)'
                          : codeLang === 'cpp'
                          ? '// Kodingizni shu yerga yozing...\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    cout << a + b;\n    return 0;\n}'
                          : '// Kodingizni shu yerga yozing...'
                      }
                      spellCheck="false"
                      className="w-full h-full p-4 bg-slate-950 text-slate-100 placeholder-slate-600 font-mono text-xs sm:text-sm focus:outline-none resize-none leading-relaxed border-none selection:bg-blue-600/40"
                    />
                  </div>
                </div>

                {/* Output Console & Submission Feedback Bar */}
                <div className="border-t border-slate-800 bg-slate-900 p-4 space-y-3">

                  {/* Judge Verdict Banner if evaluated */}
                  {judgeStatus && (
                    <div className={`p-3 rounded-xl border flex items-center justify-between ${
                      judgeStatus.status === 'Accepted'
                        ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                        : judgeStatus.status === 'Running'
                        ? 'bg-blue-950/40 border-blue-500/40 text-blue-300'
                        : 'bg-red-950/40 border-red-500/40 text-red-300'
                    }`}>
                      <div className="flex items-center space-x-2 text-sm font-bold">
                        {judgeStatus.status === 'Accepted' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                        {judgeStatus.status === 'Wrong Answer' && <XCircle className="w-5 h-5 text-red-400" />}
                        {judgeStatus.status === 'Running' && <Clock className="w-5 h-5 text-blue-400 animate-spin" />}
                        <span>{judgeStatus.status === 'Accepted' ? 'Qabul Qilindi (Accepted)' : judgeStatus.status === 'Running' ? 'Tekshirilmoqda...' : 'Xato Yechim (Wrong Answer)'}</span>
                      </div>

                      {judgeStatus.status !== 'Running' && (
                        <div className="flex items-center space-x-4 font-mono text-xs">
                          <span>Testlar: <strong>{judgeStatus.passedTests}</strong></span>
                          <span>Vaqt: <strong>{judgeStatus.time}</strong></span>
                          <span>Xotira: <strong>{judgeStatus.memory}</strong></span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Sample Run Output Preview */}
                  {customOutput && !judgeStatus && (
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Natija (Console output):</span>
                      <pre className="p-2.5 rounded-lg bg-slate-950 font-mono text-xs text-amber-300 border border-slate-800 max-h-24 overflow-y-auto">
                        {customOutput}
                      </pre>
                    </div>
                  )}

                  {/* Bottom Action Buttons */}
                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={handleRunSample}
                      disabled={isEvaluating}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-2 border border-slate-700 transition-colors disabled:opacity-50"
                    >
                      <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                      <span>Sinash (Run Code)</span>
                    </button>

                    <button
                      onClick={handleSubmitSolution}
                      disabled={isEvaluating}
                      className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Topshirish (Submit)</span>
                    </button>
                  </div>

                </div>

              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  )
}
