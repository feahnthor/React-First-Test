import React, {useState, useEffect} from 'react';




//funtional hooks
//--Jared i am using arrow functions in this example

const HookTest = props => {


  // Declare a new state variable, which we'll call "count"
  //["variable name", function name to call]
  //Hooks must contain "use" in the beginning of their names especially for custom hooks
  const [count, setCount] = useState(0)

  //Similar ot componentDidMount and componentDidUpdate:
  useEffect(() => {//Update document title using the browswer API
    document.title = `You click ${count} times`
    return () => {//cleanup, is the same as the method componentWillUnmount
      document.title = 'back to normal'
    }
  })
  return (
    <div>
      <p>You clickesddhsdflhhlfdhflid {count} {process.env.PUBLIC_URL} times</p>
      
      <img src={process.env.PUBLIC_URL + 'images/Retail-Public_300x300.png'} alt='test'/>
      <button
        type="button"
        className={"btn btn-primary"}
        onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  )
}


export {HookTest};