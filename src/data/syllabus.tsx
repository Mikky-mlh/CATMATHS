import React from 'react';
import { BlockMath, InlineMath } from 'react-katex';
import { Target, BrainCircuit, Zap } from 'lucide-react';

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

// Tactical Coach Components
export const WhyCATCares = ({ children }: { children: React.ReactNode }) => (
  <div className="callout callout-info">
    <h4>
      <Target className="w-4 h-4" /> Why This Matters for CAT
    </h4>
    <div className="italic">
      {children}
    </div>
  </div>
);

export const HowToSpot = ({ children }: { children: React.ReactNode }) => (
  <div className="callout callout-tip">
    <h4>
      <BrainCircuit className="w-4 h-4" /> How to Spot This Question
    </h4>
    <div>
      {children}
    </div>
  </div>
);

export const CommonTraps = ({ children }: { children: React.ReactNode }) => (
  <div className="callout callout-trap">
    <h4>
      <Zap className="w-4 h-4" /> Common Traps
    </h4>
    <div>
      {children}
    </div>
  </div>
);

export const Shortcut = ({ children }: { children: React.ReactNode }) => (
  <div className="callout callout-shortcut">
    <h4>
      <Zap className="w-4 h-4 animate-pulse" /> Time-Saving Shortcut
    </h4>
    <div>
      {children}
    </div>
  </div>
);

