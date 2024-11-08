"use client";

import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "@/app/firebase/firebase";
import { ControllerTheme } from "../../elements";
import { SearchContext } from "@/app/contexts/Search";

const Header = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [inputValue, setInputValue] = useState("");
  const { setContentActive } = useContext(SearchContext);

  const handleSingOut = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("error ::", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setContentActive(inputValue);
    }
  };

  useEffect(() => {
    if (!user) {
      const timer = setTimeout(() => {
        router.push("/");
      }, 5000);

      return () => clearTimeout(timer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="navbar gap-2 bg-base-100 justify-between px-4 bg-card border-b border-border">
      <div className="navbar-start w-auto max-[768px]:hidden">
        <span className="text-xl">Shop</span>
      </div>
      <div className="navbar-center flex-1 max-w-[600px] ">
        <label className="input flex items-center gap-2 flex-1 border border-input bg-accent">
          <input
            type="text"
            placeholder="Search"
            onKeyDown={handleKeyDown}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={(e) => setContentActive(e.target.value)}
          />
        </label>
      </div>
      <div className="navbar-end w-auto gap-3">
        <ControllerTheme />
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar placeholder"
          >
            <div className="bg-background text-neutral-content w-24 rounded-full border divide-solid">
              <span className="text-base">{user?.displayName?.slice(0, 1).toUpperCase()}</span>
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-accent rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li onClick={handleSingOut}>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
