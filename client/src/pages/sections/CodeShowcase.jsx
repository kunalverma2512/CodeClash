import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const cppCode = `#include <iostream>
#include <stack>
#include <unordered_map>
using namespace std;

bool isValid(string s) {
    stack<char> stk;
    unordered_map<char, char> match = {
        {')', '('},
        {']', '['},
        {'}', '{'}
    };

    for (char c : s) {
        if (c == '(' || c == '[' || c == '{') {
            stk.push(c);
        } else {
            if (stk.empty() || stk.top() != match[c]) return false;
            stk.pop();
        }
    }

    return stk.empty();
}

int main() {
    cout << boolalpha << isValid("[{()}]{}") << endl; // true
    cout << boolalpha << isValid("[(])") << endl;     // false
    return 0;
}
`;

const CodingShowcase = () => {
  return (
    <section className="w-full min-h-screen bg-gray-900 py-12 px-6 flex items-center justify-center">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Question Panel */}
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-300 mb-4">
            🧠 Problem: "Balanced Brackets"
          </h2>
          <p className="text-gray-800 dark:text-gray-300 mb-4">
            Given a string of brackets (<code>()</code>, <code>[]</code>,{" "}
            <code>{"{}"}</code>) determine whether the input string is valid. A
            string is valid if:
          </p>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-400 mb-4">
            <li>Open brackets are closed by the same type of brackets.</li>
            <li>Open brackets are closed in the correct order.</li>
          </ul>

          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <div>
              <strong>Input:</strong> <code>{'"[{()}]{}"'}</code>
            </div>
            <div>
              <strong>Output:</strong> <code>true</code>
            </div>
            <div>
              <strong>Input:</strong> <code>"[(])"</code>
            </div>
            <div>
              <strong>Output:</strong> <code>false</code>
            </div>
          </div>
        </div>

        {/* Code Editor */}
        <div className="bg-gray-950 text-white rounded-2xl shadow-xl p-6 font-mono overflow-auto text-sm h-[32rem]">
          <div className="flex items-center mb-4">
            <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
            <span className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></span>
            <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
            <span className="ml-4 text-gray-300">solution.cpp</span>
          </div>
          <SyntaxHighlighter
            language="cpp"
            style={dark}
            wrapLines={true}
            customStyle={{ background: "transparent", padding: 4 }}
          >
            {cppCode}
          </SyntaxHighlighter>
        </div>
      </div>
    </section>
  );
};

export default CodingShowcase;
