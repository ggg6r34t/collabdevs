import banner from "../../../assets/images/logos/collabdev_color_transparent_bg_2.png";

function Banner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#010536]">
      <img
        src={banner}
        alt="company banner"
        className="w-9/12 h-9/12 bg-right object-cover"
      />
    </div>
  );
}

export default Banner;
