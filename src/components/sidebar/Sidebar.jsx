import React, { useState } from "react";
import "../sidebar/Sidebar.css";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Collapse } from "react-collapse";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";

const Sidebar = ({ category, setCategory, roast, setRoast, origin, setOrigin }) => {
  const [isOpenCategoryFilter, setIsOpenCategoryFilter] = useState(true);
  const [isOpenRoastLevelFilter, setIsOpenRoastLevelFilter] = useState(true);
  const [isOpenOriginFilter, setIsOpenOriginFilter] = useState(true);

  return (
    <aside className="sidebar py-5">

      {/* CATEGORY */}
      <div className="box">
        <h3 className="w-full mb-3 text-[20px] font-bold flex items-center pr-5 ">
          Categories
          <Button
            className="!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto !text-black"
            onClick={() => setIsOpenCategoryFilter(!isOpenCategoryFilter)}
          >
            {isOpenCategoryFilter ? <FaAngleUp /> : <FaAngleDown />}
          </Button>
        </h3>

        <Collapse isOpened={isOpenCategoryFilter}>
          <div className="scroll px-4 relative -left-[13px] ">
            {["Single Origin", "Blends", "Espresso", "Cold Brew"].map((cat) => (
              <FormControlLabel
                key={cat}
                control={
                  <Checkbox
                    size="small"
                    checked={category === cat}
                    onChange={() =>
                      setCategory(category === cat ? "" : cat)
                    }
                  />
                }
                label={cat}
                className="w-full"
              />
            ))}
          </div>
        </Collapse>
      </div>

      {/* ROAST LEVEL */}
      <div className="box">
        <h3 className="w-full mt-5 text-[20px] font-bold flex items-center pr-5 ">
          Roast Level
          <Button
            className="!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto !text-black"
            onClick={() => setIsOpenRoastLevelFilter(!isOpenRoastLevelFilter)}
          >
            {isOpenRoastLevelFilter ? <FaAngleUp /> : <FaAngleDown />}
          </Button>
        </h3>

        <Collapse isOpened={isOpenRoastLevelFilter}>
          <div className="scroll px-4 relative -left-[13px] ">
            {["light", "medium", "dark"].map((r) => (
              <FormControlLabel
                key={r}
                control={
                  <Checkbox
                    size="small"
                    checked={roast === r}
                    onChange={() =>
                      setRoast(roast === r ? "" : r)
                    }
                  />
                }
                label={`${r.charAt(0).toUpperCase() + r.slice(1)} Roast`}
                className="w-full"
              />
            ))}
          </div>
        </Collapse>
      </div>

      {/* ORIGIN */}
      <div className="box">
        <h3 className="w-full mt-5 text-[20px] font-bold flex items-center pr-5 ">
          Origin
          <Button
            className="!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto !text-black"
            onClick={() => setIsOpenOriginFilter(!isOpenOriginFilter)}
          >
            {isOpenOriginFilter ? <FaAngleUp /> : <FaAngleDown />}
          </Button>
        </h3>

        <Collapse isOpened={isOpenOriginFilter}>
          <div className="scroll px-4 relative -left-[13px] ">
            {[
              "Burundi", "Colombia", "Ethiopia", "Guatemala",
              "Kenya", "Mexico", "Peru", "Rwanda"
            ].map((o) => (
              <FormControlLabel
                key={o}
                control={
                  <Checkbox
                    size="small"
                    checked={origin === o}
                    onChange={() =>
                      setOrigin(origin === o ? "" : o)
                    }
                  />
                }
                label={o}
                className="w-full"
              />
            ))}
          </div>
        </Collapse>
      </div>

      {/* RATING */}
      <div className="box">
        <h3 className="w-full mt-5 text-[20px] font-bold flex items-center pr-5 ">
          Rating
        </h3>

        <div className="w-full">
          <Rating size="small" value={5} readOnly />
        </div>
        <div className="w-full">
          <Rating size="small" value={4} readOnly />
        </div>
        <div className="w-full">
          <Rating size="small" value={3} readOnly />
        </div>
        <div className="w-full">
          <Rating size="small" value={2} readOnly />
        </div>
        <div className="w-full">
          <Rating size="small" value={1} readOnly />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;