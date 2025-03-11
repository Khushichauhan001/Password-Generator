import { useState , useCallback, useEffect, useRef} from 'react'
// import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed , setNumberAllowed] = useState(false);
  const [charAllowed , setCharAllowed] = useState(true);
  const [password , setPassword] = useState("")   // it is used kyuki isme bhi toh state chnge hogi har br new password generate krne k lie 

  //useRef hook
  const passwordRef = useRef(null)


  // password generator 
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"  // isme wo data aayga jo use hoa password bnane m 
    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*_-+={}[]~`"


//copy to keyboard (firstly select the portion , then range ki kitna copy krna h .. and also access of keyboard )
          for(let i=1 ; i<= length ; i++){
          let char = Math.floor(Math.random() * str.length )
          pass += str.charAt(char) // loop khtm hote hi pass m value aajygi .. but sirf value aaygi ..read ni hogi uske lie setpassword m s pass value pass krni hogi  
        }

        setPassword(pass)  // it read the password 
}, [length , numberAllowed , charAllowed , setPassword])  // useCallback(fn , dependencies)
// does not compare its dependencies with useeffect() depen... yha hum optimization k lie dependencies lga rhe h  .. memorization conceot aajyga yha ... ki memory  m rkho setpassword ko bhi o baki sbko 



const copyPasswordToClipboard = useCallback(() => {
  // doesnot need neeche bali ek line ... 
  passwordRef.current?.select() ;  // just to increase user experience in ui 
  passwordRef.current?.setSelectionRange(0,100);
  window.navigator.clipboard.writeText(password)
},[password])

  // method to generate password 
  // ek method ho skta h ki button bnaye or fir usme function call krde 
  // second methd can be ki aap hook bnA SKTE H (useEffect hook)

  
 useEffect(() => {
  passwordGenerator()
},[length , numberAllowed , charAllowed , passwordGenerator])  // or yha hum islie lga rhe h ki kuch bhi chnges ho toh dubara s run ho code 



  return (
    
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-black
     bg-gray-700">

      <h1 className='text-4xl text-center text-white my-3'> PASSWORD GENERATOR</h1>

      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
         type="text"
         value={password}
         className="outline-none w-full py-1 px-3" placeholder="Password" readOnly
         ref={passwordRef}
        />

        <button 
        onClick={copyPasswordToClipboard }
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' > copy </button>
    </div>

    <div className='flex text-sm gap-x-2'>
    <div className='flex items-center gap-x-1'>
      <input 
      type="range"
       min={5}
       max={100}
       value={length} 
       className='cursor-pointer '
       onChange={(e) =>{setLength(e.target.value)}}
       />
       <label> Length: {length} </label>
    </div>

    <div className='flex items-center gap-x-1'>
      <input
        type='checkbox' 
        defaultChecked={numberAllowed}
        id="numberInput"
        onChange={() => {
          setNumberAllowed((prev) => !prev);   // prev value se reverse krdo true or false 
        }}
      />
      <label htmlFor='numberInput'>Numbers</label>
       </div>

       <div className=' flex items-center gap-x-1'>
        <input 
        type='checkbox'
        defaultChecked={charAllowed}
        id='characterInput'
        onChange={() => {
          setCharAllowed((prev) => !prev);  // callback fire it gives us new value opposite to last value 
        }}
        />
        <label htmlFor="characterInput">Characters</label>
       </div>
 </div> 
 </div>
  )
}

export default App
