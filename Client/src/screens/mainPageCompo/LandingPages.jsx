import React, { useContext, useState } from 'react';
import MainPageCardContainer from "../../components/Compo/MainPageCardContainer";
import { UserContext } from '../../Services/UserContext';

function CardDesigns({ isSidebarOpen }) {
  const { adminCodes, user } = useContext(UserContext);
  const [Displaybtns, setDisplaybtns] = useState(false);
  const cardDesigns = adminCodes.filter(code => code.sourceCodePath === 'landing_design');

  const AdminEmail = process.env.REACT_APP_ADMIN_EMAIL || 'admin@example.com';

  try {
    if (user?.email === AdminEmail || user?.user?.email === AdminEmail) {
      setDisplaybtns(true);
    }
  } catch (error) {
    console.log(error);
  }

  return (
    <div>
      <MainPageCardContainer 
        adminCodes={cardDesigns} 
        Displaybtns={Displaybtns} 
        isSidebarOpen={isSidebarOpen} 
      />
    </div>
  );
}

export default CardDesigns;
