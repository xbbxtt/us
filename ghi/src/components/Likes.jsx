import { useState, useEffect } from 'react'



export default function Drafting() {
    const [potentialLikes, setPotentialLikes] = useState([])

    useEffect(() => {
        const fetchRomanticPreferences = async () => {
          const url = "http://localhost:8000/api/auth/preferences/"
            try {
                const response = await fetch(url);
                console.log(response)
                if (response.ok) {
                  console.log(response)
                  const data = await response.json();

                  // Create a list of all

                }
                if (!response.ok) throw new Error("Try lowering your standards!");
                const data = await response.json();
                setPotentialLikes(data);
            } catch (error) {
                console.error(error.message);
            }
        };
        fetchRomanticPreferences();
    })


  return (
    <div className="col">
      {potentialLikes.map(user => {
        return (
          <div key={user.id} className="card mb-3 shadow">
            <img src={user.picture_url} className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{user.first_name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {user.last_name}
              </h6>
              <p className="card-text">
                {user.description}
              </p>
            </div>
            <div className="card-footer">
            <p className="card-text">
                {user.age}
                {user.gender}
            </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}



  //   return (
  //   <div className="col">
  //     {potentialLikes.list.map(data => {
  //       const user = data.user.id;
  //       return (
  //         <div key={user.id} className="card mb-3 shadow">
  //           <img src={user.picture_url} className="card-img-top" />
  //           <div className="card-body">
  //             <h5 className="card-title">{user.first_name}</h5>
  //             <h6 className="card-subtitle mb-2 text-muted">
  //               {user.last_name}
  //             </h6>
  //             <p className="card-text">
  //               {user.description}
  //             </p>
  //           </div>
  //           <div className="card-footer">
  //           <p className="card-text">
  //               {user.age}
  //               {user.gender}
  //           </p>
  //           </div>
  //         </div>
  //       );
  //     })}
  //   </div>
  // );
