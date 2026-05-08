import { useState } from 'react';
import { Graph3D } from './components/Graph3D';
import { MathFormula } from './components/MathFormula';
import { concepts } from './data/concepts';
import { BookOpen, FunctionSquare, Info } from 'lucide-react';

function App() {
  const [activeConceptId, setActiveConceptId] = useState(concepts[0].id);
  const activeConcept = concepts.find(c => c.id === activeConceptId) || concepts[0];

  return (
    <div className="flex h-screen w-full bg-gray-950 text-gray-100 overflow-hidden font-sans">
      
      {/* Sidebar */}
      <div className="w-80 border-r border-gray-800 bg-gray-900 flex flex-col h-full z-20 shadow-xl">
        <div className="p-6 border-b border-gray-800 bg-gray-950">
          <h1 className="text-xl font-bold flex items-center gap-2 text-blue-400">
            <FunctionSquare size={24} />
            二元函数性质可视化
          </h1>
          <p className="text-sm text-gray-400 mt-2">
            学习极限、连续、可导、可微与偏导数的关系
          </p>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <div className="px-4 pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            学习路径 (Concepts)
          </div>
          <ul className="space-y-1 px-2">
            {concepts.map((concept) => (
              <li key={concept.id}>
                <button
                  onClick={() => setActiveConceptId(concept.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
                    activeConceptId === concept.id
                      ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
                      : 'hover:bg-gray-800 text-gray-400 hover:text-gray-200 border border-transparent'
                  }`}
                >
                  <div className="font-medium text-sm">{concept.title}</div>
                  <div className="text-xs opacity-70 mt-1 truncate">{concept.subtitle}</div>
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="p-4 border-t border-gray-800 text-xs text-gray-500">
          提示：可以在右侧拖动旋转或缩放3D图形以观察细节。
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full bg-black relative">
        
        {/* Graph Area (Top Half) */}
        <div className="flex-1 min-h-[50%] relative">
          <Graph3D 
            key={activeConcept.id}
            func={activeConcept.func}
            domain={activeConcept.domain}
            resolution={activeConcept.resolution}
            title={`z = ${activeConcept.formula}`}
          />
        </div>

        {/* Info Area (Bottom Half) */}
        <div className="h-[45%] border-t border-gray-800 bg-gray-900 overflow-y-auto p-8 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">{activeConcept.title}</h2>
                <div className="text-blue-400 text-sm font-medium">{activeConcept.subtitle}</div>
              </div>
              <div className="bg-gray-800 px-4 py-2 rounded-lg border border-gray-700">
                <MathFormula math={activeConcept.formula} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-gray-300 font-semibold mb-2">
                  <Info size={18} className="text-blue-400" />
                  概念解释
                </div>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {activeConcept.description}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-gray-300 font-semibold mb-2">
                  <BookOpen size={18} className="text-blue-400" />
                  关键推导与结论
                </div>
                <ul className="space-y-3">
                  {activeConcept.points.map((point, index) => (
                    <li key={index} className="flex gap-3 text-sm text-gray-400 bg-gray-950/50 p-3 rounded-lg border border-gray-800/50">
                      <span className="text-blue-500 font-bold shrink-0">{index + 1}.</span>
                      <span className="leading-relaxed">
                        {/* We need to parse inline math in the point string */}
                        {point.split(/(\$[^$]+\$)/g).map((part, i) => {
                          if (part.startsWith('$') && part.endsWith('$')) {
                            return <MathFormula key={i} math={part.slice(1, -1)} />;
                          }
                          return <span key={i}>{part}</span>;
                        })}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
