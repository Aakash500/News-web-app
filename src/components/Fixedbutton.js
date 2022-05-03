import React, { useState } from 'react'


function Fixedbutton() {
const[visible, setVisible] = useState(false)
const btnstyle={
    left:"50%",
    padding:"0.25rem",
    width:"30px",
    bottom:"1rem",
    borderRadius:"50%",
    display: `${visible?'inline':'none'}`,
    transform:"translateX(-50%)"
  }

const toggleVisible = () =>{
    const scrolled = window.scrollY;
    if(scrolled>300){
        setVisible(true)
    }else if(scrolled<=300){
        setVisible(false);
    }
};

const scrollToTop = () =>{
    window.scrollTo({
        top:0,
        behavior:'smooth'
    })
}
    window.addEventListener('scroll', toggleVisible);
    return (
        <button
        onClick={scrollToTop}
        style={btnstyle}
        type="button"
        className="btn btn-dark fixed-bottom btn-sm"
        >
       <i className="fa fa-angle-double-up"></i>
       </button>
    )

}

export default Fixedbutton