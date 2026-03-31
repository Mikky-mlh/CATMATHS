import React from 'react';
import { BlockMath, InlineMath } from 'react-katex';
import { Printer, FileText, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CheatSheet() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 print:hidden">
        <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </Link>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-sm transition-colors"
        >
          <Printer className="w-5 h-5" />
          Print Cheat Sheet
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 md:p-12 print:shadow-none print:border-none print:p-0">
        <div className="text-center mb-12 border-b-2 border-gray-200 dark:border-gray-700 pb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-3">
            <FileText className="w-10 h-10 text-blue-600 dark:text-blue-400" />
            CAT Quant Cheat Sheet
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            High-yield formulas only — organized by problem type
          </p>
        </div>

        <div className="space-y-12">

          {/* SECTION 1: ARITHMETIC */}
          <section>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 border-b border-gray-100 dark:border-gray-700 pb-2 mb-6 uppercase tracking-wider">
              1. Arithmetic (~35-40% of QA)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
                <h3 className="font-bold text-lg mb-4">Percentages</h3>
                <ul className="space-y-3 text-sm">
                  <li><strong>Successive Change:</strong> <InlineMath math="a + b + \frac{ab}{100}" /></li>
                  <li className="text-xs text-gray-500 italic">Trigger: Two back-to-back % changes on same base</li>
                  <li><strong>% Change:</strong> <InlineMath math="\frac{\text{New} - \text{Old}}{\text{Old}} \times 100" /></li>
                </ul>
              </div>

              <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
                <h3 className="font-bold text-lg mb-4">Profit & Loss</h3>
                <ul className="space-y-3 text-sm">
                  <li><strong>Profit %:</strong> <InlineMath math="\frac{SP - CP}{CP} \times 100" /> (always on CP)</li>
                  <li><strong>Discount %:</strong> <InlineMath math="\frac{MP - SP}{MP} \times 100" /> (always on MP)</li>
                  <li><strong>Master:</strong> <InlineMath math="\frac{MP}{CP} = \frac{100 + P\%}{100 - D\%}" /></li>
                  <li className="text-xs text-gray-500 italic">Trigger: When MP, CP, Profit%, Discount% are mixed</li>
                </ul>
              </div>

              <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
                <h3 className="font-bold text-lg mb-4">Interest</h3>
                <ul className="space-y-3 text-sm">
                  <li><strong>SI:</strong> <InlineMath math="\frac{PRT}{100}" /></li>
                  <li><strong>CI:</strong> <InlineMath math="A = P(1 + \frac{R}{100})^T" /></li>
                  <li><strong>CI - SI (2 yrs):</strong> <InlineMath math="P(\frac{R}{100})^2" /></li>
                  <li className="text-xs text-gray-500 italic">Trigger: "Difference between CI and SI for 2 years" — use directly, never calculate separately</li>
                </ul>
              </div>

              <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
                <h3 className="font-bold text-lg mb-4">Time, Speed & Distance</h3>
                <ul className="space-y-3 text-sm">
                  <li><strong>Basic:</strong> <InlineMath math="D = S \times T" /></li>
                  <li><strong>Same dir:</strong> <InlineMath math="|S_1 - S_2|" /> | <strong>Opposite:</strong> <InlineMath math="S_1 + S_2" /></li>
                  <li><strong>Avg Speed (same dist):</strong> <InlineMath math="\frac{2S_1 S_2}{S_1 + S_2}" /></li>
                  <li><strong>Boats:</strong> B = (Down+Up)/2, S = (Down-Up)/2</li>
                  <li><strong>Convert:</strong> 1 km/h = 5/18 m/s</li>
                </ul>
              </div>

              <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
                <h3 className="font-bold text-lg mb-4">Ratios & Proportions</h3>
                <ul className="space-y-3 text-sm">
                  <li><strong>Proportion:</strong> <InlineMath math="a:b = c:d \Rightarrow ad = bc" /></li>
                  <li><strong>Comp & Div:</strong> <InlineMath math="\frac{a+b}{a-b} = \frac{c+d}{c-d}" /></li>
                  <li className="text-xs text-gray-500 italic">Trigger: Complex ratio equations</li>
                </ul>
              </div>

              <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
                <h3 className="font-bold text-lg mb-4">Averages & Alligations</h3>
                <ul className="space-y-3 text-sm">
                  <li><strong>Weighted Avg:</strong> <InlineMath math="\frac{n_1 A_1 + n_2 A_2}{n_1 + n_2}" /></li>
                  <li><strong>Alligation:</strong> <InlineMath math="\frac{Q_1}{Q_2} = \frac{C_2 - M}{M - C_1}" /></li>
                  <li className="text-xs text-gray-500 italic">Trigger: Mixing two things at different prices/concentrations</li>
                </ul>
              </div>

              <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700 md:col-span-2">
                <h3 className="font-bold text-lg mb-4">Time & Work</h3>
                <ul className="space-y-3 text-sm">
                  <li><strong>Together:</strong> <InlineMath math="\frac{1}{T} = \frac{1}{T_1} + \frac{1}{T_2}" /></li>
                  <li><strong>Man-Days:</strong> <InlineMath math="M_1 D_1 = M_2 D_2" /></li>
                  <li><strong>LCM Method:</strong> Total work = LCM of times. Efficiency = Total/Time.</li>
                  <li className="text-xs text-gray-500 italic">Trigger: Any work problem — LCM method avoids fractions entirely</li>
                </ul>
              </div>
            </div>
          </section>

          {/* SECTION 2: ALGEBRA */}
          <section>
            <h2 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 border-b border-gray-100 dark:border-gray-700 pb-2 mb-6 uppercase tracking-wider">
              2. Algebra (~20-25%)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
                <h3 className="font-bold text-lg mb-4">Quadratic Equations</h3>
                <p className="mb-2 text-sm text-gray-500">For <InlineMath math="ax^2 + bx + c = 0" />:</p>
                <ul className="space-y-3 text-sm">
                  <li><strong>Roots:</strong> <InlineMath math="x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}" /></li>
                  <li><strong>Sum:</strong> <InlineMath math="-b/a" /> | <strong>Product:</strong> <InlineMath math="c/a" /></li>
                  <li><strong>Discriminant:</strong> <InlineMath math="D = b^2 - 4ac" /></li>
                  <li><strong>Vertex:</strong> <InlineMath math="x = -b/(2a)" /></li>
                </ul>
              </div>

              <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
                <h3 className="font-bold text-lg mb-4">Key Identities</h3>
                <ul className="space-y-3 text-sm">
                  <li><InlineMath math="a^2 - b^2 = (a+b)(a-b)" /></li>
                  <li><InlineMath math="a^3 + b^3 = (a+b)(a^2 - ab + b^2)" /></li>
                  <li><InlineMath math="a^3 + b^3 + c^3 - 3abc = (a+b+c)(\dots)" /></li>
                  <li className="text-xs text-gray-500 italic">When a+b+c=0: a³+b³+c³ = 3abc</li>
                </ul>
              </div>

              <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
                <h3 className="font-bold text-lg mb-4">Inequalities & Modulus</h3>
                <ul className="space-y-3 text-sm">
                  <li>Multiply by negative → <strong>flip sign</strong></li>
                  <li><InlineMath math="|x| < a \Rightarrow -a < x < a" /></li>
                  <li><InlineMath math="|x| > a \Rightarrow x < -a \text{ or } x > a" /></li>
                </ul>
              </div>

              <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
                <h3 className="font-bold text-lg mb-4">Logarithms</h3>
                <ul className="space-y-3 text-sm">
                  <li><InlineMath math="\log(mn) = \log m + \log n" /></li>
                  <li><InlineMath math="\log(m^n) = n\log m" /></li>
                  <li><strong>Base Change:</strong> <InlineMath math="\log_b a = \frac{\log a}{\log b}" /></li>
                  <li><strong>Indices:</strong> <InlineMath math="a^m \times a^n = a^{m+n}" /></li>
                </ul>
              </div>
            </div>
          </section>

          {/* SECTION 3: NUMBER SYSTEMS */}
          <section>
            <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 border-b border-gray-100 dark:border-gray-700 pb-2 mb-6 uppercase tracking-wider">
              3. Number Systems (~10-15%)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
                <h3 className="font-bold text-lg mb-4">Factors & Multiples</h3>
                <p className="mb-2 text-sm text-gray-500">For <InlineMath math="N = a^p b^q c^r" />:</p>
                <ul className="space-y-3 text-sm">
                  <li><strong>Total Factors:</strong> <InlineMath math="(p+1)(q+1)(r+1)" /></li>
                  <li><strong>HCF × LCM:</strong> <InlineMath math="= A \times B" /> (for two numbers)</li>
                  <li><strong>Trailing Zeros in n!:</strong> <InlineMath math="\lfloor n/5 \rfloor + \lfloor n/25 \rfloor + \dots" /></li>
                  <li className="text-xs text-gray-500 italic">Trigger: "How many zeros at the end of n!"</li>
                </ul>
              </div>

              <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
                <h3 className="font-bold text-lg mb-4">Remainders & Cyclicity</h3>
                <ul className="space-y-3 text-sm">
                  <li><strong>Key:</strong> <InlineMath math="(a \times b) \mod n = [(a \mod n)(b \mod n)] \mod n" /></li>
                  <li><strong>Unit digit cycle:</strong> 2,3,7,8 → cycle of 4 | 4,9 → cycle of 2</li>
                  <li><strong>n mod 9:</strong> = sum of digits mod 9</li>
                  <li className="text-xs text-gray-500 italic">Find cycle by computing first few powers. No need for advanced theorems.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* SECTION 4: GEOMETRY */}
          <section>
            <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400 border-b border-gray-100 dark:border-gray-700 pb-2 mb-6 uppercase tracking-wider">
              4. Geometry & Mensuration (~15-20%)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
                <h3 className="font-bold text-lg mb-4">Triangles & Circles</h3>
                <ul className="space-y-3 text-sm">
                  <li><strong>Pythagoras:</strong> <InlineMath math="a^2 + b^2 = c^2" /></li>
                  <li><strong>Triplets:</strong> (3,4,5), (5,12,13), (8,15,17), (7,24,25)</li>
                  <li><strong>30-60-90:</strong> 1 : √3 : 2 | <strong>45-45-90:</strong> 1 : 1 : √2</li>
                  <li><strong>Similar △:</strong> Area ratio = (side ratio)²</li>
                  <li><strong>Tangent ⟂ Radius</strong> at contact point</li>
                  <li><strong>Circle:</strong> <InlineMath math="A = \pi r^2" />, <InlineMath math="C = 2\pi r" /></li>
                </ul>
              </div>

              <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
                <h3 className="font-bold text-lg mb-4">Polygons & 3D Shapes</h3>
                <ul className="space-y-3 text-sm">
                  <li><strong>Interior ∠:</strong> <InlineMath math="\frac{(n-2) \times 180°}{n}" /></li>
                  <li><strong>Diagonals:</strong> <InlineMath math="\frac{n(n-3)}{2}" /></li>
                  <li><strong>Cube:</strong> <InlineMath math="V = a^3" /> | <strong>Cylinder:</strong> <InlineMath math="V = \pi r^2 h" /></li>
                  <li><strong>Cone:</strong> <InlineMath math="V = \frac{1}{3}\pi r^2 h" /> | <strong>Sphere:</strong> <InlineMath math="V = \frac{4}{3}\pi r^3" /></li>
                  <li className="text-xs text-gray-500 italic">Scaling: dimensions ×k → area ×k², volume ×k³</li>
                </ul>
              </div>
            </div>
          </section>

          {/* SECTION 5: MODERN MATH */}
          <section>
            <h2 className="text-2xl font-bold text-pink-600 dark:text-pink-400 border-b border-gray-100 dark:border-gray-700 pb-2 mb-6 uppercase tracking-wider">
              5. Modern Math (~10-15%)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
                <h3 className="font-bold text-lg mb-4">P&C and Probability</h3>
                <ul className="space-y-3 text-sm">
                  <li><strong>nPr:</strong> <InlineMath math="\frac{n!}{(n-r)!}" /> (order matters)</li>
                  <li><strong>nCr:</strong> <InlineMath math="\frac{n!}{r!(n-r)!}" /> (order doesn't)</li>
                  <li><strong>Circular:</strong> <InlineMath math="(n-1)!" /></li>
                  <li><strong>P(E):</strong> Favorable / Total</li>
                  <li><strong>Independent:</strong> <InlineMath math="P(A \cap B) = P(A) \times P(B)" /></li>
                  <li><strong>At least 1:</strong> <InlineMath math="1 - P(\text{none})" /></li>
                </ul>
              </div>

              <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
                <h3 className="font-bold text-lg mb-4">Progressions & Sets</h3>
                <ul className="space-y-3 text-sm">
                  <li><strong>AP Sum:</strong> <InlineMath math="\frac{n}{2}[2a + (n-1)d]" /></li>
                  <li><strong>GP Sum:</strong> <InlineMath math="\frac{a(r^n-1)}{r-1}" /></li>
                  <li><strong>Infinite GP:</strong> <InlineMath math="\frac{a}{1-r}" /> (|r| {'<'} 1)</li>
                  <li><strong>2-Set:</strong> <InlineMath math="|A \cup B| = |A| + |B| - |A \cap B|" /></li>
                  <li><strong>3-Set:</strong> Add all, subtract pairwise, add triple intersection</li>
                </ul>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}