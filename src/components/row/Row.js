import React, { useCallback } from 'react'
import "./row.css";
import { useDispatch } from 'react-redux';
import * as converterAction from './../../actions/converter';
import * as labelAction from './../../actions/label';

function Row(props) {
   const dispatch = useDispatch();
   const setOrigin = useCallback((val) =>  { 
         dispatch(converterAction.setOrigin( val ))
      }, [dispatch]
   ); 

   const setLabel = useCallback((val) =>  { 
         dispatch(labelAction.setLabel( val ))
      }, [dispatch]
   ); 
   
   const updateConverterData = (id, cur) => {
      setOrigin([id, cur]);
   }

   const colorToProc = (ar) => {
      return (
         (ar[0] === "+") ? 
            ("row__green")   
         : (ar[0] === "-") ? 
            ("row__red")
         : ("")
      );
   }

   const addAnimation = () => {
      if(props.grow !== '') {
         return " row_animate";
      }
   }

   const onClick = () => {   
      setLabel(["from", props.symbol]);
      updateConverterData("field-1", props.symbol);
   }
   
   return (
      <div className={"row " + props.className + " " + addAnimation()} onClick={onClick}>
         <div className="row__arrange">
            <div className={"row__arrow " + props.grow}></div>
            <div className="row__id justify-buttom">{props.id} </div>
         </div>
         <div className="row__coin">
            <div className="row__logo">
               <img src={props.img} alt={props.symbol} className="row__img"/>
            </div>

            <div className="row__name">
               <div className="row__sybmol">{props.symbol}</div>
               <div className="row__fullname">{props.name}</div>
            </div>
         </div>
         <div className="row__price row__item">{props.price}</div>
         <div className="row__marketcap row__item">{props.marketCap}</div>
         <div className={"row__change row__item " + colorToProc(props.change)}>{props.change}</div>
      </div>
      
   );

}

export default Row;