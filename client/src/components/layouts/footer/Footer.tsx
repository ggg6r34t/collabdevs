import CompanyLogo from "../../../assets/images/logos/collabdev_black_transparent_bg.png";

function Footer() {
  return (
    <footer className="bg-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <a href="/" className="no-uderline">
          <div className="flex items-center ml-44">
            <img src={CompanyLogo} alt="Logo" className="w-10 mr-2" />
            <span className="text-xl font-bold">CollabDev</span>
          </div>
        </a>
        <div className="flex items-between mr-44 space-x-20">
          <a href="/" className="text-gray-600 hover:text-gray-800">
            Terms
          </a>
          <a href="/" className="text-gray-600 hover:text-gray-800">
            Privacy
          </a>
          <a href="/" className="text-gray-600 hover:text-gray-800">
            About Us
          </a>
          <a href="/" className="text-gray-600 hover:text-gray-800">
            Blog
          </a>
          <a href="/" className="text-gray-600 hover:text-gray-800">
            Docs
          </a>
          <a href="/" className="text-gray-600 hover:text-gray-800">
            FAQ
          </a>
          <div className="relative group">
            <a href="/" className="text-gray-600 hover:text-gray-800">
              ?
            </a>
            <div className="dropdown-shape-footer absolute bottom-[2rem] right-[-56px] transform -translate-x-1/2 hidden group-hover:block bg-white border border-gray-300 rounded-[12px] p-2 shadow-lg z-10">
              <p className="w-16 text-sm">Help Desk</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
