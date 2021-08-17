import React from "react";
import {Link} from "react-router-dom";


class Aboutpage extends React.Component {
  constructor(props) {
    super(props); //props adds to
    this.state = { //state sets defaults
      brand: 'Chevy',
      model: 'Malibu',
      color: 'Black',
      license: 'IGX-621',
      year: 2014,
      type: 'primary',
      
    };
  }
  shouldComponentUpdate() { //https://www.w3schools.com/react/react_lifecycle.asp
    return true;
  }
  getSnapshotBeforeUpdate(preProps, prevState) { //Stores previous state of the component before update
    document.getElementById('div1').innerHTML = 
    'Before the update, the color was ' + prevState.color;
    return prevState;
  }
  componentDidUpdate() { //called after the update has been rendered in the DOM
    document.getElementById('div2').innerHTML =
    'The update color is ' + this.state.color
  }
  changeColor = () => {
    this.setState({color: 'Blue'});
    this.setState({type: 'success'})
  }

  render() {
    return (
      <div>
        <h1>My favorite color is {this.state.color}</h1>
        <button 
        type="button" 
        className={"btn btn-" + this.state.type}
        onClick={this.changeColor}
        >My Button</button>
        <div id='div1'></div>
        <div id='div2'></div>
        <Link  to='/'>Go to Aboutpage</Link>
        
      
      </div>
       
    );
  }
}
// const Aboutpage = () => {
//   return (
//     <div> 
//       <h1>Aboutpage</h1>
//       <Link  to='/'>Go to Aboutpage</Link>
//     </div>
//   )
// };

export default Aboutpage;