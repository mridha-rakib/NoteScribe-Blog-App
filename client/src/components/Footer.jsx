

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <p>NoteScribe &copy; {currentYear}</p>
    </div>
  );
};

export default Footer;
