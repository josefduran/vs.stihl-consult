import React from 'react'
import { useDispatch} from 'react-redux';
import { selectProduct } from '../redux/actions/actionProducts';

import guante from '../assets/guantes.jpg'

import bg56ce from '../assets/bg56ce-450-225.jpg'
import bga100 from '../assets/bga100-450-225.jpg'
import bga200 from '../assets/bga200-450-225.jpg'
import bga57 from '../assets/bga57-450-225.jpg'
import bga86 from '../assets/bga86-450-225.jpg'
import bge61 from '../assets/bge61-450-225.jpg'
import bge71 from '../assets/bge71-450-225.jpg'
import br600 from '../assets/br600-450-225.jpg'
import fc56ce from '../assets/fc56ce-450-225.jpg'
import fc91 from '../assets/fc91-450-225.jpg'
import fs40ce from '../assets/fs40ce-450-225.jpg'
import fs91r from '../assets/fs91r-450-225.jpg'
import fsa135r from '../assets/fsa135r-450-225.jpg'
import fsa60r from '../assets/fsa60r-450-225.jpg'
import fse60 from '../assets/fse60-450-225.jpg'
import gta26 from '../assets/gta26-450-225.jpg'
import hl56K0 from '../assets/hl56K0-450-225.jpg'
import hl91k from '../assets/hl91k-450-225.jpg'
import hla56 from '../assets/hla56-450-225.jpg'
import hs46ce from '../assets/hs46ce-450-225.jpg'
import hsa94r from '../assets/hsa94r-450-225.jpg'
import hse52 from '../assets/hse52-450-225.jpg'
import ht131polepruner from '../assets/ht131polepruner-450-225.jpg'
import ht56ce from '../assets/ht56ce-450-225.jpg'
import hta86 from '../assets/hta86-450-225.jpg'
import km111r from '../assets/km111r-450-225.jpg'
import km56rce from '../assets/km56rce-450-225.jpg'
import kma135r from '../assets/kma135r-450-225.jpg'
import ms170 from '../assets/ms170-450-225.jpg'
import ms180cbe from '../assets/ms180cbe-450-225.jpg'
import ms181cbe from '../assets/ms181cbe-450-225.jpg'
import ms250 from '../assets/ms250-450-225.jpg'
import ms261cm from '../assets/ms261cm-450-225.jpg'
import msa120cbq from '../assets/msa120cbq-450-225.jpg'
import msa200cbq from '../assets/msa200cbq-450-225.jpg'
import msa220cb from '../assets/msa220cb-450-225.jpg'
import mse141cq from '../assets/mse141cq-450-225.jpg'
import mse170 from '../assets/mse170-450-225.jpg'
import pl10 from '../assets/pl10-450-225.jpg'
import pl30 from '../assets/pl30-450-225.jpg'
import pl5 from '../assets/pl5-450-225.jpg'
import pp101 from '../assets/pp101-450-225.jpg'
import rb200 from '../assets/rb200-450-225.jpg'
import rb600 from '../assets/rb600-450-225.jpg'
import re90 from '../assets/re90-450-225.jpg'
import rma460v from '../assets/rma460v-450-225.jpg'
import rma510v from '../assets/rma510v-450-225.jpg'
import se122 from '../assets/se122-450-225.jpg'
import se33 from '../assets/se33-450-225.jpg'
import se62 from '../assets/se62-450-225.jpg'
import sg20 from '../assets/sg20-450-225.jpg'
import sg31 from '../assets/sg31-450-225.jpg'
import sg from '../assets/sg-71-450-225.jpg'
import sr200 from '../assets/sr200-450-225.jpg'


