import React, { Component }  from 'react'
import Selector from './../selector/Selector'
import "./converter.css"

class Converter extends Component {
   constructor(props) {
      super(props);
      this.field1 = React.createRef();
      this.field2 = React.createRef();
      this.field1.current = 1;
      this.field2.current = this.findValue("BTC");
   }

   state = {
      from: this.findValue("BTC"),
      to: this.findValue("USD")
   }

   setCur = (id, cur) => {
      const val = this.findValue(cur);
      let from, to;

      if(id === "from"){
         id = "field-1";
         from = val;
         to = this.state.to;

         this.setState({ from: val });
      } else if(id === "to") {
         
         from = this.state.from; 
         to = val;
         id = "field-2";
         this.setState({ to: val });
      }

      const curs = this.orangeVars(id);
      curs[3].current = this.convert(from, to, curs[2].current).toFixed(4);
   }

   convert = (a, b, q) => {   
      return (a * q) / b;
   }

   orangeVars = (id) => {
      if(id === "field-1"){
         return [this.state.from, this.state.to, this.field1, this.field2, "field-2"];
      } else { 
         return [this.state.to, this.state.from, this.field2, this.field1, "field-1"];
      }
   }

   findValue(cur) {
      let ret;
      this.props.curs.forEach( el => {
         if(el[1] === cur){
            ret = el[3]
         }
      });
      return ret;
   }

   converter = (e) => {
      const curs = this.orangeVars(e.target.id);

      curs[3].current = this.convert(curs[0], curs[1], e.target.value).toFixed(4);
      curs[2].current = e.target.value;
      this.setState( { slave: curs[4]} );
   }

   render () {
      return (
         <div className="container container_converter">
            <div className="converter">
               <div className="converter__currencies">
                  <div className="converter__field">
                     <Selector 
                        id="from" 
                        curs={this.props.curs} 
                        setCur={this.setCur} 
                        className="converter__selector" 
                        label="Bitcoin (BTC)"
                        >
                     </Selector>
                  </div>
                  <div className="converter__field">
                     <Selector 
                        id="to" 
                        curs={this.props.curs} 
                        setCur={this.setCur} 
                        className="converter__selector" 
                        label="Dollar (USD)">   
                     </Selector>
                  </div>
               </div>
               <div className="converter__inputs">
                  <div className="converter__field">
                     <input id="field-1" type="text" onChange={this.converter} className="converter__input" value={this.field1.current} />
                  </div>
                  <div className="converter__field">
                     <input id="field-2" type="text" onChange={this.converter} className="converter__input" value={this.field2.current} />
                  </div>
               </div>      
            </div>
         </div>
      )
   }
}

export default Converter;