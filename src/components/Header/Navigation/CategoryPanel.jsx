// import React, { useState } from "react";
// import Box from "@mui/material/Box";
// import Drawer from "@mui/material/Drawer";
// import Button from "@mui/material/Button";
// import List from "@mui/material/List";
// import Divider from "@mui/material/Divider";
// import { RiMenu2Line } from "react-icons/ri";
// import { MdOutlineClose } from "react-icons/md";
// import { AiOutlinePlus } from "react-icons/ai";
// import FormGroup from "@mui/material/FormGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import { Link } from "react-router-dom";



// const CategoryPanel = () => {
//   const [open, setOpen] = React.useState(false);

//   const toggleDrawer = (newOpen) => () => {
//     setOpen(newOpen);
//   };
//   const DrawerList = (
//     <Box sx={{ width: 350 }} role="presentation" className="bg-[#f5f0eb]">
//       <h1
//         className="p-3 text-[20px] font-bold fliterText flex items-center justify-between
//          "
//       >
//         FLITER{" "}
//         <MdOutlineClose
//           className="cursor-pointer text-[30px]"
//           onClick={toggleDrawer(false)}
//         />{" "}
//       </h1>

//       <Divider />
//       <div className="scroll ">
//         <ul className="w-full">
//           <li className="list-none flex items-center relative">
//             <Button className="w-full !text-left !justify-start !px-3 !text-black !text-[1.3rem]">
//               Roast Level
//             </Button>
//             <AiOutlinePlus className="absolute top-[13px] right-[15px] !text-[1.5rem] " />
//           </li>

//           <ul className="submenu">
//             <li className="list-none">
//               <Button className="w-full h-4 !text-left !justify-start !px-3 !text-black !text-[1rem]">
//                 <FormGroup>
//                   <FormControlLabel
//                     control={<Checkbox defaultChecked />}
//                     className="!text-[#000]"
//                   />
//                 </FormGroup>
//                 ALL
//               </Button>
//             </li>

//             <li className="list-none">
//               <Button className="w-full h-4 !text-left !justify-start !px-3 !text-black !text-[1rem]">
//                 <FormGroup>
//                   <FormControlLabel
//                     control={<Checkbox defaultChecked />}
//                     className="!text-[#000]"
//                   />
//                 </FormGroup>
//                 ALL
//               </Button>
//             </li>

//             <li className="list-none">
//               <Button className="w-full h-4 !text-left !justify-start !px-3 !text-black !text-[1rem]">
//                 <FormGroup>
//                   <FormControlLabel
//                     control={<Checkbox defaultChecked />}
//                     className="!text-[#000]"
//                   />
//                 </FormGroup>
//                 ALL
//               </Button>
//             </li>

            
//           </ul>
//         </ul>
//       </div>
//     </Box>
//   );
//   return (
//     <div>
//       <Button className="!text-black gap-3 " onClick={toggleDrawer(true)}>
//         <RiMenu2Line className="text-[18px]" />
//        SHOP BY CATEGORIES
//       </Button>
//       <Drawer open={open} onClose={toggleDrawer(false)}>
//         {DrawerList}
//       </Drawer>
//     </div>
//   );
// };

// export default CategoryPanel;
