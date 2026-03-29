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
      {/* Header - Hidden on Print */}
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

      {/* Printable Content */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 md:p-12 print:shadow-none print:border-none print:p-0">
        <div className="text-center mb-12 border-b-2 border-gray-200 dark:border-gray-700 pb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-3">
            <FileText className="w-10 h-10 text-blue-600 dark:text-blue-400" />
            CAT Math Formula Cheat Sheet
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Essential formulas for Quantitative Aptitude
          </p>
        </div>

        <div className="space-y-12">
          {/* Section 1: Arithmetic */}
          <section>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 border-b border-gray-100 dark:border-gray-700 pb-2 mb-6 uppercase tracking-wider">
              1. Arithmetic
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
                <h3 className="font-bold text-lg mb-4">Percentages</h3>
                <ul className="space-y-3 text-sm">
                  <li><strong>Successive Change:</strong> <InlineMath math="a + b + \frac{ab}{100}" /></li>
                  <li><strong>Percentage Change:</strong> <InlineMath math="\frac{New - Old}{Old} \times 100" /></li>
                </ul>
              </div>

              <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
                <h3 className="font-bold text-lg mb-4">Profit & Loss</h3>
                <ul className="space-y-3 text-sm">
                  <li><strong>Profit %:</strong> <InlineMath math="\frac{SP - CP}{CP} \times 100" /></li>
                  <li><strong>Discount %:</strong> <InlineMath math="\frac{MP - SP}{MP} \times 100" /></li>
                  <li><strong>Markup %:</strong> <InlineMath math="\frac{MP - CP}{CP} \times 100" /></li>
                </ul>
              </div>

              <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
                <h3 className="font-bold text-lg mb-4">Interest</h3>
                <ul className="space-y-3 text-sm">
                  <li><strong>Simple Interest:</strong> <InlineMath math="SI = \frac{PRT}{100}" /></li>
                  <li><strong>Compound Interest:</strong> <InlineMath math="A = P(1 + \frac{R}{100})^T" /></li>
                  <li><strong>2-Year SI/CI Diff:</strong> <InlineMath math="P(\frac{R}{100})^2" /></li>
                </ul>
              </div>

              <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
                <h3 className="font-bold text-lg mb-4">Time, Speed & Distance</h3>
                <ul className="space-y-3 text-sm">
                  <li><strong>Basic:</strong> <InlineMath math="D = S \times T" /></li>
                  <li><strong>Relative (Same):</strong> <InlineMath math="|S_1 - S_2|" /></li>
                  <li><strong>Relative (Opposite):</strong> <InlineMath math="S_1 + S_2" /></li>
                  <li><strong>Avg Speed (Same Dist):</strong> <InlineMath math="\frac{2S_1 S_2}{S_1 + S_2}" /></li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2: Algebra */}
          <section>
            <h2 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 border-b border-gray-100 dark:border-gray-700 pb-2 mb-6 uppercase tracking-wider">
              2. Algebra
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
                <h3 className="font-bold text-lg mb-4">Quadratic Equations</h3>
                <p className="mb-2 text-sm text-gray-500">For <InlineMath math="ax^2 + bx + c = 0" />:</p>
                <ul className="space-y-3 text-sm">
                  <li><strong>Roots:</strong> <InlineMath math="x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}" /></li>
                  <li><strong>Sum of Roots:</strong> <InlineMath math="\frac{-b}{a}" /></li>
                  <li><strong>Product of Roots:</strong> <InlineMath math="\frac{c}{a}" /></li>
                  <li><strong>Discriminant:</strong> <InlineMath math="D = b^2 - 4ac" /></li>
                </ul>
              </div>

              <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
                <h3 className="font-bold text-lg mb-4">Key Identities</h3>
                <ul className="space-y-3 text-sm">
                  <li><InlineMath math="a^2 - b^2 = (a+b)(a-b)" /></li>
                  <li><InlineMath math="a^3 + b^3 = (a+b)(a^2 - ab + b^2)" /></li>
                  <li><InlineMath math="a^3 - b^3 = (a-b)(a^2 + ab + b^2)" /></li>
                  <li><InlineMath math="a^3 + b^3 + c^3 - 3abc = (a+b+c)(a^2+b^2+c^2-ab-bc-ca)" /></li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3: Number Systems */}
          <section>
            <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 border-b border-gray-100 dark:border-gray-700 pb-2 mb-6 uppercase tracking-wider">
              3. Number Systems
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
                <h3 className="font-bold text-lg mb-4">Factors & Multiples</h3>
                <p className="mb-2 text-sm text-gray-500">For <InlineMath math="N = a^p b^q c^r" />:</p>
                <ul className="space-y-3 text-sm">
                  <li><strong>Total Factors:</strong> <InlineMath math="(p+1)(q+1)(r+1)" /></li>
                  <li><strong>HCF & LCM:</strong> <InlineMath math="HCF \times LCM = A \times B" /></li>
                </ul>
              </div>

              <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
                <h3 className="font-bold text-lg mb-4">Remainder Theorems</h3>
                <ul className="space-y-3 text-sm">
                  <li><strong>Fermat's Little:</strong> <InlineMath math="a^{p-1} \equiv 1 \pmod p" /></li>
                  <li><strong>Euler's Totient:</strong> <InlineMath math="a^{\phi(n)} \equiv 1 \pmod n" /></li>
                  <li><strong>Wilson's:</strong> <InlineMath math="(p-1)! \equiv -1 \pmod p" /></li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 4: Geometry & Mensuration */}
          <section>
            <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400 border-b border-gray-100 dark:border-gray-700 pb-2 mb-6 uppercase tracking-wider">
              4. Geometry & Mensuration
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
                <h3 className="font-bold text-lg mb-4">Polygons</h3>
                <ul className="space-y-3 text-sm">
                  <li><strong>Interior Angle (Regular):</strong> <InlineMath math="\frac{(n-2) \times 180^\circ}{n}" /></li>
                  <li><strong>Number of Diagonals:</strong> <InlineMath math="\frac{n(n-3)}{2}" /></li>
                </ul>
              </div>

              <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
                <h3 className="font-bold text-lg mb-4">3D Shapes (Volume)</h3>
                <ul className="space-y-3 text-sm">
                  <li><strong>Cube:</strong> <InlineMath math="a^3" /></li>
                  <li><strong>Cylinder:</strong> <InlineMath math="\pi r^2 h" /></li>
                  <li><strong>Cone:</strong> <InlineMath math="\frac{1}{3} \pi r^2 h" /></li>
                  <li><strong>Sphere:</strong> <InlineMath math="\frac{4}{3} \pi r^3" /></li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 5: Modern Math */}
          <section>
            <h2 className="text-2xl font-bold text-pink-600 dark:text-pink-400 border-b border-gray-100 dark:border-gray-700 pb-2 mb-6 uppercase tracking-wider">
              5. Modern Math
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
                <h3 className="font-bold text-lg mb-4">Combinatorics</h3>
                <ul className="space-y-3 text-sm">
                  <li><strong>Permutations:</strong> <InlineMath math="{}^n P_r = \frac{n!}{(n-r)!}" /></li>
                  <li><strong>Combinations:</strong> <InlineMath math="{}^n C_r = \frac{n!}{r!(n-r)!}" /></li>
                  <li><strong>Circular Permutations:</strong> <InlineMath math="(n-1)!" /></li>
                </ul>
              </div>

              <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
                <h3 className="font-bold text-lg mb-4">Progressions</h3>
                <ul className="space-y-3 text-sm">
                  <li><strong>AP Sum:</strong> <InlineMath math="S_n = \frac{n}{2}[2a + (n-1)d]" /></li>
                  <li><strong>Infinite GP Sum:</strong> <InlineMath math="S_\infty = \frac{a}{1-r}" /> (for <InlineMath math="|r| < 1" />)</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
