
const MobileNavLinks = () => {
  return (
    <>
      <NavButton to="/">דף הבית</NavButton>
      <NavButton to="/focused-course">קורס ממוקד</NavButton>
      <NavButton to="/focused-workshop">סדנה ממוקדת</NavButton>
      <NavButton to="/custom-lecture">הרצאה בהתאמה אישית</NavButton>
      <NavButton to="/intro-workshop">סדנת מבוא</NavButton>
      <NavButton to="/digital-courses">קורסים דיגיטליים</NavButton>
      <div className="border-t pt-3 pb-1">
        <h3 className="text-sm font-medium mb-2">בלוג</h3>
        <div className="grid gap-1 pr-2">
          <NavButton to="/written-blog">מאמרים</NavButton>
          <NavButton to="/video-blog">בלוג וידאו</NavButton>
        </div>
      </div>
      <NavButton to="/contact">צור קשר</NavButton>
    </>
  );
};
