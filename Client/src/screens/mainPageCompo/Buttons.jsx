import React, { useContext } from 'react';
import MainPageCardContainer from "../../components/Compo/MainPageCardContainer";
import { UserContext } from '../../Services/UserContext';

function CardDesigns({ isSidebarOpen }) {
  const {AdminEmail,user, adminCodes,setDisplaybtns,Displaybtns } = useContext(UserContext);
  const cardDesigns = adminCodes.filter(code => code.sourceCodePath === 'button_design');

  try {
    if(user.user.email||user.email === AdminEmail){
    console.log(user.user.email === AdminEmail);
    
    setDisplaybtns(true)
  }
  } catch (error) {
    console.log(error);
    
  }
  
  return (
    <div>
      <MainPageCardContainer adminCodes={cardDesigns} Displaybtns={Displaybtns} isSidebarOpen={isSidebarOpen} />
    </div>
  );
}

export default CardDesigns;
