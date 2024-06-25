import React, { useEffect, useState } from "react";

import { FaArrowDownWideShort } from "react-icons/fa6";

import { useProduct } from "@/hooks/useProduct";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import axios from "axios";

import { toast } from "react-toastify";

interface Props {
  onDebounce: (value: string) => void;
  onRes: (value: []) => void;
}
const Search = ({ onDebounce, onRes }: Props) => {
  const [textSearch, setTextSearch] = useState();
  const debouncedValue = useDebouncedValue(textSearch, 500);
  const { fetchDataOrderPrice } = useProduct();

  ////useeefect order price
  const FilterOrderPrice = async (value: string) => {
    console.log(value);
    try {
      const result = await fetchDataOrderPrice(value);
      onRes(result);
      console.log(result);
    } catch (error) {}
  };

  ///////USEEFFECT DEBORNCER
  useEffect(() => {
    onDebounce(debouncedValue);
    (async () => {
      try {
        if (debouncedValue.length > 0) {
          const res = await axios.get(
            `http://localhost:3001/v1/productos/${debouncedValue}`
          );
          const result = res.data;
          onRes(result);
          console.log(res);
        } else {
          onRes([]);
        }
      } catch (error) {
        ////si error 404
        toast.error("PRODUCTO NO ENCONTRADO");
        onRes([]);
        console.log(onRes, "_________");
      }
    })();
  }, [debouncedValue]);

  const handlerText = (e: any) => {
    setTextSearch(e.target.value);
  };

  return (
    <center>
      <div className="join text-center">
        <div>
          <div>
            <input
              className="input input-bordered join-item"
              placeholder="Search..."
              value={textSearch}
              type="text"
              onChange={handlerText}
            />
          </div>
        </div>

        {/* FILTRO CATEGORY */}
        {/* <div className="dropdown dropdown-end ">
          <div tabIndex={0} role="button" className="btn join-item">
            <IoFilterSharp className="text-2xl" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52"
          >
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                aria-label="luxury"
                value="ac"
              />
            </li>
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                aria-label="osc"
                value="dim"
              />
            </li>
          </ul>
        </div> */}

        {/* FILTRO ORDER */}
        <div className="dropdown dropdown-end ">
          <div tabIndex={0} role="button" className="btn join-item ">
            <FaArrowDownWideShort className="text-2xl" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52"
          >
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                aria-label="$MAX"
                onClick={() => FilterOrderPrice("asc")}
              />
            </li>
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                aria-label="$MIN"
                onClick={() => FilterOrderPrice("desc")}
              />
            </li>
          </ul>
        </div>
      </div>
    </center>
  );
};

export default Search;
