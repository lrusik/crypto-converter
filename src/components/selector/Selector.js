import React, { Component } from 'react'
import "./selector.css";

class Selector extends Component {
   constructor(props) {
      super(props);
      
      this.state = {
         lastLabel: this.props.label, 
         label: this.props.label, 
         curs : this.props.curs,
         available: {},
         dontShowPerm: [].concat(this.props.dontShow), 
         dontShow: [].concat(this.props.dontShow), 
         mark: 0
      }
      
   }

   static getDerivedStateFromProps(props, state) {
      if (props.curs !== state.curs) {
         return {
            curs: props.curs
         };
      }
      return null;
   }

   hideMenus = () => {
      const submenus = document.querySelectorAll(".select-submenu");
      submenus.forEach( (submenu) => {       
         submenu.style.display = "none"
         this.setState({label: this.state.lastLabel});
      });
   }

   menu = (e) => {
      const element = e.currentTarget.parentElement.parentElement;
      const submenu = element.querySelector(".select-submenu");
      const label = element.querySelector(".selector__label");

      if(
         submenu.style.display === "block" && 
         e.target.className !== "selector__label"
      ){
         submenu.style.display = "none";
         label.style.cursor = "pointer";
         this.setState({label: this.state.lastLabel});
      } else { 
         this.hideMenus();
         submenu.style.display = "block";   
         label.style.cursor = "text";
         label.focus();
         label.select(e);
      }
   }

   outsiteMenuEvent = (event) => {
      const selector_classes = [
         "selector__arrowwrapper", 
         "selector__arrow",
         "selector__label",
         "selector__select",
         "select selector"
      ];
      return selector_classes.includes(event);
   }

   componentDidMount() {
      document.addEventListener('click', (e) => {
         if(! this.outsiteMenuEvent(e.target.className) ){ 
            this.hideMenus();
         }
      });
   }

   changeInput = (e) => {
      this.setState( { label: e.target.value });
      this.search(e.target.value);
   }

   convertToLabel = (val) => {
      for(let item in this.props.curs) {
         if(
            item.includes(val.toUpperCase()) || 
            this.props.curs[item][0].toUpperCase().includes(val.toUpperCase())
         ){
            return this.state.curs[item][0] + " (" + item + ")"; 
         }
      }

      return null;
   }

   convertToCur = (val) => {
      for(let item in this.props.curs) {
         if(
            item.includes(val.toUpperCase()) || 
            this.props.curs[item][0].toUpperCase().includes(val.toUpperCase())
         ){
            return item; 
         }
      }

      return null;
   }

   select = (e) => {
      let val = e.target.value;
      
      if(!val)
         val = e.target.innerText;
      val = val.toUpperCase();
      const label = this.convertToLabel(val);
      const cur = this.convertToCur(val);

      if(label !== null) {
         const id = e.target.parentElement.parentElement.querySelector(".selector__label").id;
         
         this.props.setCur.bind(this, id, cur);
         this.props.setCur(id, cur);
         
         this.setState( { label: label, lastLabel: label });
      } else {
         this.setState( { label: this.state.lastLabel });
      }
   }

   hoverItem = (e) => {
      const items = document.querySelectorAll(".select-submenu__item");
      items.forEach( (item) => {
         item.classList.remove("select-submenu__item_active");      
      });
      e.target.classList.add("select-submenu__item_active");
      this.setState({label: e.target.innerText});
   }

   hoverItemOnArrow = (parent, pos) => {
      const items = parent.querySelectorAll('.select-submenu__item');
      let active = -1;
      let next;

      for (let i = 0; i < items.length; i++) {
         if(items[i].classList.contains("select-submenu__item_active")){  
            active = i;
            break;
         }
      }

      next = active + pos;
      if(active === -1 && pos > 0){
         next = 0;
      } else {
         items[active].classList.remove("select-submenu__item_active");

         if(active === 0 && pos < 0) {
            next = items.length - 1;
         } else if(active === items.length -1 && pos > 0) {
            next = 0;
         }
      }  

      items[next].classList.add("select-submenu__item_active");
      this.setState({label: items[next].innerText});
   }

   search = (val) => {
      let curs= [];
      
      if(val !== ""){

         for(let item in this.props.curs) {      
            if(!(
               item.includes(val.toUpperCase()) || 
               this.props.curs[item][0].toUpperCase().includes(val.toUpperCase())
            
            )){
               curs.push(item);
            };
         }

      }

      this.setState( {dontShow: this.state.dontShowPerm.concat(curs) } );
   }

   onKeyDown = (e) => {
      const parent = e.target.parentElement.parentElement;
      if(e.key === "Enter"){
         this.select(e);
         parent.querySelector(".select-submenu").style.display = "none";   
         
      } else if(e.key === "ArrowDown"){
         this.hoverItemOnArrow(parent, 1);
      } else if(e.key === "ArrowUp") {
         this.hoverItemOnArrow(parent, -1);
      } else if(e.key === "Escape"){
         document.querySelector(".select-submenu").style.display = "none";
         const lable = document.querySelector(".selector__label");
         lable.style.cursor = "pointer";
         lable.blur();
         this.setState({label: this.state.lastLabel});
      }
   }

   selectItem = (e) => { 
      this.select(e);
   }

   getField = (symbol) => {

      //here
      if(!(this.state.dontShow.includes(symbol))) {
         return (         
            <div
               className="select-submenu__item" 
               key={symbol} 
               onClick={this.selectItem} 
               onMouseEnter={this.hoverItem}
            >
               {this.state.curs[symbol][0] } ({symbol})
            </div>    
         );
      }
   }

   getFields = () => {
      let ret = [];
      for(let key in this.state.curs){ 
         if(!this.state.dontShow.includes(key)){
            try {
               ret.push(this.getField(key));
            } catch(err) {
               console.log(err);
            }
         }
      }
      return ret;
   }

   render() {
      return (
         <div className="select">
            <div className="select selector" onClick={this.menu}>
               <input className="selector__label" onChange={this.changeInput} onKeyDown={this.onKeyDown} id={this.props.id} value={this.state.label} />
               <div className="selector__select">
                  <div className="selector__arrowwrapper">
                     <div className="selector__arrow"></div>
                  </div>
               </div>
            </div>
            <div className="select select-submenu">
               {this.getFields()}
            </div> 
         </div>
      )
   }
}

export default Selector;