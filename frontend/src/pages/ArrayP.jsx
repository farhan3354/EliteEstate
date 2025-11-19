// import React, { useState } from "react";

// const ArrayP = () => {
//   const [data, setData] = useState([
//     { path: "/", label: "Home", icon: "FiHome" },
//     { path: "/properties", label: "Browse", icon: "FiSearch" },
//     { path: "/about", label: "About", icon: "FcAbout" },
//     { path: "/contact", label: "Contact", icon: "FiMail" },
//   ]);

//   const [newItem, setNewItem] = useState({
//     path: "",
//     label: "",
//     icon: "",
//   });

//   const handleInput = (e) => {
//     const { name, value } = e.target;
//     setNewItem((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleForm = (e) => {
//     e.preventDefault();
//     const { path, label, icon } = newItem;

//     if (!path.trim() || !label.trim() || !icon.trim()) {
//       console.log("Empty inputs");
//       return;
//     }

//     setData((prev) => [...prev, newItem]);
//     setNewItem({ path: "", label: "", icon: "" });
//   };

//   return (
//     <>
//       <h2>Array Practice</h2>
//       <form onSubmit={handleForm}>
//         <input
//           type="text"
//           name="path"
//           value={newItem.path}
//           onChange={handleInput}
//           placeholder="Enter the path"
//         />
//         <input
//           type="text"
//           name="label"
//           value={newItem.label}
//           onChange={handleInput}
//           placeholder="Enter the label"
//         />
//         <input
//           type="text"
//           name="icon"
//           value={newItem.icon}
//           onChange={handleInput}
//           placeholder="Enter the icon"
//         />
//         <button type="submit">Add Item</button>
//       </form>

//       {data.map((item, index) => (
//         <div key={index}>
//           <h3>{item.path}</h3>
//           <h3>{item.label}</h3>
//           <h3>{item.icon}</h3>
//         </div>
//       ))}
//     </>
//   );
// };

// export default ArrayP;

import React, { useState } from "react";

const ArrayP = () => {
  const [data, setData] = useState([12, 32, 4, 45, 56, 65]);
  const [newItem, setNewItem] = useState("");

  const handleInput = (e) => {
    setNewItem(e.target.value);
  };

  const handleForm = (e) => {
    e.preventDefault();

    if (newItem === "") return;

    setData((prev) => [...prev, Number(newItem)]);
    setNewItem("");
  };

  return (
    <>
      <h2>Array Practice</h2>

      <form onSubmit={handleForm}>
        <input
          type="number"
          value={newItem}
          onChange={handleInput}
          placeholder="Enter number"
        />
        <button type="submit">Add Item</button>
      </form>

      {data.map((item, index) => (
        <div key={index}>
          <h2>{item}</h2>
        </div>
      ))}
    </>
  );
};

export default ArrayP;
