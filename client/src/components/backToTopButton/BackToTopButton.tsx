function BackToTopButton() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-4 right-5 z-10 py-2 px-4 bg-[#010536] text-white font-medium rounded-full transition duration-300 ease-in-out"
    >
      To Top
    </button>
  );
}

export default BackToTopButton;
