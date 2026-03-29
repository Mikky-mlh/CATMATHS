import React from 'react';
import { BlockMath, InlineMath } from 'react-katex';

export interface QuizQuestion {
  id: number;
  type: 'mcq' | 'tita';
  question: string;
  options?: string[];
  correct: number | string;
  solution: string | React.ReactNode;
}

export interface Topic {
  id: string;
  title: string;
  content: React.ReactNode;
  quiz: QuizQuestion[];
}

export interface Module {
  id: string;
  title: string;
  topics: Topic[];
}

export const syllabus: Module[] = [
  {
    id: 'foundations',
    title: 'Foundations',
    topics: [
      {
        id: 'number-line-integers',
        title: 'The Number Line & Integers',
        content: (
          <div className="space-y-6 text-gray-800 dark:text-gray-200">
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">What is a Number Line?</h2>
            <p>
              The number line is a geometric representation that defines the spatial relationship between positive and negative integers. It's not merely a matter of plotting points but involves a deep comprehension of directed distance and the foundational rules of integer arithmetic.
            </p>
            
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-4">Visualizing the Number Line</h3>
              <div className="relative h-12 flex items-center justify-center">
                <div className="absolute w-full h-1 bg-gray-300 dark:bg-gray-600 rounded"></div>
                {[-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map((num) => (
                  <div key={num} className="absolute flex flex-col items-center" style={{ left: `${(num + 5) * 10}%` }}>
                    <div className="w-1 h-3 bg-gray-500 dark:bg-gray-400"></div>
                    <span className="text-xs mt-1 font-mono">{num}</span>
                  </div>
                ))}
              </div>
            </div>

            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-8">Absolute Value</h2>
            <p>
              A central concept in this domain is the absolute value, denoted by <InlineMath math="|x|" />, which is defined as the non-negative distance of a number from the origin on the number line.
            </p>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
              <p className="font-medium">Key Property:</p>
              <BlockMath math="|x| = |-x|" />
              <p className="mt-2 text-sm">This property serves as the precursor to understanding modulus functions and inequalities in advanced algebra.</p>
            </div>

            <h3 className="text-xl font-semibold mt-6">Distance Between Two Points</h3>
            <p>
              The relationship between distance and difference is profound: for any two points <InlineMath math="a" /> and <InlineMath math="b" />, the distance between them is:
            </p>
            <BlockMath math="|a - b|" />
            <p>
              This principle is the cornerstone of solving complex inequality problems that involve ranges and boundaries.
            </p>
          </div>
        ),
        quiz: [
          {
            id: 1,
            type: 'mcq',
            question: 'What is the distance between the points -7 and 4 on the number line?',
            options: ['-3', '3', '11', '-11'],
            correct: 2,
            solution: 'The distance between two points a and b is |a - b|. So, |-7 - 4| = |-11| = 11.'
          },
          {
            id: 2,
            type: 'tita',
            question: 'If |x - 5| = 12, what is the positive value of x?',
            correct: '17',
            solution: 'The equation |x - 5| = 12 means x - 5 = 12 or x - 5 = -12. Solving gives x = 17 or x = -7. The positive value is 17.'
          }
        ]
      },
      {
        id: 'absolute-value',
        title: 'Absolute Value & Inequalities',
        content: (
          <div className="space-y-6 text-gray-800 dark:text-gray-200">
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Understanding Modulus</h2>
            <p>
              The absolute value function, or modulus, denoted by <InlineMath math="|x|" />, represents the non-negative value of <InlineMath math="x" /> without regard to its sign.
            </p>
            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <h3 className="font-semibold mb-2">Piecewise Definition</h3>
              <BlockMath math="|x| = \begin{cases} x & \text{if } x \geq 0 \\ -x & \text{if } x < 0 \end{cases}" />
            </div>
            
            <h3 className="text-xl font-semibold mt-6">Properties of Absolute Value</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Non-negativity: <InlineMath math="|a| \geq 0" /></li>
              <li>Multiplicativity: <InlineMath math="|ab| = |a||b|" /></li>
              <li>Submultiplicativity: <InlineMath math="\left|\frac{a}{b}\right| = \frac{|a|}{|b|}" /> (for <InlineMath math="b \neq 0" />)</li>
              <li>Distance: <InlineMath math="|a - b|" /> is the distance between <InlineMath math="a" /> and <InlineMath math="b" /> on the real number line.</li>
            </ul>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500 mt-6">
              <h3 className="font-semibold mb-2 text-blue-800 dark:text-blue-300">Triangle Inequality</h3>
              <p className="text-sm mb-2">A fundamental principle in inequalities, stating that for any two real numbers:</p>
              <BlockMath math="|a + b| \leq |a| + |b|" />
              <BlockMath math="|a - b| \geq ||a| - |b||" />
            </div>
          </div>
        ),
        quiz: [
          {
            id: 1,
            type: 'mcq',
            question: 'Which of the following describes the maximum possible value of |x + y|?',
            options: ['|x| - |y|', '|x| + |y|', '||x| - |y||', '|x| * |y|'],
            correct: 1,
            solution: 'By the triangle inequality, |x + y| can never exceed |x| + |y|. Therefore, the maximum value is |x| + |y|.'
          }
        ]
      },
      {
        id: 'fractions-decimals',
        title: 'Fractions & Decimals',
        content: (
          <div className="space-y-6 text-gray-800 dark:text-gray-200">
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Rational Numbers & Equivalencies</h2>
            <p>Mastering fraction-to-decimal conversions is essential for speed in quantitative aptitude.</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {[
                { f: '1/2', d: '0.50', p: '50%' },
                { f: '1/3', d: '0.333...', p: '33.33%' },
                { f: '1/4', d: '0.25', p: '25%' },
                { f: '1/5', d: '0.20', p: '20%' },
                { f: '1/6', d: '0.166...', p: '16.66%' },
                { f: '1/7', d: '0.1428...', p: '14.28%' },
                { f: '1/8', d: '0.125', p: '12.5%' },
                { f: '1/9', d: '0.111...', p: '11.11%' },
              ].map(item => (
                <div key={item.f} className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                  <span className="font-bold block mb-1">{item.f}</span>
                  <span className="text-sm text-gray-500 block">{item.d}</span>
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{item.p}</span>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-semibold mt-6">Recurring Decimals</h3>
            <p>To convert a recurring decimal (e.g., <InlineMath math="0.abcd... \text{ (repeating)}" />) to a fraction:</p>
            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
              <BlockMath math="0.\overline{xy} = \frac{xy}{99}" />
              <BlockMath math="0.x\overline{yz} = \frac{xyz - x}{990}" />
            </div>
          </div>
        ),
        quiz: [
          {
            id: 1,
            type: 'tita',
            question: 'Convert the recurring decimal 0.363636... to a fraction in its simplest form. What is the sum of the numerator and denominator?',
            correct: '15',
            solution: '0.3636... = 36/99 = 4/11. The sum is 4 + 11 = 15.'
          }
        ]
      },
      {
        id: 'mental-math-benchmarks',
        title: 'Mental Math Benchmarks',
        content: (
          <div className="space-y-6 text-gray-800 dark:text-gray-200">
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Calculation Benchmarks</h2>
            <p>Memorizing squares, cubes, and approximations saves critical minutes during examinations.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold mb-2 text-center border-b pb-2">Squares (1 to 20)</h3>
                  <div className="text-sm grid grid-cols-2 gap-x-4 gap-y-1 mt-2">
                     <p>11² = 121</p><p>16² = 256</p>
                     <p>12² = 144</p><p>17² = 289</p>
                     <p>13² = 169</p><p>18² = 324</p>
                     <p>14² = 196</p><p>19² = 361</p>
                     <p>15² = 225</p><p>20² = 400</p>
                  </div>
               </div>
               <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold mb-2 text-center border-b pb-2">Cubes (1 to 10)</h3>
                  <div className="text-sm grid grid-cols-2 gap-x-4 gap-y-1 mt-2">
                     <p>1³ = 1</p><p>6³ = 216</p>
                     <p>2³ = 8</p><p>7³ = 343</p>
                     <p>3³ = 27</p><p>8³ = 512</p>
                     <p>4³ = 64</p><p>9³ = 729</p>
                     <p>5³ = 125</p><p>10³ = 1000</p>
                  </div>
               </div>
            </div>
            
            <h3 className="text-xl font-semibold mt-6">Roots Benchmarks</h3>
            <ul className="list-disc list-inside space-y-2">
               <li><InlineMath math="\sqrt{2} \approx 1.414" /></li>
               <li><InlineMath math="\sqrt{3} \approx 1.732" /></li>
               <li><InlineMath math="\sqrt{5} \approx 2.236" /></li>
               <li><InlineMath math="\sqrt{6} \approx 2.449" /></li>
            </ul>
          </div>
        ),
        quiz: []
      }
    ]
  },
  {
    id: 'arithmetic',
    title: 'Arithmetic',
    topics: [
      {
        id: 'percentages',
        title: 'Percentages & Base Values',
        content: (
          <div className="space-y-6 text-gray-800 dark:text-gray-200">
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">The Dynamics of Base Values</h2>
            <p>
              Percentages represent the most versatile tool in the arithmetic kit, serving as the foundation for Profit and Loss, Interest, and growth rate analysis. The study of percentages must move beyond the basic formula to an understanding of "Percentage Dynamics," which includes successive changes and base-value shifts.
            </p>

            <h3 className="text-xl font-semibold mt-6">Successive Percentage Change</h3>
            <p>
              The concept of successive percentage change is vital for modeling compounding effects. If a value is increased by <InlineMath math="a\%" /> and then by <InlineMath math="b\%" />, the net change is given by the formula:
            </p>
            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border-l-4 border-emerald-500">
              <BlockMath math="Net Change = a + b + \frac{ab}{100}" />
            </div>
            <p className="text-sm italic mt-2">
              Note: Use negative signs for decreases. For example, a 20% increase followed by a 10% decrease means a = 20, b = -10.
            </p>

            <h3 className="text-xl font-semibold mt-8">Percentage Point vs. Percentage Change</h3>
            <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-800">
              <h4 className="font-bold text-red-700 dark:text-red-400 flex items-center gap-2">
                <span className="text-xl">⚠️</span> The Common Trap
              </h4>
              <p className="mt-2">
                The distinction between a "percentage point" increase and a "percentage change" is a common trap in testing.
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>An increase from <strong>10% to 15%</strong> is a <strong>5 percentage point</strong> increase.</li>
                <li>However, it is a <strong>50% percentage increase</strong> (since 5 is 50% of the original base 10).</li>
              </ul>
            </div>
          </div>
        ),
        quiz: [
          {
            id: 1,
            type: 'mcq',
            question: 'A shopkeeper increases the price of an item by 20% and then offers a discount of 10%. What is the net percentage change in price?',
            options: ['10% increase', '8% increase', '12% increase', 'No change'],
            correct: 1,
            solution: 'Using the successive change formula: a + b + (ab/100). Here a = 20, b = -10. Net change = 20 - 10 + (20 * -10)/100 = 10 - 2 = 8% increase.'
          },
          {
            id: 2,
            type: 'mcq',
            question: 'The interest rate on a loan increased from 4% to 5%. What is the percentage change in the interest rate?',
            options: ['1%', '20%', '25%', '1.25%'],
            correct: 2,
            solution: 'The increase is 1 percentage point. The percentage change is (Change / Original Base) * 100 = (1 / 4) * 100 = 25%.'
          }
        ]
      },
      {
        id: 'profit-loss-discount',
        title: 'Profit, Loss & Discount',
        content: (
          <div className="space-y-6 text-gray-800 dark:text-gray-200">
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Commercial Arithmetic</h2>
            <p>Profit and loss calculations involve three base prices: Cost Price (CP), Selling Price (SP), and Marked Price (MP).</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h3 className="font-bold text-green-700 dark:text-green-400 mb-2">Profit (Gain)</h3>
                <ul className="space-y-2 px-2">
                  <li><BlockMath math="\text{Profit} = SP - CP" /></li>
                  <li><BlockMath math="\text{Profit \%} = \left(\frac{\text{Profit}}{CP}\right) \times 100" /></li>
                </ul>
              </div>
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <h3 className="font-bold text-red-700 dark:text-red-400 mb-2">Loss</h3>
                <ul className="space-y-2 px-2">
                  <li><BlockMath math="\text{Loss} = CP - SP" /></li>
                  <li><BlockMath math="\text{Loss \%} = \left(\frac{\text{Loss}}{CP}\right) \times 100" /></li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-semibold mt-6">Discount & Marked Price</h3>
            <p>Discount is always calculated on the Marked Price (MP) unless specified otherwise.</p>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg mt-2">
               <BlockMath math="\text{Discount} = MP - SP" />
               <BlockMath math="\text{Discount \%} = \left(\frac{\text{Discount}}{MP}\right) \times 100" />
            </div>
            
            <h3 className="text-xl font-semibold mt-6">Master Relationship</h3>
            <p>A crucial relationship linking Marked Price, Cost Price, Profit%, and Discount%:</p>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-l-4 border-purple-500 mt-2">
               <BlockMath math="\frac{MP}{CP} = \frac{100 + \text{Profit \%}}{100 - \text{Discount \%}}" />
            </div>
          </div>
        ),
        quiz: [
          {
            id: 1,
            type: 'mcq',
            question: 'A shopkeeper wants to mark his goods such that after giving a 20% discount, he still makes a 25% profit. By what percentage above the cost price should he mark the goods?',
            options: ['45%', '50%', '56.25%', '60%'],
            correct: 2,
            solution: 'Using the master relationship: MP/CP = (100 + P%) / (100 - D%) = (100 + 25) / (100 - 20) = 125 / 80 = 25 / 16. To find percentage above CP: ((25 - 16)/16) * 100 = (9/16) * 100 = 56.25%.'
          }
        ]
      },
      {
        id: 'time-speed-distance',
        title: 'Time, Speed, and Distance',
        content: (
          <div className="space-y-6 text-gray-800 dark:text-gray-200">
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">The Dynamics of Motion</h2>
            <p>
              Time, Speed, and Distance (TSD) is arguably the most diverse sub-topic in arithmetic, encompassing everything from basic speed calculations to complex relative motion scenarios.
            </p>
            
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
              <p className="font-medium">The Fundamental Relationship:</p>
              <BlockMath math="D = S \times T" />
            </div>

            <h3 className="text-xl font-semibold mt-8">Relative Speed</h3>
            <p>This is the cornerstone of TSD. It determines how fast the distance between two moving objects is changing.</p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>
                <strong>Same Direction:</strong> Objects moving in the same direction have a relative speed of <InlineMath math="|S_1 - S_2|" />.
              </li>
              <li>
                <strong>Opposite Directions:</strong> Objects moving towards or away from each other have a relative speed of <InlineMath math="S_1 + S_2" />.
              </li>
            </ul>

            <h3 className="text-xl font-semibold mt-8">Boats and Streams</h3>
            <p>Involves moving in a medium that itself has a speed. Let <InlineMath math="B" /> be the boat's speed in still water and <InlineMath math="S" /> be the stream's speed.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
                <h4 className="font-bold text-center">Downstream Speed</h4>
                <BlockMath math="D_{speed} = B + S" />
                <p className="text-sm text-center text-gray-500">Moving with the current</p>
              </div>
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
                <h4 className="font-bold text-center">Upstream Speed</h4>
                <BlockMath math="U_{speed} = B - S" />
                <p className="text-sm text-center text-gray-500">Moving against the current</p>
              </div>
            </div>
          </div>
        ),
        quiz: [
          {
            id: 1,
            type: 'mcq',
            question: 'Two trains start at the same time from stations A and B, 300 km apart, and travel towards each other at 40 km/h and 60 km/h respectively. How long will it take for them to meet?',
            options: ['2 hours', '3 hours', '4 hours', '5 hours'],
            correct: 1,
            solution: 'Since they are moving in opposite directions, relative speed = 40 + 60 = 100 km/h. Time = Distance / Relative Speed = 300 / 100 = 3 hours.'
          },
          {
            id: 2,
            type: 'tita',
            question: 'A boat travels 24 km upstream in 4 hours and 36 km downstream in 3 hours. What is the speed of the boat in still water (in km/h)?',
            correct: '9',
            solution: 'Upstream speed (B - S) = 24 / 4 = 6 km/h. Downstream speed (B + S) = 36 / 3 = 12 km/h. Adding the two equations: 2B = 18 => B = 9 km/h.'
          }
        ]
      }
    ]
  },
  {
    id: 'algebra',
    title: 'Algebra',
    topics: [
      {
        id: 'linear-equations',
        title: 'Linear Equations',
        content: (
          <div className="space-y-6 text-gray-800 dark:text-gray-200">
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Systems of Equations</h2>
            <p>Linear equations form the bedrock of algebraic problem solving. A system of two linear equations takes the form:</p>
            
            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg text-center mt-2">
              <BlockMath math="a_1x + b_1y + c_1 = 0" />
              <BlockMath math="a_2x + b_2y + c_2 = 0" />
            </div>

            <h3 className="text-xl font-semibold mt-6">Conditions for Solutions</h3>
            <p>Testing the ratios of coefficients allows us to quickly determine the nature of the solutions without full solving:</p>
            <div className="overflow-x-auto mt-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
               <table className="min-w-full bg-white dark:bg-gray-800">
                  <thead className="bg-gray-50 dark:bg-gray-900">
                     <tr>
                        <th className="py-3 px-4 text-left border-b border-gray-200 dark:border-gray-700">Condition</th>
                        <th className="py-3 px-4 text-left border-b border-gray-200 dark:border-gray-700">Graphical Meaning</th>
                        <th className="py-3 px-4 text-left border-b border-gray-200 dark:border-gray-700">Number of Solutions</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr className="border-b border-gray-100 dark:border-gray-700">
                        <td className="py-3 px-4 align-middle"><InlineMath math="\frac{a_1}{a_2} \neq \frac{b_1}{b_2}" /></td>
                        <td className="py-3 px-4 align-middle text-gray-600 dark:text-gray-300">Intersecting Lines</td>
                        <td className="py-3 px-4 align-middle font-semibold text-emerald-600">Unique Solution (Consistent)</td>
                     </tr>
                     <tr className="border-b border-gray-100 dark:border-gray-700">
                        <td className="py-3 px-4 align-middle"><InlineMath math="\frac{a_1}{a_2} = \frac{b_1}{b_2} = \frac{c_1}{c_2}" /></td>
                        <td className="py-3 px-4 align-middle text-gray-600 dark:text-gray-300">Coincident Lines</td>
                        <td className="py-3 px-4 align-middle font-semibold text-blue-600">Infinite Solutions (Dependent)</td>
                     </tr>
                     <tr className="">
                        <td className="py-3 px-4 align-middle"><InlineMath math="\frac{a_1}{a_2} = \frac{b_1}{b_2} \neq \frac{c_1}{c_2}" /></td>
                        <td className="py-3 px-4 align-middle text-gray-600 dark:text-gray-300">Parallel Lines</td>
                        <td className="py-3 px-4 align-middle font-semibold text-red-600">No Solution (Inconsistent)</td>
                     </tr>
                  </tbody>
               </table>
            </div>
          </div>
        ),
        quiz: [
          {
            id: 1,
            type: 'mcq',
            question: 'For what value of k will the equations 3x + 4y = 5 and 6x + ky = 15 have no solution?',
            options: ['6', '8', '12', '4'],
            correct: 1,
            solution: 'For no solution, a1/a2 = b1/b2 ≠ c1/c2. Here, 3/6 = 4/k ≠ -5/-15. Solving 3/6 = 4/k gives 1/2 = 4/k, so k = 8.'
          }
        ]
      },
      {
        id: 'quadratic-equations',
        title: 'Quadratic Equations',
        content: (
          <div className="space-y-6 text-gray-800 dark:text-gray-200">
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Polynomials of Degree 2</h2>
            <p>The standard form of a quadratic equation is <InlineMath math="ax^2 + bx + c = 0" />, where <InlineMath math="a \neq 0" />.</p>
            
            <h3 className="text-xl font-semibold mt-6">Roots and the Discriminant</h3>
            <p>The roots of the equation can be found utilizing the quadratic formula:</p>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex justify-center mt-2">
              <BlockMath math="x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}" />
            </div>

            <p className="mt-4">The expression inside the square root, <InlineMath math="\Delta = b^2 - 4ac" />, is named the discriminant. It defines the nature of the roots:</p>
            <ul className="list-disc list-inside space-y-2 mt-2">
               <li>If <InlineMath math="\Delta > 0" />: roots are real and distinct. (Graph cuts x-axis twice)</li>
               <li>If <InlineMath math="\Delta = 0" />: roots are real and equal/repeated. (Graph touches x-axis)</li>
               <li>If <InlineMath math="\Delta < 0" />: roots are complex conjugates. (Graph does not touch x-axis)</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6">Sum and Product of Roots</h3>
            <p>If <InlineMath math="\alpha" /> and <InlineMath math="\beta" /> are roots:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
               <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                  <h4 className="font-semibold mb-2">Sum of Roots</h4>
                  <BlockMath math="\alpha + \beta = -\frac{b}{a}" />
               </div>
               <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                  <h4 className="font-semibold mb-2">Product of Roots</h4>
                  <BlockMath math="\alpha\beta = \frac{c}{a}" />
               </div>
            </div>
            
            <div className="p-5 bg-orange-50 dark:bg-orange-900/20 rounded-xl border-l-4 border-orange-500 mt-6 shadow-sm">
              <h4 className="font-semibold text-orange-800 dark:text-orange-400">Equation Formation</h4>
              <p className="text-sm mt-1 mb-2">If roots are known, the quadratic equation can easily be reconstructed as:</p>
              <BlockMath math="x^2 - (\alpha + \beta)x + \alpha\beta = 0" />
            </div>
          </div>
        ),
        quiz: [
          {
            id: 1,
            type: 'tita',
            question: 'If the roots of the equation x² - px + 8 = 0 are real and equal, find the positive value of p.',
            correct: '4√2',
            solution: 'For real and equal roots, Discriminant (Δ) = 0. Here, a=1, b=-p, c=8. Δ = b² - 4ac = (-p)² - 4(1)(8) = p² - 32 = 0. So p² = 32, which means p = ±√32 = ±4√2. The positive value is 4√2.'
          }
        ]
      }
    ]
  },
  {
    id: 'miscellaneous',
    title: 'Miscellaneous',
    topics: [
      {
        id: 'trigonometry',
        title: 'Trigonometry: Formulas, Ratios & Heights',
        content: (
          <div className="space-y-8 text-gray-800 dark:text-gray-200">
            <div>
              <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400">Trigonometric Foundations</h2>
              <p className="mt-2 text-lg">Trigonometry deals with the relationships between the sides and angles of triangles. A comprehensive mastery of standard values, identities, and transformation formulas is essential.</p>
            </div>
            
            <section>
              <h3 className="text-2xl font-semibold border-b pb-2 mb-4">1. Basic Ratios (SOH-CAH-TOA)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                  <BlockMath math="\sin \theta = \frac{\text{Opposite}}{\text{Hypotenuse}}" />
                  <p className="mt-2 text-sm text-gray-500">Sine</p>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                  <BlockMath math="\cos \theta = \frac{\text{Adjacent}}{\text{Hypotenuse}}" />
                  <p className="mt-2 text-sm text-gray-500">Cosine</p>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                  <BlockMath math="\tan \theta = \frac{\text{Opposite}}{\text{Adjacent}}" />
                  <p className="mt-2 text-sm text-gray-500">Tangent</p>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                  <BlockMath math="\csc \theta = \frac{1}{\sin \theta}" />
                  <p className="mt-2 text-sm text-gray-500">Cosecant</p>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                  <BlockMath math="\sec \theta = \frac{1}{\cos \theta}" />
                  <p className="mt-2 text-sm text-gray-500">Secant</p>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                  <BlockMath math="\cot \theta = \frac{1}{\tan \theta}" />
                  <p className="mt-2 text-sm text-gray-500">Cotangent</p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-semibold border-b pb-2 mb-4">2. Standard Values Table</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                      <th className="py-3 px-4 text-left font-semibold">Angle (<InlineMath math="\theta" />)</th>
                      <th className="py-3 px-4 text-center font-semibold"><InlineMath math="0^\circ" /></th>
                      <th className="py-3 px-4 text-center font-semibold"><InlineMath math="30^\circ" /> (<InlineMath math="\frac{\pi}{6}" />)</th>
                      <th className="py-3 px-4 text-center font-semibold"><InlineMath math="45^\circ" /> (<InlineMath math="\frac{\pi}{4}" />)</th>
                      <th className="py-3 px-4 text-center font-semibold"><InlineMath math="60^\circ" /> (<InlineMath math="\frac{\pi}{3}" />)</th>
                      <th className="py-3 px-4 text-center font-semibold"><InlineMath math="90^\circ" /> (<InlineMath math="\frac{\pi}{2}" />)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-3 px-4 font-semibold text-blue-600 dark:text-blue-400">sin <InlineMath math="\theta" /></td>
                      <td className="py-3 px-4 text-center">0</td>
                      <td className="py-3 px-4 text-center"><InlineMath math="\frac{1}{2}" /></td>
                      <td className="py-3 px-4 text-center"><InlineMath math="\frac{1}{\sqrt{2}}" /></td>
                      <td className="py-3 px-4 text-center"><InlineMath math="\frac{\sqrt{3}}{2}" /></td>
                      <td className="py-3 px-4 text-center">1</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-3 px-4 font-semibold text-blue-600 dark:text-blue-400">cos <InlineMath math="\theta" /></td>
                      <td className="py-3 px-4 text-center">1</td>
                      <td className="py-3 px-4 text-center"><InlineMath math="\frac{\sqrt{3}}{2}" /></td>
                      <td className="py-3 px-4 text-center"><InlineMath math="\frac{1}{\sqrt{2}}" /></td>
                      <td className="py-3 px-4 text-center"><InlineMath math="\frac{1}{2}" /></td>
                      <td className="py-3 px-4 text-center">0</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-blue-600 dark:text-blue-400">tan <InlineMath math="\theta" /></td>
                      <td className="py-3 px-4 text-center">0</td>
                      <td className="py-3 px-4 text-center"><InlineMath math="\frac{1}{\sqrt{3}}" /></td>
                      <td className="py-3 px-4 text-center">1</td>
                      <td className="py-3 px-4 text-center"><InlineMath math="\sqrt{3}" /></td>
                      <td className="py-3 px-4 text-center">Not Def.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-semibold border-b pb-2 mb-4">3. Fundamental Identities</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-t-4 border-blue-500 shadow-sm flex items-center justify-center">
                  <BlockMath math="\sin^2 \theta + \cos^2 \theta = 1" />
                </div>
                <div className="p-5 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border-t-4 border-emerald-500 shadow-sm flex items-center justify-center">
                  <BlockMath math="1 + \tan^2 \theta = \sec^2 \theta" />
                </div>
                <div className="p-5 bg-purple-50 dark:bg-purple-900/20 rounded-xl border-t-4 border-purple-500 shadow-sm flex items-center justify-center">
                  <BlockMath math="1 + \cot^2 \theta = \csc^2 \theta" />
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-semibold border-b pb-2 mb-4">4. Compound Angle Formulas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                  <BlockMath math="\sin(A \pm B) = \sin A \cos B \pm \cos A \sin B" />
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                  <BlockMath math="\cos(A \pm B) = \cos A \cos B \mp \sin A \sin B" />
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 md:col-span-2">
                  <BlockMath math="\tan(A \pm B) = \frac{\tan A \pm \tan B}{1 \mp \tan A \tan B}" />
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-semibold border-b pb-2 mb-4">5. Double Angle Formulas</h3>
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="flex-1 w-full bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                    <BlockMath math="\sin 2\theta = 2 \sin \theta \cos \theta = \frac{2 \tan \theta}{1 + \tan^2 \theta}" />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="flex-1 w-full bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                    <BlockMath math="\cos 2\theta = \cos^2 \theta - \sin^2 \theta = 2\cos^2 \theta - 1 = 1 - 2\sin^2 \theta = \frac{1 - \tan^2 \theta}{1 + \tan^2 \theta}" />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="flex-1 w-full bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                    <BlockMath math="\tan 2\theta = \frac{2 \tan \theta}{1 - \tan^2 \theta}" />
                  </div>
                </div>
              </div>
            </section>
            
            <section>
              <h3 className="text-2xl font-semibold border-b pb-2 mb-4">6. Transformation Formulas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <span className="text-sm font-semibold text-gray-500 mb-2 block">Sum to Product:</span>
                  <BlockMath math="\sin C + \sin D = 2 \sin(\frac{C+D}{2}) \cos(\frac{C-D}{2})" />
                  <BlockMath math="\sin C - \sin D = 2 \cos(\frac{C+D}{2}) \sin(\frac{C-D}{2})" />
                  <BlockMath math="\cos C + \cos D = 2 \cos(\frac{C+D}{2}) \cos(\frac{C-D}{2})" />
                  <BlockMath math="\cos C - \cos D = -2 \sin(\frac{C+D}{2}) \sin(\frac{C-D}{2})" />
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <span className="text-sm font-semibold text-gray-500 mb-2 block">Product to Sum:</span>
                  <BlockMath math="2 \sin A \cos B = \sin(A+B) + \sin(A-B)" />
                  <BlockMath math="2 \cos A \sin B = \sin(A+B) - \sin(A-B)" />
                  <BlockMath math="2 \cos A \cos B = \cos(A+B) + \cos(A-B)" />
                  <BlockMath math="2 \sin A \sin B = \cos(A-B) - \cos(A+B)" />
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-semibold border-b pb-2 mb-4">7. Properties of Triangles</h3>
              <div className="space-y-4">
                <div className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-lg border-l-4 border-rose-500">
                  <h4 className="font-semibold text-rose-700 dark:text-rose-400 mb-2">Sine Rule</h4>
                  <p className="text-sm mb-2">For any triangle ABC with sides a, b, c opposite to angles A, B, C respectively, and circumradius R:</p>
                  <BlockMath math="\frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C} = 2R" />
                </div>
                <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-l-4 border-orange-500">
                  <h4 className="font-semibold text-orange-700 dark:text-orange-400 mb-2">Cosine Rule</h4>
                  <BlockMath math="a^2 = b^2 + c^2 - 2bc \cos A" />
                  <BlockMath math="\cos A = \frac{b^2 + c^2 - a^2}{2bc}" />
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-semibold border-b pb-2 mb-4">8. Heights and Distances</h3>
              <p className="mb-4">Utilizing angles of elevation (looking up) and depression (looking down) to solve for unknown lengths in scenarios involving buildings, poles, or moving objects.</p>
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg w-full flex justify-center">
                 <div className="max-w-md w-full">
                   <h4 className="font-semibold text-center mb-2">Angle of Elevation/Depression Rule:</h4>
                   <BlockMath math="\text{Distance} = \frac{\text{Height}}{\tan \theta}" />
                 </div>
              </div>
            </section>
          </div>
        ),
        quiz: [
          {
            id: 1,
            type: 'mcq',
            question: 'The angle of elevation of the top of a tower from a point on the ground, which is 30 m away from the foot of the tower, is 30°. Find the height of the tower.',
            options: ['10√3 m', '15√3 m', '30√3 m', '20 m'],
            correct: 0,
            solution: 'Let height be h. $\\tan(30^\\circ) = \\frac{h}{30}$. Since $\\tan(30^\\circ) = \\frac{1}{\\sqrt{3}}$, we have $h = \\frac{30}{\\sqrt{3}} = 10\\sqrt{3}$ m.'
          },
          {
            id: 2,
            type: 'mcq',
            question: 'What is the value of 2 sin(15°) cos(15°)?',
            options: ['1/2', '√3/2', '1', '1/√2'],
            correct: 0,
            solution: 'Using the double angle identity: $\\sin 2\\theta = 2 \\sin \\theta \\cos \\theta$. Here $\\theta = 15^\\circ$. So, $\\sin(2 \\times 15^\\circ) = \\sin(30^\\circ) = \\frac{1}{2}$.'
          },
          {
            id: 3,
            type: 'tita',
            question: 'In triangle ABC, side b = 4, side c = 5, and angle A = 60°. Find the square of side a (a²).',
            correct: '21',
            solution: 'Using Cosine rule: $a^2 = b^2 + c^2 - 2bc \\cos A = 4^2 + 5^2 - 2(4)(5) \\cos(60^\\circ) = 16 + 25 - 40(0.5) = 41 - 20 = 21$.'
          }
        ]
      }
    ]
  }
];

export const getAllTopics = () => {
  return syllabus.flatMap(module => module.topics.map(topic => ({ ...topic, moduleId: module.id, moduleTitle: module.title })));
};

export const getTopicById = (id: string) => {
  return getAllTopics().find(topic => topic.id === id);
};