export const Card = ({productOnly }) => {
    
    
    const {prices=[],shortDescription="",name="",category="",pcId="" , urlImage, relativeUrl, power="", tags, lawnSize}=productOnly;
    const dispatch = useDispatch();
    
    const handleMoreDetails = (productOnly) => dispatch(selectProduct(productOnly));

    const project = () => {
        console.log(relativeUrl[0])
        switch(relativeUrl[0]) {
          case "bg56ce-450-225.jpg":   return <img src={bg56ce} alt="./assets/loading.gif" />;
          case "bga100-450-225.jpg":   return <img src={bga100} alt="./assets/loading.gif" />;
          case 'bga200-450-225.jpg':   return <img src={bga200} alt="./assets/loading.gif" />;
          case 'bga57-450-225.jpg':   return <img src={bga57} alt="./assets/loading.gif" />;
          case 'bga86-450-225.jpg':   return <img src={bga86} alt="./assets/loading.gif" />;
          case 'bge61-450-225.jpg':   return <img src={bge61} alt="./assets/loading.gif" />;
          case 'bge71-450-225.jpg':   return <img src={bge71} alt="./assets/loading.gif" />;
          case 'br600-450-225.jpg':   return <img src={br600} alt="./assets/loading.gif" />;
          case 'fc56ce-450-225.jpg':   return <img src={fc56ce} alt="./assets/loading.gif" />;
          case 'fc91-450-225.jpg':   return <img src={fc91} alt="./assets/loading.gif" />;
          case 'fs40ce-450-225.jpg':   return <img src={fs40ce} alt="./assets/loading.gif" />;
          case 'fs91r-450-225.jpg':   return <img src={fs91r} alt="./assets/loading.gif" />;
          case 'fsa135r-450-225.jpg':   return <img src={fsa135r} alt="./assets/loading.gif" />;
          case 'fsa60r-450-225.jpg':   return <img src={fsa60r} alt="./assets/loading.gif" />;
          case 'fse60-450-225.jpg':   return <img src={fse60} alt="./assets/loading.gif" />;
          case 'gta26-450-225.jpg':   return <img src={gta26} alt="./assets/loading.gif" />;
          case 'hl56K0-450-225.jpg':   return <img src={hl56K0} alt="./assets/loading.gif" />;
          case 'hl91k-450-225.jpg':   return <img src={hl91k} alt="./assets/loading.gif" />;
          case 'hla56-450-225.jpg':   return <img src={hla56} alt="./assets/loading.gif" />;
          case 'hs46ce-450-225.jpg':   return <img src={hs46ce} alt="./assets/loading.gif" />;
          case 'hsa94r-450-225.jpg':   return <img src={hsa94r} alt="./assets/loading.gif" />;
          case 'hse52-450-225.jpg':   return <img src={hse52} alt="./assets/loading.gif" />;
          case 'ht131polepruner-450-225.jpg':   return <img src={ht131polepruner} alt="./assets/loading.gif" />;
          case 'ht56ce-450-225.jpg':   return <img src={ht56ce} alt="./assets/loading.gif" />;
          case 'hta86-450-225.jpg':   return <img src={hta86} alt="./assets/loading.gif" />;
          case 'km111r-450-225.jpg':   return <img src={km111r} alt="./assets/loading.gif" />;
          case 'km56rce-450-225.jpg':   return <img src={km56rce} alt="./assets/loading.gif" />;
          case 'kma135r-450-225.jpg':   return <img src={kma135r} alt="./assets/loading.gif" />;
          case 'ms170-450-225.jpg':   return <img src={ms170} alt="./assets/loading.gif" />;
          case 'ms180cbe-450-225.jpg':   return <img src={ms180cbe} alt="./assets/loading.gif" />;
          case 'ms181cbe-450-225.jpg':   return <img src={ms181cbe} alt="./assets/loading.gif" />;
          case 'ms250-450-225.jpg':   return <img src={ms250} alt="./assets/loading.gif" />;
          case 'ms261cm-450-225.jpg':   return <img src={ms261cm} alt="./assets/loading.gif" />;
          case 'msa120cbq-450-225.jpg':   return <img src={msa120cbq} alt="./assets/loading.gif" />;
          case 'msa200cbq-450-225.jpg':   return <img src={msa200cbq} alt="./assets/loading.gif" />;
          case 'msa220cb-450-225.jpg':   return <img src={msa220cb} alt="./assets/loading.gif" />;
          case 'mse141cq-450-225.jpg':   return <img src={mse141cq} alt="./assets/loading.gif" />;
          case 'mse170-450-225.jpg':   return <img src={mse170} alt="./assets/loading.gif" />;
          case 'pl10-450-225.jpg':   return <img src={pl10} alt="./assets/loading.gif" />;
          case 'pl30-450-225.jpg':   return <img src={pl30} alt="./assets/loading.gif" />;
          case 'pl5-450-225.jpg':   return <img src={pl5} alt="./assets/loading.gif" />;
          case 'pp101-450-225.jpg':   return <img src={pp101} alt="./assets/loading.gif" />;
          case 'rb200-450-225.jpg':   return <img src={rb200} alt="./assets/loading.gif" />;
          case 'rb600-450-225.jpg':   return <img src={rb600} alt="./assets/loading.gif" />;
          case 're90-450-225.jpg':   return <img src={re90} alt="./assets/loading.gif" />;
          case 'rma460v-450-225.jpg':   return <img src={rma460v} alt="./assets/loading.gif" />;
          case 'rma510v-450-225.jpg':   return <img src={rma510v} alt="./assets/loading.gif" />;
          case 'se122-450-225.jpg':   return <img src={se122} alt="./assets/loading.gif" />;
          case 'se33-450-225.jpg':   return <img src={se33} alt="./assets/loading.gif" />;
          case 'se62-450-225.jpg':   return <img src={se62} alt="./assets/loading.gif" />;
          case 'sg20-450-225.jpg':   return <img src={sg20} alt="./assets/loading.gif" />;
          case 'sg31-450-225.jpg':   return <img src={sg31} alt="./assets/loading.gif" />;
          case 'sg-71-450-225.jpg':   return <img src={sg} alt="./assets/loading.gif" />;
          case 'sr200-450-225.jpg':   return <img src={sr200} alt="./assets/loading.gif" />;
          default:      return <h1>No project match</h1>
        }
      }
    
    return (
        <div className="card">

             {
                (relativeUrl) 
                    ? project()
                    : <img src={guante} alt="./assets/loading.gif" />
            } 
            {
                (power!=="") ? <b style={{color:'purple'}}>{power}</b> : <p>no hay power</p>
            }
            <div className="text_content">
                <h5>{name}</h5>
                <p className="card_desc">{shortDescription}</p>
                {/* <p className="card_desc"> <b>Price: ${ (prices?.length !== 0) ? prices[0].amount: '0.0' }</b></p>
                <p className="card_desc">Category: <u>{category}</u></p>
                <p className="" style={{color:'red'}}>PcID: <b>{pcId}</b></p>
                <p className="" style={{color:'blue'}}>sku: <b>{prices[0]?.sku}</b></p>
                <p className="card_desc">Tags: <u>{tags.toLowerCase()}</u></p>
                <p className="card_desc">Lawn size: <b>{lawnSize.toLowerCase()}</b></p> */}
                
            </div>

            <div className="container_btn">
                <button onClick={()=>{handleMoreDetails(productOnly)}}>More details</button>
                <button>Other options</button>
            </div>

        </div>
    )
}
