export const infiniteScroll = ({ callback, targetElement }) => {
  // intersection observer
  const target = document.querySelectorAll(targetElement);

  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback();
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback);
  target.forEach((el) => observer.observe(el));
};