export const syllabus: Module[] = [
  // =====================================================================
  // MODULE 1: FOUNDATIONS
  // =====================================================================
  {
    id: 'foundations',
    title: 'Foundations',
    topics: [
      {
        id: 'number-line-integers',
        title: 'The Number Line',
        content: (
          <div className="space-y-6 text-gray-800 dark:text-gray-200">
            <WhyCATCares>
              Distance and absolute value are the bedrock of Modulus questions — a CAT favorite. Mastering the number line lets you visualize ranges instead of guessing at inequalities.
            </WhyCATCares>

            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">The Visual Ruler</h2>
            <p>Think of the number line as a ruler. Positive numbers to the right, negative to the left.</p>

            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
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

            <HowToSpot>
              Look for keywords like "distance between," "absolute value," or inequalities like <InlineMath math="|x - a| < b" />.
            </HowToSpot>

            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-8">Absolute Value</h2>
            <p><strong>Absolute value = distance from zero.</strong> It's always non-negative because distance cannot be negative.</p>
            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <BlockMath math="|x| = |-x|" />
              <p className="text-sm">Example: <InlineMath math="|-7| = 7" /> and <InlineMath math="|7| = 7" />.</p>
            </div>

            <CommonTraps>
              Students often solve <InlineMath math="|x - 5| = 12" /> and find only <InlineMath math="x = 17" />.
              <strong> Always remember the negative case:</strong> <InlineMath math="x - 5 = -12" /> leads to <InlineMath math="x = -7" />.
            </CommonTraps>

            <Shortcut>
              <strong>Distance between any two points a and b = |a - b|.</strong>
              <br />
              "Find distance between -7 and 4" → <InlineMath math="|-7 - 4| = |-11| = 11" />.
              No need to count on your fingers!
            </Shortcut>
          </div>
        ),
        quiz: [
          {
            id: 1, type: 'mcq',
            question: 'What is the distance between the points -7 and 4 on the number line?',
            options: ['-3', '3', '11', '-11'], correct: 2,
            solution: 'The distance between two points a and b is |a - b|. So, |-7 - 4| = |-11| = 11.'
          },
          {
            id: 2, type: 'tita',
            question: 'If |x - 5| = 12, what is the positive value of x?',
            correct: '17',
            solution: 'The equation |x - 5| = 12 means x - 5 = 12 or x - 5 = -12. Solving gives x = 17 or x = -7. The positive value is 17.'
          }
        ]
      },
      {
        id: 'fractions-decimals',
        title: 'Fractions & Decimals',
        content: (
          <div className="space-y-6 text-gray-800 dark:text-gray-200">
            <WhyCATCares>
              Speed is the name of the game. Converting fractions to percentages instantly is the difference between finishing 15 questions vs 20 questions in the QA section.
            </WhyCATCares>

            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">The Speed Grid</h2>
            <p>Memorize these equivalencies. They are the "multiplication tables" of CAT Arithmetic.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {[
                { f: '1/2', d: '0.50', p: '50%' }, { f: '1/3', d: '0.333...', p: '33.33%' },
                { f: '1/4', d: '0.25', p: '25%' }, { f: '1/5', d: '0.20', p: '20%' },
                { f: '1/6', d: '0.166...', p: '16.66%' }, { f: '1/7', d: '0.1428...', p: '14.28%' },
                { f: '1/8', d: '0.125', p: '12.5%' }, { f: '1/9', d: '0.111...', p: '11.11%' },
                { f: '1/11', d: '0.0909...', p: '9.09%' }, { f: '1/12', d: '0.0833...', p: '8.33%' },
              ].map(item => (
                <div key={item.f} className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                  <span className="font-bold block mb-1">{item.f}</span>
                  <span className="text-sm text-gray-500 block">{item.d}</span>
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{item.p}</span>
                </div>
              ))}
            </div>

            <CommonTraps>
              <strong>1/9 vs 1/11:</strong>
              <ul className="list-disc list-inside">
                <li><InlineMath math="1/9 = 11.11\%" /> (Think: nines have digits of ones)</li>
                <li><InlineMath math="1/11 = 9.09\%" /> (Think: elevens have digits of nines)</li>
              </ul>
              Mixing these up is a classic rookie mistake.
            </CommonTraps>

            <Shortcut>
              <strong>Converting Recurring Decimals:</strong>
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg mt-2 font-mono">
                0.3636... = 36/99 = 4/11<br />
                0.2727... = 27/99 = 3/11
              </div>
              "Put as many 9s in the denominator as there are repeating digits."
            </Shortcut>
          </div>
        ),
        quiz: [
          {
            id: 1, type: 'tita',
            question: 'Convert the recurring decimal 0.363636... to a fraction in its simplest form. What is the sum of the numerator and denominator?',
            correct: '15',
            solution: '0.3636... = 36/99 = 4/11. The sum is 4 + 11 = 15.'
          }
        ]
      },
      {
        id: 'option-elimination',
        title: 'Option Elimination & Approximation',
        content: (
          <div className="space-y-6 text-gray-800 dark:text-gray-200">
            <WhyCATCares>
              You don't get marks for your rough sheet. You get marks for the right bubble. Learning to eliminate wrong answers is a superpower that can save 30–40 seconds per question.
            </WhyCATCares>

            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">The Art of the "Smart Guess"</h2>
            <p>CAT often provides options with different unit digits or different ranges. Use this to your advantage.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <h3 className="font-bold mb-2">1. Unit Digit Analysis</h3>
                <p className="text-sm">If the options are 124, 156, 189, and 201, and your calculation ends in <InlineMath math="6 \times 4" />, the answer MUST end in 4. Only 124 qualifies.</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <h3 className="font-bold mb-2">2. Range Approximation</h3>
                <p className="text-sm">Instead of <InlineMath math="19.8 \times 31.2" />, calculate <InlineMath math="20 \times 30 = 600" />. If only one option is near 600, you're done.</p>
              </div>
            </div>

            <HowToSpot>
              Use this when the options are far apart or have different ending digits. <strong>Always scan the options before you start solving!</strong>
            </HowToSpot>

            <Shortcut>
              <strong>The Rule of 72:</strong>
              <p className="text-sm mt-1">To find out how long it takes for money to double at <InlineMath math="r\%" /> interest, just calculate <InlineMath math="72 / r" />.
              Example: At 8%, money doubles in ~9 years.</p>
            </Shortcut>

            <CommonTraps>
              Approximation is dangerous in TITA (Type In The Answer) questions. Only use it to eliminate options in MCQs. For TITA, you must be precise.
            </CommonTraps>
          </div>
        ),
        quiz: [
          {
            id: 1, type: 'mcq',
            question: 'Approximate the value of 19.9% of 451.',
            options: ['9', '45', '90', '190'], correct: 2,
            solution: '20% of 450 = 90. The closest option is 90.'
          }
        ]
      },
      {
        id: 'di-calculation-basics',
        title: 'DI Calculation Basics',
        content: (
          <div className="space-y-6 text-gray-800 dark:text-gray-200">
            <WhyCATCares>
              The DILR section is often won or lost based on how fast you can compare two fractions or approximate a growth rate.
            </WhyCATCares>

            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Comparing Fractions Without Division</h2>
            <p>Which is larger: <InlineMath math="17/23" /> or <InlineMath math="19/25" />? Stop dividing!</p>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-bold mb-2">The Cross-Multiplication Hack</h3>
              <p className="text-sm">
                Multiply <InlineMath math="17 \times 25" /> and <InlineMath math="23 \times 19" />.
                <br /><InlineMath math="17 \times 25 = 425" />
                <br /><InlineMath math="23 \times 19 = 437" />
                <br />Since <InlineMath math="437 > 425" />, <InlineMath math="19/25" /> is larger.
              </p>
            </div>

            <h3 className="text-xl font-semibold mt-6">Estimation of CAGR (Growth Rate)</h3>
            <p>If a value grows from 100 to 150 over 3 years, what is the approximate annual growth rate?</p>
            <Shortcut>
              <strong>Net Change / Number of Years.</strong><br />
              <InlineMath math="50\% / 3 \approx 16.6\%" />.
              The actual CAGR will be slightly less due to compounding, but this approximation picks the right option in 90% of DI sets.
            </Shortcut>

            <HowToSpot>
              Essential for "Which year had the highest percentage growth?" or "In which period was the ratio maximum?" type questions.
            </HowToSpot>
          </div>
        ),
        quiz: [
          {
            id: 1, type: 'mcq',
            question: 'Which fraction is greater: 5/7 or 9/13?',
            options: ['5/7', '9/13', 'They are equal', 'Cannot be determined'], correct: 0,
            solution: 'Cross multiply: 5 * 13 = 65, 7 * 9 = 63. Since 65 > 63, 5/7 is greater.'
          }
        ]
      }
    ]
  },

  // =====================================================================
  // MODULE 2: NUMBER SYSTEMS & DIVISIBILITY (consolidated)
  // =====================================================================
  {
    id: 'number-systems',
    title: 'Number Systems & Divisibility',
    topics: [
      {
        id: 'divisibility-rules',
        title: 'Divisibility Rules',
        content: (
          <div className="space-y-6 text-gray-800 dark:text-gray-200">
            <WhyCATCares>
              Direct questions on divisibility are rare, but it's the #1 tool for option elimination. If the solution must be divisible by 17, only multiples of 17 in the options qualify.
            </WhyCATCares>

            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">The Power of Quick Checks</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { div: '2', rule: 'Last digit even' }, { div: '3', rule: 'Sum of digits ÷ 3' },
                { div: '4', rule: 'Last 2 digits ÷ 4' }, { div: '5', rule: 'Last digit 0 or 5' },
                { div: '6', rule: 'Divisible by 2 AND 3' }, { div: '8', rule: 'Last 3 digits ÷ 8' },
                { div: '9', rule: 'Sum of digits ÷ 9' }, { div: '11', rule: 'Odd-even place diff ÷ 11' },
              ].map(item => (
                <div key={item.div} className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                  <p className="font-bold text-blue-700 dark:text-blue-400">÷ {item.div}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{item.rule}</p>
                </div>
              ))}
            </div>

            <HowToSpot>
              Use this when you see "is a multiple of," "leaves a remainder of 0," or when checking options quickly.
            </HowToSpot>

            <Shortcut>
              <strong>The 11 Rule hack:</strong> Difference between sum of digits at odd places and even places should be 0 or a multiple of 11.
              <br />Example: 1331 → (1+3) - (3+1) = 0. Divisible!
            </Shortcut>

            <CommonTraps>
              Dividing by a composite number requires checking coprimes.
              <strong> Example:</strong> To check divisibility by 12, check for both 3 AND 4. Checking for 2 and 6 is NOT enough (e.g., 6 is divisible by 2 and 6 but not 12).
            </CommonTraps>
          </div>
        ),
        quiz: [
          {
            id: 1, type: 'tita',
            question: 'What is the smallest number that should be added to 12345 to make it divisible by 9?',
            correct: '3',
            solution: 'Sum of digits of 12345 is 1+2+3+4+5 = 15. The next multiple of 9 is 18. So, 18 - 15 = 3.'
          }
        ]
      },
      {
        id: 'unit-digit-cyclicity',
        title: 'Unit Digit & Cyclicity',
        content: (
          <div className="space-y-6 text-gray-800 dark:text-gray-200">
            <WhyCATCares>
              "Unit digit" is a powerful filtering tool for MCQs. Even when you can't solve the full problem, knowing the unit digit can eliminate 2–3 options instantly.
            </WhyCATCares>

            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">The Power of 4</h2>
            <p>Most digits cycle every 4 powers. Just find the remainder of the power when divided by 4.</p>

            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Digit</th>
                    <th className="text-left py-2">Cycle Length</th>
                    <th className="text-left py-2">Rule</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b"><td>0, 1, 5, 6</td><td>1</td><td>Never changes</td></tr>
                  <tr className="border-b"><td>4, 9</td><td>2</td><td>Even/Odd dependence</td></tr>
                  <tr className="border-b"><td>2, 3, 7, 8</td><td>4</td><td>Standard cycle</td></tr>
                </tbody>
              </table>
            </div>

            <CommonTraps>
              When the remainder of (Power / 4) is 0, use the 4th power, NOT the 0th power.
              <br /><InlineMath math="7^{40}" /> → Remainder <InlineMath math="40/4 = 0" />. Use <InlineMath math="7^4 \equiv 1" />.
            </CommonTraps>

            <Shortcut>
              <strong>The 4 & 9 Rule:</strong>
              <ul className="list-disc list-inside mt-2">
                <li><InlineMath math="4^{\text{Odd}} = 4" />, <InlineMath math="4^{\text{Even}} = 6" /></li>
                <li><InlineMath math="9^{\text{Odd}} = 9" />, <InlineMath math="9^{\text{Even}} = 1" /></li>
              </ul>
            </Shortcut>
          </div>
        ),
        quiz: [
          {
            id: 1, type: 'tita',
            question: 'Find the unit digit of 23^45.',
            correct: '3',
            solution: 'Cycle of 3 is (3, 9, 7, 1). 45 / 4 leaves remainder 1. So unit digit is 3^1 = 3.'
          },
          {
            id: 2, type: 'tita',
            question: 'Find the unit digit of 2^100.',
            correct: '6',
            solution: 'Cyclicity of 2 is 4 (2,4,8,6). 100 ÷ 4 = 25 remainder 0. When remainder is 0, use last digit of cycle = 6.'
          }
        ]
      },
      {
        id: 'factors-multiples',
        title: 'Factors, Multiples & Trailing Zeros',
        content: (
          <div className="space-y-6 text-gray-800 dark:text-gray-200">
            <WhyCATCares>
              Factor theory is the gateway to Number Systems questions. CAT loves "number of factors," "sum of factors," and "trailing zeros in n!" — these are easy marks once you know the formulas.
            </WhyCATCares>

            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Prime Factorization</h2>
            <p>Every number can be written as <InlineMath math="N = a^p \times b^q \times c^r" />.</p>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-bold mb-2">Total Number of Factors</h3>
              <BlockMath math="(p+1)(q+1)(r+1)" />
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg mt-4">
              <p className="font-bold">Sum of Factors:</p>
              <BlockMath math="\frac{a^{p+1}-1}{a-1} \cdot \frac{b^{q+1}-1}{b-1} \cdot \frac{c^{r+1}-1}{c-1}" />
            </div>

            <HowToSpot>
              Look for "perfect square factors," "odd factors," "even factors," or "divisibility of factorials."
            </HowToSpot>

            <h3 className="text-xl font-semibold mt-6">Trailing Zeros in n!</h3>
            <p>Trailing zeros come from factors of 10. Since 10 = 2 × 5 and there are always more 2s, just count the 5s.</p>
            <Shortcut>
              <strong>Formula for trailing zeros in <InlineMath math="n!" />:</strong>
              <BlockMath math="\left\lfloor \frac{n}{5} \right\rfloor + \left\lfloor \frac{n}{25} \right\rfloor + \left\lfloor \frac{n}{125} \right\rfloor + \dots" />
              <strong>Example:</strong> 100! → 100/5 + 100/25 + 100/125 = 20 + 4 + 0 = <strong>24 trailing zeros</strong>.
            </Shortcut>
          </div>
        ),
        quiz: [
          {
            id: 1, type: 'mcq',
            question: 'Find the number of zeros at the end of 100!',
            options: ['20', '24', '25', '30'], correct: 1,
            solution: '100/5 = 20, 100/25 = 4. 100/125 = 0. Total = 20 + 4 = 24.'
          },
          {
            id: 2, type: 'tita',
            question: 'Find the number of factors of 360.',
            correct: '24',
            solution: '360 = 2³ × 3² × 5¹. Factors = (3+1)(2+1)(1+1) = 4 × 3 × 2 = 24.'
          }
        ]
      },
      {
        id: 'hcf-lcm',
        title: 'HCF & LCM',
        content: (
          <div className="space-y-6 text-gray-800 dark:text-gray-200">
            <WhyCATCares>
              HCF/LCM questions appear directly AND as building blocks for ratio, TSD, and time & work problems. The relationship HCF × LCM = Product is used more often than you'd think.
            </WhyCATCares>

            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Highest Common Factor & Least Common Multiple</h2>

            <HowToSpot>
              <ul className="list-disc list-inside">
                <li>"Greatest number that divides..." → <strong>HCF</strong></li>
                <li>"Least number divisible by..." → <strong>LCM</strong></li>
                <li>"Bells ring together again after..." → <strong>LCM</strong></li>
              </ul>
            </HowToSpot>

            <h3 className="text-xl font-semibold mt-6">Key Relationship</h3>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
              <BlockMath math="\text{Product of two numbers} = \text{HCF} \times \text{LCM}" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                <h4 className="font-bold text-emerald-700 dark:text-emerald-400 mb-2">HCF Method</h4>
                <p className="text-sm">Product of <strong>common</strong> prime factors with <strong>lowest</strong> powers.</p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <h4 className="font-bold text-purple-700 dark:text-purple-400 mb-2">LCM Method</h4>
                <p className="text-sm">Product of <strong>all</strong> prime factors with <strong>highest</strong> powers.</p>
              </div>
            </div>

            <Shortcut>
              <strong>For two numbers:</strong> If you know HCF and one number, find the other using: Other = (HCF × LCM) / Known number.
            </Shortcut>
          </div>
        ),
        quiz: [
          {
            id: 1, type: 'mcq',
            question: 'HCF of two numbers is 12 and their LCM is 360. If one number is 60, what is the other?',
            options: ['72', '84', '96', '108'], correct: 0,
            solution: 'Product = HCF × LCM. So 60 × other = 12 × 360. Other = (12 × 360)/60 = 72.'
          },
          {
            id: 2, type: 'mcq',
            question: 'The LCM of 12, 15, and 20 is:',
            options: ['60', '120', '180', '240'], correct: 0,
            solution: '12 = 2²×3, 15 = 3×5, 20 = 2²×5. LCM = 2²×3×5 = 60.'
          }
        ]
      },
      {
        id: 'remainders',
        title: 'Remainders & Modular Arithmetic',
        content: (
          <div className="space-y-6 text-gray-800 dark:text-gray-200">
            <WhyCATCares>
              Remainder questions are a CAT staple, especially as TITA questions. You need basic mod arithmetic and pattern recognition — not advanced theorems.
            </WhyCATCares>

            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Think in Remainders</h2>
            <p>Modular arithmetic is just a fancy way of saying "what's left over after division." The key insight: you can take remainders at each step of a calculation.</p>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-bold mb-2">Core Properties</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><InlineMath math="(a + b) \mod n = [(a \mod n) + (b \mod n)] \mod n" /></li>
                <li><InlineMath math="(a \times b) \mod n = [(a \mod n) \times (b \mod n)] \mod n" /></li>
              </ul>
            </div>

            <HowToSpot>
              Look for: "Find the remainder when... is divided by..." or "What is the last digit of..." (last digit = remainder when divided by 10).
            </HowToSpot>

            <h3 className="text-xl font-semibold mt-6">The Pattern-Finding Method</h3>
            <p>For <InlineMath math="a^n \mod d" />, find the cycle of remainders:</p>
            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border-l-4 border-emerald-500">
              <p className="font-medium">Example: Find remainder of <InlineMath math="2^{100}" /> divided by 7.</p>
              <ol className="list-decimal list-inside mt-2 space-y-1 text-sm">
                <li><InlineMath math="2^1 \mod 7 = 2" /></li>
                <li><InlineMath math="2^2 \mod 7 = 4" /></li>
                <li><InlineMath math="2^3 \mod 7 = 1" /> ← Cycle restarts!</li>
                <li>Cycle length = 3. <InlineMath math="100 = 3 \times 33 + 1" /></li>
                <li>So <InlineMath math="2^{100} \mod 7 = 2^1 \mod 7 = 2" /></li>
              </ol>
            </div>

            <Shortcut>
              <strong>Quick remainder tricks:</strong>
              <ul className="list-disc list-inside mt-2">
                <li>Any number mod 9 = sum of its digits mod 9</li>
                <li><InlineMath math="10^n \mod 9 = 1" /> always. So 1000 mod 9 = 1.</li>
                <li><InlineMath math="10^n \mod 11" /> alternates between 1 and 10.</li>
              </ul>
            </Shortcut>

            <CommonTraps>
              Don't memorize Fermat's or Euler's theorems blindly. For CAT, finding the cycle by computing the first few powers is faster and more reliable.
            </CommonTraps>
          </div>
        ),
        quiz: [
          {
            id: 1, type: 'tita',
            question: 'Find the remainder when 2^100 is divided by 7.',
            correct: '2',
            solution: '2^1 mod 7 = 2, 2^2 mod 7 = 4, 2^3 mod 7 = 1. Cycle = 3. 100 = 3×33 + 1. So 2^100 mod 7 = 2^1 mod 7 = 2.'
          },
          {
            id: 2, type: 'tita',
            question: 'Find the remainder when 17^23 is divided by 4.',
            correct: '1',
            solution: '17 mod 4 = 1. So 17^23 mod 4 = 1^23 mod 4 = 1.'
          }
        ]
      }
    ]
  },

  // =====================================================================
  // MODULE 3: ARITHMETIC (highest CAT weightage: 35-40%)
  // =====================================================================
  {
    id: 'arithmetic',
    title: 'Arithmetic',
    topics: [
      {
        id: 'percentages',
        title: 'Percentages & Base Values',
        content: (
          <div className="space-y-6 text-gray-800 dark:text-gray-200">
            <WhyCATCares>
              Percentages are the foundation for Profit/Loss, Interest, and DI. This single topic touches ~40% of all QA questions directly or indirectly.
            </WhyCATCares>

            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">The Dynamics of Base Values</h2>

            <HowToSpot>
              Look for: "increased by X%", "what percent of", "successive changes", "percentage point vs percentage change."
            </HowToSpot>

            <h3 className="text-xl font-semibold mt-6">Successive Percentage Change</h3>
            <p>If a value changes by <InlineMath math="a\%" /> and then by <InlineMath math="b\%" />:</p>
            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border-l-4 border-emerald-500">
              <BlockMath math="\text{Net Change} = a + b + \frac{ab}{100}" />
            </div>
            <p className="text-sm italic mt-2">Use negative signs for decreases. Example: 20% increase then 10% decrease → a = 20, b = -10.</p>

            <Shortcut>
              <strong>Always assume the base = 100</strong> when no specific value is given. This turns every percentage problem into simple arithmetic.
            </Shortcut>

            <h3 className="text-xl font-semibold mt-8">Percentage Point vs. Percentage Change</h3>
            <CommonTraps>
              An increase from <strong>10% to 15%</strong> is a <strong>5 percentage point</strong> increase.
              But it is a <strong>50% percentage increase</strong> (since 5 is 50% of the original 10).
              <br /><strong>Quick Rule:</strong> Point = simple subtraction | Change = (Change/Base) × 100.
            </CommonTraps>
          </div>
        ),
        quiz: [
          {
            id: 1, type: 'mcq',
            question: 'A shopkeeper increases the price by 20% and then offers a 10% discount. What is the net change?',
            options: ['10% increase', '8% increase', '12% increase', 'No change'], correct: 1,
            solution: 'Net = 20 + (-10) + (20 × -10)/100 = 20 - 10 - 2 = 8% increase.'
          },
          {
            id: 2, type: 'mcq',
            question: 'Interest rate on a loan increased from 4% to 5%. What is the percentage change in the interest rate?',
            options: ['1%', '20%', '25%', '1.25%'], correct: 2,
            solution: 'Change = (1/4) × 100 = 25%.'
          }
        ]
      },
      {
        id: 'profit-loss-discount',
        title: 'Profit, Loss & Discount',
        content: (
          <div className="space-y-6 text-gray-800 dark:text-gray-200">
            <WhyCATCares>
              One of the most frequently tested arithmetic topics. Appears 2–3 times per CAT paper on average.
            </WhyCATCares>

            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Follow the Money</h2>
            <p>Always track what actually leaves the shopkeeper's pocket (CP) versus what the customer pays (SP).</p>

            <HowToSpot>
              Look for: "sold at a profit of X%", "marked price and discount given", "two successive discounts", "dishonest dealer."
            </HowToSpot>

            <CommonTraps>
              <strong>Profit % is ALWAYS on CP. Discount % is ALWAYS on MP.</strong> Mixing these up is the #1 mistake.
            </CommonTraps>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h3 className="font-bold text-green-700 dark:text-green-400 mb-2">Profit</h3>
                <BlockMath math="\text{Profit \%} = \frac{SP - CP}{CP} \times 100" />
              </div>
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <h3 className="font-bold text-red-700 dark:text-red-400 mb-2">Discount</h3>
                <BlockMath math="\text{Discount \%} = \frac{MP - SP}{MP} \times 100" />
              </div>
            </div>

            <h3 className="text-xl font-semibold mt-6">Master Relationship</h3>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-l-4 border-purple-500">
              <BlockMath math="\frac{MP}{CP} = \frac{100 + \text{Profit \%}}{100 - \text{Discount \%}}" />
            </div>

            <Shortcut>
              <strong>Successive discounts a% and b%:</strong> Net discount = <InlineMath math="a + b - \frac{ab}{100}" />.
              Don't calculate them separately!
            </Shortcut>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg mt-4">
              <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-2">📝 CAT-Style Example</h4>
              <p className="text-sm mb-2"><strong>Problem:</strong> A shopkeeper marks goods 60% above CP and gives 20% discount. Find profit %.</p>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Assume CP = ₹100</li>
                <li>MP = 100 + 60 = ₹160</li>
                <li>Discount = 20% of 160 = ₹32</li>
                <li>SP = 160 - 32 = ₹128</li>
                <li>Profit = ₹28 → Profit % = <strong>28%</strong></li>
              </ol>
            </div>
          </div>
        ),
        quiz: [
          {
            id: 1, type: 'mcq',
            question: 'A shopkeeper marks goods such that after giving a 20% discount, he makes a 25% profit. By what % above CP did he mark?',
            options: ['45%', '50%', '56.25%', '60%'], correct: 2,
            solution: 'MP/CP = (100+25)/(100-20) = 125/80 = 25/16. Markup = (25-16)/16 × 100 = 56.25%.'
          }
        ]
      },
      {
        id: 'simple-compound-interest',
        title: 'Simple & Compound Interest',
        content: (
          <div className="space-y-6 text-gray-800 dark:text-gray-200">
            <WhyCATCares>
              SI/CI questions appear regularly and are usually quick solves if you know the shortcuts. The 2-year CI-SI difference formula alone can save 2 minutes.
            </WhyCATCares>

            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Money Grows</h2>

            <HowToSpot>
              Look for: "simple interest," "compound interest," "compounded half-yearly/quarterly," "difference between CI and SI."
            </HowToSpot>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <p className="font-bold">Simple Interest</p>
                <BlockMath math="SI = \frac{P \times R \times T}{100}" />
                <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">Interest on original principal only (linear growth)</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <p className="font-bold">Compound Interest</p>
                <BlockMath math="A = P\left(1 + \frac{R}{100}\right)^T" />
                <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">Interest on principal + accumulated interest (exponential growth)</p>
              </div>
            </div>

            <Shortcut>
              <strong>CI - SI difference for exactly 2 years:</strong>
              <BlockMath math="\text{Difference} = P\left(\frac{R}{100}\right)^2" />
              <em>Trigger: Use this instantly when asked for the difference between SI and CI over exactly 2 years. Never calculate them separately.</em>
            </Shortcut>

            <CommonTraps>
              <strong>Half-yearly compounding:</strong> Rate becomes R/2 and Time becomes T×2. Don't forget to adjust BOTH!
            </CommonTraps>
          </div>
        ),
        quiz: [
          {
            id: 1, type: 'tita',
            question: 'Find the difference between CI and SI on ₹5000 at 10% p.a. for 2 years.',
            correct: '50',
            solution: 'Difference = 5000 × (10/100)² = 5000 × 0.01 = ₹50.'
          }
        ]
      },
      {
        id: 'ratio-proportion-variation',
        title: 'Ratio, Proportion & Variation',
        content: (
          <div className="space-y-6 text-gray-800 dark:text-gray-200">
            <WhyCATCares>
              Ratios are the language of comparison in CAT. They underpin TSD, Time & Work, and Mixtures. If you can't think in ratios, you'll struggle with half the QA section.
            </WhyCATCares>

            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Comparing Quantities</h2>

            <HowToSpot>
              Look for: "in the ratio," "proportional to," "varies directly/inversely," or any problem comparing two quantities.
            </HowToSpot>

            <Shortcut>
              <strong>Combining ratios:</strong> If a:b = 2:3 and b:c = 4:5, make b equal in both.
              a:b = 8:12, b:c = 12:15 → a:b:c = 8:12:15. Use LCM of the common term.
            </Shortcut>

            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg mt-4">
              <p className="font-bold">Componendo & Dividendo</p>
              <BlockMath math="\text{If } \frac{a}{b} = \frac{c}{d} \quad\Rightarrow\quad \frac{a+b}{a-b} = \frac{c+d}{c-d}" />
            </div>

            <h3 className="text-xl font-semibold mt-4">Variation</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="font-bold text-blue-700 dark:text-blue-400">Direct: <InlineMath math="y = kx" /></p>
                <p className="text-xs text-gray-600 dark:text-gray-400">As x increases, y increases</p>
              </div>
              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <p className="font-bold text-purple-700 dark:text-purple-400">Inverse: <InlineMath math="y = k/x" /></p>
                <p className="text-xs text-gray-600 dark:text-gray-400">As x increases, y decreases</p>
              </div>
            </div>
          </div>
        ),
        quiz: [
          {
            id: 1, type: 'mcq',
            question: 'If a:b = 2:3 and b:c = 4:5, find a:c',
            options: ['8:15', '2:5', '4:5', '6:15'], correct: 0,
            solution: 'a:b = 2:3 = 8:12, b:c = 4:5 = 12:15, so a:c = 8:15.'
          }
        ]
      },
      {
        id: 'averages-mixtures-alligations',
        title: 'Averages, Mixtures & Alligations',
        content: (
          <div className="space-y-6 text-gray-800 dark:text-gray-200">
            <WhyCATCares>
              Alligation is one of the most powerful CAT shortcuts. It converts complex mixture/weighted average problems into simple cross-subtraction.
            </WhyCATCares>

            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Finding the Centre</h2>
            <p>Weighted average: <InlineMath math="\frac{n_1 A_1 + n_2 A_2}{n_1 + n_2}" />.</p>

            <HowToSpot>
              Look for: "mixture of two types," "average of groups combined," "in what ratio must X be mixed with Y."
            </HowToSpot>

            <h3 className="text-xl font-semibold mt-4">The Alligation Rule</h3>
            <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
              <p>To mix two ingredients with values <InlineMath math="C_1" /> and <InlineMath math="C_2" /> to get mean <InlineMath math="M" />:</p>
              <BlockMath math="\frac{\text{Qty of cheaper}}{\text{Qty of dearer}} = \frac{C_2 - M}{M - C_1}" />
            </div>

            <Shortcut>
              <strong>Visual method:</strong> Write C₁ and C₂ on top, M in the middle. Cross-subtract to get the ratio. Works for prices, concentrations, averages — anything!
            </Shortcut>

            <CommonTraps>
              In replacement problems (e.g., "10 liters removed and replaced"), don't just subtract. Use the formula:
              <BlockMath math="\text{Final concentration} = \text{Initial} \times \left(1 - \frac{\text{replaced}}{{\text{total}}}\right)^n" />
            </CommonTraps>
          </div>
        ),
        quiz: [
          {
            id: 1, type: 'tita',
            question: 'In what ratio must rice at ₹60/kg be mixed with rice at ₹90/kg to get a mixture worth ₹75/kg?',
            correct: '1:1',
            solution: 'Ratio = (90-75)/(75-60) = 15/15 = 1:1.'
          }
        ]
      },
      {
        id: 'time-speed-distance',
        title: 'Time, Speed & Distance',
        content: (
          <div className="space-y-6 text-gray-800 dark:text-gray-200">
            <WhyCATCares>
              TSD is the most diverse arithmetic sub-topic. It appears in 2–3 questions per CAT paper and tests your ability to visualize motion scenarios.
            </WhyCATCares>

            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">The Dynamics of Motion</h2>

            <HowToSpot>
              Look for: trains crossing, boats upstream/downstream, people meeting on tracks, "average speed for a round trip."
            </HowToSpot>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
              <BlockMath math="D = S \times T" />
              <p className="text-sm mt-2">Remember: 1 km/h = 5/18 m/s</p>
            </div>

            <h3 className="text-xl font-semibold mt-8">Relative Speed</h3>
            <p>Imagine walking on an airport moving walkway. Walking with the belt = speeds add (downstream). Walking against = speeds subtract (upstream).</p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li><strong>Same Direction:</strong> <InlineMath math="|S_1 - S_2|" /></li>
              <li><strong>Opposite Directions:</strong> <InlineMath math="S_1 + S_2" /></li>
            </ul>

            <Shortcut>
              <strong>Average speed for equal distances:</strong> <InlineMath math="\frac{2S_1 S_2}{S_1 + S_2}" />
              <br /><em>Trigger: Use when someone travels the same distance at two different speeds (e.g., to office and back).</em>
            </Shortcut>

            <h3 className="text-xl font-semibold mt-8">Boats and Streams</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
                <h4 className="font-bold text-center">Downstream = B + S</h4>
              </div>
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
                <h4 className="font-bold text-center">Upstream = B - S</h4>
              </div>
            </div>
            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg mt-4">
              <p className="text-sm"><strong>Quick derivation:</strong> B = (Down + Up)/2, S = (Down - Up)/2</p>
            </div>

            <CommonTraps>
              In train problems, don't forget to add the <strong>length of the train</strong> to the distance when it crosses a platform or another train.
            </CommonTraps>
          </div>
        ),
        quiz: [
          {
            id: 1, type: 'mcq',
            question: 'Two trains 300 km apart travel towards each other at 40 and 60 km/h. When do they meet?',
            options: ['2 hours', '3 hours', '4 hours', '5 hours'], correct: 1,
            solution: 'Relative speed = 40 + 60 = 100 km/h. Time = 300/100 = 3 hours.'
          },
          {
            id: 2, type: 'tita',
            question: 'A boat travels 24 km upstream in 4 hours and 36 km downstream in 3 hours. Speed of boat in still water (km/h)?',
            correct: '9',
            solution: 'Upstream = 6 km/h, Downstream = 12 km/h. B = (12+6)/2 = 9 km/h.'
          }
        ]
      },
      {
        id: 'time-work',
        title: 'Time & Work',
        content: (
          <div className="space-y-6 text-gray-800 dark:text-gray-200">
            <WhyCATCares>
              Time & Work questions are essentially ratio problems in disguise. The LCM method makes them trivially easy once mastered.
            </WhyCATCares>

            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Efficiency Counts</h2>
            <p>If a person takes <InlineMath math="d" /> days to do a job, their 1-day work = <InlineMath math="1/d" />.</p>

            <HowToSpot>
              Look for: "A can do a job in X days, B in Y days," "pipes filling a tank," "wages proportional to work."
            </HowToSpot>

            <Shortcut>
              <strong>LCM Method:</strong> Assume total work = LCM of individual times.
              <br />Example: A takes 12 days, B takes 15 days. Total work = LCM(12,15) = 60 units.
              <br />A's efficiency = 5 units/day, B's = 4 units/day. Together = 9 units/day.
              <br />Time together = 60/9 = 6⅔ days. <em>No fractions needed until the end!</em>
            </Shortcut>

            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg mt-4">
              <p className="font-bold">Pipes & Cisterns</p>
              <p>Inlet pipe: +ve efficiency; Outlet (leak): -ve efficiency. Same logic as Time & Work.</p>
            </div>

            <CommonTraps>
              <strong>Wages are proportional to WORK DONE, not time spent.</strong> If A and B work together and A does 60% of the work, A gets 60% of the payment.
            </CommonTraps>
          </div>
        ),
        quiz: [
          {
            id: 1, type: 'tita',
            question: 'A can do a job in 12 days, B in 15 days. They work together for 5 days, then A leaves. How many more days will B take?',
            correct: '3.75',
            solution: 'Total work = LCM(12,15) = 60. A = 5/day, B = 4/day. Together 5 days = 45 units. Remaining = 15 units. B alone = 15/4 = 3.75 days.'
          }
        ]
      }
    ]
  },

  // =====================================================================
  // MODULE 4: ALGEBRA
  // =====================================================================
  {
    id: 'algebra',
    title: 'Algebra',
    topics: [
      {
        id: 'algebraic-identities',
        title: 'Algebraic Identities',
        content: (
          <div className="space-y-6 text-gray-800 dark:text-gray-200">
            <WhyCATCares>
              Identities let you simplify complex expressions in seconds. Questions like "find 99²" become mental math with the right identity.
            </WhyCATCares>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Standard Algebraic Expansions</h2>

            <HowToSpot>
              Look for: expressions involving squares, cubes, or sums/differences that match a known pattern.
            </HowToSpot>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="font-bold text-blue-700 dark:text-blue-400">Square of Sum</p>
                <BlockMath math="(a + b)^2 = a^2 + 2ab + b^2" />
              </div>
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                <p className="font-bold text-emerald-700 dark:text-emerald-400">Square of Difference</p>
                <BlockMath math="(a - b)^2 = a^2 - 2ab + b^2" />
              </div>
              <div className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-lg">
                <p className="font-bold text-rose-700 dark:text-rose-400">Difference of Squares</p>
                <BlockMath math="a^2 - b^2 = (a+b)(a-b)" />
              </div>
              <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                <p className="font-bold text-indigo-700 dark:text-indigo-400">Three Variable Identity</p>
                <BlockMath math="a^3 + b^3 + c^3 - 3abc = (a+b+c)(a^2+b^2+c^2-ab-bc-ca)" />
              </div>
            </div>

            <Shortcut>
              <strong>When a + b + c = 0:</strong> <InlineMath math="a^3 + b^3 + c^3 = 3abc" />. This shortcut appears in CAT almost every year.
            </Shortcut>
          </div>
        ),
        quiz: [
          {
            id: 1, type: 'mcq',
            question: 'The value of 99² using algebraic identity is:',
            options: ['9801', '9800', '9701', '9700'], correct: 0,
            solution: '99² = (100-1)² = 10000 - 200 + 1 = 9801.'
          },
          {
            id: 2, type: 'tita',
            question: 'Simplify: (a + b)² - (a - b)²',
            correct: '4ab',
            solution: '(a²+2ab+b²) - (a²-2ab+b²) = 4ab.'
          }
        ]
      },
      {
        id: 'linear-equations',
        title: 'Linear Equations',
        content: (
          <div className="space-y-6 text-gray-800 dark:text-gray-200">
            <WhyCATCares>
              Linear equations are the workhorse of word problems — ages, mixtures, costs. Understanding when a system has no solution or infinite solutions is tested directly.
            </WhyCATCares>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Systems of Equations</h2>

            <HowToSpot>
              Look for: two unknowns with two conditions, "find x and y such that," age problems, cost-allocation problems.
            </HowToSpot>

            <h3 className="text-xl font-semibold mt-6">Conditions for Solutions</h3>
            <div className="overflow-x-auto mt-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <table className="min-w-full bg-white dark:bg-gray-800">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="py-3 px-4 text-left border-b">Condition</th>
                    <th className="py-3 px-4 text-left border-b">Meaning</th>
                    <th className="py-3 px-4 text-left border-b">Solutions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b"><td className="py-3 px-4"><InlineMath math="\frac{a_1}{a_2} \neq \frac{b_1}{b_2}" /></td><td className="py-3 px-4">Intersecting</td><td className="py-3 px-4 font-semibold text-emerald-600">Unique</td></tr>
                  <tr className="border-b"><td className="py-3 px-4"><InlineMath math="\frac{a_1}{a_2} = \frac{b_1}{b_2} = \frac{c_1}{c_2}" /></td><td className="py-3 px-4">Coincident</td><td className="py-3 px-4 font-semibold text-blue-600">Infinite</td></tr>
                  <tr><td className="py-3 px-4"><InlineMath math="\frac{a_1}{a_2} = \frac{b_1}{b_2} \neq \frac{c_1}{c_2}" /></td><td className="py-3 px-4">Parallel</td><td className="py-3 px-4 font-semibold text-red-600">None</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        ),
        quiz: [
          {
            id: 1, type: 'mcq',
            question: 'For what value of k will 3x + 4y = 5 and 6x + ky = 15 have no solution?',
            options: ['6', '8', '12', '4'], correct: 1,
            solution: '3/6 = 4/k ≠ 5/15. So 1/2 = 4/k → k = 8.'
          }
        ]
      },
      {
        id: 'quadratic-equations',
        title: 'Quadratic Equations',
        content: (
          <div className="space-y-6 text-gray-800 dark:text-gray-200">
            <WhyCATCares>
              Quadratics appear in ~2–3 questions per CAT. Vieta's formulas (sum and product of roots) save massive time — you can answer without finding the actual roots.
            </WhyCATCares>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Polynomials of Degree 2</h2>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex justify-center mt-2">
              <BlockMath math="x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}" />
            </div>

            <HowToSpot>
              Look for: "roots of the equation," "sum/product of roots," "nature of roots," "form a new equation whose roots are..."
            </HowToSpot>

            <h3 className="text-xl font-semibold mt-6">Discriminant</h3>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li><InlineMath math="\Delta > 0" />: Two distinct real roots</li>
              <li><InlineMath math="\Delta = 0" />: Two equal real roots</li>
              <li><InlineMath math="\Delta < 0" />: No real roots (complex)</li>
            </ul>

            <Shortcut>
              <strong>Vieta's Formulas:</strong> Sum of roots = <InlineMath math="-b/a" />, Product = <InlineMath math="c/a" />.
              <br /><em>Trigger: Use when the question asks about roots without requiring you to find them.</em>
            </Shortcut>
          </div>
        ),
        quiz: [
          {
            id: 1, type: 'tita',
            question: 'If the roots of x² - px + 8 = 0 are equal, find the positive value of p. (Give answer as a decimal rounded to 2 places)',
            correct: '5.66',
            solution: 'Δ = 0: p² - 32 = 0, p = √32 = 4√2 ≈ 5.66.'
          }
        ]
      },
      {
        id: 'inequalities',
        title: 'Inequalities & Modulus',
        content: (
          <div className="space-y-6 text-gray-800 dark:text-gray-200">
            <WhyCATCares>
              Inequality and modulus questions are CAT favorites because they test conceptual understanding, not calculation speed. Understanding the "sign-flip" rule and interval method is essential.
            </WhyCATCares>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Ranges and Absolute Values</h2>

            <HowToSpot>
              Look for: "solve the inequality," "find the range of x," "|expression| = value," "number of integer solutions."
            </HowToSpot>

            <h3 className="text-xl font-semibold mt-6">Key Rules</h3>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Adding/subtracting preserves inequality direction</li>
                <li><strong>Multiplying/dividing by a negative number FLIPS the inequality</strong></li>
                <li><InlineMath math="|x| = a \Rightarrow x = \pm a" /> (for a ≥ 0)</li>
                <li><InlineMath math="|x| < a \Rightarrow -a < x < a" /></li>
                <li><InlineMath math="|x| > a \Rightarrow x < -a \text{ or } x > a" /></li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold mt-6">Wavy Curve Method (Quadratic Inequalities)</h3>
            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border-l-4 border-emerald-500">
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Factor the expression</li>
                <li>Find critical points (roots)</li>
                <li>Plot on number line</li>
                <li>Sign alternates between regions (positive → negative → positive)</li>
              </ol>
            </div>

            <CommonTraps>
              For <InlineMath math="|x - 5| = 12" />, always write BOTH cases: x - 5 = 12 AND x - 5 = -12. Missing the negative case is the #1 error.
            </CommonTraps>
          </div>
        ),
        quiz: [
          {
            id: 1, type: 'mcq',
            question: 'The solution of |x - 2| < 3 is:',
            options: ['-1 < x < 5', 'x < -1 or x > 5', '-5 < x < 1', 'x < -5 or x > 1'], correct: 0,
            solution: '|x - 2| < 3 → -3 < x - 2 < 3 → -1 < x < 5.'
          },
          {
            id: 2, type: 'tita',
            question: 'Solve: x² - 5x + 6 < 0. Express answer as interval (a,b).',
            correct: '(2,3)',
            solution: '(x-2)(x-3) < 0. Critical points: 2, 3. Negative between roots: (2, 3).'
          }
        ]
      },
      {
        id: 'maxima-minima',
        title: 'Maxima & Minima',
        content: (
          <div className="space-y-6 text-gray-800 dark:text-gray-200">
            <WhyCATCares>
              "Find the maximum/minimum value" questions appear regularly. The quadratic vertex method handles most of them in under 30 seconds.
            </WhyCATCares>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Finding Extreme Values</h2>

            <HowToSpot>
              Look for: "maximum value of," "minimum value of," "largest area with given perimeter," any optimization.
            </HowToSpot>

            <h3 className="text-xl font-semibold mt-6">Quadratic Vertex Method</h3>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="font-medium">For <InlineMath math="ax^2 + bx + c" />:</p>
              <BlockMath math="\text{Vertex at } x = -\frac{b}{2a}" />
              <BlockMath math="\text{Extreme value} = c - \frac{b^2}{4a}" />
              <p className="text-sm mt-2">If a {'>'} 0: <strong>minimum</strong>; if a {'<'} 0: <strong>maximum</strong>.</p>
            </div>

            <Shortcut>
              <strong>For "x + y = constant, find max xy":</strong> Maximum product occurs when x = y (i.e., split equally).
              <br /><strong>For "xy = constant, find min (x + y)":</strong> Minimum sum occurs when x = y.
            </Shortcut>
          </div>
        ),
        quiz: [
          {
            id: 1, type: 'mcq',
            question: 'The maximum value of 5 - 2x - x² is:',
            options: ['5', '6', '7', '8'], correct: 1,
            solution: 'f(x) = -x² - 2x + 5. Vertex at x = -(-2)/(2×-1) = -1. f(-1) = -1 + 2 + 5 = 6.'
          },
          {
            id: 2, type: 'tita',
            question: 'If x + y = 10, find the maximum value of xy.',
            correct: '25',
            solution: 'Max product when x = y = 5. xy = 25.'
          }
        ]
      },
      {
        id: 'functions-graphs',
        title: 'Functions & Graphs',
        content: (
          <div className="space-y-6 text-gray-800 dark:text-gray-200">
            <WhyCATCares>
              Function questions test whether you can think abstractly. "Find f(f(x))" or "number of solutions" questions are increasingly common in CAT.
            </WhyCATCares>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Understanding Functions</h2>

            <HowToSpot>
              Look for: "f(x) = ..., find f(f(x))," "domain of," "number of real roots," graph-based questions.
            </HowToSpot>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-bold text-blue-700 dark:text-blue-400">Domain</h4>
                <p className="text-sm">All valid input values. Check for: division by zero, square roots of negatives.</p>
              </div>
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                <h4 className="font-bold text-emerald-700 dark:text-emerald-400">Range</h4>
                <p className="text-sm">All possible output values.</p>
              </div>
            </div>

            <Shortcut>
              <strong>For inverse functions:</strong> swap x and y, then solve for y. If f(x) = 2x + 3, then f⁻¹(x) = (x - 3)/2.
            </Shortcut>
          </div>
        ),
        quiz: [
          {
            id: 1, type: 'mcq',
            question: 'The domain of f(x) = √(x - 2) is:',
            options: ['x ≥ 2', 'x > 2', 'x ≤ 2', 'All real numbers'], correct: 0,
            solution: 'For √(x-2) to be defined, x - 2 ≥ 0, so x ≥ 2.'
          },
          {
            id: 2, type: 'tita',
            question: 'If f(x) = 2x + 3, find f⁻¹(7).',
            correct: '2',
            solution: 'f⁻¹(x) = (x - 3)/2. f⁻¹(7) = (7 - 3)/2 = 2.'
          }
        ]
      },
      {
        id: 'logarithms',
        title: 'Logarithms & Indices',
        content: (
          <div className="space-y-6 text-gray-800 dark:text-gray-200">
            <WhyCATCares>
              Logarithm questions appear 1–2 times per CAT. They look scary but are just 4 properties applied repeatedly. Master those and you'll solve them in 60 seconds.
            </WhyCATCares>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Logarithms & Exponents</h2>

            <HowToSpot>
              Look for: "log," "simplify," "if log₁₀ 2 = 0.301, find...," expressions with exponents that need simplification.
            </HowToSpot>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <BlockMath math="\log_b a = c \iff b^c = a" />
            </div>

            <h3 className="text-xl font-semibold mt-6">The 4 Properties You Need</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                <p className="font-bold">Product: <InlineMath math="\log(mn) = \log m + \log n" /></p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <p className="font-bold">Quotient: <InlineMath math="\log(m/n) = \log m - \log n" /></p>
              </div>
              <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <p className="font-bold">Power: <InlineMath math="\log(m^n) = n \log m" /></p>
              </div>
              <div className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-lg">
                <p className="font-bold">Base Change: <InlineMath math="\log_b a = \frac{\log a}{\log b}" /></p>
              </div>
            </div>

            <h3 className="text-xl font-semibold mt-6">Laws of Indices</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <BlockMath math="a^m \times a^n = a^{m+n}" />
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <BlockMath math="(a^m)^n = a^{mn}" />
              </div>
            </div>

            <Shortcut>
              <strong>Rationalization:</strong> <InlineMath math="\frac{1}{\sqrt{a} + \sqrt{b}} = \frac{\sqrt{a} - \sqrt{b}}{a - b}" />
              <br />Multiply by conjugate. This comes up in surd simplification problems.
            </Shortcut>
          </div>
        ),
        quiz: [
          {
            id: 1, type: 'mcq',
            question: 'The value of log₂ 8 is:',
            options: ['2', '3', '4', '8'], correct: 1,
            solution: 'log₂ 8 = log₂ 2³ = 3.'
          },
          {
            id: 2, type: 'mcq',
            question: 'If log₁₀ 2 = 0.301, then log₁₀ 5 is:',
            options: ['0.699', '0.5', '0.7', '0.6'], correct: 0,
            solution: 'log₁₀ 5 = log₁₀(10/2) = 1 - 0.301 = 0.699.'
          }
        ]
      }
    ]
  },

  // =====================================================================
  // MODULE 5: GEOMETRY & MENSURATION (Trigonometry REMOVED)
  // =====================================================================
  {
    id: 'geometry-mensuration',
    title: 'Geometry & Mensuration',
    topics: [
      {
        id: 'triangles',
        title: 'Triangles',
        content: (
          <div className="space-y-6 text-gray-800 dark:text-gray-200">
            <WhyCATCares>
              Triangles are the most tested geometry shape. Similarity ratios and Pythagoras alone can solve 70% of geometry questions.
            </WhyCATCares>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Triangles: Properties & Theorems</h2>

            <HowToSpot>
              Look for: right triangles, "ratio of areas," parallel lines cutting triangles, medians/altitudes.
            </HowToSpot>

            <h3 className="text-xl font-semibold mt-6">Pythagoras Theorem</h3>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-l-4 border-purple-500">
              <BlockMath math="a^2 + b^2 = c^2" />
              <p className="text-sm mt-2">Common triplets: (3,4,5), (5,12,13), (8,15,17), (7,24,25). Memorize these!</p>
            </div>

            <h3 className="text-xl font-semibold mt-6">Similar Triangles</h3>
            <Shortcut>
              In similar triangles: <strong>Ratio of areas = square of ratio of sides.</strong>
              <br />If sides are in ratio 2:3, areas are in ratio 4:9.
            </Shortcut>

            <h3 className="text-xl font-semibold mt-6">Thales Theorem (Basic Proportionality)</h3>
            <p>If DE ∥ BC in △ABC, then AD/DB = AE/EC.</p>

            <h3 className="text-xl font-semibold mt-6">Special Points</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { name: 'Centroid', desc: 'Medians meet. Divides median 2:1' },
                { name: 'Incenter', desc: 'Angle bisectors. Center of inscribed circle' },
                { name: 'Circumcenter', desc: '⟂ bisectors. Center of circumscribed circle' },
                { name: 'Orthocenter', desc: 'Altitudes meet' }
              ].map(point => (
                <div key={point.name} className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg text-center">
                  <p className="font-semibold text-sm">{point.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{point.desc}</p>
                </div>
              ))}
            </div>

            <CommonTraps>
              <strong>30-60-90 triangle:</strong> sides are in ratio 1 : √3 : 2.
              <br /><strong>45-45-90 triangle:</strong> sides are in ratio 1 : 1 : √2.
              <br />These replace all trigonometry you'll ever need for CAT.
            </CommonTraps>
          </div>
        ),
        quiz: [
          {
            id: 1, type: 'mcq',
            question: 'In a right triangle with legs 6 cm and 8 cm, the hypotenuse is:',
            options: ['10 cm', '12 cm', '14 cm', '16 cm'], correct: 0,
            solution: 'c² = 6² + 8² = 100. c = 10 cm.'
          },
          {
            id: 2, type: 'mcq',
            question: 'The centroid divides each median in the ratio:',
            options: ['1:1', '2:1', '3:1', '1:2'], correct: 1,
            solution: '2:1 from vertex to midpoint.'
          }
        ]
      },
      {
        id: 'circles',
        title: 'Circles',
        content: (
          <div className="space-y-6 text-gray-800 dark:text-gray-200">
            <WhyCATCares>
              Circle questions test tangent properties and cyclic quadrilaterals. The "tangent ⟂ radius" property alone solves half of all circle problems.
            </WhyCATCares>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Circle Properties</h2>

            <HowToSpot>
              Look for: tangent lines, chords, "inscribed angle," "cyclic quadrilateral," two circles touching.
            </HowToSpot>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <BlockMath math="A = \pi r^2" />
              </div>
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                <BlockMath math="C = 2\pi r" />
              </div>
            </div>

            <h3 className="text-xl font-semibold mt-6">Key Properties</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Tangent ⟂ radius at point of contact</li>
              <li>Two tangents from an external point are equal in length</li>
              <li>Angle in a semicircle = 90°</li>
              <li>Cyclic quadrilateral: opposite angles sum to 180°</li>
            </ul>

            <Shortcut>
              <strong>Tangent-radius right triangle:</strong> If OP = distance from center to external point, OA = radius, PA = tangent length, then PA² = OP² - OA² (Pythagoras).
            </Shortcut>
          </div>
        ),
        quiz: [
          {
            id: 1, type: 'tita',
            question: 'Two tangents from point P to a circle with center O. If OP = 10 cm and radius = 6 cm, find tangent length.',
            correct: '8',
            solution: 'PA² = OP² - OA² = 100 - 36 = 64. PA = 8 cm.'
          },
          {
            id: 2, type: 'mcq',
            question: 'In cyclic quadrilateral ABCD, if ∠A = 70°, what is ∠C?',
            options: ['70°', '110°', '120°', '90°'], correct: 1,
            solution: 'Opposite angles sum to 180°. ∠C = 180° - 70° = 110°.'
          }
        ]
      },
      {
        id: 'polygons',
        title: 'Polygons',
        content: (
          <div className="space-y-6 text-gray-800 dark:text-gray-200">
            <WhyCATCares>
              Polygon questions are usually formula-based and quick. Know the angle and diagonal formulas and you'll solve them in 20 seconds.
            </WhyCATCares>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Polygon Properties</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-bold">Sum of Interior Angles</h4>
                <BlockMath math="(n-2) \times 180°" />
              </div>
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                <h4 className="font-bold">Each Interior Angle (Regular)</h4>
                <BlockMath math="\frac{(n-2) \times 180°}{n}" />
              </div>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg mt-4">
              <h4 className="font-bold">Number of Diagonals</h4>
              <BlockMath math="\frac{n(n-3)}{2}" />
            </div>

            <Shortcut>
              <strong>Exterior angle of a regular polygon = 360°/n.</strong> If you're given the exterior angle, just divide 360 by it to get n.
            </Shortcut>
          </div>
        ),
        quiz: [
          {
            id: 1, type: 'mcq',
            question: 'Sum of interior angles of a hexagon?',
            options: ['540°', '720°', '900°', '1080°'], correct: 1,
            solution: '(6-2) × 180° = 720°.'
          },
          {
            id: 2, type: 'tita',
            question: 'How many diagonals does a decagon have?',
            correct: '35',
            solution: '10(10-3)/2 = 35.'
          }
        ]
      },
      {
        id: 'mensuration-2d',
        title: 'Mensuration (2D)',
        content: (
          <div className="space-y-6 text-gray-800 dark:text-gray-200">
            <WhyCATCares>
              Area and perimeter calculations are the most straightforward geometry questions. Know the formulas, get free marks.
            </WhyCATCares>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Areas & Perimeters</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'Triangle', area: '½ × base × height', extra: "Heron's: √[s(s-a)(s-b)(s-c)]" },
                { name: 'Circle', area: 'πr²', extra: 'Circumference = 2πr' },
                { name: 'Rectangle', area: 'l × b', extra: 'Diagonal = √(l²+b²)' },
                { name: 'Trapezium', area: '½ × (a+b) × h', extra: 'a, b are parallel sides' },
              ].map(shape => (
                <div key={shape.name} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                  <h4 className="font-bold text-blue-600 dark:text-blue-400 mb-2">{shape.name}</h4>
                  <p className="text-sm">Area = {shape.area}</p>
                  <p className="text-sm text-gray-500">{shape.extra}</p>
                </div>
              ))}
            </div>

            <Shortcut>
              <strong>Equilateral triangle area:</strong> <InlineMath math="\frac{\sqrt{3}}{4} a^2" />. No need for Heron's formula here.
            </Shortcut>
          </div>
        ),
        quiz: [
          {
            id: 1, type: 'mcq',
            question: 'Area of triangle with sides 13, 14, 15 cm:',
            options: ['84 cm²', '90 cm²', '96 cm²', '100 cm²'], correct: 0,
            solution: 's = 21. Area = √(21×8×7×6) = √7056 = 84 cm².'
          }
        ]
      },
      {
        id: 'mensuration-3d',
        title: 'Mensuration (3D)',
        content: (
          <div className="space-y-6 text-gray-800 dark:text-gray-200">
            <WhyCATCares>
              3D mensuration questions are usually about "melting and recasting" (volume stays constant) or "painting" (surface area). Know 5 shapes and you're set.
            </WhyCATCares>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Volume & Surface Area</h2>

            <HowToSpot>
              Look for: "volume of," "surface area of," "melted and recast into," "water rises by X cm when object is submerged."
            </HowToSpot>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-bold">Cube: V = a³, TSA = 6a²</h4>
              </div>
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                <h4 className="font-bold">Cuboid: V = lbh, TSA = 2(lb+bh+hl)</h4>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <h4 className="font-bold">Cylinder: V = πr²h, TSA = 2πr(r+h)</h4>
              </div>
              <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <h4 className="font-bold">Cone: V = ⅓πr²h, l = √(r²+h²)</h4>
              </div>
              <div className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-lg">
                <h4 className="font-bold">Sphere: V = 4/3 πr³, SA = 4πr²</h4>
              </div>
            </div>

            <Shortcut>
              <strong>Scaling rule:</strong> If dimensions are multiplied by k:
              <ul className="list-disc list-inside mt-1">
                <li>Area scales by k²</li>
                <li>Volume scales by k³</li>
              </ul>
              So if radius doubles, volume becomes 8× (2³ = 8).
            </Shortcut>

            <CommonTraps>
              When combining shapes (e.g., hemisphere on top of cylinder), don't double-count the shared circular face in surface area.
            </CommonTraps>
          </div>
        ),
        quiz: [
          {
            id: 1, type: 'tita',
            question: 'If the radius of a sphere is doubled, by what factor does its volume increase?',
            correct: '8',
            solution: 'Volume = 4/3πr³. If r → 2r, volume → 4/3π(2r)³ = 8 × original. Factor = 8.'
          }
        ]
      }
    ]
  },

  // =====================================================================
  // MODULE 6: MODERN MATHEMATICS (Bayes' & Derangements REMOVED)
  // =====================================================================
  {
    id: 'modern-mathematics',
    title: 'Modern Mathematics',
    topics: [
      {
        id: 'permutations-combinations',
        title: 'Permutations & Combinations',
        content: (
          <div className="space-y-6 text-gray-800 dark:text-gray-200">
            <WhyCATCares>
              P&C appears in 1–2 questions per CAT. The key skill is deciding: "Does order matter?" If yes → Permutation. If no → Combination.
            </WhyCATCares>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Counting Principles</h2>

            <HowToSpot>
              Look for: "how many ways," "in how many arrangements," "select a committee," "form a number."
            </HowToSpot>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border-l-4 border-emerald-500">
                <h3 className="font-bold">Permutations (Order matters)</h3>
                <BlockMath math="^nP_r = \frac{n!}{(n-r)!}" />
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-l-4 border-purple-500">
                <h3 className="font-bold">Combinations (Order doesn't matter)</h3>
                <BlockMath math="^nC_r = \frac{n!}{r!(n-r)!}" />
              </div>
            </div>

            <Shortcut>
              <strong>Circular permutations = (n-1)!</strong>
              <br /><em>Trigger: Use when people sit around a round table (one person is "fixed" as reference).</em>
            </Shortcut>

            <CommonTraps>
              <strong>Repeated objects:</strong> The word MISSISSIPPI has 11 letters but only 11!/(4!4!2!) distinct arrangements because letters repeat.
            </CommonTraps>
          </div>
        ),
        quiz: [
          {
            id: 1, type: 'mcq',
            question: 'How many ways can 5 people be arranged in a row?',
            options: ['20', '60', '120', '240'], correct: 2,
            solution: '5! = 120.'
          },
          {
            id: 2, type: 'tita',
            question: 'In how many ways can a committee of 3 be selected from 8 people?',
            correct: '56',
            solution: 'C(8,3) = 56.'
          },
          {
            id: 3, type: 'mcq',
            question: 'How many ways can 6 people sit around a circular table?',
            options: ['120', '720', '60', '360'], correct: 0,
            solution: '(6-1)! = 5! = 120.'
          }
        ]
      },
      {
        id: 'probability',
        title: 'Probability',
        content: (
          <div className="space-y-6 text-gray-800 dark:text-gray-200">
            <WhyCATCares>
              Probability questions in CAT are straightforward if you think systematically. The complement rule ("at least one" = 1 - P(none)) is the most useful trick.
            </WhyCATCares>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Probability Theory</h2>

            <HowToSpot>
              Look for: "probability of," "likelihood," "at least one," "both events," dice/coin/card problems.
            </HowToSpot>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <BlockMath math="P(E) = \frac{\text{Favorable outcomes}}{\text{Total outcomes}}" />
            </div>

            <h3 className="text-xl font-semibold mt-6">Key Formulas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                <h4 className="font-bold">Independent Events</h4>
                <BlockMath math="P(A \cap B) = P(A) \times P(B)" />
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <h4 className="font-bold">Conditional Probability</h4>
                <BlockMath math="P(A|B) = \frac{P(A \cap B)}{P(B)}" />
              </div>
            </div>

            <Shortcut>
              <strong>The Complement Rule:</strong> P(at least one) = 1 - P(none).
              <br /><em>Trigger: Whenever you see "at least one," calculate the probability of zero occurrences and subtract from 1.</em>
            </Shortcut>
          </div>
        ),
        quiz: [
          {
            id: 1, type: 'mcq',
            question: 'A die is rolled. Probability of getting an even number?',
            options: ['1/6', '1/3', '1/2', '2/3'], correct: 2,
            solution: 'Even: 2, 4, 6. P = 3/6 = 1/2.'
          },
          {
            id: 2, type: 'mcq',
            question: 'P(A) = 0.4, P(B) = 0.5, A and B independent. P(A ∩ B)?',
            options: ['0.9', '0.2', '0.1', '0.3'], correct: 1,
            solution: '0.4 × 0.5 = 0.2.'
          }
        ]
      },
      {
        id: 'set-theory-venn',
        title: 'Set Theory & Venn Diagrams',
        content: (
          <div className="space-y-6 text-gray-800 dark:text-gray-200">
            <WhyCATCares>
              Venn diagram questions appear in both QA and DILR. The 3-set formula is especially important — master it once, use it everywhere.
            </WhyCATCares>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Set Theory & Venn Diagrams</h2>

            <HowToSpot>
              Look for: "how many belong to at least one," "exactly two groups," "none of the above," overlapping categories.
            </HowToSpot>

            <h3 className="text-xl font-semibold mt-6">Inclusion-Exclusion</h3>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-l-4 border-purple-500">
              <p className="font-medium">Two sets:</p>
              <BlockMath math="|A \cup B| = |A| + |B| - |A \cap B|" />
              <p className="font-medium mt-2">Three sets:</p>
              <BlockMath math="|A \cup B \cup C| = |A| + |B| + |C| - |A \cap B| - |B \cap C| - |C \cap A| + |A \cap B \cap C|" />
            </div>

            <Shortcut>
              <strong>Always fill Venn diagrams from the CENTER outward.</strong> Start with the "all three" region, then "exactly two," then "only one."
            </Shortcut>
          </div>
        ),
        quiz: [
          {
            id: 1, type: 'mcq',
            question: 'In a class of 40, 25 play cricket, 20 play football, 10 play both. How many play neither?',
            options: ['5', '10', '15', '20'], correct: 0,
            solution: '|C ∪ F| = 25 + 20 - 10 = 35. Neither = 40 - 35 = 5.'
          }
        ]
      },
      {
        id: 'sequences-progressions',
        title: 'Sequences & Progressions',
        content: (
          <div className="space-y-6 text-gray-800 dark:text-gray-200">
            <WhyCATCares>
              AP and GP questions are formula-driven and quick. The infinite GP sum formula is especially useful for recurring decimal conversions and advanced problems.
            </WhyCATCares>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">AP, GP & HP</h2>

            <HowToSpot>
              Look for: "constant difference" (AP), "constant ratio" (GP), "sum of series," "infinite sum."
            </HowToSpot>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-bold">AP</h4>
                <p className="text-sm">nth term: <InlineMath math="a + (n-1)d" /></p>
                <p className="text-sm">Sum: <InlineMath math="\frac{n}{2}[2a + (n-1)d]" /></p>
              </div>
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                <h4 className="font-bold">GP</h4>
                <p className="text-sm">nth term: <InlineMath math="ar^{n-1}" /></p>
                <p className="text-sm">Sum: <InlineMath math="\frac{a(r^n - 1)}{r - 1}" /></p>
                <p className="text-sm">Infinite (|r| {'<'} 1): <InlineMath math="\frac{a}{1-r}" /></p>
              </div>
            </div>

            <Shortcut>
              <strong>HP shortcut:</strong> If a, b, c are in HP, then 1/a, 1/b, 1/c are in AP. Convert and solve.
              <br /><strong>AP quick sum:</strong> Sum = (number of terms / 2) × (first + last).
            </Shortcut>
          </div>
        ),
        quiz: [
          {
            id: 1, type: 'mcq',
            question: 'The 10th term of AP: 2, 5, 8, 11, ...',
            options: ['29', '32', '35', '38'], correct: 0,
            solution: 'a₁₀ = 2 + 9×3 = 29.'
          },
          {
            id: 2, type: 'mcq',
            question: 'Sum of infinite GP: 1, 1/2, 1/4, 1/8, ...',
            options: ['1', '2', '3', '4'], correct: 1,
            solution: 'S∞ = 1/(1-1/2) = 2.'
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