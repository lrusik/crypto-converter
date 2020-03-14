import React, { Component } from 'react'
import "./selector.css";

class Selector extends Component {
   constructor(props) {
      super(props);
      this.state = {
         lastLabel: this.props.label, 
         label: this.props.label, 
         curnsies : this.props.curnsies
      }
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

      if(submenu.style.display === "block" && e.target.className !== "selector__label"){
         submenu.style.display = "none";
         label.style.cursor = "pointer";
         this.setState({label: this.state.lastLabel});
      } else { 
         this.hideMenus();
         submenu.style.display = "block";   
         label.style.cursor = "text";
         label.focus();
         label.select();
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
      let ret = "";
      this.state.curnsies.forEach( ( item ) => {
         if(val.toUpperCase().includes(item[1]) || val.toUpperCase().includes(item[2].toUpperCase()))
            ret = item[2] + " (" + item[1] + ")";       
      });
      return ret;
   }

   select = (val) => {
      const label = this.convertToLabel(val);

      if(label !== "") {
         this.setState( { label: label, lastLabel: label });
         this.props.convert();
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
      let curnsies = [];
      
      if(val === ""){
         curnsies = this.props.curnsies
      } else {
         this.props.curnsies.forEach( ( item ) => {
            if(item[1].includes(val.toUpperCase()) || item[2].toUpperCase().includes(val.toUpperCase()))
               curnsies.push(item);
         });
      }
      
      this.setState( {curnsies: curnsies} );
   }

   onKeyDown = (e) => {
      const parent = e.target.parentElement.parentElement;
      if(e.key === "Enter"){
         parent.querySelector(".select-submenu").style.display = "none";
         this.select(e.target.value)
      } else if(e.key === "ArrowDown"){
         this.hoverItemOnArrow(parent, 1);
      } else if(e.key === "ArrowUp") {
         this.hoverItemOnArrow(parent, -1);
      }
   }

   selectItem = (e) => {
      this.select(e.target.innerText);
   }

   render() {
      return (
         <div className="select">
            <div className="select selector" onClick={this.menu}>
               <input className="selector__label" onChange={this.changeInput} onKeyDown={this.onKeyDown} value={this.state.label} />
               <div className="selector__select"
               >
                  <div className="selector__arrowwrapper">
                     <div className="selector__arrow"></div>
                  </div>
               </div>
            </div>
            <div className="select select-submenu">
               { 
                  this.state.curnsies.map( (cur) => (
                  <div 
                     className="select-submenu__item" 
                     key={cur[0]} 
                     onClick={this.selectItem} 
                     onMouseEnter={this.hoverItem}
                  >
                     {cur[2] } ({cur[1]})
                  </div>    
                  ))
               }
            </div> 
         </div>
      )
   }
}

export default Selector;

/* 
   tests
*/