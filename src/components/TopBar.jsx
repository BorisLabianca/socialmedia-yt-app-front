import { TbSocial } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { BsMoon, BsSun } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { setTheme } from "../redux/themeSlice";
import { logout } from "../redux/userSlice";
import CustomButton from "./CustomButton";
import TextInput from "./TextInput";

const TopBar = () => {
  const { theme } = useSelector((store) => store.theme);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const handleSearch = async (data) => {};
  const handleTheme = () => {
    const themeValue = theme === "light" ? "dark" : "light";
    dispatch(setTheme(themeValue));
  };

  return (
    <div className="topbar w-full flex items-center justify-between py-3 md:py-6 px-4 bg-primary rounded-lg">
      <Link to="/" className="flex gap-2 items-center">
        <div className="p-1 md:p-2 bg-[#065ad8] rounded text-white">
          <TbSocial />
        </div>
        <span className="text-xl md:text-2xl font-semibold text-[#065ad8]">
          MyBlogApp
        </span>
      </Link>
      <form
        className="hidden md:flex items-center justify-center"
        onSubmit={handleSubmit(handleSearch)}
      >
        <TextInput
          placeholder="Search..."
          styles="w-[18rem] lg:w-[38rem] rounded-l-full py-3"
          register={register("search")}
        />
        <CustomButton
          title="Search"
          type="submit"
          containerStyles="bg-[#0444a4] text-white px-6 py-2.5 mt-2 rounded-r-full"
        />
      </form>

      {/* ICONS */}
      <div className="flex gap-4 items-center text-ascent-1 text-md md:text-xl">
        <button onClick={() => handleTheme()}>
          {theme === "light" ? <BsMoon /> : <BsSun />}
        </button>
        <div className="hidden lg:flex">
          <IoMdNotificationsOutline />
        </div>
        <div>
          <CustomButton
            onClick={() => dispatch(logout())}
            title="Log Out"
            containerStyles="text-sm text-ascent-1 px-4 md:px-6 py-1 md:py-2 border border-[#666] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
