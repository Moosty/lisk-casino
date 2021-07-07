import * as cards from "../assets/cards";
import React from "react";
const blackjackDeck = [

  cards.H2,
  cards.H3,
  cards.H4,
  cards.H5,
  cards.H6,
  cards.H7,
  cards.H8,
  cards.H9,
  cards.HT,
  cards.HJ,
  cards.HQ,
  cards.HK,
  cards.HA,

  cards.C2,
  cards.C3,
  cards.C4,
  cards.C5,
  cards.C6,
  cards.C7,
  cards.C8,
  cards.C9,
  cards.CT,
  cards.CJ,
  cards.CQ,
  cards.CK,
  cards.CA,

  cards.S2,
  cards.S3,
  cards.S4,
  cards.S5,
  cards.S6,
  cards.S7,
  cards.S8,
  cards.S9,
  cards.ST,
  cards.SJ,
  cards.SQ,
  cards.SK,
  cards.SA,

  cards.D2,
  cards.D3,
  cards.D4,
  cards.D5,
  cards.D6,
  cards.D7,
  cards.D8,
  cards.D9,
  cards.DT,
  cards.DJ,
  cards.DQ,
  cards.DK,
  cards.DA,

  cards.B1,


]
export const Card = ({card}) => {
  return (



<img src={blackjackDeck[card]} className={"w-32"}/>

  )
}