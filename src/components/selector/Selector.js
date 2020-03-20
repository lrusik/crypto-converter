import React, { useState, useEffect, useRef } from 'react';

import "./selector.css";

function Selector(props) {   
   const lastLabel = useRef(props.label);
   const curLabel = useRef(props.label);
   const dontShow = useRef([].concat(props.dontShow));
   const [currencies] = useState(props.curs);

   const updateConverterData = (id, cur) => {   
      props.setCur.bind(this, id, cur);
      props.setCur(id, cur);
   }

   const hideMenus = () => {
      const submenus = document.querySelectorAll(".select-submenu");
      submenus.forEach( (submenu) => {   
         const lable = submenu.parentElement.querySelector(".selector__label");    
         lable.style.cursor = "pointer";
         lable.blur();
         submenu.style.display = "none"
         curLabel.current = lastLabel.current;
      });
   }

   const menu = (e) => {
      const element = e.currentTarget.parentElement.parentElement;
      const submenu = element.querySelector(".select-submenu");
      const label = element.querySelector(".selector__label");

      if(
         submenu.style.display === "block" && 
         e.target.className !== "selector__label"
      ){
         submenu.style.display = "none";
         label.style.cursor = "pointer";
         curLabel.current = lastLabel.current;
      } else { 
         hideMenus();
         submenu.style.display = "block";   
         label.style.cursor = "text";
         label.focus();
         label.select(e);
      }
   }

   const outsiteMenuEvent = (event) => {
      const selector_classes = [
         "selector__arrowwrapper", 
         "selector__arrow",
         "selector__label",
         "selector__select",
         "select selector"
      ];
      return selector_classes.includes(event);
   }
   
   const handleClickEvent = (e) => {
      if(! outsiteMenuEvent(e.target.className) ){ 
         hideMenus();
      }
   }
   
   useEffect(() => {
      document.addEventListener('click', handleClickEvent);  
   }, [])

   const search = (val) => {
      let curs= [];
      
      if(val !== ""){

         for(let item in props.curs) {      
            if(!(
               item.includes(val.toUpperCase()) || 
               props.curs[item][0].toUpperCase().includes(val.toUpperCase())
            )){
               curs.push(item);
            };
         }

      }
      dontShow.current = curs.concat(props.dontShow);
   }

   const changeInput = (e) => {
      curLabel.current = e.target.value;
      search(e.target.value);
   }

   const convertToLabel = (val) => {
      for(let item in props.curs) {
         if(
            item.includes(val.toUpperCase()) || 
            props.curs[item][0].toUpperCase().includes(val.toUpperCase()) || 
            val.toUpperCase() ===  props.curs[item][0].toUpperCase() + " (" + item.toUpperCase() + ")"
         ){
            return currencies[item][0] + " (" + item + ")"; 
         }
      }

      return null;
   }

   const convertToCur = (val) => {
      for(let item in props.curs) {
         if(
            item.includes(val.toUpperCase()) || 
            props.curs[item][0].toUpperCase().includes(val.toUpperCase()) ||
            val.toUpperCase() ===  props.curs[item][0].toUpperCase() + " (" + item.toUpperCase() + ")"
            
         ){
            return item; 
         }
      }

      return null;
   }

   const select = (e) => {
      let val = e.target.value;
      
      if(!val)
         val = e.target.innerText;

      val = val.toUpperCase();

      const label = convertToLabel(val);
      const cur = convertToCur(val);      

      if(label !== null) {
         const id = e.target.parentElement.parentElement.querySelector(".selector__label").id;

         updateConverterData(id, cur);
         curLabel.current = label;
         lastLabel.current = label;
      } else {
         curLabel.current = lastLabel.current;
      }
   }

   const hoverItem = (e) => {
      const items = document.querySelectorAll(".select-submenu__item");
      items.forEach( (item) => {
         item.classList.remove("select-submenu__item_active");      
      });
      e.target.classList.add("select-submenu__item_active");
      curLabel.current = e.target.innerText;
   }

   const hoverItemOnArrow = (parent, pos) => {
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
      curLabel.current = items[next].innerText;
   }

   const scrollHandler = (e) => {
      const el = e.target.parentElement.parentElement.querySelector(".select-submenu__item_active");
      if(el.offsetTop > 160)
         el.parentElement.scrollTop = el.offsetTop;
      else 
         el.parentElement.scrollTop = 0;
   }

   const onKeyDown = (e) => {
      const parent = e.target.parentElement.parentElement;
      if(e.key === "Enter"){
         select(e);
         parent.querySelector(".select-submenu").style.display = "none";   
         
      } else if(e.key === "ArrowDown"){
         
         hoverItemOnArrow(parent, 1);
         scrollHandler(e);
      } else if(e.key === "ArrowUp") {
         hoverItemOnArrow(parent, -1);
         scrollHandler(e);
      } else if(e.key === "Escape"){
         hideMenus()
      }
   }

   const selectItem = (e) => { 
      select(e);
   }

   const getField = (symbol) => {
      if(!(dontShow.current.includes(symbol))) {
         return (         
            <div
               className="select-submenu__item" 
               key={symbol} 
               onClick={selectItem} 
               onMouseEnter={hoverItem}
            >
               {currencies[symbol][0] } ({symbol})
            </div>    
         );
      }
   }

   const getFields = () => {
      let ret = [];
      for(let key in currencies){ 
         try {
            ret.push(getField(key));
         } catch(err) {
            console.log(err);
         }
      }
      return ret;
   }

   return (
      <div className="select">
         <div className="select selector" onClick={menu}>
            <input 
               className="selector__label" 
               onChange={changeInput} 
               onKeyDown={onKeyDown} 
               id={props.id} 
               value={curLabel.current}
               autoComplete="off"
            />

            <div className="selector__select">
               <div className="selector__arrowwrapper">
                  <div className="selector__arrow"></div>
               </div>
            </div>
         </div>
         <div className="select select-submenu">
            {getFields()}
         </div> 
      </div>
   )
   
}

export default Selector;