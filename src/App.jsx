import { useState, useCallback,useEffect,useRef } from 'react'



function App() {
  const [length, setlength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass+= str.charAt(char)
    }

    setPassword(pass)


  }, [length, numberAllowed, charAllowed, setPassword])

  
   useEffect(() => {
passwordGenerator()
   } ,[length, numberAllowed, charAllowed,passwordGenerator])
  return (
   
      <>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
          <div className="w-full max-w-md mx-auto shadow-lg rounded-lg px-6 py-8 bg-gray-800 text-orange-500">
            <h1 className="text-2xl font-bold text-white text-center mb-6">Password Generator</h1>
            <div className="w-full flex shadow-md rounded-lg overflow-hidden mb-6 bg-gray-700">
              <input
                type="text"
                value={password}
                className="outline-none w-full py-2 px-4 bg-gray-800 text-white placeholder-gray-500"
                placeholder="Generated password"
                readOnly
                ref={passwordRef}
              />
              <button
                className="bg-orange-500 text-white px-4 py-2 hover:bg-orange-600 transition duration-200"
                onClick={() => navigator.clipboard.writeText(password)}
              >
                Copy
              </button>
            </div>
            <div className="flex flex-col gap-y-4 text-sm">
              <div className="flex items-center gap-x-2">
                <input
                  type="range"
                  min={6}
                  max={100}
                  value={length}
                  className="cursor-pointer w-full accent-orange-500"
                  onChange={(e) => setlength(e.target.value)}
                />
                <label className="text-white">Length: {length}</label>
              </div>
              <div className="flex items-center gap-x-2">
                <input
                  type="checkbox"
                  defaultChecked={numberAllowed}
                  id="numberInput"
                  className="accent-orange-500"
                  onChange={() => setNumberAllowed((prev) => !prev)}
                />
                <label htmlFor="numberInput" className="text-white">
                  Include Numbers
                </label>
              </div>
              <div className="flex items-center gap-x-2">
                <input
                  type="checkbox"
                  defaultChecked={charAllowed}
                  id="characterInput"
                  className="accent-orange-500"
                  onChange={() => setCharAllowed((prev) => !prev)}
                />
                <label htmlFor="characterInput" className="text-white">
                  Include Special Characters
                </label>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default App
