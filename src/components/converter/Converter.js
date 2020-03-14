import React, { Component }  from 'react'
import Selector from './../selector/Selector'
import "./converter.css"

class Converter extends Component {
   convert() {
      console.log("converting");
   }

   render () {
      return (
         <div className="container container_converter">
            <div className="converter">
               <div className="converter__currencies">
                  <div className="converter__field">
                     <Selector id="cur-1" curnsies={this.props.curnsies} convert={this.convert} className="converter__selector" label="Bitcoin (BTC)"></Selector>
                  </div>
                  <div className="converter__field">
                     <Selector id="cur-2" curnsies={this.props.curnsies} convert={this.convert} className="converter__selector" label="Dollar (USD)"></Selector>
                  </div>
               </div>
               <div className="converter__inputs">
                  <div className="converter__field">
                     <input id="field-1" type="text" onChange={this.convert} className="converter__input" value="1" />
                  </div>
                  <div className="converter__field">
                     <input id="field-2" type="text" onChange={this.convert} className="converter__input" value="1"/>
                  </div>
               </div>      
            </div>
         </div>
      )
   }
}


export default Converter;